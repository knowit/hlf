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

export const REVIEW_SCREEN = "Anmeldelser";
export const NEW_REVIEW_SCREEN = "Din vurdering";

export default class VenueDetails extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoadingDetails: false, details: {}, currentScreen: REVIEW_SCREEN }
    }

    componentDidMount() {
        //this.loadDetails();
    }



    render() {
        if (this.state.isLoadingDetails) {
            return (
                <View style={[styles.loading, styles.container]}>
                    <ActivityIndicator size="large" color="white" />
                </View>
            )
        }
        const { selectedVenue }  = this.props;
        //const selectedVenue = Object.assign(this.state.details, this.props.selectedVenue);
        const photoReference = this.state.details.photos && this.state.details.photos.length > 0 ? this.state.details.photos[0].photo_reference : null;
        return (
            <ScrollView style={styles.container}>
                <VenueImage photoReference={photoReference} />
                <VenueMenu onScreenChange={(newScreen) => this.setState({ currentScreen: newScreen })} currentScreen={this.state.currentScreen} />
                <VenueContactInfo selectedVenue={selectedVenue} />
                {this.state.currentScreen == REVIEW_SCREEN ? <VenueReviews selectedVenue={selectedVenue} /> : <CreateReview />}
            </ScrollView>
        )
    }

    loadDetails() {
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.selectedVenue.place_id}&key=${API_KEY}`;
        axios.get(detailsUrl)
            .then(({ data }) => {
                this.setState({ isLoadingDetails: false, details: data.result })
            })
    }


}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primaryBackgroundColor,
        flex: 1
    },
    loading: {
        justifyContent: "center",
        alignItems: "center"
    }
})