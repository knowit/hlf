import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { MapView, Location, Permissions, Constants } from 'expo';
import SearchBar from '../components/SearchBar';
import { createDrawerNavigator } from 'react-navigation';
import Profile from './Profile';
import VenueMapOverlay from '../components/VenueMapOverlay';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRegion: {
                latitude: 59.916634,
                longitude: 10.756853,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }
        }

        this.onVenueSelect = this.onVenueSelect.bind(this);

    }


    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            console.log("aw no");
        }
        else {
            this.getCurrentLocation();
        }

    }

    getCurrentLocation = async () => {
        let permissionStatus = await Permissions.askAsync(Permissions.LOCATION);
        if (permissionStatus !== "granted") {
            console.log("mangler tillatelse");
        }
        else {
            const location = await Location.getCurrentPositionAsync();
            this.setState({ selectedRegion: location })
        }
    }


    onVenueSelect(data) {
        this.props.onVenueSelect(data);
        const {location} = data.geometry;
        /*this.map.animateToCoordinate({
            latitude: location.lat,
            longitude: location.lng
          }, 1000)*/
        
    }


    render() {
        return (

            <View style={styles.overallViewContainer} >
                {<MapView
                    provider="google"
                    ref={map => this.map = map}
                    style={[styles.map]}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                    region={this.state.selectedRegion}
                >

                </MapView>}
                <View style={styles.overlays}>
                    <SearchBar onMenuPress={this.props.navigation.openDrawer} onVenueSelect={this.onVenueSelect} />
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
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    overlays: {
        flex: 1,
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between"


    }
});
