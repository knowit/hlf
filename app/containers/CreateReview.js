import React, {Component} from "react";
import {StyleSheet} from "react-native";
import properties from "../settings/propertyConfig";
import {COMPONENT_SPACING} from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import ReviewProperty from "../components/ReviewProperty";
import CreateReviewNavigation from "../components/CreateReviewNavigation";
import { onCreateReview, onFetchPreviousRequested, onUpdateReview, onCreateReviewUnauthenticated } from "../actions/reviews";
import {connect} from "react-redux";
import Loading from "../components/Loading";
import {onOpenPropertyInformationModal} from "../actions/propertiesModal";
import PropertyInformationModal from "../components/PropertyInformationModal";
import LoginScreen from "./LoginScreen";
import {onAuth0Success, onAuth0Cancelled } from "../actions/account";

class CreateReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProperty: properties[0].name
        };

        this.onPropertySelect = this.onPropertySelect.bind(this);
        this.onReviewSubmit = this.onReviewSubmit.bind(this);
    }

    componentDidMount() {
        const { user } = this.props;
        if(user.isAuthenticated) {
            this.props.onFetchPreviousRequested(this.props.selectedVenue.venue.place_id);
        }
    }

    render() {

        const { hasLoaded, propertyInput, showLoginScreen } = this.props.newReview;

        if (!hasLoaded)
            return <Loading inline={true} style={{marginTop: COMPONENT_SPACING}}/>;
        const {currentProperty} = this.state;

        const propertyData = properties.filter(
            item => item.name === currentProperty
        )[0];
        const currentPropertyInput = propertyInput[currentProperty];

        if(showLoginScreen) {
            return (
                <LoginScreen
                    auth0Success={this.props.onAuth0Success}
                    auth0Cancelled={this.props.onAuth0Cancelled}
                />
            );
        }

        return (
            <ViewContainer flex={true}>
                <PropertyInformationModal onRequestClose={() => {}} />
                <CreateReviewNavigation
                    currentProperty={currentProperty}
                    onPropertySelect={this.onPropertySelect}
                />
                <ReviewProperty
                    currentProperty={Object.assign(propertyData, currentPropertyInput)}
                    onPropertyChange={this.onPropertyChange}
                    onReviewSubmit={this.onReviewSubmit}
                    onInfoButtonClicked={this.props.onOpenPropertyInformationModal}
                />
            </ViewContainer>
        );
    }

    convertReviewIntegerValueToEnum(review) {
        if( review === 0 ) return "INGEN";
        if( review === -1) return "NED";
        return "OPP";
    }

    onReviewSubmit(reviewValues) {
        const { newReview, onUpdateReview, selectedVenue, onCreateReview, user, onCreateReviewUnauthenticated } = this.props;
        if(user.isAuthenticated) {
            if ( newReview.isSubmitting) return;

            const { currentProperty } = this.state;
            const currentPropertyInput = newReview.propertyInput[currentProperty];

            const review = {
                rangering: this.convertReviewIntegerValueToEnum(reviewValues.rangering),
                kommentar: reviewValues.kommentar,
                sted: {
                    placeId: selectedVenue.venue.place_id,
                },
                vurderingsType: currentProperty,
            };

            if(reviewValues.rangeringHasChanged) {
                review.id = currentPropertyInput.id;
                onUpdateReview(review);
                return;
            }

            onCreateReview(review);
        } else {
            onCreateReviewUnauthenticated();
        }
    }

    onPropertySelect(propertyName) {
        this.setState({currentProperty: propertyName});
    }
}

export default connect(
    ({ selectedVenue, newReview, propertiesInformation, user }) => ({ selectedVenue, newReview, propertiesInformation, user }),
    { onCreateReview, onFetchPreviousRequested, onOpenPropertyInformationModal, onUpdateReview, onAuth0Success, onCreateReviewUnauthenticated, onAuth0Cancelled }
)(CreateReview);

const styles = StyleSheet.create({});
