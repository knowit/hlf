import React from 'react';
import { View, StyleSheet } from 'react-native';
import properties from '../settings/propertyConfig';
import colors, {sizes} from '../settings/defaultStyles';
import AppText from './AppText';
import { positiveIcon, negativeIcon } from '../settings/icons';

export default ({ venueProperties }) => {
    return (
        <View style={styles.container}>
            {properties.map(property => renderProperty(property, Math.random() * 100))}
        </View>
    )
}


const renderProperty = (property, value) => {
    const isPositive = value >= 50
    const {name, icon} = property;
    return (
        <View key={name} style={styles.property}>
            <AppText type="primary" size="medium">{icon} {name}</AppText>
            <View style={{flex:1}}></View> 
            
            {positiveIcon(isPositive, sizes.large)}
            {valueBar(value)}
            {negativeIcon(!isPositive, sizes.large)}
            
        </View>
    )
}

const valueBar = value => {

    return (
        <View style={styles.barWrap}>
            <View style={styles.barContainer}>
                <View style={[{ width: `${value}%` }, styles.progress]}></View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    property: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 7
    },

    barWrap: {
        width: 150,
        height: "100%",
        marginHorizontal: 10
    },
    barContainer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: colors.negativeColor,
        borderRadius: 7
    },
    progress: {
        backgroundColor: colors.positiveColor,
        height: "100%",
        position: "relative",
        borderRadius: 7
    }
});