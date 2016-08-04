import {OPEN_START_MENU, CLOSE_START_MENU, CREATE_FOLDER, OPEN_CONTEXT_MENU, SELECT_ICONS} from '../constants';


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
  startMenuOpened: false
};
export default function layout(state = initialState, action) {

  switch (action.type) {
    case OPEN_START_MENU:
      return {...state, startMenuOpened: true};
    case CLOSE_START_MENU:
      return {...state, startMenuOpened: false};
    case CREATE_FOLDER:
      return {...state};
    case OPEN_CONTEXT_MENU:
      return {...state, contextMenuX: action.mouseX, contextMenuY: action.mouseY};
    case SELECT_ICONS:
      return {...state, icons: action.icons};
    default:
      return state;
  }
}
