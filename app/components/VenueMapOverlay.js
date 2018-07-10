import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import PropertyOverview from './PropertyOverview';
import { MaterialIcons } from '@expo/vector-icons';
import colors, { COMPONENT_SPACING } from '../settings/defaultStyles';
import AppText from './AppText';



export default ({ selectedVenue, showDetails }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <AppText type="primary" size="large">{selectedVenue.description}</AppText>
                <TouchableHighlight onPress={showDetails}>
                    <MaterialIcons name="keyboard-arrow-right" size={40} color={colors.primaryTextColor} />
                </TouchableHighlight>
            </View>
            <AppText type="secondary" size="medium">Dis street</AppText>
            <PropertyOverview />
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        backgroundColor: colors.primaryBackgroundColor,
        padding: COMPONENT_SPACING
    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },

});