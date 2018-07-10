import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Location, Permissions, Constants } from 'expo';
import SearchBar from '../components/SearchBar';
import Map from './Map';

import VenueMapOverlay from '../components/VenueMapOverlay';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.map = React.createRef();
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

    componentDidMount() {
        setTimeout(() => {
            this.map.animateTo(


                {
                    latitude: 58.253041,
                    longitude: 8.362465,
                
            })
        }, 3000);
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
        const {location} = data.geometry;
        this.map.animateTo({
            latitude: location.lat,
            longitude: location.lng
        }),
        this.props.onVenueSelect(data);
        
    }

    render() {


        return (

            <View style={styles.overallViewContainer} >
                <Map ref={map => this.map = map}/>
                <View style={styles.overlays}>
                    <SearchBar onMenuPress={() => this.props.openDrawer()} onVenueSelect={this.onVenueSelect} />
                    {this.props.selectedVenue ? <VenueMapOverlay selectedVenue={this.props.selectedVenue} showDetails={this.props.showDetails} /> : null}
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    overallViewContainer: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    overlays: {
        flex: 1,
        position: "relative",
        alignItems: "center",
        justifyContent: "space-between"
    }
});
