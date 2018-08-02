import React, { Component } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import properties from "../settings/propertyConfig";
import { COMPONENT_SPACING, colors } from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import SlimText from "../components/SlimText";
import PropertyTitle from "../components/PropertyTitle";
import ProfileImage from "../components/ProfileImage";
import _ from "lodash";
import HorizontalRuler from "../components/HorizontalRuler";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = { showComments: false };
    this.toggleComments = this.toggleComments.bind(this);
  }

  render() {
    const { review } = this.props;
    const { fornavn, etternavn, imageUrl } = review.registrator;

    return (
      <ViewContainer>
        <HorizontalRuler style={{ marginBottom: COMPONENT_SPACING }} />
        <View style={styles.headerWrap}>
          <ProfileImage url={imageUrl} />
          <View style={styles.nameWrap}>
            <SlimText style={{ fontSize: 16 }}>{review.dato}</SlimText>
            <SlimText style={{ marginBottom: 15, fontSize: 20 }}>
              {fornavn + " " + etternavn}
            </SlimText>
          </View>
        </View>
        {Object.keys(review.vurderinger).map(key => {
          const propertyReview = review.vurderinger[key];
          const capitalKey = key.charAt(0).toUpperCase() + key.slice(1);

          return this.renderProperty(
            properties.filter(prop => prop.name === capitalKey)[0],
            propertyReview
          );
        })}

        <TouchableHighlight onPress={() => this.toggleComments()}>
          <View style={[styles.row, styles.toggleComments]}>
            <SlimText style={{ fontSize: 20 }}>
              {!this.state.showComments
                ? "Vis kommentarer"
                : "Skjul kommentarer"}
            </SlimText>
            <MaterialIcons
              name={this.state.showComments ? "expand-less" : "expand-more"}
              size={32}
              color={colors.primaryTextColor}
            />
          </View>
        </TouchableHighlight>
      </ViewContainer>
    );
  }

  renderProperty(property, review) {
    const { rangering } = review;
    return (
      <View key={property.name}>
        <View style={[styles.row, styles.property]}>
          <PropertyTitle property={property} size={22} style={{ flex: 1 }} />
          <MaterialIcons
            name={rangering ? "thumb-up" : "thumb-down"}
            color={rangering ? colors.positiveColor : colors.negativeColor}
            size={23}
          />
        </View>
        {this.state.showComments && review.kommentar ? (
          <SlimText
            style={{
              fontStyle: "italic",
              fontSize: 22,
              marginBottom: COMPONENT_SPACING
            }}
          >
            {review.kommentar}
          </SlimText>
        ) : null}
      </View>
    );
  }

  toggleComments() {
    this.setState({ showComments: !this.state.showComments });
  }
}

const styles = StyleSheet.create({
  comment: {
    fontStyle: "italic",
    width: "100%"
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  nameWrap: {
    flex: 1,
    marginLeft: COMPONENT_SPACING,
    justifyContent: "center"
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: 250
  },
  property: {
    flexWrap: "wrap",
    marginVertical: 10
  },
  toggleComments: {
    backgroundColor: colors.secondaryBackgroundColor,
    borderRadius: 15,
    justifyContent: "center",
    marginTop: COMPONENT_SPACING,
    paddingVertical: 15
  }
});
