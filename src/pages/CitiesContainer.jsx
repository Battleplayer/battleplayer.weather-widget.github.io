import React, { Component } from 'react';
import { Container, Row, Alert, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDefaultCity } from '../api/CityInfo';
import { addToFavorite, removeFromFavorite } from '../redux/actions/LoadWeatherAction';
import ForecastCity from 'components/ForecastCity';
import SingleCity from 'components/SingleCity';

class CitiesContainer extends Component {
  state = {
    lng: '',
    lat: '',
    defaultCity: {},
    added: false,
  };

  displayLocationInfo = (position) => {
    this.setState({
      lng: position.coords.longitude.toFixed(2),
      lat: position.coords.latitude.toFixed(2),
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
  }

  componentDidUpdate() {
    const { lat, lng } = this.state;
    if (this.props.isRequestInProgress === false && lat && lng && !Object.keys(this.state.defaultCity).length) {
      this.props.getDefaultCity(lat, lng);
      this.setState({ defaultCity: this.props.defaultCity });
    }
  }

  pushToArray = (city) => {
    let arr = this.props.cities;
    const index = arr.findIndex((e) => e.id === city.id);
    if (index === -1) {
      this.props.addToFavorite(city);
    } else {
      arr[index] = city;
      this.setState({ added: true });
      setTimeout(() => {
        this.setState({ added: false });
      }, 4000);
    }
  };

  render() {
    return (
      <Container>
        <Row>
          {this.state.added ? <Alert variant="success">This city has been already added to favorite!</Alert> : null}
          {this.props.error ? (
            <Alert variant="danger">
              {this.props.error === 'Request failed with status code 401' ? <span>Bad access key.</span> : null}
              {this.props.error === 'Request failed with status code 404' ? (
                <span>Error, wrong city code using saved data.</span>
              ) : null}
              {this.props.error === 'Request failed with status code 429' ? (
                <span>You are using free tariff, try again in one minute.</span>
              ) : null}
            </Alert>
          ) : null}

          <Col className="flexes">
            <h2>Weather in your city</h2>
            <SingleCity city={this.props.defaultCity} getForecastCity={this.props.getForecastCity} />
          </Col>
          {Object.keys(this.props.searchedCity).length ? (
            <Col className="flexes">
              <h2>Searched city</h2>
              <SingleCity city={this.props.searchedCity} addToFavorite={this.pushToArray} />
            </Col>
          ) : null}
        </Row>
        {this.props.cities.length ? (
          <Row>
            <Col md={12}>
              <h2>Favorite cities</h2>
            </Col>
            {this.props.cities.map((city) => (
              <Col md={4} key={city.id}>
                <SingleCity city={city} removeFromFavorite={this.props.removeFromFavorite} />
              </Col>
            ))}
          </Row>
        ) : null}
        <Col md={12}>
          <ForecastCity />
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = ({ defaultCity, isRequestInProgress, error, searchedCity, cities, forecast5city }) => ({
  defaultCity,
  isRequestInProgress,
  error,
  searchedCity,
  cities,
  forecast5city,
});
const mapDispatchToProps = (dispatcher) =>
  bindActionCreators(
    {
      getDefaultCity,
      addToFavorite,
      removeFromFavorite,
    },
    dispatcher
  );

export default connect(mapStateToProps, mapDispatchToProps)(CitiesContainer);
