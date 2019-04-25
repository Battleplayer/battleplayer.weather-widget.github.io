import React from 'react';
import {Table, Spinner, Button} from 'react-bootstrap'
import './SingleCity.css';

const SingleCity = ({city, addToFavorite, removeFromFavorite}) => {
    let sunrise = '';
    let sunset = '';
    let todayIs = '';
    if (city && Object.keys(city).length) {
        (() => {
            let date = new Date(city.sys.sunrise * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let seconds = "0" + date.getSeconds();
            sunrise = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
            todayIs = date.toLocaleDateString();
        })();
        (() => {
            let date = new Date(city.sys.sunset * 1000);
            let hours = date.getHours();
            let minutes = "0" + date.getMinutes();
            let seconds = "0" + date.getSeconds();
            sunset = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        })();
    }

    if (city && Object.keys(city).length) {
        return (
            <div className='single'>
                <h2>{city.name}</h2>
                <img src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} alt="weather"/>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <td>t&deg; </td>
                        <td>{(city.main.temp - 273.15).toFixed(0)} &#8451;</td>
                    </tr>
                    <tr>
                        <td>Country:</td>
                        <td>{city.sys.country}</td>
                    </tr>
                    <tr>
                        <td>Date now:</td>
                        <td>{todayIs}</td>
                    </tr>
                    <tr>
                        <td>Sunrise:</td>
                        <td>{sunrise}</td>
                    </tr>
                    <tr>
                        <td>Sunset:</td>
                        <td>{sunset}</td>
                    </tr>
                    <tr>
                        <td>Humidity:</td>
                        <td>{city.main.humidity}%</td>
                    </tr>
                    <tr>
                        <td>Wind:</td>
                        <td>direction{city.wind.deg}, <br/>speed {city.wind.speed} m/s</td>
                    </tr>
                    <tr>
                        <td>Coordinates:</td>
                        <td>{city.coord.lat}, {city.coord.lon}</td>
                    </tr>
                    </tbody>
                </Table>
                {
                    addToFavorite ?
                        <Button onClick={() => addToFavorite(city)}>Add to favorite</Button> : null
                }
                {
                    removeFromFavorite ?
                        <Button variant="danger" onClick={() => removeFromFavorite(city)}>Remove favorite</Button> : null
                }
            </div>
        )
    }
    return (<Spinner animation="grow"/>)
};

export default SingleCity;