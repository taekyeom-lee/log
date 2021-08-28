import * as bookmarksActions from '../actions/bookmarksActions';

const initState = {
  keyword: '',
};

const bookmarksReducer = (state = initState, action) => {
  switch (action.type) {
    case bookmarksActions.SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    default:
      return state;
  }
};

export default bookmarksReducer;
