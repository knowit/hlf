import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import MainScreen from "../containers/MainScreen";
import VenueDetails from "../containers/VenueDetails";
import Profile from "../containers/Profile";
import { connect } from "react-redux";
import Loading from "./Loading";
import { auth0Success, accessTokenInit, signOut } from "../actions/";

import LoginScreen from "../containers/LoginScreen";

class Navigation extends Component {
    componentWillMount() {
        console.log("Inside componentWillMount ");
        this.props.checkAsyncStorageForAccessToken();
    }
    render() {
        const {
            isAuthenticated,
            hasCompletedInitialLoginAttempt,
            pending,
        } = this.props;

        console.log("isAuthenticated: ", isAuthenticated);
        console.log("hasCompletedInitialLoginAttempt: ", hasCompletedInitialLoginAttempt);
        console.log("pending: ", pending);

        if (!hasCompletedInitialLoginAttempt) {
            console.log("!hasCompletedInitialLoginAttempt");
            return <Loading />;
        }

        if (pending) {
            console.log("pending");
            return <Loading />;
        }

        if (!isAuthenticated) {
            console.log("!isAuthenticated");
            return <LoginScreen auth0Success={this.props.auth0Success} />;
        }

        console.log("hasCompletedInitialLoginAttempt && isAuthenticated");

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

const mapStateToProps = state => ({
    user: state.user.user,
    isAuthenticated: state.user.isAuthenticated,
    pending: state.user.pending,
    hasCompletedInitialLoginAttempt: state.user.hasCompletedInitialLoginAttempt
});

const mapDispatchToProps = dispatch => ({

    checkAsyncStorageForAccessToken: () => {
        dispatch(accessTokenInit());
    },

    auth0Success: (credentials) => {
        dispatch(auth0Success(credentials));
    },

    signOut: () => {
        dispatch(signOut());
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
