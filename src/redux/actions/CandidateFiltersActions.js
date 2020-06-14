import * as types from './ActionTypes';

export function setCity(value) {
  return {type: types.SET_CITY, payload: value};
}

export function resetCity() {
  return {type: types.RESET_CITY};
}

export function setCategory(value) {
  return {type: types.SET_CATEGORY, payload: value};
}

export function resetCategory() {
  return {type: types.RESET_CATEGORY};
}
