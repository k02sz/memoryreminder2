import React from 'react'

const Footer = () => {
    const sendData = async (value) => {
        try {
          const response = await fetch('http://localhost:5000/answer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: value }),
          });
      
          if (!response.ok) {
            throw new Error('Failed to send data');
          }
      
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error(error);
        }
      }
  return (
    <div className='absolute inset-x-0 bottom-0'>
        <div className='flex justify-center p-10'>
            <button className='buttonA'>Add Word</button>
            <button className='buttonA'>All Words</button>
        </div>
        <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800 bottom-0">
            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023 Kacper Szymecki 
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        About
                    </button>
                    <button type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Settings
                    </button>
                </ul>
            </div>
        </footer>
    </div>
  )
}

export default Footer