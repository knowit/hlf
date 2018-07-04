import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import PropertyOverview from './PropertyOverview';
import { MaterialIcons } from '@expo/vector-icons';
import HeaderText from './HeaderText';
import SecondaryText from './SecondaryText';
import colors, { COMPONENT_SPACING } from '../settings/defaultStyles';



export default ({ selectedVenue, showDetails }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <HeaderText>{selectedVenue.description}</HeaderText>
                <TouchableHighlight onPress={showDetails}>
                    <MaterialIcons name="keyboard-arrow-right" size={40} color={colors.primaryTextColor} />
                </TouchableHighlight>
            </View>
            <SecondaryText style={{ paddingBottom: COMPONENT_SPACING}}>Dis street</SecondaryText>
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