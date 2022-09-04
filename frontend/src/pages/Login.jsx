import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import configData from "../config";

import '../assets/Auth.css';

const Login = () => {
	let imgs = ["img/img1.jpg", "img/img2.jpg", "img/img3.jpg", "img/img4.jpg", "img/img5.jpg"]
	let [img, setImag] = useState(imgs[imgs.length-1])
	const [inputs, setInputs] = useState({});
	let user = JSON.parse(sessionStorage.getItem('user'))

	useLayoutEffect(() => {
		if (user) {
			handleRedirect(user)
		}
	}, []);

	useEffect(() => {
		const interval = setInterval(()=>{
			let imgT = imgs.shift()
			imgs.push(imgT)
			setImag(imgT)
		}, 5000);
		return () => clearInterval(interval);
	}, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  async function login(data) {
    sessionStorage.setItem('user', JSON.stringify(data))
	handleRedirect(data)
  }

	function handleRedirect(user) {
		if (user.user.is_staff) {
			sessionStorage.setItem('customer', 'admin')
			return window.location.replace("/reservation")
		} else {
			return window.location.replace("/home")
		}
	}

  async function handleLogin(event) {
    event.preventDefault();
    await axios.post(configData.API.LOGIN, inputs)
      .then(response => {
        login(response.data);
      })
      .catch(error => {
        window.alert("Wrong username or password. Note that both fields may be case-sensitive")
        console.log(error)
      })
  }

	return (
		<div style={{display: "flex", height: "100vh"}}>
			<div className="auth-sidebar">
			<img src={"./Logo2.jpeg"} alt="Logo" style={{borderRadius: "8px"}}/>
				<h1 style={{textAlign: "left", fontSize: "40px"}}>Login</h1>
				<form onSubmit={handleLogin} style={{width: "100%"}}>
					<input
						type="text"
						name="username"
						placeholder="Username"
						value={inputs.username || ""}
						required
						onChange={handleChange}
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={inputs.password || ""}
						required
						onChange={handleChange}
					/>
					<div className='auth-sign'>
						Create you account <Link to={"/signup"} style={{textDecoration: 'none', color: configData.COLOR.YELLOW}}>Sign Up</Link>
					</div>
					<button type="submit" style={{marginBottom:"5%"}}>Login</button>
				</form>
			</div>
			<img src={img} alt="poster" className="auth-poster"/>
		</div>
	);
}

export default Login;