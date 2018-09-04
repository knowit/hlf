import React, {Component} from "react";
import {
    StyleSheet,
    View,
    TouchableHighlight,
} from "react-native";
import HorizontalRuler from "../components/HorizontalRuler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ViewContainer from "../components/ViewContainer";
import {connect} from "react-redux";
import SlimText from "../components/SlimText";
import colors, {COMPONENT_SPACING} from "../settings/defaultStyles";
import ProfileImage from "../components/ProfileImage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ReviewList from "../components/ReviewList";

class Profile extends Component {
    render() {
        const {user} = this.props;
        const reviewHeading = "Dine vurderinger";

        return (
            <View heightAdjusting="flex" opaque={true} style={styles.container}>
                <View style={styles.header}>
                    <ProfileImage url={user.user.imageUrl} />
                    <SlimText style={styles.name}>
                        {user.user.fornavn + " " + user.user.etternavn}
                    </SlimText>
                </View>

                <HorizontalRuler verticalMargin={COMPONENT_SPACING}/>

                <View>
                    <View style={styles.reviews}>
                        <MaterialIcons
                            name="comment"
                            color={colors.primaryTextColor}
                            size={25}
                        />
                        <SlimText style={styles.reviewsHeading}>
                            { reviewHeading }
                        </SlimText>
                    </View>
                    <ReviewList/>
                </View>

                <ViewContainer
                    heightAdjusting="flex"
                    scrollable={true}
                    transparent={true}
                    style={{padding: 0}}
                />
                <HorizontalRuler/>
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.primaryBackgroundColor
    },
    header: {
        padding: COMPONENT_SPACING,
        paddingBottom: 0,
    },

    name: {
        paddingTop: 20,
        fontSize: 22,
        fontWeight: "400"
    },

    reviews: {
        padding: COMPONENT_SPACING,
        flexDirection: "row"
    },

    reviewsHeading: {
        paddingLeft: 12,
        paddingTop: -5,
        fontSize: 22,
        fontWeight: "400"
    },

    reviewHeader: {
        fontSize: 22,
        marginLeft: COMPONENT_SPACING
    },
    signOut: {
        padding: COMPONENT_SPACING
    }
});

export default connect(({user}) => ({user}))(Profile);
