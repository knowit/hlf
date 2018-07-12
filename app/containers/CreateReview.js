import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import properties from '../settings/propertyConfig';
import colors, { COMPONENT_SPACING, BORDER_RADIUS } from '../settings/defaultStyles';
import Entypo from '@expo/vector-icons/Entypo';
import AppText from '../components/AppText';
import Ionicons from '@expo/vector-icons/Ionicons';
import ViewContainer from '../components/ViewContainer';
import AppButton from '../components/AppButton';
import ReviewOption from '../components/ReviewOption';


export default class CreateReview extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetInputValues();
        this.onPropertyValueChange = this.onPropertyValueChange.bind(this);
    }
    render() {
        return (
            <ViewContainer heightAdjusting="auto">
                {properties.map(property => this.renderPropertyInput(property))}

                <AppButton><Entypo name="globe" />Publiser</AppButton>
                <AppButton onPress={() => this.setState(this.resetInputValues())} inverse={true}><Ionicons name="md-remove-circle" />Tøm felter</AppButton>

            </ViewContainer>
        )

    }

    renderPropertyInput(property) {
        const { value } = this.state[property.name]

        return (
            <View style={styles.property} key={property.name}>

                <AppText type="primary" size="large" alignment="center">{property.icon} {property.name}</AppText>
                <AppText type="secondary" size="medium" alignment="center">{property.description}</AppText>
                <View style={styles.iconRow}>
                    <ReviewOption onPress={() => this.onPropertyValueChange(property.name, 1)} id={1} value={value}><Entypo name="thumbs-up" /> Ja</ReviewOption>
                    <AppText type="secondary" size="xlarge" style={StyleSheet.flatten(styles.infoIcon)}>
                        <Ionicons name="ios-information-circle-outline" />
                    </AppText>
                    <ReviewOption onPress={() => this.onPropertyValueChange(property.name, 0)} id={0} value={value}>Nei <Entypo name="thumbs-down" /> </ReviewOption>
                </View>
                <TextInput
                    multiline={true}
                    numberOfLines={6}
                    style={styles.textArea}
                    placeholder="Skriv en kommentar..."
                    underlineColorAndroid={colors.transparentColor}
                    placeholderTextColor={colors.secondaryTextColor}
                    selectionColor={colors.primaryTextColor}
                    onChangeText={text => this.onCommentChange(property.name, text)}
                    value={this.state[property.name].comment}

                />


                <HorizontalRuler verticalMargin={COMPONENT_SPACING * 1.5} />
            </View>
        )
    }



    onPropertyValueChange(propertyName, selected) {
        const newValue = this.state[propertyName].value === selected ? undefined : selected;

        const nextState = { ...this.state[propertyName], value: newValue }
        this.setState({ [propertyName]: nextState })
    }

    onCommentChange(propertyName, text) {
        const nextState = { ...this.state[propertyName], comment: text };
        this.setState({ [propertyName]: nextState })
    }

    resetInputValues() {
        return properties
            .map(property => {
                return {
                    name: property.name,
                    value: undefined,
                    comment: ""
                }
            }
            ).reduce((obj, item) => {
                obj[item.name] = item
                return obj
            }, {})
    }

}

const styles = StyleSheet.create({

    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: COMPONENT_SPACING,
        padding: COMPONENT_SPACING

    },
    infoIcon: {
        marginHorizontal: COMPONENT_SPACING / 2
    },
    textArea: {
        backgroundColor: colors.secondaryBackgroundColor,
        borderRadius: BORDER_RADIUS,
        textAlignVertical: "top",
        fontSize: 19,
        padding: 10,
        color: colors.primaryTextColor,
        borderWidth: 1,
        borderColor: colors.primaryTextColor
    },
})

