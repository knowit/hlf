import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HorizontalRuler from "../components/HorizontalRuler";
import AppText from "../components/AppText";
import properties from "../settings/propertyConfig";
import {
  COMPONENT_SPACING,
  colors,
  BORDER_RADIUS
} from "../settings/defaultStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ViewContainer from "../components/ViewContainer";
import SlimText from "../components/SlimText";
import PropertyTitle from "../components/PropertyTitle";

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = { showComments: false };
    this.toggleComments = this.toggleComments.bind(this);
  }

  render() {
    const { review } = this.props;
    return (
      <ViewContainer>
        <SlimText style={{ fontSize: 16 }}>{review.date}</SlimText>
        <SlimText style={{ marginBottom: 15, fontSize: 20 }}>
          {review.name}
        </SlimText>
        {properties.map(property =>
          this.renderProperty(property, review.properties[property.name])
        )}
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
    const { value } = review;
    return (
      <View key={property.name}>
        <View style={[styles.row, styles.property]}>
          <PropertyTitle property={property} size={22} style={{ flex: 1 }} />
          <MaterialIcons
            name={value ? "thumb-up" : "thumb-down"}
            color={value ? colors.positiveColor : colors.negativeColor}
            size={23}
          />
        </View>
        {this.state.showComments && review.comment ? (
          <SlimText
            style={{
              fontStyle: "italic",
              fontSize: 22,
              marginBottom: COMPONENT_SPACING
            }}
          >
            {review.comment}
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
