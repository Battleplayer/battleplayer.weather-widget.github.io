import React, { Fragment } from 'react';
import './App.css';
import CitiesContainer from 'pages/CitiesContainer';
import NavMenu from 'components/NavMenu';

const App = () => {
  return (
    <Fragment>
      <NavMenu />
      <CitiesContainer />
    </Fragment>
  );
};

export default App;
