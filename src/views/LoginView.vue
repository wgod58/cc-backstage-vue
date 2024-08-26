<template>
        <div class="container">
                <div class="login">
                        帳號：<el-input v-model="account" style="margin-bottom: 10px; width: 240px" placeholder="請輸入帳號" />
                        密碼：<el-input v-model="password" style="margin-bottom: 10px;width: 240px" placeholder="請輸入密碼" type="password"/>
                        <div class="btn-login">
                                <el-button type="primary" @click="loginCheck">登入</el-button>
                        </div>

                </div>
        </div>  
</template>
      
<script lang="ts" setup>
      import router from '@/router';
import { ref } from 'vue'
        const account = ref('account')
        const password = ref('password')
        const loginCheck = () => {
                if(account.value == 'account' && password.value == 'password'){
                        console.log("LoginSuccess")
                        router.push('/')
                }else{
                        console.log("LoginFailed")
                }
        }

</script>

<style scoped>
        .container{
                position: relative;
                background-color: gray;
        }
        .login{
                text-align: center;
                border: 1px solid black;
                border-radius: 5px;
                padding-top: 20px;
                padding-left: 10px;
                position: relative;
                top:30vh;
                left: 35vw;
                height: 25vh;
                width: 30vw;
                background-color: #FFBB77;
        }

</style>
      