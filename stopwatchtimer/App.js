import React from 'react';
import { Provider } from 'react-redux';
import store from './src/components/store';
import Navigator from './src/components/Navigator';

const App = () => (
  <Provider store={store}>
    <Navigator />
  </Provider>
);

export default App;