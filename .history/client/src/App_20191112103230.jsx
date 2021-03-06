import React, { Component } from 'react';
import './App.css';
import AllDogs from './AllDogs';
import CreatePic from './CreatePic';
import Home from './Home';
import MeetDog from './MeetDog';
import Profile from './Profile';
import SavedPics from './SavedPics';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  NavLink
} from "react-router-dom";

class App extends Component {
  state = { 
    token: '',
    user: null,
    errorMessage: '',
    lockedResult: '',
    
  }
  checkForLocalToken = () => {
    //look for token in local storage
    let token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined'){
      //if no token remove all evidence of mernToken from localStorage and state
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      // if we find token verify it on the backend
      axios.post('/auth/me/from/token', {token})
      .then( response => {
        if (response.data.type === 'error'){
          // console.log('ERROR:', response.data.message)
          localStorage.removeItem('mernToken')
          this.setState({
            token: '',
            user: null,
            errorMessage: response.data.message
          })
        } else {
          //if verified store it back in local storage and state
          localStorage.setItem('mernToken', response.data.token)
          this.setState({
            token: response.data.token,
            user: response.data.user
          })
        }
      })
    }
  }

  componentDidMount = () => {
    this.checkForLocalToken()
  }
  liftToken = ({token, user}) => {
    this.setState({
      token,
      user
    })
  }

  logOut = () => {
    localStorage.removeItem('mernToken')
    this.setState({
      token: '',
      user: null,
    })
  }

  handleClick = () => {
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get('/locked/test', config)
    .then(response => {
      this.setState({
        lockedResult: response.data
      })
    })
  }
  
  render() { 
    return ( 
      <div>
        <Router>
        <nav><img className='logo' src='https://i.imgur.com/cvN4hi9.png' ></img><NavLink className='navlink' to='/'>HOME</NavLink>{' | '}<NavLink className='navlink' to='/dogs'>DOGS</NavLink>{' | '}<NavLink className='navlink' to='/create'>CREATE</NavLink>{' | '}<NavLink  className='navlink' to='/saved'>SAVED</NavLink>{' | '}<NavLink  className='navlink' to='/profile'>PROFILE</NavLink></nav>
          <Route exact path='/' component={Home} />
          <Route exact path='/dogs' component={AllDogs} />
          <Route exact path='/create' render={() => <CreatePic user={this.state.user}/> } />
          <Route exact path='/meet/:id' render={() => <MeetDog user={this.state.user}/> } />
          <Route exact path='/saved' render={() => <SavedPics user={this.state.user}/> } />
          <Route exact path='/profile' render={() => <Profile user={this.state.user}/> } />
        </Router>
        </div>
    );
  }
}

export default App;