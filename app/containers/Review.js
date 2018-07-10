import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import HorizontalRuler from '../components/HorizontalRuler';
import AppText from '../components/AppText';
import properties from '../settings/propertyConfig';
import colors, { COMPONENT_SPACING, sizes } from '../settings/defaultStyles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default class Review extends Component {
    constructor(props) {
        super(props);
        this.state = { showComments: false }
        this.toggleComments = this.toggleComments.bind(this);
    }

    render() {
        const { review } = this.props;
        return (
            <View style={styles.container}>
                <HorizontalRuler verticalMargin={15} horizontalMargin={COMPONENT_SPACING * -1} />
                <AppText type="secondary" size="medium">{review.date}</AppText>
                <AppText type="primary" size="large">{review.name}</AppText>

                <View style={styles.propertyList}>
                    {properties.map(property => this.renderProperty(property, review.properties[property.name]))}
                </View>
                <TouchableHighlight onPress={() => this.toggleComments()} style={{ width: "auto" }}>
                    <AppText type="secondary" size="large" style={StyleSheet.flatten(styles.toggleComments)}>
                        {this.state.showComments ? "Skjul kommentarer" : "Vis kommentarer"}<MaterialCommunityIcons name="chevron-down" />
                    </AppText>
                </TouchableHighlight>


            </View>
        )
    }

    renderProperty(property, review) {
        const size = "medium"
        return (
            <View key={property.name} style={styles.property}>
                <AppText type="primary" size={size}>{property.icon} {property.name}</AppText>
                {review.value
                    ? <Entypo style={styles.icon} name="thumbs-up" size={sizes[size]} color={colors.positiveColor} />
                    : <Entypo style={styles.icon} name="thumbs-down" size={sizes[size]} color={colors.negativeColor} />}
                {this.state.showComments && review.comment ? <AppText type="primary" size="medium" style={StyleSheet.flatten(styles.comment)}>{review.comment}</AppText>: null}
            </View>
        )
    }

    toggleComments() {
        this.setState({ showComments: !this.state.showComments })
    }

}


const styles = StyleSheet.create({
    container: {
        padding: COMPONENT_SPACING
    },
    comment: {
        fontStyle: "italic",
        width: "100%",
    },
    propertyList: {
        backgroundColor: colors.secondaryBackgroundColor,
        marginVertical: 10,
        borderRadius: 10
    },
    property: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingLeft: COMPONENT_SPACING,
        margin: 10,
        justifyContent: "space-between",
        width: 200

    },
    icon: {
        marginLeft: 10
    },
    toggleComments: {
        borderColor: colors.secondaryTextColor,
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "flex-start",
        paddingHorizontal: COMPONENT_SPACING,
        paddingVertical: COMPONENT_SPACING / 3

    },

})