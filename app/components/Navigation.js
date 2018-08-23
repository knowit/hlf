import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import MainScreen from "../containers/MainScreen";
import ModalScreen from '../containers/ModalScreen';
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

        console.log("this.props: ", this.props);
        console.log("user: ", this.props.user);
        console.log("pending: ", pending);
        console.log("isAuthenticated: ", isAuthenticated);
        console.log("hasCompletedInitialLoginAttempt: ", hasCompletedInitialLoginAttempt);

        if (!hasCompletedInitialLoginAttempt || pending) {
            return <Loading />;
        }

        if (!isAuthenticated) {
            return <LoginScreen auth0Success={this.props.onAuth0Success} />;
        }

        const Stack = createStackNavigator(
            {
                ModalScreen: {
                    screen: ModalScreen
                },
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
