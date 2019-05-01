import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {Spinner} from 'react-bootstrap';
import {bindActionCreators} from "redux";
import {getForecastCity} from "../redux/actions/LoadWeatherAction";
import Slider from "react-slick";

class ForecastCity extends Component {
    componentDidMount() {
        const {match, getForecastCity} = this.props;
        getForecastCity(match.params.id);
    }

    componentDidUpdate(prevProps) {
        const {match, getForecastCity} = this.props;
        if (match.params.id !== prevProps.match.params.id) {
            getForecastCity(match.params.id);
        }
    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 5
        };
        const {forecast5city} = this.props;
        if (Object.keys(forecast5city).length) {
            return (
                <div>
                    <h2>Forecast for 5 day for city {forecast5city.city.name}</h2>
                    <Slider {...settings}
                            className='forecast'>
                        {forecast5city.list.map(city =>
                            (<div key={city.dt} className="forecast__item">
                                <h4>
                                    {new Date(city.dt * 1000).toLocaleString().replace(/:[^:]*$/, '')}
                                </h4>
                                <h5>
                                    {(city.main.temp - 273.15).toFixed(0)}&#8451;
                                </h5>
                                <img src={`https://openweathermap.org/img/w/${city.weather[0].icon}.png`}
                                     alt="weather"/>
                                <p>
                                    {city.weather[0].description}
                                </p>
                            </div>)
                        )}
                    </Slider>
                </div>
            )
        } else {
            return (<Spinner/>)
        }
    }
}

const
    mapStateToProps = ({forecast5city}) => ({
        forecast5city
    });
const
    mapDispatchToProps = dispatcher =>
        bindActionCreators({getForecastCity}, dispatcher);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(
        ForecastCity
    ));
