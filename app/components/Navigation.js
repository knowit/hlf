import React, { Component } from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import MainScreen from "../containers/MainScreen";
import VenueDetails from "../containers/VenueDetails";
import Profile from "../containers/Profile";
import { connect } from "react-redux";
import Loading from "./Loading";
import { checkOfflineStorage, loginSuccessful, signout } from "../actions/";
import LoginScreen from "../containers/LoginScreen";

class Navigation extends Component {
  componentWillMount() {
    this.props.checkOfflineStorage();
  }
  render() {
    const {
      isAuthenticated,
      hasCompletedInitialLoginAttempt,
      loginSuccessful
    } = this.props;
    if (!hasCompletedInitialLoginAttempt) return <Loading />;
    if (!isAuthenticated)
      return <LoginScreen loginSuccessful={loginSuccessful} />;

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
  { checkOfflineStorage, loginSuccessful, signout }
)(Navigation);
