import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './shared/components/Layout';
import MainNavigator from './components/screens';

interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Layout>
          <MainNavigator />
        </Layout>
      </Provider>
    );
  }
}
