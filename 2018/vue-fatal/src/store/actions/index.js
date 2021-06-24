import { postUserData } from '@/services'
import { CHANGE_LOGIN_STATE, CHANGE_LOGIN_USERNAME } from '../mutationsType'

export default {
  loginAction (store, data) {
    postUserData(data)
      .then(resp => {
        window.localStorage.setItem('fatal-token', resp.token)
        window.localStorage.setItem('fatal-user', resp.username)
        store.commit(CHANGE_LOGIN_STATE, true)
        store.commit(CHANGE_LOGIN_USERNAME, data.username)
      })
  }
}
