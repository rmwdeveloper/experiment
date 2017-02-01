import fileSystem from '../data/fileSystem';
import uuid from 'node-uuid';
import {
  OPEN_START_MENU,
  CLEAR_ACTIVES,
  CLOSE_START_MENU,
  CREATE_FOLDER,
  OPEN_CONTEXT_MENU,
  SELECT_ICONS,
  OPEN_FILE_WINDOW,
  CLOSE_FILE_WINDOW,
  MAXIMIZE_FILE_WINDOW,
  UNMAXIMIZE_FILE_WINDOW,
  MINIMIZE_FILE_WINDOW,
  UNMINIMIZE_FILE_WINDOW,
  DRAG_FILE_WINDOW,
  DRAG_ERROR_WINDOW,
  CLICK_TASKBAR_ITEM,
  RESIZE_FILE_WINDOW,
  RESIZE_BROWSER_WINDOW,
  INITIALIZE_BROWSER_DIMENSIONS,
  INITIALIZE_DESKTOP_DIMENSIONS,
  OPEN_ERROR_WINDOW,
  CLOSE_ERROR_WINDOW,
  MOVE_FILE,
  MOVE_FILES,
  LOGIN,
  UPLOAD_START,
  CHECK_AVAILABLE_SPACE,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  DELETE_FILES
} from '../constants';


