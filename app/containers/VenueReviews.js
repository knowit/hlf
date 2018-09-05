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
import { onPlaceReviewsRequested } from "../actions/reviews";
import SlimText from "../components/SlimText";
import moment from "moment";

class VenueReviews extends Component {
    constructor(props) {
        super(props);
        this.state = {showReviews: false};
        this.nextId = 0;

        const reviewDurabilityInMonths = 3;
        this.state = {
            date: moment().subtract(reviewDurabilityInMonths, 'months').format('YYYY-MM-DD')
        };
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
                    //this.props.onPlaceReviewsRequested(this.props.selectedVenue.place_id);
                    this._fetchReviews();
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

    _fetchReviews = () => {
        if(this.props.metadata.last) {
            return;
        }

        const size = this.props.metadata.size;
        const number = this.props.metadata.number + 1;
        const payload = {
            placeId: this.props.selectedVenue.place_id,
            pageable: { size, number },
            date: this.state.date
        };

        this.props.onPlaceReviewsRequested(payload);
    };

    _keyExtractor = (item) => item.id.toString();

    renderReviewList() {
        const {reviewsList, isLoading} = this.props;

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
                keyExtractor={this._keyExtractor}
                onEndReached={this._fetchReviews}
                onEndTreshold={1}
                data={reviewsList}
                renderItem={({item}) => <Review review={item}/>}
            />
        );
    }
}

export default connect(({reviewList}) => ({ ...reviewList}), { onPlaceReviewsRequested })(VenueReviews);

const styles = StyleSheet.create({
    showReviewArrow: {
        width: "100%",
        alignItems: "center"
    },
});