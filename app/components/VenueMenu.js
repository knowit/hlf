import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { NEW_REVIEW_SELECTED, REVIEWS_SELECTED } from '../containers/VenueDetails'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import IconText from './IconText';
import colors from '../settings/colors';


export default ({ onScreenChange, currentScreen }) => {
    return (
        <View style={styles.container}>

        {renderOption(currentScreen, REVIEWS_SELECTED, "Anmeldelser", onScreenChange, {iconLibrary: "materialIcons", iconName: "star"})}
        {renderOption(currentScreen, NEW_REVIEW_SELECTED, "Din vurdering", onScreenChange, {iconLibrary: "materialCommunityIcons", iconName: "pencil"})}

        </View>
    )
}

const renderOption = (currentScreen, name, title, onScreenChange, iconSettings) => { // todo fix
    const isSelected = currentScreen == name;
    return (
        <TouchableHighlight onPress={() => onScreenChange(name)} style={styles.menuComponent}>
        <IconText text={title} iconSettings={iconSettings} size={17} />
           
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

    unselectedOption: {
        backgroundColor: colors.secondaryBackgroundColor
    },

})