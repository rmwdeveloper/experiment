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
  MOVE_FILES
} from '../constants';


const initialState = {
  browserWidth: 0,
  browserHeight: 0,
  desktopWidth: 0,
  desktopHeight: 0,
  fileSystem: { // Indices are always unique and static. A node only ever has one parent.
    1: { name: 'root', children: [2, 17, 18], permissions: ['rwxp'] },
    2: { name: 'drive', children: [3, 8], permissions: ['rwxp'] },
    3: { name: 'Users', children: [4], permissions: ['rwxp'] },
    4: { name: 'Guest', children: [11, 14, 15], permissions: ['rwxp'] },
    5: { name: 'Word Processor', permissions: ['rwx-'], extension: 'exe', metadata: { icon: 'wordlogoXSmall.png' } },
    6: { name: 'Spreadsheets', permissions: ['rwx-'], extension: 'exe', metadata: { icon: 'excellogoXSmall.png' } },
    7: { name: 'Webscape', permissions: ['rwx-'], extension: 'exe', metadata: { icon: 'ie7.png' } },
    8: { name: 'Programs', children: [9], permissions: ['rwx-'] },
    9: { name: 'Office', children: [5, 6], permissions: ['rwx-'] },
    10: { name: 'Word Processor', permissions: ['rwx-'], extension: 'shct', metadata: { icon: 'wordlogoXSmall.png' } },
    11: { name: 'Desktop', permissions: ['rwx-'], children: [10, 12, 13, 14, 15, 22, 23, 24, 25, 26, 27, 28] },
    12: { name: 'Spreadsheets', permissions: ['rwx-'], extension: 'shct', metadata: { icon: 'excellogoXSmall.png' } },
    13: { name: 'Webscape', permissions: ['rwx-'], extension: 'shct', metadata: { icon: 'ie7.png' } },
    14: { name: 'My Documents', permissions: ['rwx-'], children: [16], metadata: { icon: 'MyDocumentsXSmall.png' }, registryKey:'Folder' },
    15: { name: 'My Computer', permissions: ['rwx-'], children: [], metadata: { icon: 'MyComputerXSmall.png' } },
    16: { name: 'My Music', permissions: ['rwx-'], children: [], metadata: { icon: 'MyMusicXSmall.png' } },
    17: { name: 'Control Panel', permissions: ['rwx-'], children: [], metadata: { icon: 'ControlPanelXSmall.png' } },
    18: { name: 'Printer And Faxes', permissions: ['rwx-'], metadata: { icon: 'printerAndFaxesXSmall.png' } },
    19: { name: 'Help And Support', permissions: ['rwxp'], extension: 'exe', metadata: { icon: 'HelpAndSupportXSmall.png' } },
    20: { name: 'Search', permissions: ['rwxp'], extension: 'exe', metadata: { icon: 'SearchXSmall.png' } },
    21: { name: 'Run', permissions: ['rwxp'], extension: 'exe', metadata: { icon: 'RunXSmall.png' } },
    22: { name: 'test', permissions: ['rwx-'], extension: 'txt', metadata: { icon: 'RunXSmall.png' } },
    23: { name: 'my lil painting', permissions: ['rwx-'], extension: 'jpg', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '53px 42px' } },
    24: { name: 'Mailr', permissions: ['rwx-'], extension: 'txt', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '200px 210px' } },
    25: { name: 'some text', permissions: ['rwx-'], extension: 'txt', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '200px 100px' } },
    26: { name: 'anothjer image', permissions: ['rwx-'], extension: 'jpg', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '53px 42px' } },
    27: { name: 'printer settings', permissions: ['rwx-'], extension: 'txt', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '200px 50px' } },
    28: { name: 'some text(2)', permissions: ['rwx-'], extension: 'txt', metadata: { sprite: true, icon: 'iconsSprite.gif', backgroundPosition: '200px 100px' } },
    29: { name: 'Authenticator', permissions: ['rwxp'], extension: 'exe' },
  },
  desktopNodeIndex: 11, //indices are in state, and not searchable by name because user can make duplicate names
  userIndex: 4, // Users personal index. Username will be fileSystem[userIndex].name  . Default is "Guest"
  authenticatorIndex: 29,
  startMenuProgramsIndices: [5, 6, 7],
  userDirectoriesIndices: [14, 15, 16],
  computerSettingsIndices: [17, 18],
  utilityControlsIndices: [19, 20, 21],
  startMenuOpened: false,
  contextMenuX: 0,
  contextMenuY: 0,
  contextMenuClickClass: '',
  contextMenuIndexClicked: 0,
  contextMenuActive: false,
  selectedDesktopIcons: [], // Array of entity IDs todo: maybe rename this to selectedIcons if this can be used for both desktop and folder...
  openedFiles: [], // {entityId, height, width}
  openedFileDimensions: {},
  errorWindows: []
};
export default function layout(state = initialState, action) {
  const newOpenedFiles = [...state.openedFiles];
  const newOpenedFileDimensions = {...state.openedFileDimensions};
  const newErrorWindows = [...state.errorWindows];
  const newFileSystem = { ...state.fileSystem };
  switch (action.type) {
    case OPEN_START_MENU:
      return { ...state, startMenuOpened: true };
    case CLOSE_START_MENU:
      return { ...state, startMenuOpened: false };
    case CREATE_FOLDER:
      const nextNodeIndex = Object.keys(state.fileSystem).length + 1;
      newFileSystem[nextNodeIndex] = { children: [], name: 'New Folder', type: 'Folder', metadata: { icon: 'emptyFolderXSmall.png' } };
      if (action.location === 'desktop') {
        newFileSystem[action.desktopNodeIndex].children.push(nextNodeIndex);
      }
      return { ...state, fileSystem: newFileSystem, contextMenuActive: false };
    case OPEN_CONTEXT_MENU:
      return { ...state, contextMenuX: action.mouseX, contextMenuY: action.mouseY, contextMenuActive: true,
        contextMenuClickClass: action.clickclass, contextMenuIndexClicked: action.index };
    case SELECT_ICONS:
      return { ...state, selectedDesktopIcons: action.icons };
    case CLEAR_ACTIVES:
      return { ...state, contextMenuActive: false};
    case OPEN_FILE_WINDOW:
      newOpenedFileDimensions[action.nodeIndex] = { height: 300, width: 300,
        xPosition: ((action.desktopWidth / 2.4) + state.openedFiles.length * 5)
        ,yPosition: ((action.desktopHeight / 4) + state.openedFiles.length * 5), maximized: false, minimized: false };
      return { ...state, openedFiles: [...state.openedFiles, action.nodeIndex], openedFileDimensions: newOpenedFileDimensions };

    case OPEN_ERROR_WINDOW:
      return { ...state, errorWindows: [...state.errorWindows, { errorMessage: action.errorMessage, height: 150, width: 400,
        xPosition: (action.desktopWidth / 2.4), yPosition: (action.desktopHeight / 4) }] };
    case MOVE_FILE:
      // todo : move this util function (getParent) to a helpers file
      const originsParentIndex = Object.keys(state.fileSystem).find(key=> {
        if (state.fileSystem.hasOwnProperty(key)) {
          if (state.fileSystem[key].hasOwnProperty('children')) {
            return state.fileSystem[key].children.includes(action.fromNodeIndex);
          }
        }
      });
      const parentalIndex = newFileSystem[originsParentIndex].children.indexOf(parseInt(action.fromNodeIndex, 10));
      newFileSystem[originsParentIndex].children = [...newFileSystem[originsParentIndex].children.slice(0, parentalIndex),
        ...newFileSystem[originsParentIndex].children.slice(parentalIndex + 1)];
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
      return { ...state, openedFiles: [...state.openedFiles.slice(0, action.openedFileIndex),
            ...state.openedFiles.slice(action.openedFileIndex + 1)] };
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
          newOpenedFiles[parseInt(action.index, 10)].xPosition = action.deltaX;
          newOpenedFiles[parseInt(action.index, 10)].yPosition = action.deltaY;
        return { ...state, openedFiles: newOpenedFiles };
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
          newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(action.deltaY);
          newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
        }
        if (action.deltaY > 0 ) {
          if (!((action.resizeStartHeight - action.deltaY) < 200)) {
            newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(action.deltaY);
            newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
          }
        }
        if (action.deltaX < 0) {
          newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(action.deltaX);
          newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);

        }
        if (action.deltaX > 0 ) {
          if (!((action.resizeStartWidth - action.deltaX) < 200)) {
            newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(action.deltaX);
            newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
          }
        }
      }
      else if (action.resizeSideClicked === 'top') {
        if (action.deltaY < 0) {
          newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(action.deltaY);
          newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
        }
        if (action.deltaY > 0 ) {
          if (!((action.resizeStartHeight - action.deltaY) < 200)) {
            newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(action.deltaY);
            newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
          }
        }
      }
      else if (action.resizeSideClicked === 'right') {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + action.deltaX;
      }
      else if (action.resizeSideClicked === 'bottom') {
        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + action.deltaY;
      }
      else if (action.resizeSideClicked === 'left') {
        if (action.deltaX < 0) {
          newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(action.deltaX);
          newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);
        }
        if (action.deltaX > 0 ) {
          if (!((action.resizeStartHeight - action.deltaX) < 200)) {
            newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(action.deltaX);
            newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
          }
        }
      }

      else if (action.resizeSideClicked === 'topRight') {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + action.deltaX;
        if (action.deltaY < 0) {
          newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(action.deltaY);
          newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(action.deltaX);
        }
        if (action.deltaY > 0 ) {
          if (!((action.resizeStartHeight - action.deltaY) < 200)) {
            newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(action.deltaY);
            newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
          }
        }
      }

      else if (action.resizeSideClicked === 'bottomRight') {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + action.deltaX;
        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + action.deltaY;
      }

      else if (action.resizeSideClicked === 'bottomLeft') {

        newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + action.deltaY;

        if (action.deltaX < 0) {
          newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(action.deltaX);
          newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);

        }
        if (action.deltaX > 0 ) {
          if (!((action.resizeStartWidth - action.deltaX) < 200)) {
            newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(action.deltaX);
            newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
          }
        }
      }
      return { ...state, openedFiles: newOpenedFiles };
    case CLICK_TASKBAR_ITEM:
      const openedFileIndex = state.openedFiles.findIndex( element => {
        return element.entityId === action.index;
      });
      newOpenedFiles[openedFileIndex].minimized = !newOpenedFiles[openedFileIndex].minimized;
      return { ...state, openedFiles: newOpenedFiles };
    default:
      return state;
  }
}
