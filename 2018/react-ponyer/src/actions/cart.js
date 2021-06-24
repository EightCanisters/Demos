import { 
  ADD_TO_CART,
  CHANGE_GOOD_CHECKED,
  INCREACE_CART_COUNT,
  DECREACE_CART_COUNT,
  DELETE_CART_ITEM
} from './actionType';

export const addToCart = (cartData) => {
  return {
    type: ADD_TO_CART,
    payload: {
      cartData
    }
  }
}

export const changeGoodChecked = (id) => {
  return {
    type: CHANGE_GOOD_CHECKED,
    payload: {
      id
    }
  }
}

export const increaceCartCount = (id) => {
  return {
    type: INCREACE_CART_COUNT,
    payload: {
      id
    }
  }
}

export const decreaceCartCount = (id) => {
  return {
    type: DECREACE_CART_COUNT,
    payload: {
      id
    }
  }
}

export const deleteCartItem = (id) => {
  return {
    type: DELETE_CART_ITEM,
    payload: {
      id
    }
  }
}