import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropertyOverview from '../components/PropertyOverview';
import sampleReviews from '../sampleReviews';
import Review from './Review';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../settings/defaultStyles';
import ViewContainer from '../components/ViewContainer';


export default class VenueReviews extends Component {

    constructor(props) {
        super(props);
        this.state = { showReviews: false }
    }

    render() {
        return (
            <View>
                <ViewContainer heightAdjusting="auto">
                    <PropertyOverview />
                </ViewContainer>

                {!this.state.showReviews ? this.renderShowReviewArrow() : this.renderReviewList()}

            </View>
        )
    }


    renderShowReviewArrow() {
        return (
            <TouchableHighlight onPress={() => this.setState({ showReviews: true })} style={styles.showReviewArrow}>
                <MaterialIcons name="keyboard-arrow-down" color={colors.primaryTextColor} size={60} />
            </TouchableHighlight>
        )
    }

    renderReviewList() {
        return (
            <View>
            {sampleReviews.map(review => <Review key={review.id} review={review} />)} 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    showReviewArrow: {
        width: "100%",
        alignItems: "center"
    }
})