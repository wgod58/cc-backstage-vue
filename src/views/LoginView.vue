<template>
        <div class="container">
                <form>
                        <div class="login">
                                帳號：
                                <el-input v-model="account" style="margin-bottom: 10px; width: 240px"
                                        placeholder="請輸入帳號" />
                                密碼：
                                <el-input v-model="password" style="margin-bottom: 10px; width: 240px"
                                        placeholder="請輸入密碼" type="password" />
                                <div class="btn-login">
                                        <el-button type="primary" @click="loginCheck">登入</el-button>
                                </div>
                        </div>
                </form>
        </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
const account = ref("account");
const password = ref("password");
const loginCheck = () => {
        if (account.value === "account" && password.value === "password") {
                console.log("LoginSuccess");
                router.push("/");
        } else {
                console.log("LoginFailed");
        }
};
</script>

<style scoped>
.container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
}

.login {
        padding: 20px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 300px;
}

.btn-login {
        text-align: center;
}
</style>