import Api from './api'

export default {
  //サインアップ
  signUp(newUser) {
    return Api().post('signUp', newUser)
  },
  //ユーザチェック
  checkUser(email) {
    return Api().post('checkUser', email)
  },
  //ユーザ全件取得
  getUsers() {
    return Api().get('users')
  },
  //ユーザ新規作成
  createUser(newUser) {
    return Api().post('user', newUser)
  },
  //ユーザ更新
  updateUser(user) {
    return Api().put(`user/${user._id}`, user)
  },
  //ユーザ削除
  deleteUser(id) {
    return Api().delete(`user/${id}`)
  },
  //ユーザ取得
  getUser(id) {
    return Api().get(`user/${id}`)
  }
}