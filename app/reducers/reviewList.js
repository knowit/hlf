import {
    ON_FETCH_REVIEWS_INIT,
    ON_FETCH_REVIEWS_SUCCESS
} from "../actions/reviews";
import { deserialize } from "../deserializer/ReviewDeserializer";

export default (
    state = {
        reviewsList: [],
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
    },
    action
) => {
    switch (action.type) {

        case ON_FETCH_REVIEWS_INIT:

            return { reviewsList: [], hasLoaded: false, isLoading: true };

        case ON_FETCH_REVIEWS_SUCCESS:

            const metadata = action.payload.metaData;
            const reviews = [...state.reviewsList];

            action.payload.reviews.forEach(review => {
                let foundReview;
                if(foundReview = reviews.find(r => r.registrator.id === review.registrator.id)) {
                    foundReview.vurderinger.push(deserialize(review));
                } else {
                    reviews.push({
                        id: review.sted.placeId + review.registrator.id,
                        placeId: review.sted.placeId,
                        sted: review.sted,
                        registrator: review.registrator,
                        vurderinger: [deserialize(review)]
                    });
                }
            });

            return {
                reviewsList: reviews,
                hasLoaded: true,
                isLoading: false,
                metadata: metadata,
            };

        default:
            return state;
    }
};
