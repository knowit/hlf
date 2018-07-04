import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import IconText from './IconText';
import Properties from '../settings/propertyConfig';
import colors from '../settings/defaultStyles';

export default ({ venueProperties }) => {


    return (
        <View style={styles.container}>
            {Object.keys(Properties).map(name => renderProperty(name, Math.random() * 100))}
        </View>
    )
}


const renderProperty = (name, value) => {
    const isPositive = value >= 50
    return (
        <View key={name} style={styles.property}>
            <IconText text={name} iconSettings={Properties[name]} />

            <View style={{flex:1}}></View> 
            
            <Entypo name="thumbs-up" size={20} color={colors.positiveColor} style={{opacity: isPositive ? 1 : 0}}/>
            {valueBar(value)}
            <Entypo name="thumbs-down" size={20} color={colors.negativeColor} style={{opacity: !isPositive ? 1 : 0}} />
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