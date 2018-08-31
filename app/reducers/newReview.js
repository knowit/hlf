import properties from "../settings/propertyConfig";
import {
    ON_FETCH_REVIEWS_SUCCESS,
    ON_FETCH_PREVIOUS_SUCCESS,
    ON_CREATE_REVIEW_SUCCESS,
    ON_CREATE_REVIEW_INIT
} from "../actions/reviews";

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

    let data = defaultState();

    switch (action.type) {

        case ON_FETCH_PREVIOUS_SUCCESS:
            console.log(action.payload);
            action.payload.forEach(review => {
                if(review.vurderingsType) {
                    data[review.vurderingsType] = {
                      comment: review.kommentar,
                      value: review.rangering,
                    };
                }
            });

            return { propertyInput: data, hasLoaded: true, isSubmitting: false };

        case ON_FETCH_REVIEWS_SUCCESS:

            for (let reviewId in action.payload) {
                const review = action.payload[reviewId];

                if(review.vurderingsType) data[review.vurderingsType] = {
                    comment: review.kommentar,
                    value: review.rangering
                };
            }

            return { propertyInput: data, hasLoaded: true, isSubmitting: false };

        case ON_CREATE_REVIEW_INIT:

            return { ...state, isSubmitting: true };

        case ON_CREATE_REVIEW_SUCCESS:

            console.log("action.payload: ", action.payload);

            const { kommentar, rangering, vurderingsType } = action.payload;

            const nextState = { comment: kommentar, value: rangering };

            const propertyInputs = {
                ...state.propertyInput,
            };

            propertyInputs[vurderingsType] = nextState;

            console.log("propertyInputs: ", propertyInputs);

            return { ...state, propertyInput: propertyInputs, isSubmitting: false, hasLoaded: true };

        default:
            return state;
    }
};
