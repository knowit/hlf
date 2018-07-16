import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";

import SearchBar from "../containers/SearchBar";
import Map from "./Map";
import VenueMapOverlay from "../components/VenueMapOverlay";

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  componentWillMount() {}

  getCurrentLocation = async () => {};

  notifyMapOnChange() {
    const { location } = this.props.selectedVenue.geometry;
    this.map.animateTo({
      latitude: location.lat,
      longitude: location.lng
    });
    console.log("MAPCHANGE!");
  }

  render() {
    return (
      <View style={styles.overallViewContainer}>
        <Map
          ref={map => (this.map = map)}
          onVenueSelect={this.props.onVenueSelect}
        />
        {this.props.selectedVenue ? (
          <VenueMapOverlay
            selectedVenue={this.props.selectedVenue}
            showDetails={this.props.showDetails}
          />
        ) : null}
        <View style={styles.searchBar}>
          <SearchBar
            onMenuPress={() => this.props.openDrawer()}
            onVenueSelect={this.props.onVenueSelect}
            style={styles.searchBar}
          />
        </View>
      </View>
    );
  }
}

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
