import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import DefaultText from '../components/DefaultText';
import IconText from '../components/IconText';
import SecondaryText from '../components/SecondaryText';
import HeaderText from '../components/HeaderText';
import colors, {COMPONENT_SPACING} from '../settings/defaultStyles';

const demo = ["Operahuset i Oslo", "Vitus Apotek Storgata", "Deichmanske Bibliotek"];

export default class extends Component {

    render() {

        return (
            <View style={styles.container}>

                <HeaderText>Navn navnesen</HeaderText>
                <SecondaryText>epost@epost.com</SecondaryText>

                <HorizontalRuler horizontalMargin={COMPONENT_SPACING * -1} verticalMargin={COMPONENT_SPACING} />

                <View style={styles.reviews}>
                    <IconText text="Dine vurderinger" iconSettings={{ iconLibrary: "materialIcons", iconName: "rate-review" }} size={25} />

                    {demo.map((item, index) => <DefaultText key={index} style={styles.review}>{item}</DefaultText>)}
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
