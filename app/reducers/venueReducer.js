import { VENUE_SELECTED } from "../actions";

export default (state = { selectedVenue: undefined }, action) => {
  switch (action.type) {
    case VENUE_SELECTED:
      return action.payload;
    default:
      return { ...state };
  }
};
