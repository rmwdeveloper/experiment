import {OPEN_START_MENU, CLOSE_START_MENU} from '../constants';


const initialState = {
  installedPrograms: {
    'Microsoft Word': {
      subtext: 'Word Processor',
      icon: 'wordlogo.png'
    },
    'Microsoft Excel': {
      subtext: 'Spreadsheet',
      icon: 'excellogo.png'
    },
    'Internet Explorer': {
      subtext: 'Internet',
      icon: 'ie7.png'
    },
  },
  userDirectories: {
    'My Documents': {
      icon: 'MyDocumentsXSmall.png'
    },
    'My Music': {
      icon: 'MyMusicXSmall.png'
    },
    'My Computer': {
      icon: 'MyComputerXSmall.png'
    }
  },
  utilityControls: {
    'Help And Support': {
      icon: 'HelpAndSupportXSmall.png',
    },
    'Search': {
      icon: 'SearchXSmall.png',
    },'Run': {
      icon: 'RunXSmall.png',
    }

  }
  startMenuOpened: false
};
export default function layout(state = initialState, action) {

  switch (action.type) {
    case OPEN_START_MENU:
      return {...state, startMenuOpened: true};
    case CLOSE_START_MENU:
      return {...state, startMenuOpened: false};
    default:
      return state;
  }
}
