import {createStackNavigator} from "react-navigation";
import MainScreen from "../containers/MainScreen";
import {default as VenueDetails} from "../containers/VenueDetails";
import Auth from "../auth/Auth";

const auth = new Auth();

const MainScreenStackNavigator = createStackNavigator(
    {
        MainScreen: {
            screen: MainScreen,
            navigationOptions: {
                auth,
            }
        },
        Details: {
            screen: VenueDetails,
            navigationOptions: {
                auth,
            }
        },
    },
    {
        headerMode: "none"
    }
);

export default MainScreenStackNavigator;

