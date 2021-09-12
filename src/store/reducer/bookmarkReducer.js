import * as bookmarkAction from '../action/bookmarkAction';
import icon from '../../resources/img/logo512.png';
import { bookmarks, folders } from '../../resources/data';

const initState = {
  keyword: '',
  currentId: bookmarks[bookmarks.length - 1].id,
  bookmarks: bookmarks,
  folders: folders,
  currentRoute: [0],
  currentDepth: 1,
  prevRoute: [0],
  prevDepth: 1,
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
    case bookmarkAction.BOOKMARK_UPDATE_CURRENT_ROUTE:
      return {
        ...state,
        currentRoute: state.currentRoute.concat(action.currentIndex),
      };
    case bookmarkAction.BOOKMARK_UPDATE_CURRENT_DEPTH:
      return {
        ...state,
        currentDepth: action.currentDepth,
      };
    case bookmarkAction.BOOKMARK_RESET_CURRENT_ROUTE:
      const resetBookmarks = state.currentRoute;

      resetBookmarks.splice(0);
      return {
        ...state,
        prevDepth: state.currentDepth,
        currentRoute: resetBookmarks,
      };
    case bookmarkAction.BOOKMARK_SET_FOLDER_SELECTED:
      const currentDepth = state.currentDepth;
      const prevDepth = state.prevDepth;

      let folders = state.folders;

      let prevFolder = folders;
      let testFolder = folders;

      const currentRoute = state.currentRoute.slice();
      const prevRoute = state.prevRoute;

      prevFolder = prevFolder[0];
      for (let i = prevDepth - 1; i > 0; i--) {
        prevFolder = prevFolder.subFolder[prevRoute[i - 1]];
      }

      prevFolder.selected = false;

      testFolder = testFolder[0];
      for (let i = currentDepth - 1; i > 0; i--) {
        testFolder = testFolder.subFolder[currentRoute[i - 1]];
      }

      testFolder.selected = true;
      return {
        ...state,
        prevRoute: currentRoute,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
