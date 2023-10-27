import { useEffect, useState } from "react";
import CustomBtn from "../Components/CustomBtn";
import CustomInput from "../Components/CustomInput";
import Api from "../Config/Api"
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify'

const Month = () => {

    const [months, setMonths] = useState([])

    const getMonths = async () => {
        try {
            const { data } = await Api.get(`/month/get`)
            setMonths(data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //============================================================
    //============================================================

    const [month, setMonth] = useState(0)

    const handleCreate = async () => {
        try {
            const { data } = await Api.post(`/month/create`, {
                month
            })
            setMonth(0)
            setMonths([...months, data])
            toast.success(`Месяц успешно создан!`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await Api.delete(`/month/delete/${id}`)
            setMonths([...months].filter(el => el._id !== id))
            toast.success(`Месяц успешно удален!`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const checkData = (e) => {
        e.preventDefault()
        if (!month) {
            return toast.warn("Заполните поля!")
        }
        handleCreate()
    }

    //============================================================
    //============================================================

    useEffect(() => {
        getMonths()
    }, [])


    return <div className="py-[70px]">
        <form className="max-w-[700px] mx-auto flex items-end gap-4 mb-[100px]">
            <CustomInput type={"number"} value={month} onChange={(e) => setMonth(e.target.value)} label={'Месяцы'} blockClasss="w-full" />
            <CustomBtn onClick={checkData} title={'Создать'} />
        </form>

        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            №
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Месяц
                        </th>
                        <th scope="col" class="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {months.map((el, ind) =>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ind + 1}
                            </th>
                            <td className="px-6 py-4">
                                {el.month}
                            </td>
                            <td class="px-6 py-4">
                                <button onClick={() => handleDelete(el._id)}>
                                    <AiFillDelete fontSize={20} className="text-red-400" />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
}

export default Month;
