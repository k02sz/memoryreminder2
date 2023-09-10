import React from 'react'
import { useRef, useState} from 'react';

const Addword = () => {
    const [defaultmessage, setDefaultmessage] = useState('');
    const [data, setData] = useState([]);
    const newPyt = useRef(null);
    const newOdp = useRef(null);

    const handleClick = async () => {
        const pytValue = newPyt.current.value;
        const odpValue = newOdp.current.value;
        try {
          const response = await fetch('backend/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pytanie: pytValue, odpowiedz: odpValue }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to send data');
          }
      
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className="m-10 rounded-lg bg-slate-500 px-6 py-8 shadow-xl ring-1 ringslate-900">
        <div class="mb-6">
            <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 text-center">Question</label>
            <input ref={newPyt} type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div class="mb-6">
            <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 text-center">Answer</label>
            <input ref={newOdp} type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
            <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={handleClick}
            >
                Add
            </button>
        </div>
    </div>
  )
}

export default Addword