import {
  SHOW_NAVBAR,
  SHOW_NAVBAR_BACK,
  SHOW_NAVBAR_RIGHT,
  SHOW_TABBAR,
  CHANGE_NAVBAR_TITLE,
  CHANGE_DETAIL_DATA,
  CHANGE_LIST_NAVBAR_TITLE,
  ADD_TO_CART,
  ADD_CART_COUNT,
  REDUCE_CART_COUNT,
  CHANGE_ITEM_ISCHECKED,
  CHANGE_CART_ISCHECKED,
  DELETE_CART_ITEM_BY_ID,
  CHANGE_LOGIN_STATE,
  CHANGE_LOGIN_USERNAME,
  LOGOUT,
  SEARCH_BY_TEXT,
  CLEAR_ALL_HISTORY,
  DELETE_HISTORY_BY_TITLE,
  SAVE_CATEGORY_LIST
} from '../mutationsType'

export default {
  // 分类-保存分类中的数据
  [SAVE_CATEGORY_LIST] (state, data) {
    state.categoryList.push(data)
  },
  // 搜索-删除单条历史数据
  [DELETE_HISTORY_BY_TITLE] (state, text) {
    state.searchHistory = state.searchHistory.filter(item => item.text !== text)
  },
  // 搜索-清空所有的历史数据
  [CLEAR_ALL_HISTORY] (state) {
    state.searchHistory = []
    window.localStorage.removeItem('fatal-search-history')
  },
  // 搜索-新增搜索记录
  [SEARCH_BY_TEXT] (state, text) {
    // 判断是否搜索过
    const isSelected = state.searchHistory.some(item => item.text === text)
    if (isSelected) {
      state.searchHistory.map(item => {
        if (item.text === text) {
          item.count += 1
        }
        return item
      })
    } else {
      state.searchHistory.unshift({text: text, count: 1})
    }
  },
  // 登录-退出登录
  [LOGOUT] (state) {
    state.username = ''
    state.isLogin = false
    window.localStorage.removeItem('fatal-user')
    window.localStorage.removeItem('fatal-token')
  },
  // 登录-更新登录名
  [CHANGE_LOGIN_USERNAME] (state, data) {
    state.username = data
  },
  // 登录-更新登录状态
  [CHANGE_LOGIN_STATE] (state, islog) {
    state.isLogin = islog
  },
  // navbar-显示头
  [SHOW_NAVBAR] (state, isShow) {
    state.isShowNavbar = isShow
  },
  // tabbar-显示tabbar
  [SHOW_TABBAR] (state, isShow) {
    state.isShowTabbar = isShow
  },
  // navbar-显示navbar返回按钮
  [SHOW_NAVBAR_BACK] (state, isShow) {
    state.isBackShow = isShow
  },
  // navbar-显示nacbar右边部分
  [SHOW_NAVBAR_RIGHT] (state, isShow) {
    state.isRightShow = isShow
  },
  // navbar-更新页面标题
  [CHANGE_NAVBAR_TITLE] (state, title) {
    state.navbarTitle = title
  },
  // 分类-保存详情数据信息
  [CHANGE_DETAIL_DATA] (state, data) {
    state.detailData = data
  },
  // 分类-更新列表页面的标题
  [CHANGE_LIST_NAVBAR_TITLE] (state, data) {
    state.listNavbarTitle = data
  },
  // 购物车-加入购物车
  [ADD_TO_CART] (state, cartItem) {
    const isInCart = state.cartData.some(item => cartItem.id === item.id)
    if (isInCart) {
      state.cartData = state.cartData.map(item => {
        const newItem = item
        if (newItem.id === cartItem.id) {
          newItem.count += cartItem.count
        }
        return newItem
      })
    } else {
      state.cartData.push({
        ...cartItem
      })
    }
  },
  // 购物车-增加商品数量
  [ADD_CART_COUNT] (state, id) {
    state.cartData = state.cartData.map(item => {
      const newItem = item
      if (item.id === id) {
        newItem.count += 1
      }
      return newItem
    })
  },
  // 购物车-减少商品数量
  [REDUCE_CART_COUNT] (state, id) {
    state.cartData = state.cartData.map(item => {
      const newItem = item
      if (item.id === id && item.count > 1) {
        newItem.count -= 1
      }
      return newItem
    })
  },
  // 购物车-更改商品Ischecked属性
  [CHANGE_ITEM_ISCHECKED] (state, id) {
    state.cartData.map(item => {
      const newItem = item
      if (item.id === id) {
        newItem.isChecked = !newItem.isChecked
      }
      return newItem
    })
  },
  // 购物车-全选
  [CHANGE_CART_ISCHECKED] (state, isChecked) {
    state.cartData.map(item => {
      const newItem = item
      newItem.isChecked = isChecked
      return newItem
    })
  },
  // 购物车-通过id删除相应商品
  [DELETE_CART_ITEM_BY_ID] (state, id) {
    state.cartData = state.cartData.filter(item => item.id !== id)
  }
}
