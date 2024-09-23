<template>
        <div class="container">
                <form>
                        <div class="login">
                                <div class="hint" style="text-align: center;margin-bottom: 10px;">
                                        <b style="color: red;">{{ hint }}</b>
                                </div>
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

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/router'; // 导入登录函数

const account = ref('');
const password = ref('');
const router = useRouter();
const hint = ref('');

const loginCheck = () => {
        // 简单的登录验证
        if (account.value === 'account' && password.value === 'password') {
                console.log('LoginSuccess');
                login(); // 更新登录状态
                router.push('/home'); // 跳转到首页
        } else {
                hint.value = "帳號密碼錯誤";
                console.log('LoginFailed');
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