import React, {Component} from 'react';
import {Navbar, Form, FormControl, Button} from 'react-bootstrap';
import {getSearchedCity} from "../redux/actions/LoadWeatherAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";


class NavMenu extends Component {
    state = {
        search: ''
    };
    search = e => {
        this.setState({search: e.target.value})
    };

    searchNewCity = e => {
        e.preventDefault();
        console.log(this.state.search);
        this.props.getSearchedCity(this.state.search);
    };

    render() {
        return (
            <Navbar bg="light">
                <Navbar.Brand>My weather app</Navbar.Brand>
                <Form inline onSubmit={this.searchNewCity}>
                    <FormControl type="text"
                                 placeholder="Search city by name"
                                 className="mr-sm-2"
                                 onChange={this.search}
                                 value={this.state.search}/>
                    <Button type="submit" variant="outline-success">Search</Button>
                </Form>
            </Navbar>
        )
    }
}

const mapStateToProps = ({ isRequestInProgress, error, searchedCity}) => ({
     isRequestInProgress, error, searchedCity
});
const mapDispatchToProps = dispatcher =>
    bindActionCreators({ getSearchedCity}, dispatcher);

export default connect(mapStateToProps,
    mapDispatchToProps
)(NavMenu);