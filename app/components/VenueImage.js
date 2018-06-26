import React from 'react';
import {Image} from 'react-native';
import {API_KEY} from '../credentials';

export default ({photoReference}) => {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
    return(
        <Image style={{width: "100%", height: 200}} source={{uri: photoUrl}}/>
    )
}