import { ElMessage } from 'element-plus'
import {createRouter, createWebHashHistory} from 'vue-router'

const Main = () => import('@/views/Layout')
const Home = () => import('@/views/home/index')
const GoodsList = () => import('@/views/goods/GoodsList')
const GoodsCategory = () => import('@/views/goods/GoodsCategory')
const BrandManage = () => import('@/views/goods/BrandManage')
const AddBrand = () => import('@/views/goods/AddBrand')
const MemberChange = () => import('@/views/member/MemberChange')
const MemberInformation = () => import('@/views/member/MemberInformation')
const MemberList = () => import('@/views/member/MemberList')
const OrderList = () => import('@/views/order/OrderList')
const OrderSet = () => import('@/views/order/OrderSet')
const ReturnReason = () => import('@/views/order/ReturnReason')
const ReturnRequest = () => import('@/views/order/ReturnRequest')
const MenuList = () => import('@/views/power/MenuList')
const ResourceList = () => import('@/views/power/ResourceList')
const RoleList = () => import('@/views/power/RoleList')
const UserList = () => import('@/views/power/UserList')
const Login = () => import('@/views/login/Login')


const routes = [
    {
      path:'/login',
      component:Login,
    },
    {
        path: '/',
        component: Main,
        meta: { isAuth: true, title:'主页' },
        children: [
            {
                path:'/',
                component: Home
            },
            {
                path: '/goodslist',
                component: GoodsList
            },
            {
                path: '/goodscategory',
                component: GoodsCategory
            },
            {
                path: '/brandcategory',
                component: BrandManage
            },
            {
                path: '/addbrand',
                component: AddBrand
            },
            {
                path: '/memberchange',
                component: MemberChange
            },
            {
                path: '/memberinformation',
                component: MemberInformation
            },
            {
                path: '/memberlist',
                component: MemberList
            },
            {
                path:'/orderlist',
                component: OrderList
            },
            {
                path: '/orderset',
                component: OrderSet
            },
            {
                path: '/returnreason',
                component: ReturnReason
            },
            {
                path: '/returnrequest',
                component: ReturnRequest
            },
            {
                path: '/menulist',
                component: MenuList
            },
            {
                path: '/resourcelist',
                component: ResourceList
            },
            {
                path: '/rolelist',
                component:RoleList
            },
            {
                path: '/userlist',
                component: UserList
            }
        ]
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


//全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
    //如果路由需要跳转
    if (to.meta.isAuth) {
        //判断 如果school本地存储是qinghuadaxue的时候，可以进去
        if (localStorage.getItem('token')) {
            next()  //放行
        } else {
            ElMessage.error({
                message:'暂未登录，请先登录'
            })
            router.push('/login')
        }
    } else {
        // 否则，放行
        next()
    }
})

export default router
