import React from "react";
import {
    StyleSheet,
    FlatList,
    View,
} from "react-native";
import ReviewListItem from "./ReviewListItem";
import { connect } from 'react-redux';
import { onFetchReviewsByUser, onShowReviewDeletionModal, onHideReviewDeletionModal } from "../actions/reviews";
import moment from 'moment';
import ReviewDeletionModal from './ReviewDeletionModal';

 class ReviewList extends React.PureComponent {

    constructor(props) {
        super(props);

        const { onFetchReviewsByUser, error, hasMore, isLoading } = this.props;
        const reviewDurabilityInMonths = 3;

        this.state = {
            showDeletionModal: false,
            pageable: {
                pageSize: 10,
                pageNumber: 0,
            },
            date: moment().subtract(reviewDurabilityInMonths, 'months').format('YYYY-MM-DD')
        };

        window.onscroll = () => {
            console.log("scrolling...");
            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if(error || isLoading || !hasMore) return;

            const innerHeight = window.innerHeight;
            const scrollTop = document.documentElement.scrollTop;
            const offsetHeight = document.documentElement.offsetHeight;

            // Checks if the page has scrolled to the bottom
            if(innerHeight + scrollTop === offsetHeight) {
                console.log("innerHeight + scrollTop === offsetHeight");
                onFetchReviewsByUser({ pageable: this.state.pageable, date: this.state.date });
            }
        };
    }

    componentWillMount() {
        this.props.onFetchReviewsByUser({ pageable: this.state.pageable, date: this.state.date });
    }

     _keyExtractor = (item, index) => item.id.toString();

     _onPressItem = (id) => {

         console.log("pressed item with id = ", id);
         this.props.onShowReviewDeletionModal(id);

         /*       this.setState((state) => {
                    // copy the map rather than modifying state.
                    const selected = new Map(state.selected);
                    selected.set(id, !selected.get(id)); // toggle
                    return { selected };
                });*/
     };

     _renderItem = ({ item }) => (
         <ReviewListItem
             id={item.id}
             onPressItem={this._onPressItem}
             review={item}
         />
     );

     _handleLoadMore = () => {
         console.log("handleLoadMore!");
     };

     render() {

         const { showReviewDeletionModal, reviews, onHideReviewDeletionModal, reviewToBeDeleted } = this.props;

         console.log("reviews: ", reviews);
         console.log("showReviewDeletionModal: ", showReviewDeletionModal);
         console.log("reviewToBeDeleted: ", reviewToBeDeleted);

         return (
             <View>
                 <ReviewDeletionModal
                     title={(reviewToBeDeleted) ? reviewToBeDeleted.sted.navn : ""}
                     modalVisible={showReviewDeletionModal}
                     onHideModal={onHideReviewDeletionModal} />
                 <FlatList
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

});


export default connect(
    ({ userReviewList }) => ({ ...userReviewList }),
    { onFetchReviewsByUser, onShowReviewDeletionModal, onHideReviewDeletionModal }
)(ReviewList);