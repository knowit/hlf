import {createStackNavigator} from "react-navigation";
import MainScreen from "../containers/MainScreen";
import {default as VenueDetails} from "../containers/VenueDetails";

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

export default MainScreenStackNavigator;

