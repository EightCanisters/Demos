import {
  Home,
  Category,
  Cart,
  Mine,
  List,
  Detail,
  Login
} from './pages';

const routes = [{
  path: '/home',
  text: '首页',
  icon: 'home',
  component: Home,
  isTabbarItem: true
}, {
  path: '/category',
  text: '分类',
  icon: 'category',
  component: Category,
  isTabbarItem: true
}, {
  path: '/cart',
  text: '购物车',
  icon: 'cart',
  component: Cart,
  isTabbarItem: true
}, {
  path: '/mine',
  text: '我的易果',
  icon: 'mine',
  component: Mine,
  isTabbarItem: true,
}, {
  path: '/login',
  text: '登录',
  component: Login,
  isTabbarItem: false,
}, {
  path: '/list/:id',
  component: List,
  isTabbarItem: false,
}, {
  path: '/detail/:id',
  component: Detail,
  isTabbarItem: false,
}]

export default routes;