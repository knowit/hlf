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
    return <LoginScreen/>
    /*
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
    */
  }

  onVenueSelect(placeId) {
    if (!placeId) {
      this.setState({ selectedVenue: undefined });
    } else {
      this.getVenueDetails(placeId);
    }
  }

  getVenueDetails(placeId) {
    const url = places(1);

    axios
      .all([
        axios.get(url),
        axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeId}`
        )
      ])
      .then(
        axios.spread((api, google) => {
          const googleData = _.pick(google.data.result, [
            "formatted_address",
            "name",
            "formatted_phone_number",
            "geometry"
          ]);
          const selectedVenue = Object.assign(
            { reviews: api.data },
            googleData
          );
          this.setState({ selectedVenue: selectedVenue }, () =>
            this.main.notifyMapOnChange()
          );
        })
      );

    /*
    axios
      .all([
        axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeId}`
        )
      ])
      .then(first => console.log(first));
      */
  }

  getVenueDetails1(placeId) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeId}`;

    axios
      .get(url)
      .then(({ data }) => {
        this.setState({ selectedVenue: data.result }, () => {
          this.main.notifyMapOnChange();
        });
      })
      .catch(e => console.log(e));
  }

  showDetails() {
    this.setState({ showDetails: true });
  }

  hideDetails() {
    this.setState({ showDetails: false });
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
