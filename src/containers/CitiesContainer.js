import React, {Component} from 'react';
import SingleCity from '../components/SingleCity';
import {Container, Row, Alert, Col} from 'react-bootstrap';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getDefaultCity, addToFavorite, removeFromFavorite} from "../redux/actions/LoadWeatherAction";

class CitiesContainer extends Component {
    state = {
        lng: '',
        lat: '',
        defaultCity: {}
    };

    displayLocationInfo = (position) => {
        this.setState({
            lng: position.coords.longitude.toFixed(2),
            lat: position.coords.latitude.toFixed(2)
        });
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }

    componentDidUpdate() {
        const {lat, lng} = this.state;
        if (this.props.isRequestInProgress === false && lat && lng && !Object.keys(this.state.defaultCity).length) {
            this.props.getDefaultCity(lat, lng);
            this.setState({defaultCity: this.props.defaultCity});
        }
    }

    checkCity = city => {
        let cities = this.props.cities;
        let is = 0;
        for (let i = 0; i < cities.length; i++) {
            is = 0;
            if (cities[i].id !== city.id) is = is + 1;
        }
        if (is > 0 || !cities.length) this.props.addToFavorite(city);
    };

    render() {
        console.log(this.props);
        return (
            <Container>
                <Row>
                    {
                        this.props.error ?
                            <Alert variant="danger">
                                Cannot load city, "{this.props.error}" using saved data
                            </Alert> : null
                    }
                    <Col className="flexes">
                        <h2>Weather in your city</h2>
                        <SingleCity city={this.props.defaultCity}/>
                    </Col>
                    {
                        Object.keys(this.props.searchedCity).length ?
                            <Col className="flexes">
                                <h2>Searched city</h2>
                                <SingleCity city={this.props.searchedCity}
                                            addToFavorite={this.checkCity}
                                    // addToFavorite={this.props.addToFavorite}
                                />
                            </Col>
                            : null
                    }
                </Row>
                <Row>
                    {this.props.cities.map((city, index) =>
                        <SingleCity key={index}
                                    city={city}
                                    removeFromFavorite={this.props.removeFromFavorite}
                        />
                    )}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = ({defaultCity, isRequestInProgress, error, searchedCity, cities}) => ({
    defaultCity,
    isRequestInProgress,
    error,
    searchedCity,
    cities
});
const mapDispatchToProps = dispatcher =>
    bindActionCreators({
        getDefaultCity,
        addToFavorite,
        removeFromFavorite
    }, dispatcher);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CitiesContainer);


