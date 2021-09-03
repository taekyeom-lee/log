import * as bookmarkAction from '../action/bookmarkAction';
import icon from '../../resources/img/logo512.png';
import { bookmarks } from '../../resources/data';

const initState = {
  keyword: '',
  currentId: bookmarks[bookmarks.length - 1].id,
  bookmarks: bookmarks,
};

const bookmarkReducer = (state = initState, action) => {
  switch (action.type) {
    case bookmarkAction.BOOKMARK_SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case bookmarkAction.BOOKMARK_SET_ID:
      return {
        ...state,
        currentId: action.currentId,
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
    case bookmarkAction.BOOKMARK_UPDATE_ITEM:
      const updateBookmarks = state.bookmarks;
      updateBookmarks.splice(action.dragIndex, 1);
      updateBookmarks.splice(action.hoverIndex, 0, action.dragBookmark);
      return {
        ...state,
        bookmarks: updateBookmarks,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
