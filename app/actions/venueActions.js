export const VENUE_SELECTED = "VENUE_SELECTED";
export const VENUE_DESELECTED = "VENUE_DESELECTED";

import { API_KEY } from "../credentials";
import axios from "axios";
import _ from "lodash";
import { ROOT_API_URL } from "../settings/endpoints";
import { AsyncStorage } from "react-native";

export const fetchVenueData = placeId => {
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
          return { cake: "istrue" };
        }),
      axios
        .get(`${ROOT_API_URL}/steder/${placeId}/totalvurdering`, {
          headers: {
            Authorization: "Bearer " + token + "1"
          }
        })
        .then(response => response)
        .catch(error => {
          console.log("EMPTY PLACE / ERROR TOKEN");
          return defaultPlace();
        })
    ];

    Promise.all(requests).then(values => {
      dispatch({ type: VENUE_SELECTED, payload: Object.assign(...values) });
    });
  };
};

const fetchAccessToken = async () => {
  return AsyncStorage.getItem("access_token").then(result => result);
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
