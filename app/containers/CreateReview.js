import React, {Component} from "react";
import {StyleSheet} from "react-native";
import properties from "../settings/propertyConfig";
import {COMPONENT_SPACING} from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import ReviewProperty from "../components/ReviewProperty";
import CreateReviewNavigation from "../components/CreateReviewNavigation";
import { onCreateReview, onDestroyReviewValue, onFetchPreviousRequested } from "../actions/reviews";
import {connect} from "react-redux";
import Loading from "../components/Loading";
import {onOpenPropertyInformationModal} from "../actions/propertiesModal";
import PropertyInformationModal from "../components/PropertyInformationModal";

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
        console.log("CreateReview.componentDidMount - this.props.selectedVenue: ", this.props.selectedVenue);
        this.props.onFetchPreviousRequested(this.props.selectedVenue.place_id);
    }

    render() {

        const {hasLoaded, propertyInput} = this.props.newReview;

        if (!hasLoaded)
            return <Loading inline={true} style={{marginTop: COMPONENT_SPACING}}/>;
        const {currentProperty} = this.state;

        const propertyData = properties.filter(
            item => item.name === currentProperty
        )[0];
        const currentPropertyInput = propertyInput[currentProperty];

        return (
            <ViewContainer flex={true}>
                <PropertyInformationModal />
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

    onReviewSubmit(reviewValues) {
        if (this.props.newReview.isSubmitting) return;

        const { propertyInput } = this.props.newReview;
        const { currentProperty } = this.state;
        const currentPropertyInput = propertyInput[currentProperty];

        if(currentPropertyInput.value === reviewValues.value) {
            // delete current review-value
            this.props.onDestroyReviewValue(currentPropertyInput)
        }

        console.log("sted: ", this.props.selectedVenue);

        const reviewBody = Object.assign(reviewValues, {
            sted: {
                placeId: this.props.selectedVenue.place_id
            },
            vurderingsType: this.state.currentProperty
        });
        this.props.onCreateReview(reviewBody);
    }

    onPropertySelect(propertyName) {
        this.setState({currentProperty: propertyName});
    }
}

export default connect(
    ({ selectedVenue, newReview, propertiesInformation }) => ({ selectedVenue, newReview, propertiesInformation }),
    { onCreateReview, onDestroyReviewValue, onFetchPreviousRequested, onOpenPropertyInformationModal}
)(CreateReview);

const styles = StyleSheet.create({});
