import React, { Component } from "react";
import { StyleSheet } from "react-native";
import properties from "../settings/propertyConfig";
import colors, {
  COMPONENT_SPACING,
  BORDER_RADIUS
} from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import ReviewProperty from "../components/ReviewProperty";
import CreateReviewNavigation from "../components/CreateReviewNavigation";

export default class CreateReview extends Component {
  constructor(props) {
    super(props);
    const nextPropertyState = this.getInitialState();
    this.state = {
      currentProperty: Object.keys(nextPropertyState)[0],
      properties: nextPropertyState
    };
    this.onReviewAction = this.onReviewAction.bind(this);
    this.onPropertySelect = this.onPropertySelect.bind(this);
  }
  render() {
    return (
      <ViewContainer flex={true}>
        <CreateReviewNavigation
          currentProperty={this.state.currentProperty}
          onPropertySelect={this.onPropertySelect}
        />
        <ReviewProperty
          currentProperty={this.state.properties[this.state.currentProperty]}
          onReviewAction={this.onReviewAction}
        />
      </ViewContainer>
    );
  }

  onReviewAction(actionType, newValue) {
    const currentSelectedProperty = this.state.properties[
      this.state.currentProperty
    ];
    const nextState = { ...currentSelectedProperty, [actionType]: newValue };
    this.setState({
      properties: {
        ...this.state.properties,
        [this.state.currentProperty]: nextState
      }
    });
  }

  onPropertySelect(propertyName) {
    this.setState({ currentProperty: propertyName });
  }

  getInitialState() {
    return properties.reduce((obj, property) => {
      obj[property.name] = Object.assign(property, {
        comment: "",
        value: 0
      });
      return obj;
    }, {});
  }
}

const styles = StyleSheet.create({});
