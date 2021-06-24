import { 
  ADD_TO_CART, 
  CHANGE_GOOD_CHECKED,
  INCREACE_CART_COUNT,
  DECREACE_CART_COUNT,
  DELETE_CART_ITEM
} from '../actions/actionType';

const initialState = {
  cartDatas: JSON.parse(window.localStorage.getItem('cart')) || [],
}

export default (state = initialState, action) => {
  //解构state中的cartData
  const { cartDatas } = state;
  switch(action.type){
    case DELETE_CART_ITEM:
      const newDatas4 = [];
      cartDatas.forEach(item => {
        if(item.id !== action.payload.id){
          newDatas4.push(item);
        }
      })
      window.localStorage.setItem('cart', JSON.stringify(newDatas4));
      return Object.assign({}, state, {cartDatas: newDatas4});

    case DECREACE_CART_COUNT:
      const newDatas3 = cartDatas.map(item => {
        if(item.id === action.payload.id){
          item.count -= 1;
        }
        if(item.count < 1){
          item.count = 1
        }
        return item;
      })
    window.localStorage.setItem('cart', JSON.stringify(newDatas3));
    return Object.assign({}, state, {cartDatas: newDatas3});

    case INCREACE_CART_COUNT:
      const newDatas2 = cartDatas.map(item => {
        if(item.id === action.payload.id){
          item.count += 1;
        }
        return item;
      })
      window.localStorage.setItem('cart', JSON.stringify(newDatas2))
      return Object.assign({}, state, {cartDatas: newDatas2});

    case CHANGE_GOOD_CHECKED:
      const newDatas1 = cartDatas.map(item => {
        if(item.id === action.payload.id)
          item.isChecked = !item.isChecked;
        return item;
      });
      window.localStorage.setItem('cart', JSON.stringify(newDatas1));
      return Object.assign({}, state, {cartDatas: newDatas1});

    case ADD_TO_CART:
      //解构action传过来的数据
      const { cartData } = action.payload;
      //判断是否已经存在
      const isInCart = state.cartDatas.some(data => data.id === cartData.id);
      //创建一个新数组，用于存新的购物数据数组
      let newDatas = [];
      //如果已经存在，数量+1
      if(isInCart){
        newDatas = cartDatas.map(item => {
          if(item.id === cartData.id)
            item.count += cartData.count;
          return item;
        });
      }else{
        newDatas = cartDatas.concat({
          ...cartData,
          isChecked: false
        })
      }
      window.localStorage.setItem('cart', JSON.stringify(newDatas))
      return Object.assign({}, state, {cartDatas: newDatas})
    default:
      return state
  }
}