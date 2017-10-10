/**
 * Created by liuxi on 2017/9/11.
 */



import liuxiElm from '@/liuxiElm';

const Msite = () => import('pages/msite/msite');
const Discover = () => import('pages/discover/discover');
const Order = () => import('pages/order/order');
const Profile = () => import('pages/profile/profile');

const Shop = () => import('pages/shop/shop');

const Login =() => import('@/components/login');
const Settlement =() => import('@/components/settlement');


export default [
    {
        path:'/',
        component:liuxiElm,
        redirect:'/msite',
        children:[
            {
                path:'/msite',
                component:Msite
            },
            {
                path:'/discover',
                component:Discover
            },
            {
                path:'/order',
                component:Order
            },
            {
                path:'/profile',
                component:Profile
            },
            {
                path:'/shop',
                component:Shop
            },
            {
                path:'/login',
                component:Login
            },
            {
                path:'/settlement',
                component:Settlement
            }
        ]
    }
]