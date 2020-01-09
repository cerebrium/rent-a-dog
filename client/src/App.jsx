import React, { useState, useEffect, Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import './App.css';
import AllDogs from './AllDogs';
import CreatePic from './CreatePic';
import Home from './Home';
import MeetDog from './MeetDog';
import Profile from './Profile';
import SavedPics from './SavedPics';
import CompareProfile from './CompareProfile';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const [ user, setUser] = useState(null)

  const responseGoogle = (response) => {
    // setUserName(response.profileObj.givenName)
    // setUserId(response.profileObj.googleId)
    // setUserEmail(response.profileObj.email)
    // another commentg
      axios.post('/auth/signup', {
        name: response.profileObj.name, 
        email: response.profileObj.email, 
        photo: 'https://res.cloudinary.com/sross9845/image/upload/v1578533522/petapi/kdelzzpcccqszxbgnjr1.jpg',
        favoriteDogs: {name: BentleyTinta}
      }).then(res => {
        setUser(res.data)
        console.log(res.data)
    })
  }

  var profile;
  if(user) {
    console.log(user)
    profile = (
      <div>
        <Router>
        <nav><img className='logo' src='https://i.imgur.com/cvN4hi9.png' ></img>
        <Link className='navlink' to='/create'>CREATE</Link>{' | '}
        <Link  className='navlink' to='/saved'>SAVED</Link>{' | '}
        <Link  className='navlink' to='/meet'>ADOPT</Link> {' | '} 
        <Link className='navlink' to='/compare' >TOP DOGS</Link> {' | '} 
        <Link  className='navlink' to='/profile'>PROFILE</Link>{' | '} 
        <Link className='navlink' to='/'>HOME</Link>{' | '}
        <Link className='navlink' to='/dogs'>DOGS</Link>{' | '} 
        {profile}
        </nav>
        <Route exact path='/' render={() => <Home user={user} /> } />
        <Route exact path='/dogs' component={AllDogs} />
        <Route exact path='/create' render={() => <CreatePic user={user}/> } />
        <Route exact path='/meet' render={() => <MeetDog user={user}/> } />
        <Route exact path='/saved' render={() => <SavedPics user={user}/> } />
        <Route exact path='/compare' render={() => <CompareProfile user={user}/> } />
        <Route exact path='/profile' render={() => <Profile user={user} /> } />
      </Router>
    </div>
    )
  } else {
    profile = (
    <div className='googleLogin'>
      <h1>Click to login with Google!</h1>
      <GoogleLogin
      clientId="175290320384-vt629625mlol0lle42p91bsi1mvdh0cn.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      />
    </div>)
  }
 

  return ( 
    <>
      {profile}
    </>
  );

}

export default App;