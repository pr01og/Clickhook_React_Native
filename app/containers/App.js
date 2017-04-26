import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  Platform,
  Alert,
  AsyncStorage,
  StatusBar,
} from 'react-native';
// import {Client} from 'bugsnag-react-native';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/index';
import AppHelper from './AppHelper';

const store = createStore(
  RootReducer,
  applyMiddleware(thunk)
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept(() => {
    const nextReducer = require('../reducers/index').default;
    store.replaceReducer(nextReducer);
  });
  module.hot.acceptCallback(() => {
    const nextReducer = require('../reducers/index').default;
    store.replaceReducer(nextReducer);
  });

}

store.subscribe(() => {
  console.info(store.getState());
});


export default class App extends Component {

  constructor(props) {
    super(props);
    // this.client = new Client('eb2343051c0d2c29a431e2e47a6b1fb3');
  }

  render() {
    // this.client.notify(new Error("Test Error"));
    return (
      <Provider store={store}>
        <AppHelper />
      </Provider>
    );
  }
};
