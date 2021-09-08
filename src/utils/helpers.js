import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "https://forum-express-api.herokuapp.com/api";

//export出來其他檔案才可使用
export const apiHelper = axios.create({
  //原本的寫法baseURL：'https://forum-express-api.herokuapp.com/api'
  baseURL,
});

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});
