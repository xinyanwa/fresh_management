import axios from "axios"
import router from "@/router";

export const baseURL = 'http://localhost:3030/'


const instance = axios.create({
    baseURL,
    timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
        const jwtToken = window.localStorage.getItem('token')
        if (jwtToken) {
            // console.log()
            config.headers.Authorization = 'Bearer ' + jwtToken
        }
        return config
    }
)

// 响应拦截器
instance.interceptors.response.use(
    res => {
        // if (res.data.code != 0) {
        //     return Promise.reject(res.data)
        // }
        return res
    }, (err) => {
        if (err.response.status >= 400 && err.response.status < 500) {
            router.push('/login')
        }
        return Promise.reject('请求失败，请查询错误语句')
    }
)

export default (
    url,
    method,
    submitData
) => {
    return instance({
        url,
        method,
        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    })
}
