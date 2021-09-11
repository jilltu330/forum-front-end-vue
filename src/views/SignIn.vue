<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup"> Sign Up </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      email: "",
      password: "",
      isProcessing: false, //預設false, 意思判斷submition是否已經在處理中，如處理中則使用者無法繼續點擊按鈕
    };
  },
  methods: {
    async handleSubmit(e) {
      try {
        // 1. 先由前端Javascript確認表單填寫完畢，無空值
        // 如果 email 或 password 為空，則使用 Toast 提示
        // 然後 return 不繼續往後執行
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入帳號和密碼",
          });
          return;
        }
        //User做完第一層表單驗證後，API呼叫前將isProccessing(處理狀態)改為處理中
        this.isProcessing = true;

        // 2. 表單有資料後才開始呼叫api向後端做驗證
        //axios 之後會回傳一個 Promise 物件，我們再直接把這個物件 return 出去，之後 Vue 元件接到 Promise 物件後，就可以用 then 做後續操作
        const response = await authorizationAPI.signIn({
          email: this.email,
          password: this.password,
        });
        console.log("response", response);

        //取得 API 請求後的資料.response 是伺服器回傳的資料裡面的data屬性
        const { data } = response;

        //再存入localstorage前做使用者輸入資料判斷
        if (data.status !== "success") {
          //請拋出錯誤訊息，訊息帶伺服器的訊息
          throw new Error(data.message);
        }

        // 將 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);
        //成功登入後將網址轉到首頁
        this.$router.push("/restaurants");
      } catch (error) {
        //登入時發生握物處理eg漏填表單或密碼錯誤
        //當使用者輸入錯誤密碼時，須將isProcessing改為false才能夠再次按button送出表單
        this.isProcessing = false;

        // 將密碼欄位清空
        this.password = "";
        //顯示錯誤提示
        Toast.fire({
          icon:"warning",
          title: "輸入的帳號密碼有誤",
        });
        console.log("error :", error);
      }
    },
  },
};
</script>

<style scoped>
</style>
