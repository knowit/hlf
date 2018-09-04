import authenticated from './authenticated';
import axios from "axios";
import {API_KEY} from "../settings/credentials";
import _ from "lodash";

export default {

    async fetchGooglePlaceObject(placeId) {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeId}`);
        const googleObject = _.pick(response.data.result, [
            "formatted_address",
            "name",
            "formatted_phone_number",
            "geometry",
            "photos",
            "place_id"
        ]);

        if (googleObject.photos)
            googleObject.photos = googleObject.photos.slice(0, 1);

        return googleObject;
    },

    async fetchReviews(placeId) {
        const response = await authenticated.get(`/steder/place/${placeId}/totalvurdering/0`);
        return response.data;
    },

}

