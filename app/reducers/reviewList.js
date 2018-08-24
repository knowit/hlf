import {
    ON_FETCH_REVIEWS_INIT,
    ON_FETCH_REVIEWS_SUCCESS
} from "../actions/reviews";

export default (
    state = {
        reviewsList: [],
        hasLoaded: false,
        isLoading: false,
    },
    action
) => {
    switch (action.type) {

        case ON_FETCH_REVIEWS_INIT:

            return { reviewsList: [], hasLoaded: false, isLoading: true };

        case ON_FETCH_REVIEWS_SUCCESS:

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
