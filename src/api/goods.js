import request from '@/utils/request'

export const getGoodsData = () => {
    return request('/goods/getData', 'get')
}

export const getGoodsCategory = () => {
    return request('/goods/getCategory', 'get')
}

export const getGoodsInfo = (data) => {
    return request('/goods/getGoodsInfo', 'post', {data})
}
