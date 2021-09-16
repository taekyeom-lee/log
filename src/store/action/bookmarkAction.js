export const BOOKMARK_SET_KEYWORD = 'BOOKMARK_SET_KEYWORD';
export const BOOKMARK_SET_ID = 'BOOKMARK_SET_ID';
export const BOOKMARK_ADD_ITEM = 'BOOKMARK_ADD_ITEM';
export const BOOKMARK_DELETE_ITEM = 'BOOKMARK_DELETE_ITEM';
export const BOOKMARK_EDIT_ITEM = 'BOOKMARK_EDIT_ITEM';
export const BOOKMARK_RESTORE_ITEM = 'BOOKMARK_RESTORE_ITEM';
export const BOOKMARK_UPDATE_ITEM = 'BOOKMARK_UPDATE_ITEM';

// SelectFolder
export const BOOKMARK_SET_SELECT_FOLDER = 'BOOKMARK_SET_SELECT_FOLDER';
export const BOOKMARK_SET_SELECT_FOLDER_DEPTH =
  'BOOKMARK_SET_SELECT_FOLDER_DEPTH';
export const BOOKMARK_SET_SELECT_FOLDER_PATH =
  'BOOKMARK_SET_SELECT_FOLDER_PATH';
export const BOOKMARK_RESET_SELECT_FOLDER_PATH =
  'BOOKMARK_RESET_SELECT_FOLDER_PATH';

// OpenFolder
export const BOOKMARK_SET_OPEN_FOLDER = 'BOOKMARK_SET_OPEN_FOLDER';
export const BOOKMARK_SET_OPEN_FOLDER_DEPTH = 'BOOKMARK_SET_OPEN_FOLDER_DEPTH';
export const BOOKMARK_SET_OPEN_FOLDER_PATH = 'BOOKMARK_SET_OPEN_FOLDER_PATH';
export const BOOKMARK_RESET_OPEN_FOLDER_PATH =
  'BOOKMARK_RESET_OPEN_FOLDER_PATH';

export const setKeyword = (keyword) => {
  return {
    type: BOOKMARK_SET_KEYWORD,
    keyword,
  };
};

export const setId = (currentId) => {
  return {
    type: BOOKMARK_SET_ID,
    currentId,
  };
};

export const addItem = (id, path, depth, title, url) => {
  return {
    type: BOOKMARK_ADD_ITEM,
    id,
    path,
    depth,
    title,
    url,
  };
};

export const editItem = (id, path, depth, title, url) => {
  return {
    type: BOOKMARK_EDIT_ITEM,
    id,
    path,
    depth,
    title,
    url,
  };
};

export const deleteItem = (path, depth, index) => {
  return {
    type: BOOKMARK_DELETE_ITEM,
    path,
    depth,
    index,
  };
};

export const restoreItem = (path, depth, index, item) => {
  return {
    type: BOOKMARK_RESTORE_ITEM,
    path,
    depth,
    index,
    item,
  };
};

export const updateItem = (path, depth, dragIndex, hoverIndex, dragBookmark) => {
  return {
    type: BOOKMARK_UPDATE_ITEM,
    path,
    depth,
    dragIndex,
    hoverIndex,
    dragBookmark,
  };
};

// SelectFolder
export const setSelectFolder = () => {
  return {
    type: BOOKMARK_SET_SELECT_FOLDER,
  };
};

export const setSelectFolderDepth = (selectFolderDepth) => {
  return {
    type: BOOKMARK_SET_SELECT_FOLDER_DEPTH,
    selectFolderDepth,
  };
};

export const setSelectFolderPath = (selectFolderIndex) => {
  return {
    type: BOOKMARK_SET_SELECT_FOLDER_PATH,
    selectFolderIndex,
  };
};

export const resetSelectFolderPath = () => {
  return {
    type: BOOKMARK_RESET_SELECT_FOLDER_PATH,
  };
};

// OpenFolder
export const setOpenFolder = () => {
  return {
    type: BOOKMARK_SET_OPEN_FOLDER,
  };
};

export const setOpenFolderDepth = (openFolderDepth) => {
  return {
    type: BOOKMARK_SET_OPEN_FOLDER_DEPTH,
    openFolderDepth,
  };
};

export const setOpenFolderPath = (openFolderIndex) => {
  return {
    type: BOOKMARK_SET_OPEN_FOLDER_PATH,
    openFolderIndex,
  };
};

export const resetOpenFolderPath = () => {
  return {
    type: BOOKMARK_RESET_OPEN_FOLDER_PATH,
  };
};
