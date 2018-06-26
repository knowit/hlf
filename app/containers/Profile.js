import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import DefaultText from '../components/DefaultText';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const demo = ["Operahuset i Oslo", "Vitus Apotek Storgata", "Deichmanske Bibliotek"];

export default class extends Component {

    render() {

        return (
            <           View style={styles.container}>
                <View style={[styles.profileComponent, styles.imgRow]}>
                    <Image style={styles.profileImage} source={require("../img/profileimg.jpeg")} />
                    <DefaultText>Rediger <MaterialCommunityIcons name="pencil" color="white" size={15} /></DefaultText>
                </View>

                <View style={styles.profileComponent}>
                    <DefaultText style={styles.header}>Navn Navnesen</DefaultText>
                    <Text style={styles.email}>navn@navnesen.com</Text>
                </View>
                <HorizontalRuler />

                <View style={[styles.profileComponent, styles.reviews]}>
                    <View style={styles.reviewHeader}>
                        <MaterialIcons name="rate-review" size={25} color="white" />
                        <DefaultText style={styles.reviewHeaderText}> Dine vurderinger</DefaultText>
                    </View>
                    {demo.map((item, index) => <DefaultText key={index} style={styles.review}>{item}</DefaultText>)}
                </View>
                <HorizontalRuler />
                <TouchableHighlight>
                    <View style={[styles.signoutWrap, styles.profileComponent]}>
                        <MaterialCommunityIcons name="logout" size={25} color="white" />
                        <DefaultText style={styles.signoutText}>Logg ut</DefaultText>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#31415A",
        paddingTop: 30,
    },
    imgRow: {
        flexDirection: "row",
        justifyContent: "space-between",

    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    reviews: {
        flex: 1,
        display: "flex",
    },
    profileComponent: {
        paddingHorizontal: 20
    },
    header: {
        marginTop: 20,
        fontSize: 23
    },
    email: {
        fontSize: 14,
        color: "#D4D4D4",
        marginBottom: 20
    },
    reviewHeader: {
        marginTop: 20,
        flexDirection: "row",
        alignItems: "center"
    },
    reviewHeaderText: {
        fontSize: 20,
        marginLeft: 5
    },
    signoutWrap: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20
    },
    signoutText: {
        fontSize: 18
    },
    review: {
        fontSize: 16,
        marginVertical: 4
    }
})
