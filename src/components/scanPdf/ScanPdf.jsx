import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Navbar from '../commun/navbar/Navbar'
import { Link } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import { MdOpenInNew } from "react-icons/md";

const ScanPdf = () => {
    const { register, handleSubmit, watch } = useForm();
    const [score, setScore] = useState(null);
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [history,setHistory] = useState([])

    const token = localStorage.getItem('token');

    const [characterNumber, setCharacterNumber] = useState(0);
    const contentValue = watch("content", "");




    const onSubmitFunction = async (data) => {
        const formData = new FormData();
        formData.append("pdf", file);
        setScore(null)
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/api/scan', formData, config)
        if (response.status == 200) {
            console.log(response.data)
            setScore(response.data.data)
            setContent(response.data.content)
            setCharacterNumber(content.length);
        }

    }

    useEffect(() => {
        const URL = 'http://127.0.0.1:8000/api/history/pdf';
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const fetchHistory = async () => {
            const response = await axios.get(URL, config)
            setHistory(response.data.data);
        }
        fetchHistory()
    }, [])


    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    if (!token) {
        return (
            <>
                <Navbar />
                <div>
                <h1 className='text-center'>Just Authenticated Users can Scan Pdf's</h1>
                <Link className='text-center' to='/login'>Login</Link>

                </div>
            </>
        )
    }
    const deleteItem = async(id)=>{
        const BACKEND = 'http://localhost:8000/api/history/delete';
        console.log(id)
        const data ={
            history_id:id,
            history_type:"PDF"
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
    return (
        <>

            <Navbar />
            <div className='flex h-screen'>
            <div className="w-full max-w-xs bg-white border-r border-gray-200 h-screen overflow-y-auto">
                    <h2 className="text-lg font-semibold p-4 border-b">History</h2>
                    {history.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-200 transition-all"
                        >
                            <h3 className="text-sm text-gray-800 font-medium truncate">
                                {item.filename?.slice(0, 50) || 'No preview available...'}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                                Ai written Rate : {item.result}%
                            </p>
                            <button className='cursor-pointer' onClick={() => deleteItem(item.id)}><MdDeleteOutline /></button>
                                                        <button className='cursor-pointer' onClick={() => viewImage(item.id)}><MdOpenInNew /></button>
                        </div>
                    ))}
                </div>

                <div className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl '>
                    <h1 className='text-4xl font-bold text-gray-900 text-center pt-5'>Check any text if it contains Ai!!</h1>
                    <form onSubmit={handleSubmit(onSubmitFunction)} className='space-y-4' accept="application/pdf" required>
                        {!content ? '' :
                            <div>
                                <label className='block text-lg font-medium text-gray-700'>text : </label>
                                <textarea name="content" id="content" cols="40" rows="10" {...register('content')} className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500' readOnly value={content}></textarea>
                                <p>{content.length} Characters</p>
                            </div>
                        }
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-xl p-6 text-center ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                                }`}
                        >
                            <input
                                type="file"
                                onChange={handleChange}
                                className="hidden"
                                id="upload-file"
                            />
                            <label htmlFor="upload-file" className="cursor-pointer block">
                                {file ? (
                                    <p className="text-green-600">{file.name}</p>
                                ) : (
                                    <p>Drag & Drop your file here or <span className="text-blue-500 underline">browse</span></p>
                                )}
                            </label>
                        </div>

                        <input type="submit" value='Check' className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300 cursor-pointer`} />
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
            </div>
        </>
    )
}

export default ScanPdf