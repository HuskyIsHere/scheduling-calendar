import React, { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import configData from "../config";
import '../assets/NavBar.css';

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const path = window.location.pathname;

  useEffect(() => {
		if (!user) {
      window.location.replace("/");
    } else if (!user.user.is_staff) {
      window.location.replace("/home");
    }
  }, [user]);

  async function logout() {
    await axios.post(configData.API.LOGOUT, {
      headers:{'Authorization':'Token '+ user.token}
      })
      .then(response => {
        sessionStorage.removeItem('user')
        window.location.replace("/");
      })
      .catch(error => {
        window.alert(error)
      })
    }

	return (
    <div className='nav-bar'>
      <div>
        <button onClick={()=>{localStorage.state="home";  navigate('/reservation')}}
          className={path === "/reservation" ? 'nav-select' : 'nav-not-select'}>Home</button>
        <button onClick={()=>{localStorage.state="signup"; navigate('/signup')}}
          className={path === "/signup" ? 'nav-select' : 'nav-not-select'}>Signup</button>
        <button onClick={()=>{localStorage.state="booking"; navigate('/customer')}}
          className={path === "/customer" ? 'nav-select' : 'nav-not-select'}>Customer</button>
        <button onClick={()=>{localStorage.state="admin"; window.location.assign(configData.API.ADMIN)}}
          className={'nav-not-select'}>Admin</button>
      </div>
      <div>
        {user && <>{user.user.username}</>}
        <button className="nav-logout" onClick={logout} >Logout</button>
      </div>
    </div>
	);
}

export default Navbar;