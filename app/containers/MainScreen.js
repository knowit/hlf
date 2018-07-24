import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";

import SearchBar from "../containers/SearchBar";
import Map from "./Map";
import VenueMapOverlay from "../components/VenueMapOverlay";
import { fetchVenueData } from "../actions";
console.log("FETCH", fetchVenueData);
class MainScreen extends Component {
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
  }

  render() {
    return (
      <View style={styles.overallViewContainer}>
        <Map
          ref={map => (this.map = map)}
          onVenueSelect={this.props.fetchVenueData}
        />
        {this.props.selectedVenue ? (
          <VenueMapOverlay
            selectedVenue={this.props.selectedVenue}
            showDetails={this.props.showDetails}
          />
        ) : null}
        <View style={styles.searchBar}>
          <SearchBar
            onMenuPress={() => this.props.navigation.openDrawer()}
            onVenueSelect={this.props.onVenueSelect}
            style={styles.searchBar}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return ownProps;
};

export default connect(
  mapStateToProps,
  { fetchVenueData }
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
