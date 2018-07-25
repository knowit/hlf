export * from "./venueActions";
export * from "./userAction";
export * from "./reviewListActions";

import { AsyncStorage } from "react-native";

export const fetchAccessToken = async () => {
  return AsyncStorage.getItem("access_token").then(result => result);
};
