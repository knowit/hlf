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
        hasMore: true,
        count: 0,
        pageable: {
            pageSize: 5,
            pageNumber: 0,
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
                reviews: state.reviews,
                hasLoaded: false,
                isLoading: true,
                hasMore: state.hasMore,
                count: state.count,
                pageable: {
                    pageSize: state.pageable.pageSize,
                    pageNumber: state.pageable.pageNumber
                },
                showReviewDeletionModal: false,
                reviewToBeDeleted: null,
            };

        case ON_FETCH_PREVIOUS_REVIEWS_BY_USER_SUCCESS:
            console.log("inside userReviewList: ON_FETCH_PREVIOUS_REVIEWS_BY_USER_SUCCESS: action.payload: ", action.payload);

            const updatedReviews = [...state.reviews, ...action.payload];
            const updatedPageNumber = state.pageable.pageNumber + 1;
            const hasMore = (action.payload.length >= state.pageable.pageSize);

            return {
                reviews: updatedReviews,
                hasLoaded: true,
                isLoading: false,
                hasMore: hasMore,
                count: updatedReviews.length,
                pageable: {
                    pageSize: state.pageable.pageSize,
                    pageNumber: updatedPageNumber
                },
                showReviewDeletionModal: false,
                reviewToBeDeleted: null,
            };

        case ON_FETCH_PREVIOUS_REVIEWS_BY_USER_FAILED:
            console.log("inside userReviewList: ON_FETCH_PREVIOUS_REVIEWS_BY_USER_FAILED");
            return {
                reviews: state.reviews,
                hasLoaded: false,
                isLoading: false,
                hasMore: false,
                count: state.count,
                pageable: {
                    pageSize: state.pageable.pageSize,
                    pageNumber: state.pageable.pageNumber
                },
                showReviewDeletionModal: false,
                reviewToBeDeleted: null,
            };

        case ON_SHOW_REVIEW_DELETION_MODAL:

            console.log("inside userReviewList: ON_SHOW_REVIEW_DELETION_MODAL - action: ", action);

            const id = action.payload;
            const reviewToBeDeleted = state.reviews.find(review => review.id === id);

            console.log("reviewToBeDeleted: ", reviewToBeDeleted);

            return { ...state, showReviewDeletionModal: true, reviewToBeDeleted: reviewToBeDeleted };

        case ON_HIDE_REVIEW_DELETION_MODAL:
            return { ...state, showReviewDeletionModal: false, reviewToBeDeleted: null, };

        default:
            return state;
    }
};
