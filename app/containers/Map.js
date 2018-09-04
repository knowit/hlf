import React, {Component} from "react";
import MapView, {Marker} from "react-native-maps";
import {Geolocation} from "react-native";
import colors from "../settings/defaultStyles";

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.nextId = 0;
        this.state = {
            markers: [],
            flex: 1,
        };
    }

    componentWillMount() {
        //Hack to ensure the showsMyLocationButton is shown initially. Idea is to force a repaint
        //setTimeout(() => this.setState({flex: 1}), 500);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(({coords}) =>
            this.map.animateToCoordinate(coords)
        );
    }

    render() {
        return (
            <MapView
                provider="google"
                ref={map => (this.map = map)}
                style={{
                    flex: this.state.flex
                }}
                zoomEnabled={true}
                scrollEnabled={true}
                cacheEnabled={false}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                showsPointsOfInterest={true}
                showsTraffic={false}
                showsIndoors={false}

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
        this.setState({markers: [coordinates]});
    }
}
