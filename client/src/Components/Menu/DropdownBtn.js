import { useState } from "react";
import DropdownList from "./DropdownList";
import { useLocation } from "react-router-dom";

const activeLink = 'flex items-center justify-between w-full py-2 pl-3 pr-4  text-blue-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent'
const notAvctiveLink = "flex items-center justify-between w-full py-2 pl-3 pr-4  text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"


const DropdownBtn = ({ title, links }) => {

    const [isHidden, setIsHidden] = useState(true)

    const location = useLocation()


    return <li className="relative">
        <button id="dropdownNavbarLink" onClick={() => setIsHidden(!isHidden)} data-dropdown-toggle="dropdownNavbar" class={links.some(l => l.path === location.pathname) ? activeLink : notAvctiveLink}>
            {title} <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
            </svg></button>
        <DropdownList isHidden={isHidden} setIsHidden={setIsHidden} links={links} />
    </li>
}

export default DropdownBtn;