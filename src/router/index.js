import {createRouter, createWebHistory} from 'vue-router';

const Home = () => import('@/views/home/Home')
const Category = () => import('@/views/category/Category')
const Cart = () => import('@/views/cart/Cart')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')

//routes路径
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    meta: {footShow :true},
    component: Home
  },
  {
    path: '/category',
    meta: {footShow :true},
    component: Category
  },
  {
    path: '/cart',
    meta: {footShow :true},
    component: Cart
  },
  {
    path: '/profile',
    meta: {footShow :true},
    component: Profile
  },
  {
    path:'/detail/:iid',
    component: Detail
  }
]

//vue3中创建实例
const router = createRouter({
  history : createWebHistory(),
  routes
})

export default router;