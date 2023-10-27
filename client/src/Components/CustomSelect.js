import React from 'react'
import Select from 'react-select';

const CustomSelect = ({ defaultValue, options, onChange, blockClasss, label }) => {
    return (
        <div className={blockClasss}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <Select
                value={defaultValue}
                name="colors"
                options={options}
                onChange={onChange}
                className="basic-multi-select"
                classNamePrefix="select"
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        height: 42,
                        width: "100%"
                    }),
                }}
            />
        </div>
    )
}

export default CustomSelect
