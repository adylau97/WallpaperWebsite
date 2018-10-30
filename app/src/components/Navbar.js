import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './Navbar.css';
import Favorite from './Favorite';

export default class CustomNavBar extends Component{

  state = {
		searchText: ''
  };
  
  onSearchChange = e => {
		this.setState({ searchText: e.target.value });
  };
  
  handleSubmit = e => {
		e.preventDefault();
		this.props.onSearch(this.query.value);
		e.currentTarget.reset();
	};

  render(){
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Wave</Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              type="search"
              onChange={this.onSearchChange}
              ref={input => (this.query = input)}
              name="search"
              placeholder="Search..."
            />
             &nbsp;
            <button type="submit" id="submit" className="search-button">
              <i>search</i>
            </button>
          </form>
            <NavItem eventKey={1} componentClass={Link} href="/" to="/">
              Home
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href="/" to="/favorite">
              Favorites
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}