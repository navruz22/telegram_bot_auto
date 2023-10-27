import React, { useEffect, useRef } from 'react'
import MenuLink from './MenuLink'

const DropdownList = ({links, isHidden, setIsHidden}) => {

    const ref = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setIsHidden(true)
          }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);

    return (
        <div ref={ref} className={`absolute z-10 ${isHidden && "hidden" || ""} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}>
            <ul class="py-2 px-1 font-medium max-w-full" aria-labelledby="dropdownLargeButton">
                {links.map((link, ind) => 
                    <MenuLink onClick={() => setIsHidden(true)} key={ind} path={link.path} title={link.title}/>
                )}
            </ul>
        </div>
    )
}

export default DropdownList
