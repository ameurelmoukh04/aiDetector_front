import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const GoogleAuthCallback = () => {
    const navigate = useNavigate(); 
    const config ={
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    useEffect(()=>{
        const fetchGoogleAuthToken = () =>{
        const code = new URLSearchParams(window.location.search).get('code');

        if (code) {
            axios.post('http://127.0.0.1:8000/api/auth/google/callback', { code},config)
              .then(res => {
                console.log(res.data.Authorization.token)
                localStorage.setItem('token', res.data.Authorization.token);
                navigate('/');
              }) 
              .catch(err => console.error(err));
          }
        }
        fetchGoogleAuthToken();
},[])

  return (
    <div>Authenticating...</div>
  )
}

export default GoogleAuthCallback