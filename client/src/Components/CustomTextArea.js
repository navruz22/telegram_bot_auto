import React from 'react'

const CustomTextArea = ({ placeholder, label, rows, cols, value, onChange }) => {
    return (
        <div>
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <textarea
                value={value}
                onChange={onChange}
                id="message"
                rows={rows}
                cols={cols}
                class="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
            ></textarea>
        </div>
    )
}

export default CustomTextArea
