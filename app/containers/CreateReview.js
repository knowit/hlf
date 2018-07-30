import React, { Component } from "react";
import { StyleSheet } from "react-native";
import propertiesData from "../settings/propertyConfig";
import colors, {
  COMPONENT_SPACING,
  BORDER_RADIUS
} from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import ReviewProperty from "../components/ReviewProperty";
import CreateReviewNavigation from "../components/CreateReviewNavigation";
import { createReview } from "../actions/";
import { connect } from "react-redux";

class CreateReview extends Component {
  constructor(props) {
    super(props);
    const nextPropertyState = this.getInitialState();
    this.state = {
      currentProperty: Object.keys(nextPropertyState)[0],
      propertiesInput: nextPropertyState
    };
    this.onPropertySelect = this.onPropertySelect.bind(this);
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
    this.sendReview = this.sendReview.bind(this);
  }
  render() {
    const { propertiesInput, currentProperty } = this.state;
    return (
      <ViewContainer flex={true}>
        <CreateReviewNavigation
          currentProperty={currentProperty}
          onPropertySelect={this.onPropertySelect}
        />
        <ReviewProperty
          currentProperty={propertiesInput[currentProperty]}
          onPropertyChange={this.onPropertyChange}
          onOptionSelected={this.onReviewSubmit}
        />
      </ViewContainer>
    );
  }

  onReviewSubmit(type, value) {
    const { propertiesInput, currentProperty } = this.state;
    const previousState = propertiesInput[currentProperty];
    const nextState = { ...previousState, [type]: value };

    this.setState(
      {
        propertiesInput: { ...propertiesInput, [currentProperty]: nextState }
      },
      () => this.sendReview()
    );
  }

  sendReview() {
    const { currentProperty, propertiesInput } = this.state;
    const currentPropertyData = propertiesInput[currentProperty];
    if (currentPropertyData.value === 0) return;
    const body = {
      sted: {
        placeId: this.props.selectedVenue.place_id
      },
      type: currentPropertyData.name + "vurdering",
      rangering: currentPropertyData.value,
      kommentar: currentPropertyData.comment
    };
    this.props.createReview(body);
  }

  onPropertySelect(propertyName) {
    this.setState({ currentProperty: propertyName });
  }

  getInitialState() {
    const state = propertiesData.reduce((obj, property) => {
      obj[property.name] = Object.assign(property, {
        property,
        comment: "",
        value: 0
      });
      return obj;
    }, {});

    return state;
  }
}

export default connect(
  ({ selectedVenue }) => ({ selectedVenue }),
  { createReview }
)(CreateReview);

const styles = StyleSheet.create({});
