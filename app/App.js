import React, { Component } from "react";
import Navigation from "./components/Navigation";
import { Provider } from "react-redux";
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}