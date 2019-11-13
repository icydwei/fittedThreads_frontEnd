import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import { Image, Menu, Segment, Icon } from 'semantic-ui-react'
import {logOutUser, toggleSearch, goHome} from '../redux/actions'

class NavBar extends Component {


  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    let { user, activeItem } = this.props

    return (

      <div id="navBarBackground" style={{ padding: '10px 0px 0px 0px', marginBottom: '6px'}}>
        <Image src="https://fontmeme.com/permalink/191104/0280bed54d0e9e77f2c3131d3b7a1b61.png" id="mainLogo"></Image>
        <Segment inverted color='black'>
          <Menu inverted secondary widths={6} icon='labeled'>
            <Menu.Item
              name='home'
              as={ Link }
              to="/home"
              active={activeItem === 'home'}
              onClick={(e, clickObj) => {
                this.props.goHome()
                this.handleItemClick(e, clickObj)
              }}
            >
             <Icon name='home' />
             Home
             </Menu.Item>

             <Menu.Item
               name='Search'
               as={ Link }
               to="/home"
               active={activeItem === 'Search'}
               onClick={(e, clickObj) => {
                 this.props.toggleSearch()
                 this.handleItemClick(e, clickObj)
               }}
             >
             <Icon name='search' />
             Search
             </Menu.Item>

            <Menu.Item
              name='Add Clothing'
              as={ Link }
              to="/addclothing"
              active={activeItem === 'Add Clothing'}
              onClick={this.handleItemClick}
            >
            <Icon name='plus square' />
            Add Clothing
            </Menu.Item>

            <Menu.Item
              name='Profile'
              as={ Link }
              to="/profile"
              active={activeItem === 'Profile'}
              onClick={this.handleItemClick}
            >
            <Icon name='user' />
            {`${user.username}'s`} Profile
            </Menu.Item>


            <Menu.Item position="right"
              name='Logout'
              active={activeItem === 'logout'}
              onClick={this.props.logOutUser}
            >
            <Icon name='hand spock' />
            Logout
            </Menu.Item>
          </Menu>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.loggedInUser
    activeItem: state.activeItem
  }
}


const mapDispatchToProps = dispatch => {
  return {
    logOutUser: () => {dispatch ( logOutUser() )},
    toggleSearch: () => {dispatch ( toggleSearch() )},
    goHome: () => {dispatch ( goHome() )}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
