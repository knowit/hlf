import React, { Component } from "react";
import { StyleSheet } from "react-native";
import properties from "../settings/propertyConfig";
import colors, {
  COMPONENT_SPACING,
  BORDER_RADIUS
} from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import ReviewProperty from "../components/ReviewProperty";

export default class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = { currentProperty: properties[0] };
    console.log(this.state);
  }
  render() {
    return (
      <ViewContainer>
        <ReviewProperty
          propertyDescription={this.state.currentProperty}
          value={-1}
          comment=""
        />
      </ViewContainer>
    );
  }

  resetInputValues() {
    return properties.reduce((obj, item) => {
      obj[item.name] = item;
      return obj;
    }, {});
  }
}

const styles = StyleSheet.create({});
