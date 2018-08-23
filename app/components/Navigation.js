import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import MainScreen from "../containers/MainScreen";
import { default as VenueDetails } from "../containers/VenueDetails";
import Profile from "../containers/Profile";
import { connect } from "react-redux";
import Loading from "./Loading";
import { onAuth0Success, onAccessTokenInit, onSignOut } from "../actions/account";

import LoginScreen from "../containers/LoginScreen";

class Navigation extends Component {
    componentWillMount() {
        this.props.onAccessTokenInit();
    }
    render() {
        const {
            isAuthenticated,
            hasCompletedInitialLoginAttempt,
            pending,
        } = this.props;

        if (!hasCompletedInitialLoginAttempt || pending) {
            return <Loading />;
        }

        if (!isAuthenticated) {
            return <LoginScreen auth0Success={this.props.onAuth0Success} />;
        }

        const Stack = createStackNavigator(
            {
                MainScreen: {
                    screen: MainScreen
                },
                Details: {
                    screen: VenueDetails
                }
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
                    <Profile {...props} signout={this.props.onSignOut} />
                )
            }
        );
        return <Drawer />;
    }
}

export default connect(
    ({ user }) => ({ ...user }),
    { onAccessTokenInit, onAuth0Success, onSignOut }
)(Navigation);
