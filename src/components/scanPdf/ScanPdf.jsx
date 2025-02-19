import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Navbar from '../commun/navbar/Navbar'
import { Link } from 'react-router-dom';

const ScanPdf = () => {
    const { register, handleSubmit, watch } = useForm();
    const [score, setScore] = useState(null);
    const [content,setContent] = useState('');
    const token = localStorage.getItem('token');

    const [characterNumber, setCharacterNumber] = useState(0);
    const contentValue = watch("content", "");




    const onSubmitFunction = async (data) => {
        const formData = new FormData();
        formData.append("pdf", data.pdf[0]);
        setScore(null)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/api/scan', formData, config)
        if (response.status == 200) {
            console.log(response.data.data)
            setScore(response.data.data)
            setContent(response.data.content)
            setCharacterNumber(content.length);
        }

    }

if(!token){
    return(
        <>
        <Navbar />
        <h1 className='text-center'>You are not Authenticated for Scanning Pdf's</h1>
        </>
    )
}
    return (
        <>
            <Navbar />
            <h1 className='text-4xl font-bold text-gray-900 text-center pt-5'>Check any text if it contains Ai!!</h1>
            <div className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl '>
                <form onSubmit={handleSubmit(onSubmitFunction)} className='space-y-4' accept="application/pdf" required>
                    {!content ? '' :
                    <div>
                        <label className='block text-lg font-medium text-gray-700'>text : </label>
                        <textarea name="content" id="content" cols="40" rows="10" {...register('content')} className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500' readOnly value={content}></textarea>
                        <p>{content.length} Characters</p>
                    </div>
                    }
                    <div>
                        <label className='block text-lg font-medium text-gray-700'>Emport PDF File : </label>
                        <input type="file" className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300 `} {...register('pdf')} />
                    </div>

                    <input type="submit" value='Check' className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300`} />
                </form>

                {score !== null && (


                    <div id="container" className="flex w-full gap-6 p-4">

                        <div id="Human" className="flex flex-col items-center gap-2 p-4 border rounded-lg shadow-md w-1/2">
                            <h2 className="text-2xl text-center font-semibold">Human Rate</h2>
                            {score !== null && <h2 className="text-xl text-gray-bold">{100 - score} %</h2>}
                        </div>

                        <div id="Ai" className="flex flex-col items-center gap-2 p-4 border rounded-lg shadow-md w-1/2">
                            <h2 className="text-2xl font-semibold">AI Rate</h2>
                            {score !== null && <h2 className="text-xl text-gray-bold text-center">{score} %</h2>}
                        </div>
                    </div>


                )}
            </div>
        </>
    )
}

export default ScanPdf