import React, { Component } from "react";
import Navigation from "./components/Navigation";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { Provider } from "react-redux";

//import rootSaga from './sagas/rootSaga';
import { fetchAccountInformationSaga } from './sagas/accountSagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(fetchAccountInformationSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}