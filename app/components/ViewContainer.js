import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import colors, { COMPONENT_SPACING } from "../settings/defaultStyles";
import PropTypes from "prop-types";

const ViewContainer = ({
  children,
  flex,
  style,
  opaque,
  padding,
  scrollable,
  keyboardAware,
}) => {
  const Component = scrollable ? keyboardAware ? KeyboardAwareScrollView : ScrollView : View;

  return (
    <Component
      style={[
        opaque ? styles.opaque : null,
        flex ? styles.flex : null,
        padding != undefined ? { padding: padding } : styles.padding,
        style
      ]}
    >
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  opaque: {
    backgroundColor: colors.primaryBackgroundColor
  },
  flex: {
    flex: 1
  },
  padding: {
    padding: COMPONENT_SPACING
  }
});

ViewContainer.propTypes = {
  flex: PropTypes.bool,
  style: PropTypes.object,
  opaque: PropTypes.bool,
  scrollable: PropTypes.bool,
  padding: PropTypes.number
};

export default ViewContainer;
