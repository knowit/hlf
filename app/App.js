import React, { Component } from "react";
import Navigation from "./components/Navigation";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

const createMiddlewareStore = applyMiddleware(reduxThunk)(createStore);
const store = createMiddlewareStore(reducers);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
