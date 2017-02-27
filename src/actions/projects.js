import {
  SELECT_FILTER
} from '../constants';

export function selectFilter(filter) {
  return dispatch => {
    dispatch({ type: SELECT_FILTER, filter });
  };
}