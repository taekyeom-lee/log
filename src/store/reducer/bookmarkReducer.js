import * as bookmarkAction from '../action/bookmarkAction';

const initState = {
  keyword: '',
};

const bookmarkReducer = (state = initState, action) => {
  switch (action.type) {
    case bookmarkAction.SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
