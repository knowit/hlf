import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import PropertyTitle from '../components/IconText';
import DefaultText from '../components/DefaultText';
import { Entypo } from '@expo/vector-icons';

export default class CreateReview extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        const propertyInput = [
            { name: "Lydforhold", description: "Kan du føre samtale i rommet?" },
            { name: "Lydutjevning", description: "Finnes det mikrofon og høytalere?" },
            { name: "Teleslynge", description: "Er det teleslynge om virker?" },
            { name: "Informasjon", description: "Er det informasjon på stedet om lydutstyr?" },
        ]
        return (
            <View>
                {propertyInput.map(property => this.renderPropertyInput(property))}
                <Button onPress={() => console.log("ok")} title="Publiser" />
                <Button onPress={() => console.log("ok")} title="Tøm felter" />
            </View>

        )
    }

    renderPropertyInput({ name, description }) {
        return (
            <View key={name}>
                <HorizontalRuler />
                <View style={styles.propertyList}>
                    <PropertyTitle name={name} alignment="center" />
                    <DefaultText style={styles.centeredText}>{description}</DefaultText>
                    <View style={styles.iconRow}>
                        <Entypo name="thumbs-up" size={20} color="rgb(193, 224, 248)" />
                        <Entypo name="info-with-circle" size={20} color="#A4A4A4" />
                        <Entypo name="thumbs-down" size={20} color="rgb(255, 150, 158)" />
                    </View>
                    <TextInput
                        numberOfLines={4}
                        multiline={true}
                        style={styles.textArea}
                        selectionColor="white" u
                        nderlineColorAndroid="rgba(0,0,0,0)"
                        placeholder="Skriv en kommentar..."
                        placeholderTextColor="#A4A4A4" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    propertyList: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        alignItems: "center",
    },
    textArea: {
        backgroundColor: "#192841",
        borderWidth: 1,
        borderColor: "#A4A4A4",
        color: "white",
        textAlignVertical: "top",
        padding: 10,
        width: "100%",
    },
    centeredText: {
        textAlign: "center",
    },
    iconRow: {
        flexDirection: "row",
        width: "75%",
        justifyContent: "space-between",
    }
})