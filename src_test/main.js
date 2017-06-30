import React, { Component } from 'react';
import { Provider } from 'react-redux';

import CoreContainer from './containers/CoreContainer';
import setup from './store/setup';

type State = {
  loading: boolean,
  store: any,
};

function bootstrap() {
  // Remove logging on production
  if (!__DEV__) {
    console.log = () => {
    };
    console.warn = () => {
    };
    console.error = () => {
    };
    console.disableYellowBox = true;
  }

  class Root extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        store: null,
      };
    }

    state: State;

    componentDidMount() {
      setup((store) => {
        this.setState({
          store,
          loading: false,
        });
      });
    }

    render() {
      if (this.state.loading) {
        return null;
      }

      return (
        <Provider store={this.state.store}>
          <CoreContainer />
        </Provider>
      );
    }
  }

  return Root;
}

export default bootstrap();
