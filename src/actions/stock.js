import { LOAD_STOCKS } from '../constants';

export function setRuntimeVariable() {
  return {
    type: LOAD_STOCKS,
  };
}
