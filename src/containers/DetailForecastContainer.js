import React from 'react'
import Welcome from "../components/Welcome";
import ForecastCity from "../components/ForecastCity";
import {Switch, Route} from 'react-router-dom';

const DetailForecastContainer =() => {
    return(
        <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/:id" render={() => <ForecastCity /> }/>
        </Switch>
    )
};

export default DetailForecastContainer