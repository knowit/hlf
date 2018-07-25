import React from "react";
import { View, StyleSheet } from "react-native";
import SlimText from "./SlimText";
import { COMPONENT_SPACING, colors } from "../settings/defaultStyles";
import PropTypes from "prop-types";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const VenueContactInfo = ({
  name,
  formatted_address,
  formatted_phone,
  style
}) => {
  return (
    <View style={style}>
      <SlimText style={styles.name} numberOfLines={2}>
        {name}
      </SlimText>

      {formatted_address ? (
        <SlimText style={styles.secondaryInfo} numberOfLines={1}>
          {formatted_address}
        </SlimText>
      ) : null}

      {formatted_phone ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: COMPONENT_SPACING
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 5
            }}
          >
            <MaterialIcons
              name="call"
              color={colors.primaryBackgroundColor}
              size={19}
            />
          </View>
          <SlimText
            style={[styles.secondaryInfo, { fontSize: 19 }]}
            numberOfLines={1}
          >
            {formatted_phone}
          </SlimText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 22,
    maxHeight: 60,
    fontWeight: "bold"
  },
  secondaryInfo: {
    fontSize: 16
  }
});

VenueContactInfo.propTypes = {
  name: PropTypes.string,
  formatted_address: PropTypes.string,
  formatted_phone: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default VenueContactInfo;
