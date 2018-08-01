import React from "react";
import { Image } from "react-native";

export default ({ url }) => {
  return (
    <Image
      source={{ uri: url.replace("https//", "https://") }}
      style={{
        width: 45,
        height: 45,
        borderRadius: 10
      }}
    />
  );
};
