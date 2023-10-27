import DropdownBtn from "./Menu/DropdownBtn";
import MenuLink from "./Menu/MenuLink";


const Navbar = () => {

    const links = [
        {
            path: '/',
            title: "Авто"
        },
        {
            path: '/cartype',
            title: "Тип"
        },
        {
            path: '/carmodel',
            title: "Модель"
        },
        {
            path: '/procient',
            title: "Процент"
        },
        {
            path: '/month',
            title: "Месяц"
        }
    ]

    return <nav class="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center">
                <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
            <div class="hidden w-full md:block md:w-auto" id="navbar-multi-level">
                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <DropdownBtn links={links} title={"Авто"} />
                    <MenuLink path={'/'} title={'Home'} />
                </ul> 
            </div>
        </div>
    </nav>

}

export default Navbar;