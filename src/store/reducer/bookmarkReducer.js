import * as bookmarkAction from '../action/bookmarkAction';
import icon from '../../img/logo512.png';
import { bookmarks } from '../../data';

const initState = {
  keyword: '',
  bookmarks: bookmarks,
};

const bookmarkReducer = (state = initState, action) => {
  switch (action.type) {
    case bookmarkAction.SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case bookmarkAction.BOOKMARK_SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case bookmarkAction.BOOKMARK_ADD_ITEM:
      return {
        ...state,
        bookmarks: state.bookmarks.concat({
          id: action.id,
          title: action.title,
          url: action.url,
          icon: icon,
        }),
      };
    case bookmarkAction.BOOKMARK_EDIT_ITEM:
      return {
        ...state,
        bookmarks: state.bookmarks.map((bookmark) =>
          bookmark.id === action.id
            ? { ...bookmark, title: action.title, url: action.url }
            : bookmark
        ),
      };
    case bookmarkAction.BOOKMARK_DELETE_ITEM:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(
          (bookmark) => bookmark.id !== action.id
        ),
      };
    case bookmarkAction.BOOKMARK_RESTORE_ITEM:
      const newBookmarks = state.bookmarks;
      newBookmarks.splice(action.index, 0, action.item);
      return {
        ...state,
        bookmarks: newBookmarks,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
