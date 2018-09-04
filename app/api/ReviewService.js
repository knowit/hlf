import authenticated from './authenticated';
import VenueService from './VenueService';

const END_POINT = "/vurderinger/";

export default {

    async fetchMyPreviousReviews(placeId) {
        const response = await authenticated.get(END_POINT + `place/${placeId}/bruker`);
        return response.data;
    },

    async fetchReviews(placeId) {
        const response = await authenticated.get(END_POINT + `place/${placeId}`);
        const registrators = {};
        const reviews = response.data.content;

        reviews
            .filter(review => review.registrator.id)
            .map(review => review.registrator)
            .forEach(registrator => registrators[registrator.id] = registrator);

        const metaData = {
            first: response.data.first,
            last: response.data.last,
            number: response.data.number,
            numberOfElements: response.data.numberOfElements,
            size: response.data.size,
            totalElements: response.data.totalElements,
            totalPages: response.data.totalPages
        };

        reviews
            .filter(review => !review.registrator.id)
            .forEach(review => review.registrator = registrators[review.registrator]);

        const result = { reviews, metaData };

        return result;
    },

    async createReview(reviewBody) {
        return await authenticated.post(END_POINT, reviewBody);
    },

    async updateReview(review) {
      return await authenticated.put(END_POINT + review.id, review);
    },

    async removeValueFromReview(review) {
      return await authenticated.delete(END_POINT + review.id + '/rangering');
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

        const registrators = {};

        reviews
            .filter(review => review.registrator.id)
            .map(review => review.registrator)
            .forEach(registrator => registrators[registrator.id] = registrator);

        const promises = Object.values(places).map(place => VenueService.fetchGooglePlaceObject(place.placeId));
        const googleInfo = await Promise.all(promises);

        googleInfo.forEach(info => {
            const place = Object.values(places).find(place => place.placeId === info.place_id);
            place.name = info.name;
        });

        reviews
            .filter(review => !review.sted.id)
            .forEach(review => review.sted = places[review.sted]);

        reviews
            .filter(review => !review.registrator.id)
            .forEach(review => review.registrator = registrators[review.reigstrator]);

        const result = { reviews, metaData };

        return result;
    },

    // Delete all of the Reviews of a User connected to the Place
    async deleteReviewsByPlaceId(placeId) {
        return await authenticated.delete(END_POINT + 'byPlaceId/' + placeId);
    }

}