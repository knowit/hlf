import authenticated from './authenticated';
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
        return await authenticated.post('/vurderinger', reviewBody);
    },

    async fetchPreviousReviewsByUser(payload) {
        const pageNumber = payload.pageable.pageNumber;
        const pageSize = payload.pageable.pageSize;
        const date = payload.date;

        console.log("pageNumber: ", pageNumber);
        console.log("pageSize: ", pageSize);
        console.log("date: ", date);
        console.log(`/vurderinger/bruker?page=${pageNumber}&size=${pageSize}`);

        const response = await authenticated.get(`/vurderinger/bruker?page=${pageNumber}&size=${pageSize}`, {'Dato': date});

        return response.data;
        /*
        const grouped = _.groupBy(response.data, "type");
        const groupWithOnlyMaxId = _.map(grouped, type => {
            return type.reduce((a, b) => {
                return a.id > b.id ? a : b;
            });
        });

        return groupWithOnlyMaxId;*/
    },

}