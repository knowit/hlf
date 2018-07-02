import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapView, } from 'expo';
import SearchBar from '../components/SearchBar';
import { createDrawerNavigator } from 'react-navigation';
import Profile from './Profile';
import VenueMapOverlay from '../components/VenueMapOverlay';

class Map extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.overallViewContainer}>
                {<MapView
                    style={styles.map}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: 37.7749,
                            longitude: -122.4194,
                        }}
                    />
                </MapView>}
                <View style={styles.overlays}>
                    <SearchBar onMenuPress={this.props.navigation.openDrawer} onVenueSelect={this.props.onVenueSelect} />
                    {this.props.selectedVenue ? <VenueMapOverlay selectedVenue={this.props.selectedVenue} showDetails={this.props.showDetails} /> : null}
                </View>
            </View>
        )
    }

}

export default ({ onVenueSelect, selectedVenue, showDetails }) => {
    const Wrapper = createDrawerNavigator({
        Home: {
            screen: (props) => <Map {...props} onVenueSelect={onVenueSelect} selectedVenue={selectedVenue} showDetails={showDetails} />
        }
    },
        { contentComponent: Profile })
    return <Wrapper />
}



const styles = StyleSheet.create({
    overallViewContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    overlays: {
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"


    }
});
