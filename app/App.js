import React from "react";

import MainScreen from "./containers/MainScreen";
import VenueDetails from "./containers/VenueDetails";
import { BackHandler, AsyncStorage } from "react-native";
import { createDrawerNavigator } from "react-navigation";
import Profile from "./containers/Profile";
import { API_KEY } from "./credentials";
import { places, ROOT_API_URL } from "./settings/endpoints";
import axios from "axios";
import _ from "lodash";
import LoginScreen from "./containers/LoginScreen";
import Loading from "./components/Loading";

class LydApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isLoginComplete: false,
      selectedVenue: undefined,
      showDetails: false
    };
    this.onVenueSelect = this.onVenueSelect.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    this.setAuthenticated = this.setAuthenticated.bind(this);
  }

  componentDidMount() {
    this.addBackListener();
    this.checkStoredLogin();
  }

  render() {
    const { showDetails, isAuthenticated, isLoginComplete } = this.state;

    if (!isLoginComplete && !isAuthenticated) {
      return <Loading />;
    }

    if (!isAuthenticated) {
      return <LoginScreen setAuthenticated={this.setAuthenticated} />;
    }
    return !showDetails ? (
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

  setAuthenticated = isAuth => {
    this.setState({ isAuthenticated: isAuth });
  };

  logout() {
    AsyncStorage.multiRemove[("access_token", "id_token", "refresh_token")];
    this.setState({ isAuthenticated: false });
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

  addBackListener() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.state.showDetails) {
        this.setState({ showDetails: false });
      } else if (this.state.selectedVenue) {
        this.setState({ selectedVenue: undefined });
      }
      return true;
    });
  }

  async checkStoredLogin() {
    AsyncStorage.getItem("access_token")
      .then(storedValue => {
        if (!storedValue) {
          this.setState({ isAuthenticated: false, isLoginComplete: true });
        } else {
          axios
            .get(`${ROOT_API_URL}/brukere/login`, {
              headers: {
                Authorization: "Bearer " + storedValue
              }
            })
            .then(result => {
              if (result.status === 200) {
                this.setState({ isAuthenticated: true, isLoginComplete: true });
              } else {
                this.setState({
                  isAuthenticated: false,
                  isLoginComplete: true
                });
              }
            })
            .catch(value => {
              this.setState({ isAuthenticated: false, isLoginComplete: true });
            });
        }
      })
      .catch(value => {
        console.log("could not read asyncstorage");
      });
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
    { contentComponent: props => <Profile {...props} /> }
  );
  return <Wrapper />;
};
