import React, { Fragment } from 'react';
import NavMenu from 'components/NavMenu';
import CitiesContainer from 'pages/CitiesContainer';

import './App.css';

const App = () => {
  return (
    <Fragment>
      <NavMenu />
      <CitiesContainer />
    </Fragment>
  );
};

export default App;
