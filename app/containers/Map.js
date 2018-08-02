import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";
import colors from "../settings/defaultStyles";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.nextId = 0;
    this.state = {
      markers: []
    };
  }

  render() {
    console.log(this.state);
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
        initialRegion={{
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
        {this.state.markers.map(coordinates => {
          return (
            <Marker
              coordinate={coordinates}
              key={this.nextId++}
              pinColor={colors.primaryBackgroundColor}
            />
          );
        })}
      </MapView>
    );
  }

  animateTo(coordinates) {
    this.map.animateToCoordinate(coordinates);
    this.setState({ markers: [coordinates] });
  }
}
