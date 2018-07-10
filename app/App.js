import React from 'react';

import Map from './containers/Map';
import VenueDetails from './containers/VenueDetails';
import { BackHandler } from 'react-native';
import axios from 'axios';
import { API_KEY } from './credentials';



export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { isAuthed: false, selectedVenue: undefined, showDetails: false }
    this.onVenueSelect = this.onVenueSelect.bind(this);
    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);

  }
  componentDidMount() {

    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.state.showDetails) {
        this.setState({ showDetails: false })
      }
      else if (this.state.selectedVenue) {
        this.setState({ selectedVenue: undefined })
      }
      return true;
    })
  }

  render() {

    const { selectedVenue, showDetails } = this.state;
    return !selectedVenue || !showDetails
      ? <Map onVenueSelect={this.onVenueSelect} selectedVenue={this.state.selectedVenue} showDetails={this.showDetails} />
      : <VenueDetails selectedVenue={this.state.selectedVenue} hideDetails={this.hideDetails} />
  }



  onVenueSelect(selectedVenue) {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${selectedVenue.place_id}`;
    axios.get(url)
      .then(({data}) => console.log(data.result))
      .catch(e => console.log("error"));

  }

  showDetails() {
    this.setState({ showDetails: true })
  }

  hideDetails() {
    this.setState({ showDetails: false });
  }
}
