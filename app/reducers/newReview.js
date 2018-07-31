import properties from "../settings/propertyConfig";
import { FETCH_PREVIOUS_SUCCESS, VENUE_SELECTED } from "../actions";

const defaultState = () =>
  properties.reduce((obj, property) => {
    obj[property.name] = {
      comment: "",
      value: undefined
    };
    return obj;
  }, {});

export default (
  state = { propertyInput: defaultState, hasLoaded: false },
  action
) => {
  switch (action.type) {
    case VENUE_SELECTED:
      return { propertyInput: defaultState(), hasLoaded: false };
    case FETCH_PREVIOUS_SUCCESS:
      const data = defaultState();
      for (reviewId in action.payload) {
        const review = action.payload[reviewId];
        data[review.type.replace("vurdering", "")] = {
          comment: review.kommentar,
          value: review.rangering
        };
      }
      return { propertyInput: data, hasLoaded: true };
    default:
      return state;
  }
};
