import React, { Component }  from 'react';
import { MapView }  from 'expo';

export default class Map extends Component {

    constructor(props)  {
        super(props);
        this.state = {
            selectedLocation: {
                latitude: 59.916634,
                longitude: 10.756853,
            }
        }
    }


    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <MapView
                provider="google"
                ref={map => this.map = map}
                style={{
                    position: 'absolute',
                    width: "100%",
                    height: "100%",
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
                zoomEnabled={true}
                scrollEnabled={true}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsCompass={true}
                region={{
                    latitude: 59.916634,
                    longitude: 10.756853,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                }}
            >
               
            </MapView>
        )
    }

    animateTo(coordinates) {
        this.map.animateToCoordinate(coordinates);
        this.setState({selectedLocation: coordinates})

    }

}