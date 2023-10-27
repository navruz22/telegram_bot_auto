import { useEffect, useState } from "react";
import CustomBtn from "../Components/CustomBtn";
import CustomInput from "../Components/CustomInput";
import Api from "../Config/Api"
import { FiEdit } from 'react-icons/fi';
import { toast } from 'react-toastify'
import CustomMultiSelect from "../Components/CustomMultiSelect";
import EditBtn from "../Components/EditBtn";

const CarModel = () => {

    const [carModels, setCarModels] = useState([])

    const getCarModels = async () => {
        try {
            const { data } = await Api.get(`/car_model/get`)
            setCarModels(data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //============================================================
    //============================================================

    const [name, setName] = useState('')
    const [modelId, setModelId] = useState('')

    const handleCreate = async () => {
        try {
            const { data } = await Api.post(`/car_model/create`, {
                name,
                car_types: carTypes
            })
            clearData()
            setCarModels([...carModels, {
                _id: data._id,
                name: data.name,
                carTypes: data.carTypes
            }])
            toast.success(`Модель ${data.name} успешно создан!`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleUpdate = async () => {
        try {
            const { data } = await Api.put(`/car_model/update`, {
                name,
                _id: modelId,
                car_types: carTypes,
            })
            clearData()
            setCarModels([...carModels].map(type => {
                if (type._id === data._id) {
                    type.name = data.name;
                    type.carTypes = data.carTypes
                }
                return type
            }))
            toast.success(`Модель ${data.name} успешно обнавлен!`)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const checkData = (e) => {
        e.preventDefault()
        if (!name) {
            return toast.warn("Заполните поля!")
        }
        if (carTypes.length === 0) {
            return toast.warn("Выберите тип машины!")
        }
        modelId ? handleUpdate() : handleCreate()
    }

    //============================================================
    //============================================================

    const [typeOptions, setTypeOptions] = useState([])

    const getCarTypes = async () => {
        try {
            const { data } = await Api.get(`/car_type/get`)
            setTypeOptions([...data].map(el => ({
                label: el.name,
                value: el._id
            })))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //============================================================
    //============================================================

    const [carTypes, setCarTypes] = useState([])
    const [selectedValues, setSelectedValues] = useState([])
    
    const handleSelect = (e) => {
        setCarTypes([...e].map(item => item.value))
        setSelectedValues(e)
    }
    
    //============================================================
    //============================================================

    const handleEdit = (model) => {
        setModelId(model._id)
        setName(model.name)
        setSelectedValues(model.carTypes.map(el => ({
            value: el._id,
            label: el.name
        })))
        setCarTypes([...model.carTypes].map(item => item._id))
    }

    const clearData = () => {
        setModelId('')
        setName('')
        setSelectedValues([])
        setCarTypes([])
    }

    //============================================================
    //============================================================

    useEffect(() => {
        getCarModels()
        getCarTypes()
    }, [])


    return <div className="py-[70px]">
        <form className="max-w-[800px] mx-auto grid grid-cols-4 gap-4 mb-[100px]">
            <CustomInput value={name} onChange={(e) => setName(e.target.value)} label={'Модель авто'} blockClasss="w-full" />
            <CustomMultiSelect defaultValue={selectedValues} options={typeOptions} onChange={handleSelect} blockClasss={"col-span-2"} label="Тип авто" />
            <div className="flex items-end">
                {modelId ? <EditBtn title={'Редактировать'} cancel={clearData} onClick={checkData} /> : <CustomBtn onClick={checkData} title={'Создать'} />}
            </div>
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
                            Модель
                        </th>
                        <th scope="col" class="px-6 py-3">

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {carModels.map((model, ind) =>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ind + 1}
                            </th>
                            <td class="px-6 py-4">
                                {model.carTypes.map(el => el.name + " ")}
                            </td>
                            <td class="px-6 py-4">
                                {model.name}
                            </td>
                            <td class="px-6 py-4">
                                <button onClick={() => handleEdit(model)}>
                                    <FiEdit fontSize={20} className="text-amber-400" />
                                </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
}

export default CarModel;