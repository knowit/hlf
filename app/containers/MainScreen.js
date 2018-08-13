import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";

import SearchBar from "../containers/SearchBar";
import Map from "./Map";
import VenueMapOverlay from "../components/VenueMapOverlay";
import { fetchVenueData, deselectVenue } from "../actionsOld";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (
      !prevProps.selectedVenue ||
      (this.props.selectedVenue &&
        prevProps.selectedVenue.name !== this.props.selectedVenue.name)
    ) {
      this.notifyMapOnChange();
    }
  }

  notifyMapOnChange() {
    const { location } = this.props.selectedVenue.geometry;
    this.map.animateTo({
      latitude: location.lat,
      longitude: location.lng
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.overallViewContainer}>
        <Map
          ref={map => (this.map = map)}
          onVenueSelect={this.props.fetchVenueData}
          deselectVenue={this.props.deselectVenue}
        />
        {this.props.selectedVenue ? (
          <VenueMapOverlay
            selectedVenue={this.props.selectedVenue}
            showDetails={() => navigate("Details")}
          />
        ) : null}
        <View style={styles.searchBar}>
          <SearchBar
            onMenuPress={() => this.props.navigation.openDrawer()}
            onVenueSelect={this.props.fetchVenueData}
            style={styles.searchBar}
            deselectVenue={this.props.deselectVenue}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ selectedVenue }) => ({ selectedVenue });

export default connect(
  mapStateToProps,
  { fetchVenueData, deselectVenue }
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
