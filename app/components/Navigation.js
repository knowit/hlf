import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import MainScreen from "../containers/MainScreen";
import { default as VenueDetails } from "../containers/VenueDetails";
import SidebarNavigation from "../containers/SidebarNavigation";
import { connect } from "react-redux";
import Loading from "./Loading";
import {
    onAuth0Success,
    onAccessTokenInit,
    onLoginViewRequested,
    onSignOut,
    onAuth0Cancelled
} from "../actions/account";

import LoginScreen from "../containers/LoginScreen";

class Navigation extends Component {
    componentWillMount() {
        this.props.onAccessTokenInit();
    }
    render() {
        const {
            showLoginScreen,
            hasCompletedInitialLoginAttempt,
            pending,
        } = this.props;

        if (!hasCompletedInitialLoginAttempt || pending) {
            return <Loading />;
        }

        if (showLoginScreen) {
            return <LoginScreen
                        auth0Success={this.props.onAuth0Success}
                        auth0Cancelled={this.props.onAuth0Cancelled}
            />;
        }

        const Stack = createStackNavigator(
            {
                MainScreen: { screen: MainScreen },
                Details: { screen: VenueDetails },
            },
            {
                headerMode: "none"
            }
        );

        const Drawer = createDrawerNavigator(
            {
                Stack: Stack
            },
            {
                contentComponent: props => (
                    <SidebarNavigation
                        {...props}
                        onLoginButtonClicked={this.props.onLoginViewRequested}
                        onSignOut={this.props.onSignOut}
                    />
                )
            }
        );
        return <Drawer />;
    }
}

export default connect(
    ({ user }) => ({ ...user }),
    { onAccessTokenInit, onAuth0Success, onLoginViewRequested, onSignOut, onAuth0Cancelled }
)(Navigation);
