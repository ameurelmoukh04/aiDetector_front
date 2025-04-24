import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Navbar from './commun/navbar/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';

import { MdDeleteOutline } from "react-icons/md";
import { MdOpenInNew } from "react-icons/md";


const GenerateImage = () => {
    const token = localStorage.getItem('token');
    const { handleSubmit, register } = useForm();
    const [actualImage, setActualImage] = useState('');
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    const BACKEND = 'http://localhost:8000/api/image/generate';
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    const sizes = ['512x512', '768x768', '1024x1024'];

    const viewImage = (id) => {
        let selectedItem = null;
        for (let i = 0; i < history.length; i++) {
            if (history[i].id === id) {
                selectedItem = history[i];
            }
        }
        console.log(selectedItem)
        window.open(`http://localhost:8000/storage/${selectedItem.path}`, '_blank')
    }

    const onSubmit = async (data) => {
        console.log(data)
        console.log(token)
        const result = await axios.post(BACKEND, data, config);
        setActualImage(result.data.path);

        console.log(result.data);
    }
   const deleteItem = async(id)=>{
        const BACKEND = 'http://localhost:8000/api/history/delete';
        console.log(id)
        const data ={
            history_id:id,
            history_type:"image"
        };
        const config = {
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/json",
                'Authorization': `Bearer ${token}`
            },
            data:data
        }
       const response = await axios.delete(BACKEND,config);
       console.log(response.data);

    }
    const characterNumber = 300;

    useEffect(() => {
        const URL = 'http://localhost:8000/api/history/images';
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const fetchHistory = async () => {
            const response = await axios.get(URL, config)
            setHistory(response.data.imageHistory);
            console.log(response.data.imageHistory)
        }
        fetchHistory()
    }, [])

    return (
        <>
            <Navbar />
            <div className='mt-12 grid grid-cols-3'>
                <div className="w-full max-w-xs bg-white border-r border-gray-200 h-screen overflow-y-auto">
                    <h2 className="text-lg font-semibold p-4 border-b">Images History</h2>
                    {history.length == 0
                        ? <h2 className='text-center'>Loading...</h2>
                        : history.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-200 transition-all"
                                
                            >
                                <h3 className="text-sm text-gray-800 font-medium truncate">
                                    {item.path?.slice(0, 50) || 'No preview available...'}
                                </h3>
                                <h3 className="text-sm text-gray-800 font-medium truncate">
                                    prompt : {item.prompt?.slice(0, 50) || 'No preview available...'}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1 truncate">
                                    Image size : {item.size}
                                </p>
                                <button className='cursor-pointer' onClick={()=>deleteItem(item.id)}><MdDeleteOutline /></button>
                                <button className='cursor-pointer' onClick={() => viewImage(item.id)}><MdOpenInNew /></button>
                                
                            </div>
                        ))}
                </div>

                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div>
                            <label className='block text-lg font-medium text-gray-700'>Image Prompt : </label>
                            <textarea name="content" id="content" cols="40" rows="10" {...register('prompt')} className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'></textarea>
                        </div>
                        <div>
                            <label htmlFor="">Image Size :</label>
                            <select {...register('size')}>
                                {sizes.map((size) => (
                                    <option value={size} key={size}>{size}</option>
                                ))}
                            </select>
                        </div>

                        <input type="submit" value='Generate' className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300  ${characterNumber >= 200 ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} />
                    </form>
                </div>
                <div>
                    <h2 className='text-center mt-5'>Generated Image</h2>
                    <div>
                        {actualImage === ''
                            ? <h3 className='text-center'>No Image Generated</h3>
                            :
                            <img src={`http://localhost:8000/storage/${actualImage}`} alt="" />

                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default GenerateImage