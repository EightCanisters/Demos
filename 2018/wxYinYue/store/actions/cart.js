import {
  ADD_TO_CART,
  CHANGE_GOOD_SELECT,
  IS_CHECKED_ALLSELECT,
  DELETE_CHECKED_GOODS,
  INCREASE_GOOD_COUNT,
  DECREASE_GOOD_COUNT
} from './actionType.js';

export const addToCart = (cartData) => {
  return {
    type: ADD_TO_CART,
    payload: {
      cartData
    }
  }
};
export const changeGoodChecked = (id) => {
  return {
    type: CHANGE_GOOD_SELECT,
    payload: {
      id
    }
  }
};
export const isCheckedAllSelect = (checkedValue) => {
  return {
    type: IS_CHECKED_ALLSELECT,
    payload: {
      checkedValue
    }
  }
};
export const deleteCheckedGoods = () => {
  return {
    type: DELETE_CHECKED_GOODS
  }
};
export const increaseGoodCount = (id) => {
  return {
    type: INCREASE_GOOD_COUNT,
    payload: {
      id
    }
  }
};
export const decreaseGoodCount = (id) => {
  return {
    type: DECREASE_GOOD_COUNT,
    payload: {
      id
    }
  }
}