import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import PropertyOverview from './PropertyOverview';
import {MaterialIcons} from '@expo/vector-icons';
import DefaultText from './DefaultText';
import HorizontalRuler from './HorizontalRuler';



export default ({ selectedVenue, showDetails }) => {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <DefaultText style={styles.venueTitle}>{selectedVenue.description}</DefaultText>
                <TouchableHighlight onPress={showDetails}>
                    <MaterialIcons name="keyboard-arrow-right" size={40} color="#FFFFFF"/>
                </TouchableHighlight>
                <DefaultText style={styles.address}>Karl Johans gate, Oslo</DefaultText>
            </View>
        <PropertyOverview />
        </View >
    )
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        backgroundColor: "#31415A",
        padding: 20
    },
    header: {
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "row",
        paddingBottom: 30
    },
    venueTitle: {
        fontWeight: "500",
        fontSize: 22
    }, 
    address: {
        width: "100%",
        fontSize: 13
        },

});