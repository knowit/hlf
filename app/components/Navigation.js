import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import MainScreen from "../containers/MainScreen";
import { default as VenueDetails } from "../containers/VenueDetails";
import Profile from "../containers/Profile";
import { connect } from "react-redux";
import Loading from "./Loading";
import { auth0Success, accessTokenInit, signOut } from "../actions/";

import LoginScreen from "../containers/LoginScreen";

class Navigation extends Component {
    componentWillMount() {
        this.props.accessTokenInit();
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
            return <LoginScreen auth0Success={this.props.auth0Success} />;
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
                    <Profile {...props} signout={this.props.signOut} />
                )
            }
        );
        return <Drawer />;
    }
}

export default connect(
    ({ user }) => ({ ...user }),
    { accessTokenInit, auth0Success, signOut }
)(Navigation);
