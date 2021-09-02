export const BOOKMARK_SET_KEYWORD = 'BOOKMARK_SET_KEYWORD';
export const BOOKMARK_ADD_ITEM = 'BOOKMARK_ADD_ITEM';
export const BOOKMARK_DELETE_ITEM = 'BOOKMARK_DELETE_ITEM';
export const BOOKMARK_EDIT_ITEM = 'BOOKMARK_EDIT_ITEM';
export const BOOKMARK_RESTORE_ITEM = 'BOOKMARK_RESTORE_ITEM';

export const setKeyword = (keyword) => {
  return {
    type: BOOKMARK_SET_KEYWORD,
    keyword,
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
