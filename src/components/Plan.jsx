import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Plan = () => {
    const BACKEND_URL = 'http://127.0.0.1:8000/api';
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    const [plan,setPlan] = useState('')



    useEffect(() => {
        const checkSubscription = async () => {
            const response = await axios.get(`${BACKEND_URL}/isSubscribed`, config);
            console.log(response.data)
            setPlan(response.data.subscription)
        }
        checkSubscription();
    })
    const cancel = () => {
        axios.get(`${BACKEND_URL}/subscription/cancel`, config)
            .then((response) => console.log(response.data))
    }
    return (
        <>
        <div>
            {plan === ''
            ?<h2 className='text-center'>Loading...</h2>
            : <h2 className='text-center'>You are Subscribed to the {plan} Plan</h2>
        }
        </div>
        <div className='flex flex-row justify-center mt-5'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded cursor-pointer' onClick={()=> cancel()}>Cancel My Subcription</button>

        </div>
        </>
    )
}

export default Plan