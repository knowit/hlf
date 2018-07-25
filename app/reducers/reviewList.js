import {
  FETCH_REVIEWS_INIT,
  FETCH_REVIEWS_SUCCESS
} from "../actions/reviewListActions";

export default (
  state = { reviewsList: [], hasLoaded: false, isLoading: false },
  action
) => {
  switch (action.type) {
    case FETCH_REVIEWS_INIT:
      return { reviewsList: [], hasLoaded: false, isLoading: true };
    case FETCH_REVIEWS_SUCCESS:
      return { reviewsList: action.payload, hasLoaded: true, isLoading: false };
    default:
      return state;
  }
};
