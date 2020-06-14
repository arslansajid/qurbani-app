import {combineReducers} from 'redux';
import user from './UserReducer';
import {connectivityStateReducer as connectivityState} from './ConnectivityStateReducer';
import {category, city} from './CandidateFilters';

const rootReducer = combineReducers({
  category,
  city,
  user,
  connectivityState,
});

export default rootReducer;
