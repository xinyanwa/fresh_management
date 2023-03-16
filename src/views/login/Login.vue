<template>
  <div class="login">
    <el-card class="login-card">
      <h1 class="login-title">用户登录</h1>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="button">
            <el-button type="primary" @click="handleLogin">登录</el-button>
            <el-button type="primary" @click="handleReset">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {Login} from '@/api/home'
import router from "@/router";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
      },
      loginRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.loginForm);
          Login(this.loginForm).then(data => {
            const { token } = data.data.data
            const  user = data.data.data.user[0]
            // console.log(data.data.data.user[0].us_Name)
            if (data.data.code === 0) {
              window.localStorage.setItem('token',token)
              window.localStorage.setItem('user',JSON.stringify(user))
              setTimeout(() => {
                router.push('/')
              }, 1000)
            }
          })
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    handleReset() {
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content:center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  background: url('@/assets/image/login.png');
  background-size: cover;
  position: relative;
}

.login-card {
  position: absolute;
  right: 280px;
  width: 400px;
  background: #5a8cf8;
  border: none;
  color: white;
}

.login-title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
}

.button {
  width: 100%;
  display: flex;
}

.el-form-item__label {
  font-size: 16px;
  color: #333;
}

.el-input {
  font-size: 16px;
}

.el-button {
  font-size: 16px;
  width: 100%;
}

</style>
