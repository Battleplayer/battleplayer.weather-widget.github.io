import React, { Fragment } from 'react';
import NavMenu from 'components/NavMenu';
import CitiesContainer from 'pages/CitiesContainer';

const App = () => {
  return (
    <Fragment>
      <NavMenu />
      <CitiesContainer />
    </Fragment>
  );
};

export default App;
