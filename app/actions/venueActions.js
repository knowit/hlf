export const VENUE_SELECTED = "VENUE_SELECTED";
export const VENUE_DESELECTED = "VENUE_DESELECTED";

import { API_KEY } from "../credentials";
import axios from "axios";
import _ from "lodash";
import { ROOT_API_URL } from "../settings/endpoints";
import { fetchAccessToken } from "./";

export const fetchVenueData = placeId => {
  const url = `${ROOT_API_URL}/steder/place/${placeId}/totalvurdering/0`;

  //`${ROOT_API_URL}/steder/place/${placeId}/totalvurdering/0`;

  //http://35.198.153.18:80/steder/place/ChIJFVLTKWduQUYRK4owC-eIqBg/totalvurdering/0
  //http://35.198.153.18:80/steder/place/ChIJAAAAAAAAAAARK4owC-eIqBg/totalvurdering/0

  return async dispatch => {
    const token = await fetchAccessToken();

    const requests = [
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeId}`
        )
        .then(({ data }) => {
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
        })
        .catch(error => {
          return {};
        }),
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        .then(({ data }) => {
          return { reviews: data };
        })
        .catch(error => {
          return defaultPlace();
        })
    ];

    Promise.all(requests).then(values => {
      dispatch({ type: VENUE_SELECTED, payload: Object.assign(...values) });
    });
  };
};

export const deselectVenue = () => {
  return { type: VENUE_DESELECTED };
};

const defaultPlace = () => {
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
};
