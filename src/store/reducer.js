import { combineReducers } from 'redux';
import bookmarkReducer from './reducer/bookmarkReducer';

export default combineReducers({
  bookmark: bookmarkReducer,
});
