import * as bookmarkAction from '../action/bookmarkAction';
import icon from '../../resources/img/logo512.png';
import { bookmarks, folders } from '../../resources/data';

const initState = {
  keyword: '',
  currentId: 12,
  bookmarks: bookmarks,
  folders: folders,

  selectFolderPath: [0],
  selectFolderDepth: 1,
  prevSelectFolderPath: [0],
  prevSelectFolderDepth: 1,

  openFolderPath: [0],
  openFolderDepth: 1,
};

const bookmarkReducer = (state = initState, action) => {
  const folders = state.folders;

  let selectFolderDepth = state.selectFolderDepth;
  let selectFolderPath = state.selectFolderPath;
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
      let folderOne = folders;

      for (let i = 0; i < action.depth; i++) {
        if (folderOne[action.path[i]].subFolder) {
          folderOne = folderOne[action.path[i]].subFolder;
        } else {
          folderOne[action.path[i]].subFolder = [];
          folderOne = folderOne[action.path[i]].subFolder;
        }
      }

      folderOne.push({
        id: action.id,
        depth: action.depth,
        type: 'bookmark',
        title: action.title,
        url: action.url,
        icon: icon,
      });
      return {
        ...state,
      };
    case bookmarkAction.BOOKMARK_EDIT_ITEM:
      let folderTwo = folders;

      for (let i = 0; i < action.depth; i++) {
        folderTwo = folderTwo[action.path[i]].subFolder;
      }

      folderTwo.forEach((folderTwoo) =>
        folderTwoo.id === action.id
          ? ((folderTwoo.title = action.title), (folderTwoo.url = action.url))
          : folderTwoo
      );

      return {
        ...state,
      };
    case bookmarkAction.BOOKMARK_DELETE_ITEM:
      let folderThree = folders;

      for (let i = 0; i < action.depth; i++) {
        folderThree = folderThree[action.path[i]].subFolder;
      }

      folderThree.splice(action.index, 1);

      return {
        ...state,
      };
    case bookmarkAction.BOOKMARK_RESTORE_ITEM:
      let folerFour = folders;

      for (let i = 0; i < action.depth; i++) {
        folerFour = folerFour[action.path[i]].subFolder;
      }

      folerFour.splice(action.index, 0, action.item);
      return {
        ...state,
      };
    case bookmarkAction.BOOKMARK_UPDATE_ITEM:
      let folderFive = folders;

      for (let i = 0; i < action.depth; i++) {
        folderFive = folderFive[action.path[i]].subFolder;
      }

      folderFive.splice(action.dragIndex, 1);
      folderFive.splice(action.hoverIndex, 0, action.dragBookmark);
      return {
        ...state,
      };
    case bookmarkAction.BOOKMARK_SET_SELECT_FOLDER:
      let selectFolder = folders;
      let prevSelectFolder = folders;

      selectFolder = selectFolder[0];
      prevSelectFolder = prevSelectFolder[0];

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
      };
    case bookmarkAction.BOOKMARK_SET_SELECT_FOLDER_DEPTH:
      return {
        ...state,
        selectFolderDepth: action.selectFolderDepth,
      };
    case bookmarkAction.BOOKMARK_SET_SELECT_FOLDER_PATH:
      shallowCopySelectFolderPath.unshift(action.selectFolderIndex);
      return {
        ...state,
        selectFolderPath: shallowCopySelectFolderPath,
      };
    case bookmarkAction.BOOKMARK_RESET_SELECT_FOLDER_PATH:
      selectFolderPath.splice(0);
      return {
        ...state,
        prevSelectFolderDepth: selectFolderDepth,
        selectFolderPath: selectFolderPath,
        prevSelectFolderPath: shallowCopySelectFolderPath,
      };
    case bookmarkAction.BOOKMARK_SET_OPEN_FOLDER:
      let openFolder = folders;

      openFolder = openFolder[0];

      for (let i = 1; i < openFolderDepth; i++) {
        openFolder = openFolder.subFolder[openFolderPath[i]];
      }

      openFolder.isOpened = !openFolder.isOpened;

      if (!openFolder.isOpened) {
        if (
          openFolderPath[openFolderDepth - 1] ===
          selectFolderPath[openFolderDepth - 1]
        ) {
          let selectFolder = folders;
          let prevSelectFolder = folders;

          selectFolder = selectFolder[0];
          prevSelectFolder = prevSelectFolder[0];

          for (let i = 1; i < selectFolderDepth; i++) {
            prevSelectFolder = prevSelectFolder.subFolder[selectFolderPath[i]];
          }

          prevSelectFolder.isSelected = false;

          for (let i = 1; i < openFolderDepth; i++) {
            selectFolder = selectFolder.subFolder[openFolderPath[i]];
          }

          selectFolder.isSelected = true;

          selectFolderDepth = openFolderDepth; // const -> let selectFolderDepth
          selectFolderPath = openFolderPath; // const -> let selectFolderPath
        }
      }
      return {
        ...state,
        selectFolderDepth: selectFolderDepth,
        selectFolderPath: selectFolderPath,
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
