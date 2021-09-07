import { apiHelper } from "../utils/helpers";

//export整個物件
export default {
  //帶入參數
  signIn({ email, password }) {
    return apiHelper.post('/signin', {
      email,
      password
    })
  }
}