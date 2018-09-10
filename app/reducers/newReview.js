import properties from "../settings/propertyConfig";
import {
    ON_FETCH_REVIEWS_SUCCESS,
    ON_FETCH_PREVIOUS_SUCCESS,
    ON_CREATE_REVIEW_SUCCESS,
    ON_CREATE_REVIEW_INIT,
    ON_UPDATE_REVIEW_SUCCESS,
    ON_CREATE_REVIEW_UNAUTHENTICATED, ON_FETCH_PREVIOUS_REQUESTED,
} from "../actions/reviews";

import { deserialize } from "../deserializer/ReviewDeserializer";
import {ON_AUTH0_CANCELLED, ON_LOGIN_SUCCESS} from "../actions/account";

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
        hasLoaded: true,
        isSubmitting: false,
        showLoginScreen: false,
    },
    action
) => {
    let data = defaultState();
    let vurderingsType = "";
    let review = {};
    let propertyInputs = {};

    switch (action.type) {

        case ON_FETCH_PREVIOUS_REQUESTED:
            return { ...state, hasLoaded: false};

        case ON_FETCH_PREVIOUS_SUCCESS:
            action.payload.forEach(review => {
                if(review.vurderingsType) data[review.vurderingsType] = deserialize(review);
            });

            return { propertyInput: data, hasLoaded: true, isSubmitting: false, showLoginScreen: false };

        case ON_FETCH_REVIEWS_SUCCESS:

            for (let reviewId in action.payload) {
                const review = action.payload[reviewId];

                if(review.vurderingsType) data[review.vurderingsType] = deserialize(review);
            }

            return { propertyInput: data, hasLoaded: true, isSubmitting: false, showLoginScreen: false };

        case ON_CREATE_REVIEW_INIT:

            return { ...state, isSubmitting: true, showLoginScreen: false };

        case ON_CREATE_REVIEW_SUCCESS:
            vurderingsType = action.payload.vurderingsType;
            review = deserialize(action.payload);

            propertyInputs = {
                ...state.propertyInput,
            };

            propertyInputs[vurderingsType] = review;

            return { ...state, propertyInput: propertyInputs, isSubmitting: false, hasLoaded: true, showLoginScreen: false };

        case ON_UPDATE_REVIEW_SUCCESS:
            vurderingsType = action.payload.vurderingsType;
            review = deserialize(action.payload);
            propertyInputs = {
                ...state.propertyInput,
            };
            propertyInputs[vurderingsType] = review;
            
            return { ...state, propertyInput: propertyInputs, isSubmitting: false, hasLoaded: true, showLoginScreen: false };

        case ON_CREATE_REVIEW_UNAUTHENTICATED:
            return { ...state, showLoginScreen: true };

        case ON_LOGIN_SUCCESS:
            return { ...state, showLoginScreen: false };

        case ON_AUTH0_CANCELLED:
            return { ...state, showLoginScreen: false};

        default:
            return state;
    }
};

