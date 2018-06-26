import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropertyOverview from '../components/PropertyOverview';
import HorizontalRuler from '../components/HorizontalRuler';
import sampleReviews from '../sampleReviews';
import Review from './Review';
import { MaterialIcons } from '@expo/vector-icons';


export default class VenueReviews extends Component {

    constructor(props) {
        super(props);
        this.state = { showReviews: false }
    }

    render() {
        return (
            <View>
                <View style={{ padding: 20 }}>
                    <PropertyOverview />
                </View>

                {!this.state.showReviews ? this.renderShowReviewArrow() : this.renderReviewList()}

            </View>
        )
    }


    renderShowReviewArrow() {
        return (
            <TouchableHighlight onPress={() => this.setState({ showReviews: true })} style={styles.showReviewArrow}>
                <MaterialIcons name="keyboard-arrow-down" color="#D4D4D4" size={60} />
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