import * as types from './ActionTypes';

export function userLogin(value) {
  return {type: types.USER_LOGIN, payload: value};
}

export function userLogout() {
  return {type: types.USER_LOGOUT};
}
