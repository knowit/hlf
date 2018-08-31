import {
    ON_FETCH_PREVIOUS_REVIEWS_BY_USER_FAILED,
    ON_FETCH_PREVIOUS_REVIEWS_BY_USER_INIT,
    ON_FETCH_PREVIOUS_REVIEWS_BY_USER_SUCCESS,
    ON_HIDE_REVIEW_DELETION_MODAL,
    ON_SHOW_REVIEW_DELETION_MODAL,
} from "../actions/reviews";

export default (
    state = {
        reviews: [],
        hasLoaded: false,
        isLoading: false,
        count: 0,
        metadata: {
            first: true,
            last: false,
            number: 0,
            numberOfElements: -1,
            size: 5,
            totalElements: -1,
            totalPages: -1
        },
        showReviewDeletionModal: false,
        reviewToBeDeleted: null,
    },
    action
) => {
    switch (action.type) {

        case ON_FETCH_PREVIOUS_REVIEWS_BY_USER_INIT:
            console.log("inside userReviewList: ON_FETCH_PREVIOUS_REVIEWS_BY_USER_INIT");

            return {
                ...state,
                hasLoaded: false,
                isLoading: true,
            };

        case ON_FETCH_PREVIOUS_REVIEWS_BY_USER_SUCCESS:
            console.log("inside userReviewList: ON_FETCH_PREVIOUS_REVIEWS_BY_USER_SUCCESS: action.payload: ", action.payload);
            const metadata = action.payload.metaData;
            console.log("metadata: ", metadata);
            const reviews = [...state.reviews];

            action.payload.reviews.forEach(review => {
                let foundReview;
                if(foundReview = reviews.find(r => r.sted.id === review.sted.id)) {
                    foundReview.vurderinger.push({
                        dato: review.dato,
                        rangering: review.rangering,
                        vurderingsType: review.vurderingsType,
                        kommentar: review.kommentar
                    });
                } else {
                    reviews.push({
                        placeId: review.sted.placeId,
                        sted: review.sted,
                        registrator: review.registrator,
                        vurderinger: [
                            {
                                dato: review.dato,
                                rangering: review.rangering,
                                vurderingsType: review.vurderingsType,
                                kommentar: review.kommentar
                            }
                        ]
                    });
                }
            });

            console.log("updatedReviews: ", reviews);

            return {
                ...state,
                reviews: reviews,
                hasLoaded: true,
                isLoading: false,
                metadata: metadata,
            };

        case ON_FETCH_PREVIOUS_REVIEWS_BY_USER_FAILED:
            console.log("inside userReviewList: ON_FETCH_PREVIOUS_REVIEWS_BY_USER_FAILED");
            return {
                ...state,
                hasLoaded: false,
                isLoading: false,
            };

        case ON_SHOW_REVIEW_DELETION_MODAL:

            console.log("inside userReviewList: ON_SHOW_REVIEW_DELETION_MODAL - action: ", action);

            const id = action.payload;
            const reviewToBeDeleted = state.reviews.find(review => review.sted.id === id);

            console.log("reviewToBeDeleted: ", reviewToBeDeleted);

            return { ...state, showReviewDeletionModal: true, reviewToBeDeleted: reviewToBeDeleted };

        case ON_HIDE_REVIEW_DELETION_MODAL:
            return { ...state, showReviewDeletionModal: false, reviewToBeDeleted: null, };

        default:
            return state;
    }
};
