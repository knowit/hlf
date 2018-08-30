import authenticated from './authenticated';
import VenueService from './VenueService';
import _ from "lodash";

export default {

    async fetchMyPreviousReviews(placeId) {
        console.log("found placeId - fetching reviews by place and user - placeId: ", placeId);
        const response = await authenticated.get(`/vurderinger/place/${placeId}/bruker`);
        const grouped = _.groupBy(response.data, "type");
        const groupWithOnlyMaxId = _.map(grouped, type => {
            return type.reduce((a, b) => {
                return a.id > b.id ? a : b;
            });
        });

        return groupWithOnlyMaxId;
    },

    async fetchReviews(placeId) {
        return await authenticated.get(`/vurderinger/place/${placeId}`);
    },

    async createReview(reviewBody) {

        console.log("reviewBody: ", reviewBody);

        return await authenticated.post('/vurderinger', reviewBody);
    },

    async fetchPreviousReviewsByUser(payload) {
        const page = payload.pageable.number;
        const size = payload.pageable.size;
        const date = payload.date;

        console.log("page: ", page);
        console.log("size: ", size);
        console.log("date: ", date);
        console.log(`/vurderinger/bruker?page=${page}&size=${size}`);

        const response = await authenticated.get(`/vurderinger/bruker?page=${page}&size=${size}`, {'Dato': date});

        console.log("response from api: ", response);

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

        console.log("got reviews from API: ", reviews);

        const places = {};

        reviews
            .filter(review => review.sted.id)
            .map(review => review.sted)
            .forEach(place => places[place.id] = place);

        console.log("places: ", places);

        const promises = Object.values(places).map(place => VenueService.fetchGooglePlaceObject(place.placeId));
        const googleInfo = await Promise.all(promises);
        console.log("fetched google info: ", googleInfo);

        googleInfo.forEach(info => {
            const place = Object.values(places).find(place => place.placeId === info.place_id);
            place.name = info.name;
        });

        console.log("places2: ", places);

        //Object.values(places).map(place => place.id).forEach((place, index) => places[index].sted.name = googleInfo[index].name);

        reviews
            .filter(review => !review.sted.id)
            .forEach(review => review.sted = places[review.sted]);

        console.log("merged google info name into review result: ", reviews);

        const result = { reviews, metaData };
        console.log("result: ", result);

        return result;
    },

}