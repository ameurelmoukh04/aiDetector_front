import React from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../commun/navbar/Navbar';
import axios from 'axios';

const backendURL = 'http://127.0.0.1:8000/api'
const Login = () => {
    const { register, handleSubmit } = useForm();
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
                const token = localStorage.setItem('token', response.data.token);
                const role = localStorage.setItem('roles', JSON.stringify(response.data.roles));
                console.log(response.data.user);
                alert('logged in')
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <>
            <Navbar />
            <div className='flex justify-center items-center min-h-screen bg-gray-100'>
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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
                        <button type='submit' className='button'>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login