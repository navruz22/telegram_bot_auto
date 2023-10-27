import { useEffect, useState } from "react";
import CustomBtn from "../Components/CustomBtn";
import CustomInput from "../Components/CustomInput";
import Api from "../Config/Api"
import { FiEdit } from 'react-icons/fi';
import {toast} from 'react-toastify'
import AccessModal from "../Components/AccessModal";

const CarType = () => {

    const [name, setName] = useState('')
    const [typeId, setTypeId] = useState('')

    const handleCreate = async () => {
        try {
            const { data } = await Api.post(`/car_type/create`, {
                name,
            })
            setName('')
            setCarTypes([...carTypes, {
                _id: data._id,
                name: data.name
            }])
            toast.success(`Тип ${data.name} успешно создан!`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleUpdate = async () => {
        try {
            const { data } = await Api.put(`/car_type/update`, {
                name,
                _id: typeId
            })
            setName('')
            setTypeId('')
            setCarTypes([...carTypes].map(type => {
                if (type._id === data._id) {
                    type.name = data.name;
                }
                return type
            }))
            toast.success(`Тип ${data.name} успешно обнавлен!`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const checkData = (e) => {
        e.preventDefault()
        if (!name) {
            return toast.warn("Заполните поля!")
        }
        typeId ? handleUpdate() : handleCreate()
    }



    const [carTypes, setCarTypes] = useState([])

    const getCarTypes = async () => {
        try {
            const { data } = await Api.get(`/car_type/get`)
            setCarTypes(data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        getCarTypes()
    }, [])


    return <div className="py-[70px]">
        <form className="max-w-[700px] mx-auto flex items-end gap-4 mb-[100px]">
            <CustomInput value={name} onChange={(e) => setName(e.target.value)} label={'Тип машины'} blockClasss="w-full" />
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
                            Тип
                        </th>
                        <th scope="col" class="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {carTypes.map((type, ind) =>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ind + 1}
                            </th>
                            <td class="px-6 py-4">
                                {type.name}
                            </td>
                            <td class="px-6 py-4">
                                <button onClick={() => {
                                    setTypeId(type._id)
                                    setName(type.name)
                                }}>
                                    <FiEdit fontSize={20} className="text-amber-400" />
                                </button>
                                {/* <button onClick={() => {
                                    setTypeId(type._id)
                                    setName(type.name)
                                }}>
                                    <FiEdit fontSize={20} className="text-amber-400" />
                                </button> */}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        <AccessModal text={"Потвердите, что хотите удалить тип машины!"} />
    </div>
}

export default CarType;