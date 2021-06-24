export default {
  isShowNavbar: true,
  isShowTabbar: true,
  isBackShow: true,
  isRightShow: true,
  navbarTitle: '标题',
  listNavbarTitle: '详情',
  detailData: {},
  isLogin: Boolean(window.localStorage.getItem('fatal-token')),
  username: window.localStorage.getItem('fatal-user') || '飞翔的企鹅',
  cartData: JSON.parse(window.localStorage.getItem('fatal-cart')) || [],
  // cartData: [{
  //   id: 'jomanfkdalfjppp',
  //   img: 'http://img.alicdn.com/imgextra/i3/379250310/O1CN011EA1FIA7T4bLA9f_!!0-item_pic.jpg_160x160.jpg',
  //   title: '真的吗解耦爱过扔多绿过扩多扩扩扩扩扩扩扩扩扩咔咔咔咔咔咔',
  //   desc: '常规',
  //   price: 49.00,
  //   memberPrice: 39.00,
  //   count: 1
  // }]
  searchHistory: JSON.parse(window.localStorage.getItem('fatal-search-history')) || [],
  categoryList: []
}
