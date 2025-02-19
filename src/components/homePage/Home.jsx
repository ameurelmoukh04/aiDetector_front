import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Navbar from '../commun/navbar/Navbar'
import { motion } from "framer-motion"; 
import {CheckCircle,PlayCircle} from 'lucide-react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
      <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      
      <section className="text-center py-20 px-6 max-w-3xl">
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
          Detect AI-Generated Text Instantly
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Our AI-powered detector helps you identify AI-generated content with high accuracy.
          Get started for free and test it now!
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
        >
          <Link to={'/check'}>Try it Now</Link>
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16 w-full px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Our AI Detector?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {["Fast & Accurate", "Secure & Private", "Free to Use"].map((feature, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-md flex items-center">
              <CheckCircle className="text-indigo-600 w-6 h-6 mr-3" />
              <p className="text-lg font-medium text-gray-800">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 w-full text-center bg-indigo-600 text-white">
        <h2 className="text-3xl font-bold">Start Detecting AI Text Now</h2>
        <p className="text-lg mt-2">Get 3 free Text checks Today!</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-6 bg-white text-indigo-600 py-3 px-6 rounded-lg text-lg font-medium hover:bg-gray-200 transition"
        >
          <Link to={'/check'}>Try For Free</Link>
        </motion.button>
      </section>
    </div>
    </>

  )
}

export default Home