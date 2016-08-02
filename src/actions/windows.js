import { OPEN_START_MENU, CLOSE_START_MENU} from '../constants';


export function toggleStartMenu() {
  return (dispatch, getState) => {
    const { windows: { startMenuOpened } } = getState();
    if(startMenuOpened) {
      dispatch({ type: CLOSE_START_MENU });
    } else {
      dispatch({ type:OPEN_START_MENU });
    }
  };
}

