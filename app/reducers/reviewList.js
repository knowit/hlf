import {
    ON_FETCH_REVIEWS_INIT,
    ON_FETCH_REVIEWS_SUCCESS
} from "../actions/reviews";
import { deserialize } from "../deserializer/ReviewDeserializer";

const defaultState = {
    reviewsList: [],
    hasLoaded: false,
    isLoading: false,
    count: 0,
    metadata: {
        first: true,
        last: false,
        number: -1,
        numberOfElements: -1,
        size: 10,
        totalElements: -1,
        totalPages: -1
    },
};

export default (
    state = {...defaultState},
    action
) => {
    switch (action.type) {

        case ON_FETCH_REVIEWS_INIT:

            return { ...defaultState };

        case ON_FETCH_REVIEWS_SUCCESS:

            const metadata = action.payload.metaData;
            const reviews = [...state.reviewsList];

            action.payload.reviews.forEach(review => {
                const id = review.sted.placeId + '-' + review.registrator.id;
                console.log(id);

                let foundReview;
                if(foundReview = reviews.find(r => r.id == id)) {
                    let vurdering = deserialize(review);
                    if(! foundReview.vurderinger.find(v => v.key === vurdering.key)) {
                        foundReview.vurderinger.push(vurdering);
                    }
                } else {
                    reviews.push({
                        id: id,
                        placeId: review.sted.placeId,
                        sted: review.sted,
                        registrator: review.registrator,
                        vurderinger: [deserialize(review)]
                    });
                }
            });

            return {
                ...state,
                reviewsList: reviews,
                hasLoaded: true,
                isLoading: false,
                metadata: metadata,
            };

        default:
            return state;
    }
};
