import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import IconText from '../components/IconText';
import colors, { COMPONENT_SPACING } from '../settings/defaultStyles';
import AppText from '../components/AppText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const demo = ["Operahuset i Oslo", "Vitus Apotek Storgata", "Deichmanske Bibliotek"];

export default class extends Component {

    render() {
        //<IconText text="Dine vurderinger" iconSettings={{ iconLibrary: "materialIcons", iconName: "rate-review" }} size={25} />
        return (
            <View style={styles.container}>

                <AppText type="header">Navn Navnesen</AppText>
                <AppText type="secondary">epost@epost.com</AppText>

                <HorizontalRuler horizontalMargin={COMPONENT_SPACING * -1} verticalMargin={COMPONENT_SPACING} />
                <AppText type="header"><MaterialIcons name="rate-review"/>Dine vurderinger</AppText>
                <View style={styles.reviews}>
                    

                    {demo.map((item, index) => <AppText key={index} type="primary">{item}</AppText>)}
                </View>
                <HorizontalRuler horizontalMargin={COMPONENT_SPACING * -1} />
                <TouchableHighlight style={{ paddingVertical: COMPONENT_SPACING }} onPress={() => console.log("logout")}>
                    <IconText text="Logg ut" iconSettings={{ iconLibrary: "materialCommunityIcons", iconName: "logout" }} />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
        paddingTop: COMPONENT_SPACING,
        paddingHorizontal: COMPONENT_SPACING
    },
    reviews: {
        flex: 1,
    },
    review: {
        fontSize: 16,
        marginVertical: 4
    }
})
