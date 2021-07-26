import React from 'react';
import { Provider } from 'react-redux';

import { Root } from './navigation/rootNavigation';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
