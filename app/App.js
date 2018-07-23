import React from "react";

import MainScreen from "./containers/MainScreen";
import VenueDetails from "./containers/VenueDetails";
import { BackHandler } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import Profile from "./containers/Profile";
import { API_KEY } from "./credentials";
import { places } from "./settings/endpoints";
import axios from "axios";
import _ from "lodash";
import LoginScreen from "./containers/LoginScreen";
const offline = {
  name: "test",
  reviews: {
    Lydutjevningvurderinger: {
      positive: 0,
      negative: 0
    },
    Sted: {
      id: 1,
      placeId: "ChIJmeCJ639uQUYRc3OrOTekBZw"
    },
    Informasjonvurderinger: {
      positive: 0,
      negative: 0
    },
    "Totalt antall vurderinger": 5,
    Lydforholdvurderinger: {
      positive: 0,
      negative: 0
    },
    Teleslyngevurderinger: {
      positive: 1,
      negative: 4
    }
  }
};
class LydApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthed: false,
      selectedVenue: undefined,
      showDetails: false
    };
    this.onVenueSelect = this.onVenueSelect.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.state.showDetails) {
        this.setState({ showDetails: false });
      } else if (this.state.selectedVenue) {
        this.setState({ selectedVenue: undefined });
      }
      return true;
    });
  }

  render() {
    //return <LoginScreen/>
    const { selectedVenue, showDetails } = this.state;
    return !selectedVenue || !showDetails ? (
      <MainScreen
        ref={main => (this.main = main)}
        onVenueSelect={this.onVenueSelect}
        selectedVenue={this.state.selectedVenue}
        showDetails={this.showDetails}
        openDrawer={this.props.navigation.openDrawer}
      />
    ) : (
      <VenueDetails
        selectedVenue={this.state.selectedVenue}
        hideDetails={this.hideDetails}
      />
    );
  }

  onVenueSelect(placeId) {
    if (!placeId) {
      this.setState({ selectedVenue: undefined });
    } else {
      this.getVenueDetails(placeId);
    }
  }

  async getVenueDetails(placeId) {
    //
    const requests = [
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeId}`
        )
        .then(({ data }) => {
          return _.pick(data.result, [
            "formatted_address",
            "name",
            "formatted_phone_number",
            "geometry",
            "photos",
            "place_id"
          ]);
        })
        .catch(error => {
          return { cake: "istrue" };
        }),
      axios
        .get(`http://35.241.8.32/steder/${placeId}/totalvurdering`)
        .then(response => response)
        .catch(error => {
          return this.defaultPlace();
        })
    ];
    const data = await Promise.all(requests).then(response => response);
    this.setState({ selectedVenue: Object.assign(...data) }, () =>
      this.main.notifyMapOnChange()
    );
  }

  showDetails() {
    this.setState({ showDetails: true });
  }

  hideDetails() {
    this.setState({ showDetails: false });
  }

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
  }
}

export default () => {
  const Wrapper = createDrawerNavigator(
    {
      Home: LydApp
    },
    { contentComponent: Profile }
  );
  return <Wrapper />;
};
