import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import DrawerNavigator from '../router/DrawerNavigator';

import {
    onAccessTokenInit,
} from "../actions/account";

class Navigation extends Component {
    componentWillMount() {
        this.props.onAccessTokenInit();
    }
    render() {

        console.log(this.props);

        const {
            hasCompletedInitialLoginAttempt,
            pending,
        } = this.props;

        if (!hasCompletedInitialLoginAttempt || pending) {
            return <Loading />;
        }

        return <DrawerNavigator />;
    }
}

export default connect(
    ({ user }) => ({ ...user }),
    { onAccessTokenInit }
)(Navigation);
