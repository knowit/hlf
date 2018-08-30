import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
} from "react-native";
import colors, {COMPONENT_SPACING} from "../settings/defaultStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default class ReviewListItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {

        const { review } = this.props;

        return (
            <View style={styles.reviewListLine}>
                <Text style={styles.reviewText}>{ review.sted.name }</Text>
                <TouchableHighlight
                    onPress={this._onPress}>
                    <MaterialCommunityIcons
                        name="delete"
                        size={24}
                        color={colors.primaryTextColor}
                        style={styles.reviewIcon}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    reviewText: {
        fontSize: 18,
        color: colors.primaryTextColor,
        marginLeft: 15,
        paddingTop: 14,
        alignItems: "flex-start",
    },

    reviewListLine: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    reviewIcon: {
        paddingTop: 14,
        marginRight: 15,
        alignItems: "flex-end",
    },

});