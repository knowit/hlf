import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Entypo} from '@expo/vector-icons';
import PropertyTitle from './IconText';
import DefaultText from './DefaultText';

const sampleData = [
    { name: "Lydforhold", value: 70 },
    { name: "Lydutjevning", value: 40 },
    { name: "Teleslynge", value: 89 },
    { name: "Informasjon", value: 20 },]

export default ({venueProperties}) => {
    const properties = venueProperties ? venueProperties : sampleData;  
    return (
        <View style={styles.container}>
            {properties.map(property => renderProperty(property.name, property.value))}
        </View>
    )
}


const renderProperty = (name, value) => {
    
    return (
        <View key={name} style={styles.property}>
            <PropertyTitle name={name}/>
            <Entypo name="thumbs-up" size={20} color={`rgba(193, 224, 248, ${value >= 50 ? 1: 0})`} />
            {valueBar(value)}
            <Entypo name="thumbs-down" size={20} color={`rgba(255, 150, 158, ${value < 50 ? 1 : 0})`}/>
        </View>
    )
}

const valueBar = value => {
    
    return (
        <View style={styles.barWrap}>
            <View style={styles.barContainer}>
                <View style={[{width: `${value}%`}, styles.progress]}></View>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({

    property:{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingVertical: 7
    },

    barWrap: {
        width: 170,
        height: "100%", 
        marginHorizontal: 10
    },
    barContainer: {
        position: "absolute",
        width: "100%", 
        height: "100%",
        backgroundColor: "#FF969E",
        borderRadius:7
    },
    progress: {
        backgroundColor: "#C1E0F8",
        height: "100%",
        position: "relative",
        borderRadius: 7
    }
});