import React from 'react';

const SingleCity = ({city}) => {
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
    console.log(city);
    if (city && Object.keys(city).length) {
        return (
            <div className='single'>
                <p>Name: {city.name}</p>
                <p>Coordinate:</p>
                <p>Latitude {city.coord.lat}</p>
                <p>Date now {todayIs}</p>
                <p>longitude {city.coord.lng}</p>
                <p>Country {city.sys.country}</p>
                <p>Sunrise {sunrise}</p>
                <p>Sunset {sunset}</p>
            </div>
        )
    }
    return (<div>cant load data</div>)
};

export default SingleCity;