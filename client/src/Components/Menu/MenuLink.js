import { Link } from "react-router-dom";
import DropdownIcon from "./DropdownIcon";

const activeLink = 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent'
const notAvctiveLink = "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"

const MenuLink = ({ title, path }) => {
    return <li>
        <Link className={notAvctiveLink} to={path}>
            {title}
        </Link>
    </li> 
}

export default MenuLink;