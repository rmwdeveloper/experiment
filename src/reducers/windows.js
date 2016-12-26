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
  CLICK_TASKBAR_ITEM,
  RESIZE_FILE_WINDOW,
  RESIZE_BROWSER_WINDOW,
  INITIALIZE_BROWSER_DIMENSIONS
} from '../constants';


const initialState = {
  browserWidth: 0,
  browserHeight: 0,
  fileSystem: {
    1: { name: 'System', children: [2], permissions: ['rwxp'] },
    2: { name: 'C:', children: [3, 9], permissions: ['rwxp'] },
    3: { name: 'Users', children: [4], permissions: ['rwxp'] },
    4: { name: 'Guest', children: [11], permissions: ['rwxp'] },
    5: { name: 'Word Processor', permissions: ['rwx-'], extension: 'exe', metaData: 1 },
    6: { name: 'Spreadsheets', permissions: ['rwx-'], extension: 'exe' },
    7: { name: 'Browser', permissions: ['rwx-'], extension: 'exe' },
    8: { name: 'Programs', children: [9], permissions: ['rwx-'] },
    9: { name: 'Office', children: [5, 6], permissions: ['rwx-'] },
    10: { name: 'Word Processor', permissions: ['rwx-'], extension: 'shct' },
    11: { name: 'Desktop', permissions: ['rwx-'], children: [10] },
    12: { name: 'My Documents', permissions: ['rwx-'], children: [] }
  },
  entities: {
    1: {
      name: 'Microsoft Word',
      subtext: 'Word Processor',
      icon: 'wordlogoXSmall.png',
      registryKey: 'Word'
    },
    2: {
      name: 'Microsoft Excel',
      subtext: 'Spreadsheet',
      icon: 'excellogoXSmall.png',
      registryKey: 'Folder'
    },
    3: {
      name: 'Internet Explorer',
      subtext: 'Internet',
      icon: 'ie7.png',
      registryKey: 'Folder'
    },
    4: {
      name: 'My Documents',
      icon: 'MyDocumentsXSmall.png',
      registryKey: 'Folder',
    },
    5: {
      name: 'My Music',
      icon: 'MyMusicXSmall.png',
      registryKey: 'Folder'
    },
    6: {
      name: 'My Computer',
      icon: 'MyComputerXSmall.png',
      registryKey: 'Folder'
    },
    7: {
      name: 'Control Panel',
      icon: 'ControlPanelXSmall.png',
      registryKey: 'Folder'
    },
    8: {
      name: 'Printer And Faxes',
      icon: 'printerAndFaxesXsmall.png',
      registryKey: 'Folder'
    },
    9: {
      name: 'Help And Support',
      icon: 'HelpAndSupportXSmall.png',
      registryKey: 'Folder'
    },
    10: {
      name: 'Search',
      icon: 'SearchXSmall.png',
      registryKey: 'Folder'
    },
    11: {
      name: 'Run',
      icon: 'RunXSmall.png',
      registryKey: 'Folder'
    },
    12: {
      name: 'My Pictures',
      icon: 'MyMusicXSmall.png',
      registryKey: 'Folder'
    }
  },
  // entities: {
  //   1: {
  //     name: 'Microsoft Word',
  //     subtext: 'Word Processor',
  //     icon: 'wordlogoXSmall.png',
  //     registryKey: 'Word'
  //   },
  //   2: {
  //     name: 'Microsoft Excel',
  //     subtext: 'Spreadsheet',
  //     icon: 'excellogoXSmall.png',
  //     registryKey: 'Folder'
  //   },
  //   3: {
  //     name: 'Internet Explorer',
  //     subtext: 'Internet',
  //     icon: 'ie7.png',
  //     registryKey: 'Folder'
  //   },
  //   4: {
  //     name: 'My Documents',
  //     icon: 'MyDocumentsXSmall.png',
  //     registryKey: 'Folder',
  //   },
  //   5: {
  //     name: 'My Music',
  //     icon: 'MyMusicXSmall.png',
  //     registryKey: 'Folder'
  //   },
  //   6: {
  //     name: 'My Computer',
  //     icon: 'MyComputerXSmall.png',
  //     registryKey: 'Folder'
  //   },
  //   7: {
  //     name: 'Control Panel',
  //     icon: 'ControlPanelXSmall.png',
  //     registryKey: 'Folder'
  //   },
  //   8: {
  //     name: 'Printer And Faxes',
  //     icon: 'printerAndFaxesXsmall.png',
  //     registryKey: 'Folder'
  //   },
  //   9: {
  //     name: 'Help And Support',
  //     icon: 'HelpAndSupportXSmall.png',
  //     registryKey: 'Folder'
  //   },
  //   10: {
  //     name: 'Search',
  //     icon: 'SearchXSmall.png',
  //     registryKey: 'Folder'
  //   },
  //   11: {
  //     name: 'Run',
  //     icon: 'RunXSmall.png',
  //     registryKey: 'Folder'
  //   },
  //   12: {
  //     name: 'My Pictures',
  //     icon: 'MyMusicXSmall.png',
  //     registryKey: 'Folder'
  //   }
  // },
  // installedPrograms: [1, 2, 3],
  // userDirectories: [4, 5, 6],
  // computerSettings: [7, 8],
  // utilityControls: [9, 10, 11],
  // desktopItems: [1, 2, 3, 4, 6],
  startMenuOpened: false,
  contextMenuX: 0,
  contextMenuY: 0,
  contextMenuActive: false,
  selectedDesktopIcons: [], // Array of entity IDs
  openedFiles: [], // {entityId, height, width}
};
export default function layout(state = initialState, action) {
  const newOpenedFiles = [...state.openedFiles];
  switch (action.type) {
    case OPEN_START_MENU:
      return { ...state, startMenuOpened: true };
    case CLOSE_START_MENU:
      return { ...state, startMenuOpened: false };
    case CREATE_FOLDER:
      const nextEntityId = Object.keys(state.entities).length + 1;
      const newEntities = { ...state.entities };
      newEntities[nextEntityId] = { name: 'New Folder', type: 'Folder', icon: 'emptyFolderXSmall.png' };
      return { ...state, entities: newEntities, desktopItems: [...state.desktopItems, nextEntityId], contextMenuActive: false };
    case OPEN_CONTEXT_MENU:
      return { ...state, contextMenuX: action.mouseX, contextMenuY: action.mouseY, contextMenuActive: true };
    case SELECT_ICONS:
      return { ...state, selectedDesktopIcons: action.icons };
    case CLEAR_ACTIVES:
      return { ...state, selectedDesktopIcons: [], contextMenuActive: false };
    case OPEN_FILE_WINDOW:
      return { ...state, openedFiles: [...state.openedFiles,
        { entityId: action.entityId, height: 300, width: 300, xPosition: ((action.desktopWidth / 2.4) + state.openedFiles.length * 5)
      , yPosition: ((action.desktopHeight / 4) + state.openedFiles.length * 5), maximized: false, minimized: false }] };
    case CLOSE_FILE_WINDOW:
      return { ...state, openedFiles: [...state.openedFiles.slice(0, action.openedFileIndex),
            ...state.openedFiles.slice(action.openedFileIndex + 1)] };
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
      newOpenedFiles[parseInt(action.index, 10)].xPosition = action.deltaX;
      newOpenedFiles[parseInt(action.index, 10)].yPosition = action.deltaY;
      return { ...state, openedFiles: newOpenedFiles };
    case RESIZE_BROWSER_WINDOW:
      return { ...state, browserWidth: action.browserWidth, browserHeight: action.browserHeight,
        desktopWidth: action.desktopWidth, desktopHeight: action.desktopHeight };
    case INITIALIZE_BROWSER_DIMENSIONS:
      return { ...state, browserWidth: action.browserWidth, browserHeight: action.browserHeight };
    case RESIZE_FILE_WINDOW: // todo: Needs refactor. Bulky and repetitive switch case.

      if (action.resizeSideClicked === 'topLeft') {
        if (action.deltaY < 0) {
          newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(action.deltaY);
          newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
        }
        if (action.deltaY > 0 ) {
          if (!((action.resizeStartHeight - action.deltaY) < 250)) {
            newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight - Math.abs(action.deltaY);
            newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop + Math.abs(action.deltaY);
          }
        }
        if (action.deltaX < 0) {
          newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + Math.abs(action.deltaX);
          newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft - Math.abs(action.deltaX);

        }
        if (action.deltaX > 0 ) {
          if (!((action.resizeStartWidth - action.deltaX) < 250)) {
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
          if (!((action.resizeStartHeight - action.deltaY) < 250)) {
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
          if (!((action.resizeStartHeight - action.deltaX) < 250)) {
            newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth - Math.abs(action.deltaX);
            newOpenedFiles[parseInt(action.index, 10)].xPosition = action.resizeStartLeft + Math.abs(action.deltaX);
          }
        }
      }

      else if (action.resizeSideClicked === 'topRight') {
        newOpenedFiles[parseInt(action.index, 10)].width = action.resizeStartWidth + action.deltaX;
        if (action.deltaY < 0) {
          newOpenedFiles[parseInt(action.index, 10)].height = action.resizeStartHeight + Math.abs(action.deltaY);
          newOpenedFiles[parseInt(action.index, 10)].yPosition = action.resizeStartTop - Math.abs(action.deltaY);
        }
        if (action.deltaY > 0 ) {
          if (!((action.resizeStartHeight - action.deltaY) < 250)) {
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
          if (!((action.resizeStartWidth - action.deltaX) < 250)) {
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
