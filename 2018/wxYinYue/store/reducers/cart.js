import {
  ADD_TO_CART,
  CHANGE_GOOD_SELECT,
  IS_CHECKED_ALLSELECT,
  DELETE_CHECKED_GOODS,
  INCREASE_GOOD_COUNT,
  DECREASE_GOOD_COUNT
} from '../actions/actionType.js';


// cartDatas: {
//   id: '',
//   title: '',
//   count: 1,
//   price: '',
//   img: '',
//   isChecked: false
// }
const initState = {
  cartDatas: wx.getStorageSync('yy-cart') || []
}

export default (state = initState, action) => {
  const { cartDatas } = state;
  switch(action.type) {
    // 减少商品数量
    case DECREASE_GOOD_COUNT:
      const newCartDatas5 = cartDatas.map(item => {
        if (item.id === action.payload.id) {
          if (item.count > 1) {
            item.count -= 1;
          }
        };
        return item;
      });
      wx.setStorageSync('yy-cart', newCartDatas5);
      return Object.assign({}, state, { cartDatas: newCartDatas5 })
    // 增加商品数量
    case INCREASE_GOOD_COUNT:
      const newCartDatas4 = cartDatas.map(item => {
        if (item.id === action.payload.id) {
          item.count += 1;
        };
        return item;
      });
      wx.setStorageSync('yy-cart', newCartDatas4);
      return Object.assign({}, state, { cartDatas: newCartDatas4 })
    //删除选中：
    case DELETE_CHECKED_GOODS:
      const newCartDatas3 = cartDatas.filter(value => value.isChecked === false);
      wx.setStorageSync('yy-cart', newCartDatas3);
      return Object.assign({}, state, { cartDatas: newCartDatas3 })
    //全选
    case IS_CHECKED_ALLSELECT:
      const { checkedValue } = action.payload;
      const newCartDatas2 = cartDatas.map(item => {
        if(item.isChecked !== checkedValue) {
          item.isChecked = checkedValue;
        }
        return item;
      });
      wx.setStorageSync('yy-cart', newCartDatas2);
      return Object.assign({}, state, { cartDatas: newCartDatas2 })

    // 更改商品选中信息
    case CHANGE_GOOD_SELECT:
      const { id } = action.payload;
      const newCartDatas1 = cartDatas.map(item => {
        if(item.id === id) {
          item.isChecked = !item.isChecked;
        }
        return item;
      });
      wx.setStorageSync('yy-cart', newCartDatas1);
      return Object.assign({}, state, { cartDatas: newCartDatas1 });
    // 添加购物车
    case ADD_TO_CART:
      const { cartData } = action.payload;
      const isInCart = cartDatas.some(item => item.id === cartData.id);
      let newCartDatas = [];
      if(isInCart) {
        newCartDatas = cartDatas.map(item => {
          if(item.id === cartData.id) {
            item.count += cartData.count;
          }
          return item;
        });
      } else {
        newCartDatas = cartDatas.concat({
          ...cartData,
          isChecked: false
        });
      };
      wx.setStorageSync('yy-cart', newCartDatas);
      return Object.assign({}, state, {cartDatas: newCartDatas});
    
    default:
      return state;
  }
}