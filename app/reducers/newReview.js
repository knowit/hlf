import properties from "../settings/propertyConfig";
import {
    ON_FETCH_REVIEWS_SUCCESS,
    ON_FETCH_PREVIOUS_SUCCESS,
    ON_CREATE_REVIEW_SUCCESS,
    ON_CREATE_REVIEW_INIT, ON_UPDATE_REVIEW_SUCCESS
} from "../actions/reviews";

import { deserialize } from "../deserializer/ReviewDeserializer";

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
    let vurderingsType = "";
    let review = {};
    let propertyInputs = {};

    switch (action.type) {

        case ON_FETCH_PREVIOUS_SUCCESS:
            action.payload.forEach(review => {
                if(review.vurderingsType) data[review.vurderingsType] = deserialize(review);
            });

            return { propertyInput: data, hasLoaded: true, isSubmitting: false };

        case ON_FETCH_REVIEWS_SUCCESS:

            for (let reviewId in action.payload) {
                const review = action.payload[reviewId];

                if(review.vurderingsType) data[review.vurderingsType] = deserialize(review);
            }

            return { propertyInput: data, hasLoaded: true, isSubmitting: false };

        case ON_CREATE_REVIEW_INIT:

            return { ...state, isSubmitting: true };

        case ON_CREATE_REVIEW_SUCCESS:
            vurderingsType = action.payload.vurderingsType;
            review = deserialize(action.payload);

            propertyInputs = {
                ...state.propertyInput,
            };

            propertyInputs[vurderingsType] = review;

            return { ...state, propertyInput: propertyInputs, isSubmitting: false, hasLoaded: true };

        case ON_UPDATE_REVIEW_SUCCESS:
            vurderingsType = action.payload.vurderingsType;
            review = deserialize(action.payload);
            propertyInputs = {
                ...state.propertyInput,
            };
            propertyInputs[vurderingsType] = review;
            
            return { ...state, propertyInput: propertyInputs, isSubmitting: false, hasLoaded: true };

        default:
            return state;
    }
};

