import React from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'
import './navbar.css'
const Navbar = () => {
  
  const token = localStorage.getItem('token');

  const logout = async () =>{
    const backendURL = 'http://127.0.0.1:8000/api'
        try {
            const token = localStorage.getItem("token");
            console.log(token)
            const response = await axios.post(`${backendURL}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "application/json",
                    'Accept': "application/json",
                  }
            });
            localStorage.removeItem("token");
            console.log(response.data.message);
            window.location.href = "/login";
        } catch (error) { console.log(error.message) }
    }
    
    
    return (
      <>
    <nav className='container'>
      <div>
        <h1 className='text-4xl'><Link to={'/'}>Ai Detector</Link></h1>
      </div>
      <div className='linkContainer'>
        <Link to={'/check'} >Check Text</Link>
        <button><Link to={'/scanPDF'}>scanPDF</Link></button>
        {token ?
        <button className='cursor-pointer' onClick={()=> logout()} >Log out</button> : <Link to={'/login'}>Login|Register</Link>
      }
      </div>
    </nav>
    
    </>
  
  )
}

export default Navbar