import { combineReducers } from 'redux';
import bookmarksReducer from './reducers/bookmarksReducer';

export default combineReducers({
  bookmarks: bookmarksReducer,
});
