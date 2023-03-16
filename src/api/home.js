import request from '@/utils/request'

export const Login = (data) =>{
    return request('/login','post', data)
}