const initialState = {
  browserWidth: 0,
  browserHeight: 0,
  desktopWidth: 0,
  desktopHeight: 0,
  fileSystem,
  errorDisplayerIndex: 23,
  desktopNodeIndex: 11, //indices are in state, and not searchable by name because user can make duplicate names
  userIndex: 4, // Users personal index. Username will be fileSystem[userIndex].name  . Default is "Guest"
  authenticatorIndex: 29,
  startMenuProgramsIndices: [7, 8, 9],
  userDirectoriesIndices: [14, 15, 16],
  computerSettingsIndices: [17, 18],
  utilityControlsIndices: [19, 20, 21],
  startMenuOpened: false,
  contextMenuX: 0,
  contextMenuY: 0,
  contextMenuClickClass: '',
  contextMenuIndexClicked: '',
  contextMenuActive: false,
  selectedDesktopIcons: [], // Array of entity IDs todo: maybe rename this to selectedIcons if this can be used for both desktop and folder...
  openedFiles: {}, // { uuidv4: nodeIndex}
  openedFileDimensions: {},
  errorMessages: {},
  diskSpace: 50000, // MB
  usedSpace: 0, // MB
  uploads: {} // uploads[<temporary upload id> = nodeIndex
};
export default function layout(state = initialState, action) {
  const nextNodeIndex = uuid.v4();
  const newOpenedFiles = {...state.openedFiles};
  const newOpenedFileDimensions = {...state.openedFileDimensions};
  const newErrorMessages = {...state.errorMessages};
  const newFileSystem = { ...state.fileSystem };
  const newUploads = { ...state.uploads };

  let element = null;
  let elementIndex = null;
  const uniqueId = uuid.v4();
  switch (action.type) {
    case UPLOAD_START:
      return {...state, usedSpace: action.newSpaceUsed};
    case OPEN_START_MENU:
      return { ...state, startMenuOpened: true };
    case CLOSE_START_MENU:
      return { ...state, startMenuOpened: false };
    case CHECK_AVAILABLE_SPACE: // create new file based on the newly uploaded file. todo: make this work for desktop, or for a folder.
      newFileSystem[nextNodeIndex] = { name: action.newFileName, extension: action.newFileExtension,
        nodeIndex: nextNodeIndex,  permissions: 'rwxp',
        metadata: { icon: 'placeholder.png',
          iconOpacity: 0.25, loading: true, progress: 0, temporaryUploadId: action.temporaryUploadId } };
      newFileSystem[state.desktopNodeIndex].children.push(nextNodeIndex);
      newUploads[action.temporaryUploadId] = nextNodeIndex;
      return { ...state, fileSystem: newFileSystem, uploads: newUploads };
    case UPLOAD_PROGRESS:
      newFileSystem[state.uploads[action.temporaryUploadId]].metadata.progress = action.progress;
      return { ...state, fileSystem: newFileSystem};
    case UPLOAD_COMPLETE:
      delete newFileSystem[state.uploads[action.temporaryUploadId]].metadata.progress;
      delete newFileSystem[state.uploads[action.temporaryUploadId]].metadata.loading;
      return { ...state, fileSystem: newFileSystem};
    case CREATE_FOLDER:
      newFileSystem[nextNodeIndex] = { children: [], name: 'New Folder', type: 'Folder', metadata: { icon: 'emptyFolderXSmall.png' } };
      if (action.location === 'desktop') {
        newFileSystem[action.desktopNodeIndex].children.push(nextNodeIndex);
      }
      return { ...state, fileSystem: newFileSystem, contextMenuActive: false };
    case DELETE_FILES: // todo: edit thjis to allow deletion from folders.
      // const nodeIndicesToDelete = action.toDelete.map( nodeIndex => { return parseInt(nodeIndex, 10)});
      newFileSystem[state.desktopNodeIndex].children = newFileSystem[state.desktopNodeIndex].children.filter( element => {
        return !action.toDelete.includes(element);
      });
      action.toDelete.forEach( nodeIndex => {
        delete newFileSystem[nodeIndex];
      });
      return { ...state, fileSystem: newFileSystem};
    case OPEN_CONTEXT_MENU:
      return { ...state, contextMenuX: action.mouseX, contextMenuY: action.mouseY, contextMenuActive: true,
        contextMenuClickClass: action.clickclass, contextMenuIndexClicked: action.index };
    case SELECT_ICONS:
      return { ...state, selectedDesktopIcons: action.icons };
    case CLEAR_ACTIVES:
      return { ...state, contextMenuActive: false};
    case OPEN_FILE_WINDOW: // todo: consolidate with below statement (OPEN_ERROR_WINDOW)
      // todo: a better way to do this?
      newOpenedFiles[uniqueId] = action.nodeIndex;
      newOpenedFileDimensions[uniqueId] = { height: 300, width: 400,
        xPosition: ((action.desktopWidth / 2.4) + Object.keys(state.openedFiles).length * 5), index: uniqueId,
        yPosition: ((action.desktopHeight / 4) + Object.keys(state.openedFiles).length * 5), maximized: false, minimized: false };

      return { ...state, openedFiles: newOpenedFiles, openedFileDimensions: newOpenedFileDimensions };

    case OPEN_ERROR_WINDOW:
      newOpenedFiles[uniqueId] = state.errorDisplayerIndex;
      newErrorMessages[uniqueId] = action.errorMessage;
      newOpenedFileDimensions[uniqueId] = { height: 150, width: 300,
        xPosition: ((action.desktopWidth / 2.4) + Object.keys(state.openedFiles).length * 5), index: uniqueId,
        yPosition: ((action.desktopHeight / 4) + Object.keys(state.openedFiles).length * 5), maximized: false, minimized: false };
      return { ...state, openedFiles: newOpenedFiles, openedFileDimensions: newOpenedFileDimensions, errorMessages: newErrorMessages };

    case MOVE_FILE:
      // todo : move this util function (getParent) to a helpers file
      newFileSystem[action.originsParentIndex].children = [...newFileSystem[action.originsParentIndex].children.slice(0, action.parentalIndex),
        ...newFileSystem[action.originsParentIndex].children.slice(parentalIndex + 1)];
      newFileSystem[action.toNodeIndex].children.push(action.fromNodeIndex);
      return {...state, fileSystem: newFileSystem};
    case MOVE_FILES:
      const selectedIds = action.fromIndices.map(id => {return parseInt(id, 10)});
      newFileSystem[action.fromParentIndex].children = newFileSystem[action.fromParentIndex].children.filter(value=>{
        return !selectedIds.includes(value);
      });
      newFileSystem[action.toNodeIndex].children = [...newFileSystem[action.toNodeIndex].children, ...selectedIds];
      return {...state, fileSystem: newFileSystem};
    case CLOSE_FILE_WINDOW:
      delete newOpenedFiles[action.uniqueId];
      delete newOpenedFileDimensions[action.uniqueId];
      return { ...state, openedFileDimensions: newOpenedFileDimensions, openedFiles: newOpenedFiles };
    case CLOSE_ERROR_WINDOW:
      return { ...state, errorWindows: [...state.errorWindows.slice(0, action.errorIndex),
        ...state.errorWindows.slice(action.errorIndex + 1)] };
    case MAXIMIZE_FILE_WINDOW:
      newOpenedFiles[action.openedFileIndex].maximized = true;
      return { ...state, openedFiles: newOpenedFiles };
    case UNMAXIMIZE_FILE_WINDOW:
      newOpenedFiles[action.openedFileIndex].maximized = false;
      return { ...state, openedFiles: newOpenedFiles };
    case MINIMIZE_FILE_WINDOW:
      newOpenedFiles[action.openedFileIndex].minimized = true;
      return { ...state, openedFiles: newOpenedFiles };
    case UNMINIMIZE_FILE_WINDOW:
      newOpenedFiles[action.openedFileIndex].minimized = false;
      return { ...state, openedFiles: newOpenedFiles };
    case DRAG_FILE_WINDOW:
      if (action.index) { // todo : after close index is undefined: fix this bug.
        newOpenedFileDimensions[action.index].xPosition = action.deltaX;
        newOpenedFileDimensions[action.index].yPosition = action.deltaY;
        return { ...state, openedFileDimensions: newOpenedFileDimensions };
      }
      return state;
    case DRAG_ERROR_WINDOW:
      newErrorWindows[parseInt(action.index, 10)].xPosition = action.deltaX;
      newErrorWindows[parseInt(action.index, 10)].yPosition = action.deltaY;
      return { ...state, errorWindows: newErrorWindows };
    case RESIZE_BROWSER_WINDOW:
      return { ...state, browserWidth: action.browserWidth, browserHeight: action.browserHeight,
        desktopWidth: action.desktopWidth, desktopHeight: action.desktopHeight };
    case INITIALIZE_BROWSER_DIMENSIONS:
      return { ...state, browserWidth: action.browserWidth, browserHeight: action.browserHeight };
    case INITIALIZE_DESKTOP_DIMENSIONS:
      return { ...state, desktopWidth: action.desktopWidth, desktopHeight: action.desktopHeight };
    case RESIZE_FILE_WINDOW: // todo: Needs refactor. Bulky and repetitive switch case.
      if (action.resizeSideClicked === 'topLeft') {
        if (action.deltaY < 0) {
          newOpenedFileDimensions[action.index].height = action.resizeStartHeight + Math.abs(action.deltaY);
          newOpenedFileDimensions[action.index].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
        }
        if (action.deltaY > 0 ) {
          if (!((action.resizeStartHeight - action.deltaY) < 200)) {
            newOpenedFileDimensions[action.index].height = action.resizeStartHeight - Math.abs(action.deltaY);
            newOpenedFileDimensions[action.index].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
          }
        }
        if (action.deltaX < 0) {
          newOpenedFileDimensions[action.index].width = action.resizeStartWidth + Math.abs(action.deltaX);
          newOpenedFileDimensions[action.index].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);

        }
        if (action.deltaX > 0 ) {
          if (!((action.resizeStartWidth - action.deltaX) < 200)) {
            newOpenedFileDimensions[action.index].width = action.resizeStartWidth - Math.abs(action.deltaX);
            newOpenedFileDimensions[action.index].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
          }
        }
      }
      else if (action.resizeSideClicked === 'top') {
        if (action.deltaY < 0) {
          newOpenedFileDimensions[action.index].height = action.resizeStartHeight + Math.abs(action.deltaY);
          newOpenedFileDimensions[action.index].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
        }
        if (action.deltaY > 0 ) {
          if (!((action.resizeStartHeight - action.deltaY) < 200)) {
            newOpenedFileDimensions[action.index].height = action.resizeStartHeight - Math.abs(action.deltaY);
            newOpenedFileDimensions[action.index].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
          }
        }
      }
      else if (action.resizeSideClicked === 'right') {
        newOpenedFileDimensions[action.index].width = action.resizeStartWidth + action.deltaX;
      }
      else if (action.resizeSideClicked === 'bottom') {
        newOpenedFileDimensions[action.index].height = action.resizeStartHeight + action.deltaY;
      }
      else if (action.resizeSideClicked === 'left') {
        if (action.deltaX < 0) {
          newOpenedFileDimensions[action.index].width = action.resizeStartWidth + Math.abs(action.deltaX);
          newOpenedFileDimensions[action.index].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);
        }
        if (action.deltaX > 0 ) {
          if (!((action.resizeStartHeight - action.deltaX) < 200)) {
            newOpenedFileDimensions[action.index].width = action.resizeStartWidth - Math.abs(action.deltaX);
            newOpenedFileDimensions[action.index].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
          }
        }
      }

      else if (action.resizeSideClicked === 'topRight') {
        newOpenedFileDimensions[action.index].width = action.resizeStartWidth + action.deltaX;
        if (action.deltaY < 0) {
          newOpenedFileDimensions[action.index].height = action.resizeStartHeight + Math.abs(action.deltaY);
          newOpenedFileDimensions[action.index].yPosition = action.resizeStartTop - Math.abs(action.deltaX);
        }
        if (action.deltaY > 0 ) {
          if (!((action.resizeStartHeight - action.deltaY) < 200)) {
            newOpenedFileDimensions[action.index].height = action.resizeStartHeight - Math.abs(action.deltaY);
            newOpenedFileDimensions[action.index].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
          }
        }
      }

      else if (action.resizeSideClicked === 'bottomRight') {
        newOpenedFileDimensions[action.index].width = action.resizeStartWidth + action.deltaX;
        newOpenedFileDimensions[action.index].height = action.resizeStartHeight + action.deltaY;
      }

      else if (action.resizeSideClicked === 'bottomLeft') {

        newOpenedFileDimensions[action.index].height = action.resizeStartHeight + action.deltaY;

        if (action.deltaX < 0) {
          newOpenedFileDimensions[action.index].width = action.resizeStartWidth + Math.abs(action.deltaX);
          newOpenedFileDimensions[action.index].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);

        }
        if (action.deltaX > 0 ) {
          if (!((action.resizeStartWidth - action.deltaX) < 200)) {
            newOpenedFileDimensions[action.index].width = action.resizeStartWidth - Math.abs(action.deltaX);
            newOpenedFileDimensions[action.index].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
          }
        }
      }
      return { ...state, openedFileDimensions: newOpenedFileDimensions };
    case CLICK_TASKBAR_ITEM:
      const openedFileIndex = state.openedFiles.findIndex( element => {
        return element.entityId === action.index;
      });
      newOpenedFiles[openedFileIndex].minimized = !newOpenedFiles[openedFileIndex].minimized;
      return { ...state, openedFiles: newOpenedFiles };
    case LOGIN:
      const newState = {...state};
      newState.fileSystem = {};
      const fileSystemWithNodeIndexedKeys = {};
      action.user.FileSystem.FileNodes.forEach(nodeObject => {
        fileSystemWithNodeIndexedKeys[nodeObject.nodeIndex] = nodeObject;
      });
      const nodeIndices = action.user.FileSystem.FileNodes.map(fileNode => { return fileNode.nodeIndex}).sort((a, b) => { return a-b;});

      nodeIndices.forEach(nodeIndex => {
        const fileNode = fileSystemWithNodeIndexedKeys[nodeIndex];
        const { permissions, name, extension, FileNodeMetadata } = fileNode;
        const metadata = {};
        if (FileNodeMetadata.length > 0 ) {
          FileNodeMetadata.forEach(metadataItem => {
            metadata[metadataItem.name] = metadataItem.value;
          });
        }
        newState.fileSystem[nodeIndex] = {permissions, name, extension, metadata};
        if (fileNode.FileNodeId !== undefined && fileNode.FileNodeId !== null ) {
          if (newState.fileSystem[fileNode.FileNodeId].hasOwnProperty('children')) {
            newState.fileSystem[fileNode.FileNodeId].children.push(nodeIndex);
          } else {
            newState.fileSystem[fileNode.FileNodeId].children = [nodeIndex];
          }
        }
      });

      return { ...state, fileSystem: newState.fileSystem, diskSpace: action.user.FileSystem.diskSpace };
    default:
      return state;
  }
}
