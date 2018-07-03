import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import DefaultText from '../components/DefaultText';
import PropertyTitle from '../components/IconText';
import { Entypo } from '@expo/vector-icons';
import HorizontalRuler from '../components/HorizontalRuler';

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
                <HorizontalRuler  />
                <View style={styles.header}>
                    <Image style={styles.image} source={require("../img/profileimg.jpeg")} />
                    <View style={styles.nameWrap}>
                        <DefaultText>{review.date}</DefaultText>
                        <DefaultText style={styles.name}>{review.name}</DefaultText>
                    </View>
                </View>
                {this.renderProperties(review.properties)}
                <TouchableHighlight onPress={() => this.toggleComments()} style={{width: "auto"}}>
                    <Text style={styles.toggleComments}>{this.state.showComments ? "Skjul" : "Vis"} kommentarer</Text>
                </TouchableHighlight>


            </View>
        )
    }

    renderProperties(properties) {
        return (
            <View style={styles.propertyList}>
                {this.renderProperty("Lydforhold", properties.soundCondition)}
                {this.renderProperty("Teleslynge", properties.remote)}
                {this.renderProperty("Lydutjevning", properties.smoothing)}
                {this.renderProperty("Informasjon", properties.information)}
            </View>
        )
    }

    renderProperty(name, value) {
        return (
            <View>
                <View style={styles.property}>
                    <PropertyTitle name={name} />
                    {value.value
                        ? <Entypo name="thumbs-up" size={20} color={`rgb(193, 224, 248)`} />
                        : <Entypo name="thumbs-down" size={20} color={`rgb(255, 150, 158)`} />}
                </View>
                {this.state.showComments && value.comment ? <DefaultText style={styles.comment}>{value.comment}</DefaultText> : null}

            </View>
        )
    }

    toggleComments() {
        this.setState({ showComments: !this.state.showComments })
    }


}


const styles = StyleSheet.create({
    container: {
        marginBottom: 20

    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 20
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 5
    },
    nameWrap: {
        flex: 1,
        marginLeft: 15
    },
    name: {
        fontSize: 17,
    },
    comment: {
        fontStyle: "italic",
        width: "100%",
        paddingHorizontal: 20, 
        paddingVertical: 10,
        marginLeft: 20

    },
    propertyList: {
        marginVertical: 8,
        paddingHorizontal: 20
    },

    property: {
        flexDirection: "row",
        padding: 8,
        justifyContent: "flex-start"
    },
    toggleComments: {
        color: "#A4A4A4",
        width: "auto",
        borderColor: "#A4A4A4",
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: "flex-start"

    }

})