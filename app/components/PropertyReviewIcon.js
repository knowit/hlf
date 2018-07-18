import React from "react";
import Proptypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors from "../settings/defaultStyles";

const PropertyReviewIcon = ({ positive, size, hidden }) => {
  return (
    <MaterialIcons
      name={positive ? "thumb-up" : "thumb-down"}
      color={positive ? colors.positiveColor : colors.negativeColor}
      size={size}
      style={{ opacity: !hidden ? 1 : 0 }}
    />
  );
};

PropertyReviewIcon.propTypes = {
  positive: Proptypes.bool.isRequired,
  size: Proptypes.number.isRequired,
  hidden: Proptypes.bool
};

export default PropertyReviewIcon;
