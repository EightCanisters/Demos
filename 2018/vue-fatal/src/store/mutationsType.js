// 显示tabbar
export const SHOW_TABBAR = 'showTabbar'
// 显示navbar
export const SHOW_NAVBAR = 'showNavbar'
// 显示navbar的返回箭头
export const SHOW_NAVBAR_BACK = 'showNavbarBack'
// 显示navbar右边部分
export const SHOW_NAVBAR_RIGHT = 'showNavbarRight'
// 更改页面标题
export const CHANGE_NAVBAR_TITLE = 'changeNavbarTitle'
// 更改list页面标题
export const CHANGE_LIST_NAVBAR_TITLE = 'changeListNavbarTitle'
// 更改detail页面数据，此处是因为没找到detail页面数据接口，从而将其存进state
export const CHANGE_DETAIL_DATA = 'changeDetailData'
// 加入购物车
export const ADD_TO_CART = 'addToCart'
// 购物车增加商品数量
export const ADD_CART_COUNT = 'addCartCount'
// 购物车减少商品数量
export const REDUCE_CART_COUNT = 'reduceCartCount'
// 购物车更改商品的checked属性
export const CHANGE_ITEM_ISCHECKED = 'changeItemIschecked'
// 购物车全选
export const CHANGE_CART_ISCHECKED = 'changeCartIschecked'
// 购物车删除商品 通过id
export const DELETE_CART_ITEM_BY_ID = 'deleteCartItemById'
// 登录-改变登录状态：已登录/未登录
export const CHANGE_LOGIN_STATE = 'changeLoginState'
// 登录-改变登录用户名
export const CHANGE_LOGIN_USERNAME = 'changeLoginUsername'
// 登录-退出登录
export const LOGOUT = 'logout'
// 搜索-清除所有的搜索历史
export const CLEAR_ALL_HISTORY = 'clearAllHistory'
// 搜索-通过搜索历史查询
export const SEARCH_BY_TEXT = 'searchByText'
// 搜索-删除单条搜索历史
export const DELETE_HISTORY_BY_TITLE = 'deleteHistoryByTitle'
// 分类-保存分类的list
export const SAVE_CATEGORY_LIST = 'saveCategoryList'
