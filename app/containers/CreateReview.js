import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import IconText from '../components/IconText';
import { Entypo } from '@expo/vector-icons';
import properties from '../settings/propertyConfig';
import colors from '../settings/defaultStyles';
import AppText from '../components/AppText';



export default class CreateReview extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View style={styles.container}> 
                {Object.keys(properties).map(property => this.renderPropertyInput(property))}
                <Button onPress={() => console.log("ok")} title="Publiser" />
                <Button onPress={() => console.log("ok")} title="Tøm felter" />
            </View>

        )

    }

    renderPropertyInput(property) {
        const propertyInfo = properties[property];
        return (
            <View key={property} style={styles.property}>
                <HorizontalRuler horizontalMargin={screenPadding * -1} />
                <View style={styles.propertyList}>
                    <IconText text={property} iconSettings={propertyInfo} />
                    <AppText type="primary" >{propertyInfo.description}</AppText>
                    <View style={styles.iconRow}>
                        <Entypo name="thumbs-up" size={20} color={colors.positiveColor} />
                        <Entypo name="info-with-circle" size={20} color={colors.secondaryTextColor} />
                        <Entypo name="thumbs-down" size={20} color={colors.negativeColor} />
                    </View>
                    <TextInput
                        numberOfLines={4}
                        multiline={true}
                        style={styles.textArea}
                        selectionColor={colors.primaryTextColor} 
                        underlineColorAndroid={colors.transparentColor}
                        placeholder="Skriv en kommentar..."
                        placeholderTextColor={colors.secondaryTextColor} />
                </View>
            </View>
        )
    }
}
const screenPadding = 20;
const styles = StyleSheet.create({
    container: {
        padding: screenPadding
    },  
    propertyList: {
        alignItems: "center",
        paddingVertical: screenPadding
    },
    textArea: {
        backgroundColor: colors.secondaryBackgroundColor,
        borderWidth: 1,
        borderColor: colors.secondaryTextColor,
        color: colors.primaryTextColor,
        textAlignVertical: "top",
        padding: 10,
        width: "100%",
    },
    centeredText: {
        textAlign: "center",
    },
    iconRow: {
        flexDirection: "row",
        width: "10%",
        justifyContent: "space-between",
        paddingVertical: screenPadding
    }
})