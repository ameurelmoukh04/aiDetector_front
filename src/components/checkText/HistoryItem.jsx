import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HistoryItem = (props) => {
  const characterNumber = 300;
  const [score, setScore] = useState(null);
  
  
  useEffect(() => {
    setScore(props.item.result)
    console.log(props.item)
  }, [score])


  return (
    <div className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-2xl '>
      <h1 className='text-4xl font-bold text-gray-900 text-center pt-5'>Check any text if it contains Ai!!</h1>
      <form className='space-y-4'>
        <div>
          <label className='block text-lg font-medium text-gray-700'>text : </label>
          <textarea name="content" id="content" cols="40" rows="10" className='mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500' value={props.item.content} readOnly></textarea>
          <p>{characterNumber} Characters</p>
        </div>

        <input type="submit" value='Check' className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition duration-300  ${characterNumber >= 200 ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`} />
      </form>
      {score !== null && (


        <div id="container" className="flex w-full gap-6 p-4">
          {score}
        </div>


      )}
    </div>
  )
}

export default HistoryItem