import React, {Component} from "react";
import {
    StyleSheet,
    View,
} from "react-native";
import HorizontalRuler from "../components/HorizontalRuler";
import ViewContainer from "../components/ViewContainer";
import {connect} from "react-redux";
import colors, {COMPONENT_SPACING} from "../settings/defaultStyles";
import ReviewList from "../components/ReviewList";
import Profile from "../components/Profile";
import LogoutButton from "../components/LogoutButton";
import LoginButton from "../components/LoginButton";

class SidebarNavigation extends Component {
    render() {
        const { user, onSignOut, onLoginButtonClicked } = this.props;

        if(user.isAuthenticated) {
            return (
                <View heightAdjusting="flex" opaque={true} style={styles.container}>
                    <Profile user={user} />
                    <HorizontalRuler verticalMargin={COMPONENT_SPACING}/>
                    <ReviewList />

                    <ViewContainer
                        heightAdjusting="flex"
                        scrollable={true}
                        transparent={true}
                        style={{padding: 0}}
                    />
                    <HorizontalRuler/>
                    <LogoutButton onSignOut={ onSignOut }/>
                </View>
            );
        }

        return (
            <View heightAdjusting="flex" opaque={true} style={styles.container}>
                <ViewContainer
                    heightAdjusting="flex"
                    scrollable={true}
                    transparent={true}
                    style={{padding: 0}}
                />
                <HorizontalRuler/>
                <LoginButton onLoginButtonClicked={ onLoginButtonClicked }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.primaryBackgroundColor
    },
});

export default connect(({user}) => ({user}))(SidebarNavigation);
