import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppText from './AppText';


export default ({selectedVenue}) => {

    return (
        <View style={styles.container}>
            <AppText type="primary">{selectedVenue.name}</AppText>
            {selectedVenue.formatted_address ? <AppText type="primary">{selectedVenue.formatted_address}</AppText> : null}
            {selectedVenue.formatted_phone_number ? <AppText type="primary">{selectedVenue.formatted_phone_number}</AppText> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 20
    }
})