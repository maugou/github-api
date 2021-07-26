import React from 'react';
import { Provider } from 'react-redux';

import { SearchRepo } from './components/SearchRepo';
import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SearchRepo />
    </Provider>
  );
};

export default App;
