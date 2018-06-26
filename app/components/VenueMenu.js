import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { NEW_REVIEW_SELECTED, REVIEWS_SELECTED } from '../containers/VenueDetails'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import WhiteText from './DefaultText';
import DefaultText from './DefaultText';


export default ({ onScreenChange, currentScreen }) => {
    return (
        <View style={styles.container}>

        {renderOption(currentScreen, REVIEWS_SELECTED, "Anmeldelser", onScreenChange, <MaterialIcons name="star" color="white" size={18} />)}
        {renderOption(currentScreen, NEW_REVIEW_SELECTED, "Din vurdering", onScreenChange, <MaterialCommunityIcons name="pencil" color="white" size={15} />)}

        </View>
    )
}

const renderOption = (currentScreen, name, title, onScreenChange, icon) => { // todo fix
    const isSelected = currentScreen == name;
    return (
        <TouchableHighlight onPress={() => onScreenChange(name)} style={styles.menuComponent}>
            <View style={[styles.textIconWrap, isSelected ? null : styles.unselectedOption]}>
                {icon}
                <DefaultText style={[styles.optionText]}>{title}</DefaultText>
            </View>
        </TouchableHighlight>
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
    },
    menuComponent: {
        flex: 1
    },

    optionText: {
        fontSize: 20,
        paddingVertical: 8
    },

    unselectedOption: {
        backgroundColor: "#3F4F64"
    },


    textIconWrap: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})