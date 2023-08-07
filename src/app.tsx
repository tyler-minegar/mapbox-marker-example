import './styles/app.css';

import React from 'react';

import { Provider } from 'react-redux';
import store from './redux/store';
import Map from './components/map/map';
import Menu from './components/menu/menu';
import FilterMenu from './components/filter/menu';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Map />
        <Menu />
        <FilterMenu />
      </div>
    </Provider>
  );
}

export default App;
