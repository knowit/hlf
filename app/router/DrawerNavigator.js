import {createDrawerNavigator} from "react-navigation";
import SidebarNavigation from "../containers/SidebarNavigation";
import React from "react";
import {createStackNavigator} from "react-navigation";
import MainScreen from "../containers/MainScreen";
import {default as VenueDetails} from "../containers/VenueDetails";
import Auth from "../auth/Auth";

const auth = new Auth();

const MainScreenStackNavigator = createStackNavigator(
    {
        MainScreen: {
            screen: MainScreen,
        },
        Details: {
            screen: VenueDetails,
        },
    },
    {
        headerMode: "none"
    }
);


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