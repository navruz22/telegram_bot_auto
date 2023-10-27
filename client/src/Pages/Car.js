import { toast } from "react-toastify";
import CustomInput from "../Components/CustomInput";
import CustomMultiSelect from "../Components/CustomMultiSelect";
import CustomTextArea from "../Components/CustomTextArea";
import FileUpload from "../Components/FileUpload";
import ImageUpload from "../Components/ImageUpload";
import Api from "../Config/Api"
import CustomSelect from "../Components/CustomSelect";
import { useEffect, useState } from "react";
import CustomBtn from "../Components/CustomBtn";


const Car = () => {

    //==============================================================
    //==============================================================

    const [models, setModels] = useState([])
    const [selectedModel, setSelectedModel] = useState([])

    const getModels = async () => {
        try {
            const { data } = await Api.get('/car_model/get')
            setModels([...data].map(el => ({
                value: el._id,
                label: el.name
            })))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //==============================================================
    //==============================================================

    const [months, setMonths] = useState([])
    const [selectedMonths, setSelectedMonths] = useState(null)

    const getMonths = async () => {
        try {
            const { data } = await Api.get('/month/get')
            setMonths([...data].map(el => ({
                value: el._id,
                label: el.month
            })))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //==============================================================
    //==============================================================

    const [procients, setProcients] = useState([])
    const [selectedProcients, setSelectedProcients] = useState([])

    const getProcients = async () => {
        try {
            const { data } = await Api.get('/procient/get')
            setProcients([...data].map(el => ({
                value: el._id,
                label: el.procient
            })))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    //==============================================================
    //==============================================================

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [info, setInfo] = useState('')

    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')

    const [filePdf, setFilePdf] = useState('')

    const handleUploadImage = (e) => {
        console.log(URL.createObjectURL(e.target.files[0]));
        if (e.target.files[0].type.includes("jpg") ||
            e.target.files[0].type.includes("png") ||
            e.target.files[0].type.includes("jpeg")
        ) {
            setImage(e.target.files[0])
            setPreview(URL.createObjectURL(e.target.files[0]))
        } else {
            toast.warn("Файл должен быть в формате jpg, jpeg, png")
        }
    }

    const handleUploadPdf = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0].type === "application/pdf") {
            setFilePdf(e.target.files[0])
        } else {
            toast.warn("Файл должен быть в формате pdf")
        }
    }

    //==============================================================
    //==============================================================

    const checkData = () => {
        if (!name) {
            return toast.warn("Заполните название!")
        }
        if (!info) {
            return toast.warn("Заполните описание!")
        }
        if (!price) {
            return toast.warn("Укажите цену!")
        }
        if (!image) {
            return toast.warn("Загрузите фото!")
        }
        if (!filePdf) {
            return toast.warn("Загрузите файл!")
        }
        if (!selectedModel) {
            return toast.warn("Выберите модель!")
        }
        if (selectedMonths.length === 0) {
            return toast.warn("Выберите месяца!")
        }
        if (selectedProcients.length === 0) {
            return toast.warn("Выберите проценты!")
        }
    }

    //==============================================================
    //==============================================================

    useEffect(() => {
        getModels()
        getProcients()
        getMonths()
    }, [])

    return <div className="pt-[30px]">
        <div className="grid grid-cols-12">
            <ImageUpload image={preview} onChange={handleUploadImage} blockClass={'col-span-3'} />
            <div className="col-span-9">
                <div className="grid grid-cols-3 pl-4 gap-2">
                    <CustomInput value={name} onChange={(e) => setName(e.target.value)} label="Название" />
                    <CustomInput value={price} onChange={e => setPrice(e.target.value)} label="Цена" />
                    <CustomSelect value={selectedModel} onChange={e => setSelectedModel(e)} options={models} label="Модель" />
                    <CustomMultiSelect defaultValue={selectedMonths} onChange={e => setSelectedMonths(e)} options={months} label="Месяцы" />
                    <CustomMultiSelect defaultValue={selectedProcients} onChange={e => setSelectedProcients(e)} options={procients} label="Проценты" />
                </div>
                <div className="grid grid-cols-2 pl-4 content-center gap-2 pt-4">
                    <CustomTextArea
                        label={"Описание"}
                        rows={6}
                        cols={2}
                        value={info}
                        onChange={e => setInfo(e.target.value)}
                    />
                    <FileUpload onChange={handleUploadPdf} label={filePdf ? "Загружено" : "Вставьте файл .pdf"} blockClass="my-auto" />
                </div>
                <div className="flex justify-end pt-4">
                    <CustomBtn onClick={checkData} title={'Создать'} />
                </div>
            </div>
        </div>
    </div>
}

export default Car;