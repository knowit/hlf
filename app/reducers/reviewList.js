import {
    FETCH_REVIEWS_INIT,
    FETCH_REVIEWS_SUCCESS
} from "../actions/actionTypes";

export default (
    state = {
        reviewsList: [],
        hasLoaded: false,
        isLoading: false,
    },
    action
) => {
    switch (action.type) {
        case FETCH_REVIEWS_INIT:
            return { reviewsList: [], hasLoaded: false, isLoading: true };
        case FETCH_REVIEWS_SUCCESS:
            return {
                reviewsList: action.payload.map(item => {
                    const element = { ...item };
                    element.key = element.dato + "-" + element.registrator.id;
                    return element;
                }),
                hasLoaded: true,
                isLoading: false
            };
        default:
            return state;
    }
};
