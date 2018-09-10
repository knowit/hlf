import React, { Component } from "react";
import VenueReviews from "./VenueReviews";
import CreateReview from "./CreateReview";
import VenueImage from "../components/VenueImage";
import VenueMenu from "../components/VenueMenu";
import ViewContainer from "../components/ViewContainer";
import { connect } from "react-redux";
import {onVenueScreenChange} from "../actions/venue";

export const REVIEW_SCREEN = "Anmeldelser";
export const NEW_REVIEW_SCREEN = "Din vurdering";

class VenueDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { selectedVenue, onVenueScreenChange } = this.props;

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
                    onScreenChange={newScreen => onVenueScreenChange(newScreen)}
                    currentScreen={currentScreen}
                />
                {currentScreen == REVIEW_SCREEN ? (
                    <VenueReviews selectedVenue={venue}/>
                ) : (
                    <CreateReview selectedVenue={venue}/>
                )}
            </ViewContainer>
    );
  }
}

export default connect(({selectedVenue}) => ({ selectedVenue}),
    { onVenueScreenChange })(VenueDetails);