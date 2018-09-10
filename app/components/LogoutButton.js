import {StyleSheet, TouchableHighlight, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors, {COMPONENT_SPACING} from "../settings/defaultStyles";
import SlimText from "./SlimText";
import React, {Component} from "react";

export default class LogoutButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.signOut}
                onPress={() => this.props.onSignOut()}
            >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <MaterialCommunityIcons
                        name="logout"
                        size={24}
                        color={colors.primaryTextColor}
                    />
                    <SlimText
                        style={{
                            fontSize: 18,
                            color: colors.primaryTextColor,
                            marginLeft: 15
                        }}
                    >
                        Logg ut
                    </SlimText>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    signOut: {
        padding: COMPONENT_SPACING
    }
});
