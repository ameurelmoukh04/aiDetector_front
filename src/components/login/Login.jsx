import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../commun/navbar/Navbar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LoginImage from '../../assets/image.png'
import GoogleImage from '../../assets/google.webp'

const backendURL = 'http://127.0.0.1:8000/api'
const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [loginUrl,setLoginUrl] = useState(null);
    const backendURL = 'http://127.0.0.1:8000/api'

    const handleGoogleLogin = async () =>{
        const res = await axios.get('http://localhost:8000/api/auth');
        window.location.href = res.data.url;
    }

    const submitForm = async (data) => {
        const {email,password} = data;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }
            const response = await axios.post(`${backendURL}/login`,
                { email, password },
                config);
                
                
                if (response.status === 200) {
                    const token = localStorage.setItem('token', response.data.Authorization.token);
                    console.log(response.data.Authorization.token);
                    alert('logged in')
                    navigate('/')
                }
            } catch (error) {
                console.log(error.message)
            }
        }
    return (
        <>
            <Navbar />
            <div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-center lg:items-center'>
                <div className='invisible sm:visible w-100 justify-center '>
                <img src={LoginImage} alt="" className='w-100'/>
                </div>
                <div className="flex flex-col w-100 border border-gray-200 text-center rounded-xl p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>


                    <form onSubmit={handleSubmit(submitForm)} className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block text-gray-700'>Email :</label>

                            <input
                                type='email'  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                {...register('email')}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor='password' className='block text-gray-700'>Password :</label>
                            <input
                                type='password'  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your Password"
                                {...register('password')}
                                required
                            />
                        </div>
                        <button type='submit' className='w-80 p-2 border border-gray-200 text-center rounded-xl'>
                            Login
                        </button>
                        <p>OR</p>
                        <button className='flex items-center w-80 justify-center gap-2 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600' onClick={()=>handleGoogleLogin()}><img src={GoogleImage} className='w-10 h-10' /> Login With Google</button>
                        <div>
                        <Link to='/register' >Don't have account? <span className='underline'>Register</span></Link>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login