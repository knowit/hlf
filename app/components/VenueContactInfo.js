import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DefaultText from './DefaultText';

export default ({selectedVenue}) => {

    return (
        <View style={styles.container}>
            <DefaultText style={styles.venueName}>{selectedVenue.name}</DefaultText>
            {selectedVenue.formatted_address ? <DefaultText style={styles.text}>{selectedVenue.formatted_address}</DefaultText> : null}
            {selectedVenue.formatted_phone_number ? <DefaultText style={styles.text}>{selectedVenue.formatted_phone_number}</DefaultText> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20
    },
    venueName: {
        fontSize: 20
    },

})