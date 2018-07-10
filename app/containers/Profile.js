import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import HorizontalRuler from '../components/HorizontalRuler';
import colors, { COMPONENT_SPACING } from '../settings/defaultStyles';
import AppText from '../components/AppText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const demo = ["Operahuset i Oslo", "Vitus Apotek Storgata", "Deichmanske Bibliotek"];

export default class extends Component {

    render() {
        return (
            <View style={styles.container}>
                <AppText type="primary" size="large">Navn Navnesen</AppText>
                <AppText type="secondary" size="medium">epost@epost.com</AppText>

                <HorizontalRuler horizontalMargin={COMPONENT_SPACING * -1} verticalMargin={COMPONENT_SPACING} />
                <AppText type="primary" size="xlarge"> <MaterialCommunityIcons name="comment-text-outline"/>Dine vurderinger</AppText>
                <View style={styles.reviews}>
                    
                    {demo.map((item, index) => <AppText key={index} type="primary" size="medium">{item}</AppText>)}
                </View>
                <HorizontalRuler horizontalMargin={COMPONENT_SPACING * -1} />
                <TouchableHighlight style={{ paddingVertical: COMPONENT_SPACING }} onPress={() => console.log("logout")}>
                    <AppText type="primary" size="xlarge"><MaterialCommunityIcons name="logout"/> Logg ut</AppText>
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
