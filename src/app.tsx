import './styles/app.css';

import React from 'react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import store from './redux/store';
import Map from './components/map/map';
import Menu from './components/menu/menu';
import FilterMenu from './components/filter/menu';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="app">
          <Map />
          <Menu />
          <FilterMenu />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
