import React from "react";
import {
  Image,
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from "react-native";
import { API_KEY } from "../credentials";
import { colors } from "../settings/defaultStyles";
import AppText from "./AppText";
import { Ionicons } from "@expo/vector-icons";

export default ({ photoReference, onBackPress }) => {
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${API_KEY}`;
  return (
    <View>
      <Image style={styles.image} source={{ uri: photoUrl }} />
      <TouchableHighlight
        style={styles.backButton}
        onPress={() => onBackPress()}
      >
        <AppText type="primary" size="xlarge">
          <Ionicons name="ios-arrow-back" />
        </AppText>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 200
  },
  backButton: {
    top: 20,
    left: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.transparentPrimaryBackGround
  }
});
