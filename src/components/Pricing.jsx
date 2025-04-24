import axios from 'axios';
import React, { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js';

const Pricing = () => {
    const token = localStorage.getItem('token');
    
    const handleSignUp = async () =>{
        const url = 'http://localhost:8000/api/checkout';
        if(!token){
            alert('you are not Authenticated');
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        }

        const response =await axios.get(url,config);
        window.location.href = response.data.url;
        }
  return (
<div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
  <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
    <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Pricing</h2>
    <p className="mt-1 text-gray-600 dark:text-neutral-400">Whatever your status, our offers evolve according to your needs.</p>
  </div>

  <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
    <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 dark:border-neutral-800 lg:col-start-1">
      <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">Starter</h4>
      <span className="mt-7 font-bold text-5xl text-gray-800 dark:text-neutral-200">Free</span>
      <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">Essential Features</p>

      <ul className="mt-7 space-y-2.5 text-sm">
        <li className="flex gap-x-2">
          <svg className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            1 user
          </span>
        </li>

        <li className="flex gap-x-2">
          <svg className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            Plan features
          </span>
        </li>

        <li className="flex gap-x-2">
          <svg className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            Product support
          </span>
        </li>
      </ul>

      <a className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800" href="#">
        Sign up
      </a>
    </div>

    <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 dark:border-neutral-800">
      <h4 className="font-medium text-lg text-gray-800 dark:text-neutral-200">Enterprise</h4>
      <span className="mt-5 font-bold text-5xl text-gray-800 dark:text-neutral-200">
        0.99
        <span className="font-bold text-2xl -me-2">$</span>
        <span className="font-bold text-2xl -me-2"> /Month</span>
      </span>
      <p className="mt-2 text-sm text-gray-500 dark:text-neutral-500">All Platform Features</p>

      <ul className="mt-7 space-y-2.5 text-sm">
        <li className="flex gap-x-2">
          <svg className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            10 users
          </span>
        </li>

        <li className="flex gap-x-2">
          <svg className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            Plan features
          </span>
        </li>

        <li className="flex gap-x-2">
          <svg className="shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          <span className="text-gray-800 dark:text-neutral-400">
            Product support
          </span>
        </li>
      </ul>

      <a className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 cursor-pointer" data-turbo="false" onClick={handleSignUp}>
        Sign up
      </a>
    </div>
  </div>
</div>
  )
}

export default Pricing