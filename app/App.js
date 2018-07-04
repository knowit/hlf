import React from 'react';

import Map from './containers/Map';
import VenueDetails from './containers/VenueDetails';



export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { isAuthed: false, selectedVenue: undefined, showDetails: false }
    this.onVenueSelect = this.onVenueSelect.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);

  }

  render() {

    const { selectedVenue, showDetails } = this.state;
    return !selectedVenue || !showDetails
      ? <Map onVenueSelect={this.onVenueSelect} selectedVenue={this.state.selectedVenue} showDetails={this.showDetails}/> 
      : <VenueDetails selectedVenue={this.state.selectedVenue} />
  }

  

  onVenueSelect(selectedVenue) {
    this.setState({ selectedVenue });
  }

  showDetails() {
    this.setState({showDetails: true})
  }

  hideDetails() {
    this.setState({showDetails: false})
  }
}
