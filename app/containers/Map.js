import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: {
        latitude: 59.916634,
        longitude: 10.756853
      }
    };
  }

  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <MapView
        provider="google"
        ref={map => (this.map = map)}
        style={{
          flex: 1
        }}
        zoomEnabled={true}
        scrollEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsPointsOfInterest={true}
        region={{
          latitude: 59.916634,
          longitude: 10.756853,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
        }}
        onPress={e => {
          this.props.deselectVenue();
        }}
        onPoiClick={e => {
          this.props.onVenueSelect(e.nativeEvent.placeId);
        }}
      >
        <Marker
          coordinate={this.state.selectedLocation}
          title="TITLE!"
          description="DESC!!"
        />
      </MapView>
    );
  }

  animateTo(coordinates) {
    this.map.animateToCoordinate(coordinates);
    this.setState({ selectedLocation: coordinates });
  }
}
