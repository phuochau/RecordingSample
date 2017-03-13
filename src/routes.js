import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';

import createStoreWithMiddlewares from './store';
import MainScreen from './screens/MainScreen';

const store = createStoreWithMiddlewares();

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="main" component={MainScreen} hideNavBar />
  </Scene>
);
const RouterWithRedux = connect()(Router);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={scenes} />
      </Provider>
    );
  }
}
