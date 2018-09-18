import React, { Component } from "react";
import VenueReviews from "./VenueReviews";
import CreateReview from "./CreateReview";
import VenueImage from "../components/VenueImage";
import VenueMenu from "../components/VenueMenu";
import ViewContainer from "../components/ViewContainer";
import { connect } from "react-redux";
import {onVenueScreenChange} from "../actions/venue";
import ConfirmationModal from '../components/ConfirmationModal';
import {Platform, StyleSheet} from "react-native";
import {colors} from "../settings/defaultStyles";
import LoginScreen from "./LoginScreen";
import {onAuth0Cancelled, onAuth0Success} from "../actions/account";

export const REVIEW_SCREEN = "Anmeldelser";
export const NEW_REVIEW_SCREEN = "Din vurdering";

class VenueDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
        modalVisible: false,
        showLoginScreen: false,
    }
  }

  changeVenueScreen = (screen) => {
      const { user, onVenueScreenChange } = this.props;

      if(! user.isAuthenticated) {
          console.log("set modal visible true for screen change: ", screen);
          // set modal visible true
          this.setState({
              modalVisible: true
          });

          return;
      }

      onVenueScreenChange(screen);
  };

  renderImage() {

      const { selectedVenue } = this.props;

      const venue = selectedVenue.venue;

      const photoReference =
          venue.photos && venue.photos.length > 0
              ? venue.photos[0].photo_reference
              : null;

      return (
          <VenueImage
              photoReference={photoReference}
              onBackPress={this.props.navigation.navigate}
          />
      );
  }

  renderMenu() {
      const { selectedVenue } = this.props;
      const currentScreen = selectedVenue.screen;

      return (
          <VenueMenu
              onScreenChange={newScreen => this.changeVenueScreen(newScreen)}
              currentScreen={currentScreen}
          />
      );
  }

  renderModal() {
      return (
          <ConfirmationModal
              visible={this.state.modalVisible}
              title={"Innlogging"}
              text={"Du må logge inn for å lage vurdering"}
              cancelButtonText={"Avbryt"}
              confirmButtonText={"Logg Inn"}
              onHideModal={(goToLogin) => {
                  this.setState({
                      modalVisible: false,
                      showLoginScreen: goToLogin,
                  });
              }}
          />
      );
  }

  renderLoginScreen() {
      return (
          <LoginScreen
              auth0Success={this.props.onAuth0Success}
              auth0Cancelled={this.props.onAuth0Cancelled}
          />
      );
  }

  renderCurrentScreen() {
      const { selectedVenue } = this.props;
      const venue = selectedVenue.venue;
      const currentScreen = selectedVenue.screen;

      if(currentScreen === REVIEW_SCREEN) {
          return (
              <VenueReviews selectedVenue={venue}/>
          );
      } else {
          return (
              <CreateReview selectedVenue={venue}/>
          );
      }
  }

  render() {

      if(this.state.showLoginScreen) {
          return this.renderLoginScreen();
      }

    return (
            <ViewContainer opaque={true} scrollable={true} keyboardAware={true} flex={true} padding={0}>
                {this.renderImage()}
                {this.renderMenu()}
                {this.renderModal()}
                {this.renderCurrentScreen()}
            </ViewContainer>
    );
  }
}

export default connect(({selectedVenue, user}) => ({ selectedVenue, user}),
    { onVenueScreenChange, onAuth0Success, onAuth0Cancelled })(VenueDetails);


const styles = StyleSheet.create({

});