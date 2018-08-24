import authenticated from './authenticated';
import _ from "lodash";

export default {

    async fetchMyPreviousReviews(placeId) {

        let response;

        if(placeId) {
            console.log("found placeId - fetching reviews by place and user - placeId: ", placeId);
            response = await authenticated.get(`/vurderinger/place/${placeId}/bruker`);
        } else {
            console.log("did not find placeId - fetching reviews by user");
            response = await authenticated.get(`/vurderinger/bruker`);
        }

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