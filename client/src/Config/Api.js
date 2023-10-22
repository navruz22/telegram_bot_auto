import axios from 'axios'
const baseURL = process.env.REACT_APP_API_ENDPOINT || "http://localhost:8801/api"

const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance