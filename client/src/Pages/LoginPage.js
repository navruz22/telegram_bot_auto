import { useContext, useState } from "react"
import CustomInput from "../Components/CustomInput"
import CustomBtn from "../Components/CustomBtn"
import Api from "../Config/Api"
import { AuthContext } from "../Context"


const LoginPage = () => {

    const {setIsAuth} = useContext(AuthContext);

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        try {
            const response = await Api.post(`/auth/login`, {
                login,
                password
            })
            localStorage.setItem('token', response.data.token)
            setIsAuth(true)
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

    return <div className="pt-[100px]">
        <div className="mx-auto max-w-[500px] grid gap-4">
            <CustomInput
                label={'Логин'}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <CustomInput
                label={'Пароль'}
                value={password}
                type={"password"}
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