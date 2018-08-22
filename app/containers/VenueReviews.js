import React, {Component} from "react";
import {View, StyleSheet, TouchableHighlight, FlatList} from "react-native";
import PropertyOverview from "../components/PropertyOverview";
import Review from "./Review";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors, {COMPONENT_SPACING} from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import VenueContactInfo from "../components/VenueContactInfo";
import HorizontalRuler from "../components/HorizontalRuler";
import {connect} from "react-redux";
import Loading from "../components/Loading";
import {placeReviewsRequested} from "../actions";
import SlimText from "../components/SlimText";

class VenueReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {showReviews: false};
        this.nextId = 0;
    }

    render() {
        const {selectedVenue} = this.props;

        return (
            <View>
                <VenueContactInfo
                    name={selectedVenue.name}
                    formatted_address={selectedVenue.formatted_address}
                    formatted_phone={selectedVenue.formatted_phone_number}
                    style={{padding: COMPONENT_SPACING}}
                />
                <HorizontalRuler/>
                <ViewContainer>
                    <PropertyOverview reviewSummary={this.props.selectedVenue.reviews}/>
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
                onPress={() => {
                    this.props.placeReviewsRequested(this.props.selectedVenue.place_id);
                    this.setState({showReviews: true});
                }}
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
        const {reviewsList, isLoading} = this.props.reviewList;

        if (isLoading) {
            return <Loading inline={true}/>;
        }
        if (reviewsList.length === 0) {
            return (
                <SlimText style={{fontSize: 23, textAlign: "center", marginTop: 15}}>
                    Ingen vurderinger registrert
                </SlimText>
            );
        }

        return (
            <FlatList
                data={reviewsList}
                renderItem={({item}) => <Review review={item}/>}
            />
        );
    }
}

export default connect(
    ({reviewList}) => ({reviewList}),
    {placeReviewsRequested}
)(VenueReviews);

const styles = StyleSheet.create({
    showReviewArrow: {
        width: "100%",
        alignItems: "center"
    }
});
