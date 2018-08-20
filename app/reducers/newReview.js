import properties from "../settings/propertyConfig";
import {
    FETCH_REVIEWS_SUCCESS,
    FETCH_PREVIOUS_SUCCESS,
    VENUE_SELECTED,
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_INIT
} from "../actions/actionTypes";

const defaultState = () =>
    properties.reduce((obj, property) => {
        obj[property.name] = {
            comment: "",
            value: undefined
        };
        return obj;
    }, {});

export default (
    state = {
        propertyInput: defaultState,
        hasLoaded: false,
        isSubmitting: false
    },
    action
) => {
    const data = defaultState();

    switch (action.type) {

        case VENUE_SELECTED:
            return {
                propertyInput: defaultState(),
                hasLoaded: false,
                isSubmitting: false
            };

        case FETCH_PREVIOUS_SUCCESS:
            for (let reviewId in action.payload) {
                const review = action.payload[reviewId];

                if(review.type) data[review.type.review.type.replace("vurdering", "")] = {
                    comment: review.kommentar,
                    value: review.rangering
                };
            }
            return { propertyInput: data, hasLoaded: true, isSubmitting: false };

        case FETCH_REVIEWS_SUCCESS:
            for (let reviewId in action.payload) {
                const review = action.payload[reviewId];

                if(review.type) data[review.type.review.type.replace("vurdering", "")] = {
                    comment: review.kommentar,
                    value: review.rangering
                };
            }
            return { propertyInput: data, hasLoaded: true, isSubmitting: false };

        case CREATE_REVIEW_INIT:
            return { ...state, isSubmitting: true };

        case CREATE_REVIEW_SUCCESS:
            console.log("CREATE_REVIEW_SUCCESS - action.payload: ", action.payload);
            const { kommentar, rangering, type } = action.payload;
            const nextState = { comment: kommentar, value: rangering };
            const propertyInputs = {
                ...state.propertyInput,
                [type.replace("vurdering", "")]: nextState
            };

            return { ...state, propertyInput: propertyInputs, isSubmitting: false, hasLoaded: true };

        default:
            return state;
    }
};
