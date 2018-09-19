import React, { Component } from "react";
import VenueReviews from "./VenueReviews";
import CreateReview from "./CreateReview";
import VenueImage from "../components/VenueImage";
import VenueMenu from "../components/VenueMenu";
import ViewContainer from "../components/ViewContainer";
import { connect } from "react-redux";
import {onVenueScreenChange} from "../actions/venue";
import RequestAuthenticationModal from '../components/RequestAuthenticationModal';

export const REVIEW_SCREEN = "Anmeldelser";
export const NEW_REVIEW_SCREEN = "Din vurdering";

class VenueDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
        modalVisible: false,
    };
  }

  changeVenueScreen = (screen) => {
      const { user, onVenueScreenChange } = this.props;

      if(! user.isAuthenticated) {
          // set modal visible true
          this.setState({
              modalVisible: true,
          });
      } else {
          onVenueScreenChange(screen);
      }
  };

  render() {
      const { selectedVenue } = this.props;
      const venue = selectedVenue.venue;
      const currentScreen = selectedVenue.screen;
      const photoReference =
          venue.photos && venue.photos.length > 0
              ? venue.photos[0].photo_reference
              : null;

    return (
            <ViewContainer opaque={true} scrollable={true} keyboardAware={true} flex={true} padding={0}>
                <VenueImage
                    photoReference={photoReference}
                    onBackPress={this.props.navigation.navigate}
                />

                <VenueMenu
                    onScreenChange={newScreen => this.changeVenueScreen(newScreen)}
                    currentScreen={currentScreen}
                />

                {currentScreen === REVIEW_SCREEN ? <VenueReviews selectedVenue={venue}/> : <CreateReview selectedVenue={venue}/>}

                <RequestAuthenticationModal
                    visible={this.state.modalVisible}
                    onModalClose={() => {
                        this.setState({modalVisible: false});
                    }}
                />
            </ViewContainer>
    );
  }
}


export default connect(({selectedVenue, user}) => ({ selectedVenue, user}),
    { onVenueScreenChange })(VenueDetails);