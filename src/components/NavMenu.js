import React, { Component } from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { getSearchedCity } from '../redux/actions/LoadWeatherAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NavMenu extends Component {
	state = {
		search: '',
	};
	search = e => {
		this.setState({ search: e.target.value });
	};

	searchNewCity = e => {
		e.preventDefault();
		this.props.getSearchedCity(this.state.search);
		this.setState({ search: '' });
	};

	render() {
		return (
			<Navbar bg="info">
				<Navbar.Brand>
					<NavLink to="/">My weather app</NavLink>
				</Navbar.Brand>
				<Form inline onSubmit={this.searchNewCity}>
					<FormControl
						type="text"
						placeholder="Search city by name"
						className="mr-sm-2"
						onChange={this.search}
						value={this.state.search}
					/>
					<Button type="submit" variant="success">
						Search
					</Button>
				</Form>
			</Navbar>
		);
	}
}

const mapStateToProps = ({ isRequestInProgress, error, searchedCity }) => ({
	isRequestInProgress,
	error,
	searchedCity,
});
const mapDispatchToProps = dispatcher => bindActionCreators({ getSearchedCity }, dispatcher);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavMenu);
