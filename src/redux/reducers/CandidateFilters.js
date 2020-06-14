import {
  SET_CATEGORY,
  SET_CITY,
  RESET_STORE,
  RESET_CATEGORY,
  RESET_CITY,
} from '../actions/ActionTypes';

export function city(state = {}, action) {
  switch (action.type) {
    case SET_CITY:
      return action.payload;
    case RESET_CITY:
    case RESET_STORE:
      return {};
    default:
      return state;
  }
}

export function category(state = {}, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return action.payload;
    case RESET_CATEGORY:
    case RESET_STORE:
      return {};
    default:
      return state;
  }
}
