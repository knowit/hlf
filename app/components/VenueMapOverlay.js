import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import PropertyOverview from './PropertyOverview';
import {MaterialIcons} from '@expo/vector-icons';
import DefaultText from './DefaultText';
import HeaderText from './HeaderText';
import SecondaryText from './SecondaryText';
import colors from '../settings/colors';



export default ({ selectedVenue, showDetails }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <HeaderText>{selectedVenue.description}</HeaderText>
                <TouchableHighlight onPress={showDetails}>
                    <MaterialIcons name="keyboard-arrow-right" size={40} color="#FFFFFF"/>
                </TouchableHighlight>
               <SecondaryText style={{width: "100%"}}>Dis street</SecondaryText>
            </View>
        <PropertyOverview />
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        backgroundColor: colors.primaryBackgroundColor,
        padding: 20
    },
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingBottom: 30
    },

});