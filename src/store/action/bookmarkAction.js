export const BOOKMARK_SET_KEYWORD = 'BOOKMARK_SET_KEYWORD';
export const BOOKMARK_SET_ID = 'BOOKMARK_SET_ID';
export const BOOKMARK_ADD_ITEM = 'BOOKMARK_ADD_ITEM';
export const BOOKMARK_DELETE_ITEM = 'BOOKMARK_DELETE_ITEM';
export const BOOKMARK_EDIT_ITEM = 'BOOKMARK_EDIT_ITEM';
export const BOOKMARK_RESTORE_ITEM = 'BOOKMARK_RESTORE_ITEM';
export const BOOKMARK_UPDATE_ITEM = 'BOOKMARK_UPDATE_ITEM';

export const BOOKMARK_UPDATE_CURRENT_ROUTE = 'BOOKMARK_UPDATE_CURRENT_ROUTE';
export const BOOKMARK_UPDATE_CURRENT_DEPTH = 'BOOKMARK_UPDATE_CURRENT_DEPTH';
export const BOOKMARK_RESET_CURRENT_ROUTE = 'BOOKMARK_RESET_CURRENT_ROUTE';
export const BOOKMARK_SET_FOLDER_SELECTED = 'BOOKMARK_SET_FOLDER_SELECTED';

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

export const addItem = (id, title, url) => {
  return {
    type: BOOKMARK_ADD_ITEM,
    id,
    title,
    url,
  };
};

export const editItem = (id, title, url) => {
  return {
    type: BOOKMARK_EDIT_ITEM,
    id,
    title,
    url,
  };
};

export const deleteItem = (id) => {
  return {
    type: BOOKMARK_DELETE_ITEM,
    id,
  };
};

export const restoreItem = (index, item) => {
  return {
    type: BOOKMARK_RESTORE_ITEM,
    index,
    item,
  };
};

export const updateItem = (dragIndex, hoverIndex, dragBookmark) => {
  return {
    type: BOOKMARK_UPDATE_ITEM,
    dragIndex,
    hoverIndex,
    dragBookmark,
  };
};

export const updateCurrentRoute = (currentIndex) => {
  return {
    type: BOOKMARK_UPDATE_CURRENT_ROUTE,
    currentIndex,
  };
};

export const updateCurrentDepth = (currentDepth) => {
  return {
    type: BOOKMARK_UPDATE_CURRENT_DEPTH,
    currentDepth,
  };
};

export const resetCurrentRoute = () => {
  return {
    type: BOOKMARK_RESET_CURRENT_ROUTE,
  };
};

export const setFolderSelected = (selected) => {
  return {
    type: BOOKMARK_SET_FOLDER_SELECTED,
    selected,
  };
};
