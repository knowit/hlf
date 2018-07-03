import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import DefaultText from '../components/DefaultText';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import IconText from '../components/IconText';
import SecondaryText from '../components/SecondaryText';
import HeaderText from '../components/HeaderText';

const demo = ["Operahuset i Oslo", "Vitus Apotek Storgata", "Deichmanske Bibliotek"];
const horizontalPadding = 20;
export default class extends Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.imgRow}>
                    <Image style={styles.profileImage} source={require("../img/profileimg.jpeg")} />
                    <IconText text="Rediger" iconSettings={{ iconLibrary: "materialCommunityIcons", iconName: "pencil" }} size={14} reversedOrder={true} />
                </View>

                <HeaderText>Navn navnesen</HeaderText>
                <SecondaryText>epost@epost.com</SecondaryText>

                <HorizontalRuler horizontalMargin={horizontalPadding * -1} />

                <View style={styles.reviews}>
                    <IconText text="Dine vurderinger" iconSettings={{ iconLibrary: "materialIcons", iconName: "rate-review" }} size={25} />

                    {demo.map((item, index) => <DefaultText key={index} style={styles.review}>{item}</DefaultText>)}
                </View>
                <HorizontalRuler horizontalMargin={horizontalPadding * -1} />
                <TouchableHighlight style={{paddingVertical: 20}} onPress={() => console.log("logout")}> 
                    <IconText text="Logg ut" iconSettings={{ iconLibrary: "materialCommunityIcons", iconName: "logout" }} />
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
        paddingHorizontal: horizontalPadding
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
    },
    header: {
        marginTop: 20,
        fontSize: 23
    },
    review: {
        fontSize: 16,
        marginVertical: 4
    }
})
