import React from "react";
import { Image } from "react-native";
import propTypes from "prop-types";

const ProfileImage = ({ url }) => {
  return (
    <Image
      source={{ uri: url.replace("https//", "https://") }} // : missing from the uri provided by api
      style={{
        width: 45,
        height: 45,
        borderRadius: 10
      }}
    />
  );
};

ProfileImage.propTypes = {
  url: propTypes.string.isRequired
};

export default ProfileImage;
