import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import {connect} from "react-redux";

import SearchBar from "../containers/SearchBar";
import Map from "./Map";
import VenueMapOverlay from "../components/VenueMapOverlay";
import { onVenueInformationRequested, onVenueDeselected } from "../actions/venue";

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.map = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (
            this.props.selectedVenue.venue && !prevProps.selectedVenue.venue ||
            (this.props.selectedVenue.venue &&
                prevProps.selectedVenue.venue.name !== this.props.selectedVenue.venue.name)
        ) {
            this.notifyMapOnChange();
        }
    }

    notifyMapOnChange() {
        const {location} = this.props.selectedVenue.venue.geometry;
        this.map.animateTo({
            latitude: location.lat,
            longitude: location.lng
        });
    }

    render() {
        const {navigate} = this.props.navigation;

        return (
            <View style={styles.overallViewContainer}>
                <Map
                    ref={map => (this.map = map)}
                    onVenueSelect={this.props.onVenueInformationRequested}
                    deselectVenue={this.props.onVenueDeselected}
                />
                {this.props.selectedVenue.venue ? (
                    <VenueMapOverlay
                        selectedVenue={this.props.selectedVenue.venue}
                        showDetails={() => navigate("Details")}
                    />
                ) : null}
                <View style={styles.searchBar}>
                    <SearchBar
                        onMenuPress={() => this.props.navigation.openDrawer()}
                        onVenueSelect={this.props.onVenueInformationRequested}
                        style={styles.searchBar}
                        deselectVenue={this.props.onVenueDeselected}
                    />
                </View>
            </View>
        );
    }
}

export default connect(
    ({selectedVenue}) => ({selectedVenue}),
    { onVenueInformationRequested, onVenueDeselected }
)(MainScreen);

const styles = StyleSheet.create({
    overallViewContainer: {
        ...StyleSheet.absoluteFillObject
    },
    searchBar: {
        position: "absolute",
        top: 0,
        width: "100%"
    },

    overlays: {
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        position: "absolute",
        backgroundColor: "green"
    }
});
