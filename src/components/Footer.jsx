import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='fixed inset-x-0 bottom-0'>
        <footer class="rounded-lg shadow m-4 dark:bg-gray-800 bottom-0 border-4 border-slate-500">
            <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023 Kacper Szymecki 
                </span>
                <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <Link to="/">
                        <button className='buttonA'>
                            Home
                        </button>
                    </Link>
                    <Link to='/add'>
                        <button className='buttonA'>
                            Add Words
                        </button>
                    </Link>
                </ul>
            </div>
        </footer>
    </div>
  )
}

export default Footer