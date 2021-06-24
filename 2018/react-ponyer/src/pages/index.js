import Loadable from 'react-loadable';
import { Loading } from '../components';

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
});

const Category = Loadable({
  loader: () => import('./Category'),
  loading: Loading,
});

const Cart = Loadable({
  loader: () => import('./Cart'),
  loading: Loading,
});

const Mine = Loadable({
  loader: () => import('./Mine'),
  loading: Loading,
});

const List = Loadable({
  loader: () => import('./List'),
  loading: Loading,
});

const Detail = Loadable({
  loader: () => import('./Detail'),
  loading: Loading,
});

const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
});

export {
  Home,
  Category,
  Cart,
  Mine,
  List,
  Detail,
  Login
}