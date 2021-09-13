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




  selectFolderPath: [0],
  selectFolderDepth: 1,
  prevSelectFolderPath: [0],
  prevSelectFolderDepth: 1,

  openFolderPath: [0],
  openFolderDepth: 1,
};

const bookmarkReducer = (state = initState, action) => {
  
  const folders = state.folders;
  const selectFolderDepth = state.selectFolderDepth;
  const selectFolderPath = state.selectFolderPath;
  const shallowCopySelectFolderPath = state.selectFolderPath.slice(0);
  const prevSelectFolderDepth = state.prevSelectFolderDepth;
  const prevSelectFolderPath = state.prevSelectFolderPath;


  const openFolderDepth = state.openFolderDepth;
  const openFolderPath = state.openFolderPath;
  const shallowCopyOpenFolderPath = state.openFolderPath.slice(0);
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
    case bookmarkAction.BOOKMARK_SET_SELECT_FOLDER:
      console.log(selectFolderPath)
      console.log(selectFolderDepth)
      console.log(prevSelectFolderPath)
      console.log(prevSelectFolderDepth)

      let selectFolder = folders;
      let prevSelectFolder = folders;

      prevSelectFolder = selectFolder[0];
      selectFolder = selectFolder[0];

      for (let i = 1; i < prevSelectFolderDepth; i++) {
        prevSelectFolder = prevSelectFolder.subFolder[prevSelectFolderPath[i]];
      }

      prevSelectFolder.isSelected = false;      

      for (let i = 1; i < selectFolderDepth; i++) {
        selectFolder = selectFolder.subFolder[selectFolderPath[i]];
      }

      selectFolder.isSelected = true;

      return {
        ...state,

      }
    case bookmarkAction.BOOKMARK_SET_SELECT_FOLDER_DEPTH:
      return {
        ...state,
        selectFolderDepth: action.selectFolderDepth
      }
    case bookmarkAction.BOOKMARK_SET_SELECT_FOLDER_PATH:
      shallowCopySelectFolderPath.unshift(action.selectFolderIndex);
      return {
        ...state,
        selectFolderPath: shallowCopySelectFolderPath
      }    
    case bookmarkAction.BOOKMARK_RESET_SELECT_FOLDER_PATH:
      selectFolderPath.splice(0);
      return {
        ...state,
        prevSelectFolderDepth: selectFolderDepth,
        selectFolderPath: selectFolderPath,
        prevSelectFolderPath: shallowCopySelectFolderPath,
      }
    case bookmarkAction.BOOKMARK_SET_OPEN_FOLDER:
      let openFolder = folders;

      openFolder = openFolder[0]; 

      for (let i = 1; i < openFolderDepth; i++) {
        openFolder = openFolder.subFolder[openFolderPath[i]];
      }

      openFolder.isOpened = !openFolder.isOpened
      return {
        ...state,
      };
    case bookmarkAction.BOOKMARK_SET_OPEN_FOLDER_DEPTH:
      return {
        ...state,
        openFolderDepth: action.openFolderDepth,
      };
    case bookmarkAction.BOOKMARK_SET_OPEN_FOLDER_PATH:      
      shallowCopyOpenFolderPath.unshift(action.openFolderIndex);
      return {
        ...state,
        openFolderPath: shallowCopyOpenFolderPath,
      };    
    case bookmarkAction.BOOKMARK_RESET_OPEN_FOLDER_PATH:
      shallowCopyOpenFolderPath.splice(0);
      return {
        ...state,
        openFolderPath: shallowCopyOpenFolderPath,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
