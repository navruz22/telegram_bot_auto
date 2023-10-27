import React from 'react'
import { GiCancel } from 'react-icons/gi';

const EditBtn = ({ title, onClick, cancel }) => {
    return (
        <div className='relative'>
            <button onClick={onClick} className="h-[42px] text-white bg-amber-400 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">
                {title}
            </button>
            <GiCancel onClick={cancel} className='absolute top-[-20%] right-[-20%]' />
        </div>
    )
}

export default EditBtn
