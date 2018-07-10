import React from 'react';

import Map from './containers/Map';
import VenueDetails from './containers/VenueDetails';
import { BackHandler } from 'react-native';
import {createDrawerNavigator} from 'react-navigation';
import Profile from './containers/Profile';
import axios from 'axios';
import { API_KEY } from './credentials';



class LydApp extends React.Component {

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
    //<Map {...props} onVenueSelect={onVenueSelect} selectedVenue={selectedVenue} showDetails={showDetails} />
    return !selectedVenue || !showDetails
      ? <Map onVenueSelect={this.onVenueSelect} selectedVenue={this.state.selectedVenue} showDetails={this.showDetails}/>
      : <VenueDetails selectedVenue={this.state.selectedVenue} hideDetails={this.hideDetails} />
  }



  onVenueSelect(selectedVenue) {
      this.setState({selectedVenue: selectedVenue})
  }

  showDetails() {
    this.setState({ showDetails: true })
  }

  hideDetails() {
    this.setState({ showDetails: false });
  }
}

export default ({ onVenueSelect, selectedVenue, showDetails }) => {
  const Wrapper = createDrawerNavigator({
      Home: LydApp
  },
      { contentComponent: Profile })
  return <Wrapper />
}
