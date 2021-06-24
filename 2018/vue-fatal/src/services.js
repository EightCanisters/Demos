import axios from 'axios'
import { Indicator, MessageBox } from 'mint-ui'

// const isDev = process.env.NODE_ENV === 'development'
const ajax = axios.create()

ajax.interceptors.request.use((config) => {
  // 在这里配置token到请求头，使每次请求都将其发往后端，以便后端获取验证
  const token = window.localStorage.getItem('fatal-token')
  config.headers.fatalToken = token
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  return config
})

ajax.interceptors.response.use((resp) => {
  let ret = null
  if (resp.data) {
    ret = Promise.resolve(resp.data)
  } else {
    MessageBox({
      title: '出错了',
      message: '未知错误',
      confirmButtonText: '好的'
    })
  }
  Indicator.close()
  return ret
})

export const getHomeGuess = (pagecontent = 0) => {
  return ajax.get(`/zp/api/ProductController.aspx?handler=IndexLikeProduct&pagecount=${pagecontent}&pagesize=16`)
}
export const getCategoryMenu = () => {
  return ajax.get('/zp/Reversion/Category.ashx?Tag=List')
}
export const getCategoryList = (id) => {
  return ajax.get(`/zp/Reversion/Category.ashx?Tag=SunList&Id=${id}`)
}
export const getListData = (pagecount = 0, id = '002001002', name = '', sorts = 'ModifyTime', isASC = 'false') => {
  // http://wfx.topzph.com/api/ProductController.aspx?handler=ProductListBig&pagecount=0&pagesize=20&name=&shopid=&productCategoryCode=005&sorts=ModifyTime&isASC=false
  return ajax.get(`/zp/api/ProductController.aspx?handler=ProductListBig&pagecount=${pagecount}&pagesize=20&name=${name}&shopid=&productCategoryCode=${id}&sorts=${sorts}&isASC=${isASC}`)
}
// 此处有坑
export const postUserData = (data) => {
  const {username, password} = data
  var params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  return ajax.post(
    `/bd/api/v1/logindata`,
    params
  )
}
