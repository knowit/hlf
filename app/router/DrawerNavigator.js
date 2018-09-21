import {createDrawerNavigator} from "react-navigation";
import SidebarNavigation from "../containers/SidebarNavigation";
import React from "react";
import {createStackNavigator} from "react-navigation";
import MainScreenStackNavigator from './MainScreenStackNavigator';

import Auth from "../auth/Auth";

const auth = new Auth();


const DrawerNavigator = createDrawerNavigator(
    {
        Stack: MainScreenStackNavigator
    },
    {
        contentComponent: props => (
            <SidebarNavigation {...props} auth={auth} />
        )
    }
);

export default DrawerNavigator;