import React, { memo, useCallback, useState } from 'react';
import { Button, Form, FormControl, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getSearchedCity } from 'api/CityInfo';

const NavMenu = memo((props) => {
  const [searchCity, setSearchCity] = useState('');
  const dispatch = useDispatch();

  const search = useCallback((e) => setSearchCity(e.target.value), []);

  const searchNewCity = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(getSearchedCity(searchCity));
      setSearchCity('');
    },
    [dispatch, searchCity]
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>My weather app</Navbar.Brand>
      <Form inline onSubmit={searchNewCity}>
        <FormControl
          type="text"
          placeholder="Search city by name"
          className="mr-sm-2"
          onChange={search}
          value={searchCity}
        />
        <Button type="submit" variant="success">
          Search
        </Button>
      </Form>
    </Navbar>
  );
});

export default NavMenu;
