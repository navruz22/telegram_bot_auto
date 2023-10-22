import { useState } from "react"
import CustomInput from "../Components/CustomInput"
import CustomBtn from "../Components/CustomBtn"
import Api from "../Config/Api"


const LoginPage = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const response = await Api.post(`/auth/login`, {
                login,
                password
            })
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const checkData = () => {
        if (!login) {
            return alert('Введите логин')
        }
        if (!password) {
            return alert('Введите пароль')
        }
        handleLogin()
    }

    return <div className="w-full h-full flex justify-center items-center items-center mx-auto">
        <div className="min-w-[500px] grid gap-4">
            <CustomInput
                label={'Логин'}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <CustomInput
                label={'Пароль'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-center">
                <CustomBtn
                    title={'Войти'}
                    onClick={() => checkData()}
                />
            </div>
        </div>
    </div>
}

export default LoginPage