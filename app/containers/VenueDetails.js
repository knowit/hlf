import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import VenueReviews from './VenueReviews';
import { API_KEY } from '../credentials';
import axios from 'axios';
import CreateReview from './CreateReview';
import VenueImage from '../components/VenueImage';
import VenueMenu from '../components/VenueMenu';
import VenueContactInfo from '../components/VenueContactInfo';
import colors from '../settings/defaultStyles';
import ViewContainer from '../components/ViewContainer';

export const REVIEW_SCREEN = "Anmeldelser";
export const NEW_REVIEW_SCREEN = "Din vurdering";

export default class VenueDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { currentScreen: REVIEW_SCREEN }
    }
    render() {

        const { selectedVenue } = this.props;

        const photoReference = selectedVenue.photos && selectedVenue.photos.length > 0 ? selectedVenue.photos[0].photo_reference : null;
        return (
            <ViewContainer opaque={true} scrollable={true} heightAdjusting="flex" padding={0}> 
                <VenueImage photoReference={photoReference} />
                <VenueMenu onScreenChange={(newScreen) => this.setState({ currentScreen: newScreen })} currentScreen={this.state.currentScreen} />
                <VenueContactInfo selectedVenue={selectedVenue} />
                {this.state.currentScreen == REVIEW_SCREEN ? <VenueReviews selectedVenue={selectedVenue} /> : <CreateReview />}
            </ViewContainer>
        )
    }

}
