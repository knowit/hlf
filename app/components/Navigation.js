import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import MainScreen from "../containers/MainScreen";
import VenueDetails from "../containers/VenueDetails";
import Profile from "../containers/Profile";
import { connect } from "react-redux";
import Loading from "./Loading";
import { auth0Success, accountInformationRequested, signOut } from "../actions/";

import LoginScreen from "../containers/LoginScreen";

class Navigation extends Component {
  componentWillMount() {
      console.log("Inside componentWillMount ");
      this.props.accountInformationRequested();
  }
  render() {
    const {
        auth0Success,
        accountInformationRequested,
        isAuthenticated,
        hasCompletedInitialLoginAttempt,
    } = this.props;

    if (!hasCompletedInitialLoginAttempt) {
        console.log("!hasCompletedInitialLoginAttempt");
        return <Loading />;
    }
    if (!isAuthenticated) {
        console.log("!isAuthenticated");
        return <LoginScreen auth0Success={auth0Success} />;
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
          <Profile {...props} signout={this.props.signout} />
        )
      }
    );
    return <Drawer />;
  }
}

export default connect(
  ({ user }) => ({ ...user }),
  { accountInformationRequested, auth0Success, signOut }
)(Navigation);
