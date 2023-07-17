import React from 'react';
import { Link } from "react-router-dom"

const OperationsUpdate = () => {
    return (
        <div className="solid-br rounded-lg mt-5 py-3">
            <div className="grid grid-cols-3 gap-4 px-5">
                <div className="mt-2">
                    <p className='font-semibold text-lg'>Data Entry</p>
                </div>
                <div className="mt-2">
                    <p className='text-sm'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptate?</p>
                </div>
                <div className="mt-2 ml-auto" style={{textAlign:'right'}}>
                    <Link 
                        to="/operation-data-entry" 
                        className="bg-green solid-br white-text-2 text-sm py-3 px-5 w-full rounded flex"
                    >
                        Click Button
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default OperationsUpdate