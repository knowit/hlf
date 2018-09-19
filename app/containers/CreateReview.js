import React, {Component} from "react";
import properties from "../settings/propertyConfig";
import {COMPONENT_SPACING} from "../settings/defaultStyles";
import ViewContainer from "../components/ViewContainer";
import ReviewProperty from "../components/ReviewProperty";
import CreateReviewNavigation from "../components/CreateReviewNavigation";
import { onCreateReview, onFetchPreviousRequested, onUpdateReview } from "../actions/reviews";
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
        this.props.onFetchPreviousRequested(this.props.selectedVenue.venue.place_id);
    }

    render() {

        const { hasLoaded, propertyInput } = this.props.newReview;

        if (!hasLoaded)
            return <Loading inline={true} style={{marginTop: COMPONENT_SPACING}}/>;
        const {currentProperty} = this.state;

        const propertyData = properties.filter(
            item => item.name === currentProperty
        )[0];
        const currentPropertyInput = propertyInput[currentProperty];


        return (
            <ViewContainer flex={true}>
                <PropertyInformationModal onRequestClose={() => {}} />
                <CreateReviewNavigation
                    currentProperty={currentProperty}
                    onPropertySelect={this.onPropertySelect}
                />
                <ReviewProperty
                    currentProperty={Object.assign(propertyData, currentPropertyInput)}
                    onPropertyChange={this.onPropertySelect}
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
        const {
            newReview,
            onUpdateReview,
            selectedVenue,
            onCreateReview,
        } = this.props;

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
    }

    onPropertySelect(propertyName) {
        this.setState({currentProperty: propertyName});
    }
}

export default connect(
    ({ selectedVenue, newReview, propertiesInformation }) => ({ selectedVenue, newReview, propertiesInformation }),
    { onCreateReview, onFetchPreviousRequested, onOpenPropertyInformationModal, onUpdateReview,  }
)(CreateReview);