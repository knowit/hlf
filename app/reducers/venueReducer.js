import { ON_VENUE_SELECTED, ON_VENUE_DESELECTED } from "../actions/venue";

export default (state = null, action) => {
  switch (action.type) {

    case ON_VENUE_SELECTED:
      return action.payload;

    case ON_VENUE_DESELECTED:
      return null;

    default:
      return state;
  }
};
