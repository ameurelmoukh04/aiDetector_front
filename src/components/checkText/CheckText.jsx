import axios from 'axios';
import React, { useMemo, useReducer } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import Navbar from '../commun/navbar/Navbar'
import HistoryItem from './HistoryItem';
import { MdDeleteOutline } from "react-icons/md";
import { MdOpenInNew } from "react-icons/md";

const CheckText = () => {
    const token = localStorage.getItem('token') || null;
    const { register, handleSubmit, watch } = useForm();

    const [score, setScore] = useState(null);
    const [history, setHistory] = useState([]);
    const [selectedItem,setSelectedItem] = useState(null)

    const [characterNumber, setCharacterNumber] = useState(0);
    const contentValue = watch("content", "");



    const onSubmitFunction = async (data) => {
        setScore(null)
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const response = await axios.post('http://127.0.0.1:8000/api/check', { content: data.content }, config)
        if (response.status == 200) {
            console.log(token);
            setScore(response.data.data)

        }

    }
    const showHistoryItem = (id) => {
        axios.get('http://127.0.0.1:8000/api/history/show', {
            params: { id: id },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then((response) => console.log(response.data.data))
            .catch((error) => console.log(error))
        return (
            <HistoryItem item={response.data.data} />
        )

    }



    useEffect(() => {
        const URL = 'http://127.0.0.1:8000/api/history/text';
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

    useEffect(() => {
        setCharacterNumber(contentValue.length);
    }, [contentValue]);

    const deleteItem = async(id)=>{
        const BACKEND = 'http://localhost:8000/api/history/delete';
        console.log(id)
        const data ={
            history_id:id,
            history_type:"text"
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

    const viewItem=(item) =>{
        const oldValue = selectedItem;
        setSelectedItem(item);
        if(selectedItem !==oldValue){
            console.log(
                'the same'
            )
        }
        console.log('item changed')
    //     return memorised = useMemo(
    //         ()=> {
    //         <HistoryItem item={item} />
    // },[item])
    }

    return (
        <>
            <Navbar />
            <div className='flex h-screen'>

                <div className="w-full max-w-xs bg-white border-r border-gray-200 h-screen overflow-y-auto">
                    <h2 className="text-lg font-semibold p-4 border-b">History</h2>
                    <div onClick={()=>setSelectedItem(null)}
                            className="p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-200 transition-all"
                        >
                            <h3 className="text-sm text-gray-800 font-medium truncate">
                                Check New Text
                            </h3>
                        </div>
                    {history.map((item, index) => (
                        <div
                            key={index}
                            className="p-4 cursor-pointer hover:bg-gray-100 border-b border-gray-200 transition-all"
                        >
                            <h3 className="text-sm text-gray-800 font-medium truncate">
                                {item.content?.slice(0, 50) || 'No preview available...'}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 truncate">
                                Ai written Rate : {item.result}%
                            </p>
                            <button className='cursor-pointer' onClick={() => deleteItem(item.id)}><MdDeleteOutline /></button>
                            <button className='cursor-pointer' onClick={() => viewItem(item)}><MdOpenInNew /></button>
                        </div>
                    ))}
                </div>
                {selectedItem
                ? <HistoryItem item={selectedItem}/>
                :
                <div className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl '>
                    <h1 className='text-4xl font-bold text-gray-900 text-center pt-5'>Check any text if it contains Ai!!</h1>
                    <form onSubmit={handleSubmit(onSubmitFunction)} className='space-y-4' encType='multipart/form-data'>
                        <div>
                            <label className='block text-lg font-medium text-gray-700'>text : </label>
                            <textarea name="content" id="content" cols="40" rows="10" {...register('content')} className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500'></textarea>
                            <p>{characterNumber} Characters</p>
                        </div>



                        <input type="submit" value='Check' className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300  ${characterNumber >= 200 ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} />
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
                }
            </div>
        </>
    )
}

export default CheckText