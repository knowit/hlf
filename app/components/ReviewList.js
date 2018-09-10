import React from "react";
import {
    StyleSheet,
    FlatList,
    View, Modal,
} from "react-native";
import ReviewListItem from "./ReviewListItem";
import { connect } from 'react-redux';
import { onFetchReviewsByUser, onShowReviewDeletionModal, onHideReviewDeletionModal, onDeleteReviewsByPlaceId } from "../actions/reviews";
import moment from 'moment';
import ReviewDeletionModal from './ReviewDeletionModal';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import colors, {COMPONENT_SPACING} from "../settings/defaultStyles";
import SlimText from "./SlimText";

 class ReviewList extends React.PureComponent {

    constructor(props) {
        super(props);

        const reviewDurabilityInMonths = 3;
        this.state = {
            date: moment().subtract(reviewDurabilityInMonths, 'months').format('YYYY-MM-DD')
        };
    }

    componentWillMount() {
        this._fetchReviews();
    }

    _fetchReviews() {
        if(this.props.metadata.last) {
            return;
        }

        const size = this.props.metadata.size;
        const number = this.props.metadata.number + 1;
        this.props.onFetchReviewsByUser({ pageable: { size, number }, date: this.state.date });
    }

     _keyExtractor = (item) => item.sted.id.toString();

     _onPressItem = (id) => {
         this.props.onShowReviewDeletionModal(id);
     };

     _renderItem = ({ item }) => (
         <ReviewListItem
             id={item.sted.id}
             onPressItem={this._onPressItem}
             review={item}
         />
     );

     _handleLoadMore = () => {
         this._fetchReviews();
     };

     _handleModalClose = (shouldDelete) => {

         const { onDeleteReviewsByPlaceId, onHideReviewDeletionModal, reviewToBeDeleted } = this.props;

         if(shouldDelete) {
             onDeleteReviewsByPlaceId(reviewToBeDeleted.placeId);
         }

         onHideReviewDeletionModal();
     };

     render() {

         const { showReviewDeletionModal, reviews, reviewToBeDeleted } = this.props;
         const reviewHeading = "Dine vurderinger";

         return (

             <View>
                 <ReviewDeletionModal
                     title={(reviewToBeDeleted) ? reviewToBeDeleted.sted.name : ""}
                     modalVisible={showReviewDeletionModal}
                     onRequestClose={this._handleModalClose}
                     onHideModal={this._handleModalClose} />
                 <View style={styles.reviews}>
                     <MaterialIcons
                         name="comment"
                         color={colors.primaryTextColor}
                         size={25}
                     />
                     <SlimText style={styles.reviewsHeading}>
                         { reviewHeading }
                     </SlimText>
                 </View>
                 <FlatList
                     style={styles.reviewList}
                     data={reviews}
                     keyExtractor={this._keyExtractor}
                     renderItem={this._renderItem}
                     onEndReached={this._handleLoadMore}
                     onEndThreshold={0} />
             </View>
         );
     }
}

const styles = StyleSheet.create({
    reviewList: {
        height: 300
    },
    reviews: {
        padding: COMPONENT_SPACING,
        flexDirection: "row"
    },
    reviewsHeading: {
        paddingLeft: 12,
        paddingTop: -5,
        fontSize: 22,
        fontWeight: "400"
    },
    reviewHeader: {
        fontSize: 22,
        marginLeft: COMPONENT_SPACING
    },
});


export default connect(
    ({ userReviewList }) => ({ ...userReviewList }),
    { onFetchReviewsByUser, onShowReviewDeletionModal, onHideReviewDeletionModal, onDeleteReviewsByPlaceId }
)(ReviewList);