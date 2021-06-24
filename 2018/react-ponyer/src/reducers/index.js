import { combineReducers } from 'redux';
import ui from './ui';
import cart from './cart';

export default combineReducers({
  ui,
  cart
})