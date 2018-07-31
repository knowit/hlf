import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import HorizontalRuler from "../components/HorizontalRuler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ViewContainer from "../components/ViewContainer";
import { AppButton } from "../components/AppButton";
import { connect } from "react-redux";
import SlimText from "../components/SlimText";
import colors, { COMPONENT_SPACING } from "../settings/defaultStyles";

class Profile extends Component {
  render() {
    const { user } = this.props;
    return (
      <View heightAdjusting="flex" opaque={true} style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: "https://" + user.user.imageUrl.substring(7) }}
            style={styles.image}
          />
          <SlimText style={styles.name}>
            {user.user.fornavn + " " + user.user.etternavn}
          </SlimText>
        </View>

        <HorizontalRuler verticalMargin={COMPONENT_SPACING} />
        <SlimText style={styles.reviewHeader}>
          <MaterialCommunityIcons name="comment-text-outline" />Dine vurderinger
        </SlimText>
        <ViewContainer
          heightAdjusting="flex"
          scrollable={true}
          transparent={true}
          style={{ padding: 0 }}
        />
        <HorizontalRuler />
        <AppButton onPress={() => this.props.signout()}>
          <MaterialCommunityIcons name="logout" /> Logg ut
        </AppButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryBackgroundColor
  },
  header: {
    flexDirection: "row",
    padding: COMPONENT_SPACING,
    paddingBottom: 0,
    alignItems: "center"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 10
  },
  name: {
    marginLeft: COMPONENT_SPACING,
    fontSize: 18,
    fontWeight: "400"
  },
  reviewHeader: {
    fontSize: 18,
    marginLeft: COMPONENT_SPACING
  }
});

export default connect(({ user }) => ({ user }))(Profile);
