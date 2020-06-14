import * as types from './ActionTypes';

export function setConnectivityState(value) {
  return {type: types.SET_CONNECTIVITY_STATE, payload: value};
}
