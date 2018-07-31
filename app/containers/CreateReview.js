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
import { createReview, fetchPreviousReviews } from "../actions/";
import { connect } from "react-redux";
import Loading from "../components/Loading";

class CreateReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProperty: properties[0].name
    };

    this.onPropertySelect = this.onPropertySelect.bind(this);
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
    this.sendReview = this.sendReview.bind(this);
  }

  componentDidMount() {
    this.props.fetchPreviousReviews(this.props.selectedVenue.place_id);
  }

  render() {
    const { hasLoaded, propertyInput } = this.props.newReview;
    if (!hasLoaded)
      return <Loading inline={true} style={{ marginTop: COMPONENT_SPACING }} />;
    const { currentProperty } = this.state;

    const propertyData = properties.filter(
      item => item.name === currentProperty
    )[0];
    const currentPropertyInput = propertyInput[currentProperty];

    return (
      <ViewContainer flex={true}>
        <CreateReviewNavigation
          currentProperty={currentProperty}
          onPropertySelect={this.onPropertySelect}
        />
        <ReviewProperty
          currentProperty={Object.assign(propertyData, currentPropertyInput)}
          onPropertyChange={this.onPropertyChange}
          onReviewSubmit={this.onReviewSubmit}
        />
      </ViewContainer>
    );
  }

  onReviewSubmit(reviewValues) {
    const reviewBody = Object.assign(reviewValues, {
      sted: {
        placeId: this.props.selectedVenue.place_id
      },
      type: this.state.currentProperty + "vurdering"
    });
    this.props.createReview(reviewBody);
  }

  sendReview() {
    const { currentProperty, propertiesInput } = this.state;
    const currentPropertyData = propertiesInput[currentProperty];
    const { value } = currentPropertyData;
    if (value === 0) return;
    const body = {
      sted: {
        placeId: this.props.selectedVenue.place_id
      },
      type: currentPropertyData.name + "vurdering",
      rangering: value === 1 ? true : false,
      kommentar: currentPropertyData.comment
    };

    this.props.createReview(body);
  }

  onPropertySelect(propertyName) {
    this.setState({ currentProperty: propertyName });
  }
}

export default connect(
  ({ selectedVenue, newReview }) => ({ selectedVenue, newReview }),
  { createReview, fetchPreviousReviews }
)(CreateReview);

const styles = StyleSheet.create({});
