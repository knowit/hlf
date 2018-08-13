import authenticated from './authenticated';
import {fetchAccessToken} from "../actions";
import axios from "axios";
import {API_KEY} from "../settings/credentials";
import _ from "lodash";
import {ROOT_API_URL} from "../settings/endpoints";
import {VENUE_SELECTED} from "../actions/venueActions";

export default {

    fetchGooglePlaceObject() {
        axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeId}`)
            .then(data => {
                const googleObject = _.pick(data.result, [
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
        });
    },

    fetchReviews(placeId) {
        authenticated.get(`${ROOT_API_URL}/steder/place/${response.place_id}/totalvurdering/0`)
            .then(reviews => { return reviews })
    },

    defaultPlace() {
        const empty = { positive: 0, negative: 0 };
        return {
            reviews: {
                "Totalt antall vurderinger": 0,
                Teleslyngevurderinger: empty,
                Lydforholdvurderinger: empty,
                Lydutjevningvurderinger: empty,
                Informasjonvurderinger: empty,
                "Antall vurderere": 0
            }
        };
    },
}

