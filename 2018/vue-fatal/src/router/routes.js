const Home = () => import('@/pages/Home')
const Category = () => import('@/pages/Category')
const Cart = () => import('@/pages/Cart')
const Mine = () => import('@/pages/Mine')
const Login = () => import('@/pages/Login')
const Detail = () => import('@/pages/Detail')
const CategoryList = () => import('@/pages/CategoryList')
const List = () => import('@/pages/List')
const Logout = () => import('@/pages/Logout')
const Search = () => import('@/pages/Search')

export default [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    name: 'home',
    text: '首页',
    isTabbar: true,
    component: Home
  }, {
    path: '/category',
    name: 'category',
    text: '分类',
    isTabbar: true,
    component: Category,
    children: [
      {
        path: ':id',
        component: CategoryList
      }
    ]
  }, {
    path: '/cart',
    name: 'cart',
    text: '购物车',
    isTabbar: true,
    component: Cart
  }, {
    path: '/mine',
    name: 'mine',
    text: '我的',
    isTabbar: true,
    component: Mine,
    meta: {
      authRequired: true
    }
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/detail',
    name: 'detail',
    component: Detail
  }, {
    path: '/list',
    name: 'list',
    component: List
  }, {
    path: '/mine/logout',
    name: 'logout',
    component: Logout
  }, {
    path: '/search',
    name: 'search',
    component: Search
  }
]
