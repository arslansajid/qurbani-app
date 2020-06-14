import {SET_CONNECTIVITY_STATE} from '../actions/ActionTypes';

const initialState = {
  info: null,
  isConnected: -1, // -1: not-known; 0: not-connected; 1: connected and internet is reachable;
};

export function connectivityStateReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONNECTIVITY_STATE:
      const connectionStateInfo = action.payload;
      let isConnected = -1;
      if (connectionStateInfo != null) {
        if (connectionStateInfo.isConnected) {
          // connectionStateInfo.isInternetReachable can be one of undefined, null, or bool.
          if (connectionStateInfo.isInternetReachable === true) {
            isConnected = 1;
          } else if (connectionStateInfo.isInternetReachable === false) {
            isConnected = 0;
          }
        } else {
          isConnected = 0;
        }
      }
      const newConnectionState = {
        info: connectionStateInfo,
        isConnected: isConnected,
      };
      console.log(
        'ConnectivityStateReducer.connectivityStateReducer: ConnectionState: ' +
          JSON.stringify(newConnectionState),
      );
      return newConnectionState;
    default:
      return state;
  }
}
