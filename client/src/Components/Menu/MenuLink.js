import { Link, useLocation } from "react-router-dom";

const activeLink = 'block py-2 pl-3 pr-4 text-blue-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
const notAvctiveLink = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"

const MenuLink = ({ title, path, onClick }) => {

    const location = useLocation()
    console.log(location);
    return <li>
        <Link onClick={onClick} className={path === location.pathname ? activeLink : notAvctiveLink} to={path}>
            {title}
        </Link>
    </li> 
}

export default MenuLink;