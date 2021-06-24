export default {
  cartTotalCount (state) {
    return state.cartData.reduce((result, item) => {
      result += item.count
      return result
    }, 0)
  },
  isCartAllItemCheck (state) {
    return state.cartData.every(item => item.isChecked === true)
  },
  cartCheckedTotalPrice (state) {
    const total = state.cartData.filter(item => item.isChecked === true).reduce((result, data) => {
      const price = Number.parseFloat(data.price.slice(1))
      result += data.count * price
      return result
    }, 0)
    return total.toFixed(2)
  }
}
