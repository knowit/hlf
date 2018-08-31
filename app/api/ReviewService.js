import authenticated from './authenticated';
import VenueService from './VenueService';

const END_POINT = "/vurderinger/";

export default {

    async fetchMyPreviousReviews(placeId) {
        console.log("found placeId - fetching reviews by place and user - placeId: ", placeId);
        const response = await authenticated.get(END_POINT + `place/${placeId}/bruker`);
        return response.data;
    },

    async fetchReviews(placeId) {
        return await authenticated.get(END_POINT + `place/${placeId}`);
    },

    async createReview(reviewBody) {
        console.log("reviewBody: ", reviewBody);
        return await authenticated.post(END_POINT, reviewBody);
    },

    async fetchPreviousReviewsByUser(payload) {

        const { number, size } = payload.pageable;
        const date = payload.date;

        const response = await authenticated.get(END_POINT + `bruker?page=${number}&size=${size}`, {'Dato': date});

        const metaData = {
            first: response.data.first,
            last: response.data.last,
            number: response.data.number,
            numberOfElements: response.data.numberOfElements,
            size: response.data.size,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages
        };


        // Duplicates of review.sted and review.registrator is not delivered as an object. It is only delivered as a
        // reference to the objects id. We want it to be included in all reviews so to fix it:

        const reviews = [...response.data.content];
        const places = {};

        reviews
            .filter(review => review.sted.id)
            .map(review => review.sted)
            .forEach(place => places[place.id] = place);

        const promises = Object.values(places).map(place => VenueService.fetchGooglePlaceObject(place.placeId));
        const googleInfo = await Promise.all(promises);

        googleInfo.forEach(info => {
            const place = Object.values(places).find(place => place.placeId === info.place_id);
            place.name = info.name;
        });

        reviews
            .filter(review => !review.sted.id)
            .forEach(review => review.sted = places[review.sted]);

        const result = { reviews, metaData };
        console.log("result: ", result);

        return result;
    },

    // Delete all of the Reviews of a User connected to the Place
    async deleteReviewsByPlaceId(placeId) {
        return await authenticated.delete(END_POINT + 'byPlaceId/' + placeId);
    }

}