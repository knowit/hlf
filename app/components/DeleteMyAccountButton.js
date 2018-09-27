import {StyleSheet, TouchableHighlight, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors, {COMPONENT_SPACING} from "../settings/defaultStyles";
import SlimText from "./SlimText";
import React, {Component} from "react";

export default class LoginButton extends Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.signIn}
                onPress={() => this.props.onLoginButtonClicked() }
            >
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <MaterialCommunityIcons
                        name="login"
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
                        Logg Inn
                    </SlimText>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    signIn: {
        padding: COMPONENT_SPACING
    }
});
