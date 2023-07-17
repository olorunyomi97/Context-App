import React, { useState, useEffect } from 'react'
import { Link, useParams} from "react-router-dom";
import { useLocation } from "react-router-dom";

const Search = (props: any) => {
    const {} = props

    return (
        <div className='w-60'>
            <form>
                <div className="flex">
                    <label className="mb-2 text-sm font-medium sr-only dark:text-dark">Your Email</label>
                    <div className="relative w-full">
                        {/* <input 
                            type="text" 
                            className="block p-2.5 w-full z-20 text-sm text-black dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                            placeholder="Search..."
                            required 
                        /> */}
                        <input 
                            className="form-control pt-2 pb-2 pr-5 pl-3 solid-br" 
                            type="search" 
                            placeholder="Search" 
                            aria-label="Search"
                        />
                        <button type="submit" className="pt-3 absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-green-700 border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <span className="sr-only upload-text-2">Search...</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search
