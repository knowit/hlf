import React, { Component } from 'react';
import { View, TouchableHighlight, StyleSheet, TextInput } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import properties from '../settings/propertyConfig';
import colors, { COMPONENT_SPACING } from '../settings/defaultStyles';
import Entypo from '@expo/vector-icons/Entypo';
import AppText from '../components/AppText';
import Ionicons from '@expo/vector-icons/Ionicons';





export default class CreateReview extends Component {
    constructor(props) {
        super(props);
        this.state = this.resetInputValues();
            


    }
    render() {
        return (
            <View style={styles.container}>
                {properties.map(property => this.renderPropertyInput(property))}

                <TouchableHighlight style={[styles.button, styles.submitButton]}>
                    <AppText type="inverse" size="xlarge" style={{ textAlign: "center" }}><Entypo name="globe" />Publiser</AppText>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.button, styles.resetButton]} onPress={() => this.setState(this.resetInputValues())}>
                    <AppText type="primary" size="large" style={{ textAlign: "center" }}><Ionicons name="md-remove-circle" />Tøm felter</AppText>
                </TouchableHighlight>
            </View>
        )

    }

    renderPropertyInput(property) {
        const { value } = this.state[property.name]
        return (
            <View style={styles.property} key={property.name}>

                <AppText type="primary" size="large" style={{ textAlign: "center" }}>{property.icon} {property.name}</AppText>
                <AppText type="secondary" size="medium" style={{ textAlign: "center" }}>{property.description}</AppText>
                <View style={styles.iconRowWrap}>
                    <View style={styles.iconRow}>
                        <TouchableHighlight onPress={() => this.changePropertyValue(property.name, 1)} style={[styles.valueOption, value === 1 ? styles.positiveIsSelected : {},]} >
                            <AppText type={value === undefined ? "primary" : value === 1 ? "positive" : "secondary"} size="xlarge">
                                <Entypo name="thumbs-up" /> Ja
                            </AppText>
                        </TouchableHighlight>
                        <AppText type="secondary" size="large" style={StyleSheet.flatten(styles.infoIcon)}>
                            <Ionicons name="ios-information-circle-outline" />
                        </AppText>
                        <TouchableHighlight onPress={() => this.changePropertyValue(property.name, 0)} style={[styles.valueOption, value === 0 ? styles.negativeIsSelected : {},]} >
                            <AppText type={value === undefined ? "primary" : value === 0 ? "negative" : "secondary"} size="xlarge">
                                Nei <Entypo name="thumbs-down" />
                            </AppText>
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.commentWrap}>
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
                </View>

                <HorizontalRuler horizontalMargin={COMPONENT_SPACING * -1} verticalMargin={COMPONENT_SPACING * 1.5} />
            </View>
        )
    }

    changePropertyValue(propertyName, selected) {
        const newValue = this.state[propertyName].value === selected ? undefined : selected;

        const nextState = { ...this.state[propertyName], value: newValue }
        this.setState({ [propertyName]: nextState })
    }

    onCommentChange(propertyName, text){
        const nextState = {...this.state[propertyName], comment: text};
        this.setState({[propertyName]: nextState})
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
    container: {
        alignItems: "stretch",
        padding: COMPONENT_SPACING
    },

    iconRowWrap: {
        alignItems: "center",
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: COMPONENT_SPACING,

    },
    valueOption: {
        paddingHorizontal: COMPONENT_SPACING,
        paddingVertical: COMPONENT_SPACING / 3,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.transparentColor
    },
    positiveIsSelected: {
        borderColor: colors.positiveColor
    },
    negativeIsSelected: {
        borderColor: colors.negativeColor

    },
    infoIcon: {
        marginHorizontal: COMPONENT_SPACING / 2
    },
    textArea: {
        backgroundColor: colors.secondaryBackgroundColor,
        borderRadius: 10,
        textAlignVertical: "top",
        fontSize: 19,
        padding: 10,
        color: colors.primaryTextColor,
        borderWidth: 1,
        borderColor: colors.primaryTextColor
    },
    button: {
        marginVertical: 5,
        borderRadius: 5,
        paddingVertical: COMPONENT_SPACING

    },
    submitButton: {
        backgroundColor: colors.primaryTextColor,
    },
    resetButton: {
        backgroundColor: colors.secondaryBackgroundColor
    }
})