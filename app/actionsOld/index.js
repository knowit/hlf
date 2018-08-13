export * from "./venueActions";
export * from "./userAction";
export * from "./reviewListActions";
export * from "./createReview";

import { AsyncStorage } from "react-native";

export const fetchAccessToken = async () => {
  return AsyncStorage.getItem("access_token").then(result => result);
};
