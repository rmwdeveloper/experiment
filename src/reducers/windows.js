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
  DRAG_FILE_WINDOW
} from '../constants';


const initialState = {
  entities: {
    1: {
      name: 'Microsoft Word',
      subtext: 'Word Processor',
      icon: 'wordlogoXSmall.png'
    },
    2: {
      name: 'Microsoft Excel',
      subtext: 'Spreadsheet',
      icon: 'excellogoXSmall.png'
    },
    3: {
      name: 'Internet Explorer',
      subtext: 'Internet',
      icon: 'ie7.png'
    },
    4: {
      name: 'My Documents',
      icon: 'MyDocumentsXSmall.png'
    },
    5: {
      name: 'My Music',
      icon: 'MyMusicXSmall.png'
    },
    6: {
      name: 'My Computer',
      icon: 'MyComputerXSmall.png'
    },
    7: {
      name: 'Control Panel',
      icon: 'ControlPanelXSmall.png'
    },
    8: {
      name: 'Printer And Faxes',
      icon: 'printerAndFaxesXsmall.png'
    },
    9: {
      name: 'Help And Support',
      icon: 'HelpAndSupportXSmall.png'
    },
    10: {
      name: 'Search',
      icon: 'SearchXSmall.png'
    },
    11: {
      name: 'Run',
      icon: 'RunXSmall.png'
    }
  },
  installedPrograms: [1, 2, 3],
  userDirectories: [4, 5, 6],
  computerSettings: [7, 8],
  utilityControls: [9, 10, 11],
  desktopItems: [1, 2, 3, 4, 6],
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
      console.log(state.openedFiles.length);
      return { ...state, openedFiles: [...state.openedFiles,
        { entityId: action.entityId, height: 300, width: 300, xPosition: ((action.desktopWidth / 2.4) + state.openedFiles.length * 5)
      , yPosition: ((action.desktopHeight / 4) + state.openedFiles.length * 5), maximized: false, minimizedToTaskbar: false }] };
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
      newOpenedFiles[action.openedFileIndex].minimizedToTaskbar = true;
      return { ...state, openedFiles: newOpenedFiles };
    case UNMINIMIZE_FILE_WINDOW:
      newOpenedFiles[action.openedFileIndex].minimizedToTaskbar = false;
      return { ...state, openedFiles: newOpenedFiles };
    case DRAG_FILE_WINDOW:
      // console.log(action.xDirection, action.yDirection);
      console.log(newOpenedFiles[parseInt(action.index, 10)].xPosition, action.deltaX);
      console.log(newOpenedFiles[parseInt(action.index, 10)].yPosition, action.deltaY);
      // return state;
      newOpenedFiles[parseInt(action.index, 10)].xPosition = (Math.abs(action.deltaX - 100));
      newOpenedFiles[parseInt(action.index, 10)].yPosition = (Math.abs(action.deltaY - 100));
      return { ...state, openedFiles: newOpenedFiles};
    default:
      return state;
  }
}
