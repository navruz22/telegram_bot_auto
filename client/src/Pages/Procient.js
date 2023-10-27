import { useEffect, useState } from "react";
import CustomBtn from "../Components/CustomBtn";
import CustomInput from "../Components/CustomInput";
import Api from "../Config/Api"
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify'

const Procient = () => {

    const [procients, setProcients] = useState([])

    const getProcients = async () => {
        try {
            const { data } = await Api.get(`/procient/get`)
            setProcients(data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //============================================================
    //============================================================

    const [procient, setProcient] = useState(0)

    const handleCreate = async () => {
        try {
            const { data } = await Api.post(`/procient/create`, {
                procient
            })
            setProcient(0)
            setProcients([...procients, data])
            toast.success(`Проценты успешно созданы!`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await Api.delete(`/procient/delete/${id}`)
            setProcients([...procients].filter(el => el._id !== id))
            toast.success(`Проценты успешно удалены!`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const checkData = (e) => {
        e.preventDefault()
        if (!procient) {
            return toast.warn("Заполните поля!")
        }
        handleCreate()
    }

    //============================================================
    //============================================================

    useEffect(() => {
        getProcients()
    }, [])


    return <div className="py-[70px]">
        <form className="max-w-[700px] mx-auto flex items-end gap-4 mb-[100px]">
            <CustomInput type={"number"} value={procient} onChange={(e) => setProcient(e.target.value)} label={'Процент'} blockClasss="w-full" />
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
                            Процент
                        </th>
                        <th scope="col" class="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {procients.map((el, ind) =>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ind + 1}
                            </th>
                            <td class="px-6 py-4">
                                {el.procient}
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

export default Procient;