import authenticated from './authenticated';
import _ from "lodash";

export default {

    async fetchMyPreviousReviews(placeId) {
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

}