import React, {Component} from 'react';
import axios from 'axios';
import SingleCity from '../components/SingleCity';

class CitiesContainer extends Component {
    state = {
        lng: '',
        lat: '',
        loaded: false,
        error:true,
        mycity: {}
    };
    url = 'http://api.openweathermap.org/data/2.5/weather';
    apiID = '3476f426c6d8f97027e143c1f5b3b21e';
    displayLocationInfo = (position) => {
        this.setState({
            lng: position.coords.longitude.toFixed(2),
            lat: position.coords.latitude.toFixed(2)
        });
    };
    getCoords = async () => {
        const {lat, lng} = this.state;
        axios.get(`${this.url}?lat=${lat}&lon=${lng}&APPID=${this.apiID}`)
            .then( (response) => {
                console.log(response);
                this.setState({mycity: response.data, loaded: true});
            })
            .catch( (error) => {
                // this.setState({error: error.request.status, loaded: true});
                console.log(error);
            })
    };

    componentDidMount() {
        this.setState({error: false});
        navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
    }


    componentDidUpdate() {
        if (this.state.loaded === false ) {
            this.getCoords();
            console.log('load');
        }
    }

    render() {
        // if (!this.state.error && this.state.error === '400' ) {

            return (
                <div>
                    <p>longitude: {this.state.lat}</p>
                    <p>latitude: {this.state.lng}</p>
                    <SingleCity city={this.state.mycity}/>
                </div>
            )
        // }
        // return(<div>Cannot load city, error {this.state.error}</div>)
    }
}

export default CitiesContainer;
