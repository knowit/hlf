import {StyleSheet, View} from "react-native";
import ProfileImage from "./ProfileImage";
import SlimText from "./SlimText";
import React, {Component} from "react";
import colors, {COMPONENT_SPACING} from "../settings/defaultStyles";

export default class Profile extends Component {

    render() {

        const { user } = this.props;

        return (
            <View style={styles.header}>
                <ProfileImage url={user.user.imageUrl} />
                <SlimText style={styles.name}>
                    {user.user.fornavn + " " + user.user.etternavn}
                </SlimText>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    header: {
        padding: COMPONENT_SPACING,
        paddingBottom: 0,
    },

    name: {
        paddingTop: 20,
        fontSize: 22,
        fontWeight: "400"
    },
});