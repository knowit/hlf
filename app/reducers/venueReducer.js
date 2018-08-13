import { VENUE_SELECTED, VENUE_DESELECTED } from "../actionsOld";

export default (state = null, action) => {
  switch (action.type) {
    case VENUE_SELECTED:
      return action.payload;
    case VENUE_DESELECTED:
      return null;
    default:
      return state;
  }
};
