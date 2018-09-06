import React, { Component } from "react";
import VenueReviews from "./VenueReviews";
import CreateReview from "./CreateReview";
import VenueImage from "../components/VenueImage";
import VenueMenu from "../components/VenueMenu";
import ViewContainer from "../components/ViewContainer";
import { connect } from "react-redux";

export const REVIEW_SCREEN = "Anmeldelser";
export const NEW_REVIEW_SCREEN = "Din vurdering";

class VenueDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { currentScreen: REVIEW_SCREEN };
  }
  render() {
    const { selectedVenue } = this.props;

    const photoReference =
      selectedVenue.photos && selectedVenue.photos.length > 0
        ? selectedVenue.photos[0].photo_reference
        : null;
    return (
            <ViewContainer opaque={true} scrollable={true} keyboardAware={true} flex={true} padding={0}>
                <VenueImage
                    photoReference={photoReference}
                    onBackPress={this.props.navigation.navigate}
                />
                <VenueMenu
                    onScreenChange={newScreen =>
                        this.setState({currentScreen: newScreen})
                    }
                    currentScreen={this.state.currentScreen}
                />
                {this.state.currentScreen == REVIEW_SCREEN ? (
                    <VenueReviews selectedVenue={selectedVenue}/>
                ) : (
                    <CreateReview selectedVenue={selectedVenue}/>
                )}
            </ViewContainer>

    );
  }
}

const mapStateToProps = state => ({
    selectedVenue: state.selectedVenue,
});

export default connect(mapStateToProps)(VenueDetails);


