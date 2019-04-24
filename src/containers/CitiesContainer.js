import React, {Component} from 'react';
import axios from 'axios';
import SingleCity from '../components/SingleCity';

class CitiesContainer extends Component {
    state = {
        lng: '',
        lat: ''
    };
    url = 'http://api.openweathermap.org/data/2.5/weather';
    apiID='3476f426c6d8f97027e143c1f5b3b21e';
    // api.openweathermap.org/data/2.5/weather?lat=35&lon=139
    displayLocationInfo = (position) => {
        this.setState({
            lng: position.coords.longitude.toFixed(2),
            lat: position.coords.latitude.toFixed(2)
        });
    };
    getCoords = async () => {
        const {lat, lng} = this.state;
        let res = await axios.get(`${this.url}?lat=${lat}&lon=${lng}&APPID=${this.apiID}`);
        // let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=3476f426c6d8f97027e143c1f5b3b21e`);
        let { data } = await res.data;
        this.setState({ users: data });
    };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
        // const {lat, lng} = this.state;
        // axios.get(`${this.url}?lat=${lat}&lon=${lng}`)
        //     .then(function (response) {
        //         // handle success
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // handle error
        //         console.log(error);
        //     })
    }
    componentDidUpdate(prevState){
        if (this.state !== prevState) {
            this.getCoords();

        }
    }

    render() {
        return (
            <div>
                <p>longitude: {this.state.lat}</p>
                <p>latitude: {this.state.lng}</p>
                <SingleCity/>
            </div>
        )
    }
}

export default CitiesContainer;
