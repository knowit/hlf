import React, { Component } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import PropertyOverview from "../components/PropertyOverview";
import sampleReviews from "../sampleReviews";
import Review from "./Review";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors, { COMPONENT_SPACING } from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import VenueContactInfo from "../components/VenueContactInfo";
import HorizontalRuler from "../components/HorizontalRuler";

export default class VenueReviews extends Component {
  constructor(props) {
    super(props);
    this.state = { showReviews: true };
  }

  render() {
    const { selectedVenue } = this.props;

    return (
      <View>
        <VenueContactInfo
          name={selectedVenue.name}
          formatted_address={selectedVenue.formatted_address}
          formatted_phone={selectedVenue.formatted_phone_number}
          style={{ padding: COMPONENT_SPACING }}
        />
        <HorizontalRuler />
        <ViewContainer>
          <PropertyOverview reviewSummary={this.props.selectedVenue.reviews} />
        </ViewContainer>

        {!this.state.showReviews
          ? this.renderShowReviewArrow()
          : this.renderReviewList()}
      </View>
    );
  }

  renderShowReviewArrow() {
    return (
      <TouchableHighlight
        onPress={() => this.setState({ showReviews: true })}
        style={styles.showReviewArrow}
      >
        <MaterialIcons
          name="keyboard-arrow-down"
          color={colors.primaryTextColor}
          size={60}
        />
      </TouchableHighlight>
    );
  }

  renderReviewList() {
    return (
      <View>
        {sampleReviews.map(review => {
          return (
            <View key={review.id}>
              <HorizontalRuler key />
              <Review review={review} />
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showReviewArrow: {
    width: "100%",
    alignItems: "center"
  }
});
