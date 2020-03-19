<template>
  <div class="login">
    <restaurant-header @register="changeForm"></restaurant-header>
    <div class="login-main">
      <div v-show="!isRegister" class="login-from">
        <div class="login-tit">登录中餐厅</div>
        <el-form label-position="top" :model="loginForm" :rules="loginRules" ref="loginForm" label-width="80px">
          <el-form-item label="手机号/邮箱" prop="username">
            <el-input @keyup.enter.native="login" v-model="loginForm.username" placeholder="请输入手机号或邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input @keyup.enter.native="login" v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="new-user"><span @click="changeForm(true)">新用户注册</span></p>
            <el-button @click="login" class="login-btn" type="primary">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="isRegister" class="register-from">
        <div class="register-tit">注册中餐厅账号</div>
        <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="80px">
          <el-form-item label="类型">
            <el-radio v-model="registerForm.userType" label="3">个人</el-radio>
            <el-radio v-model="registerForm.userType" label="2">商家</el-radio>
          </el-form-item>
          <el-form-item label="头像">
            <template v-for="(val, key) in imgSrcs">
              <img :src="val" :key="key" :class="{'is-active': registerForm.headImage == key}" @click="changeHead(key)" alt="">
            </template>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="registerForm.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="newPassword">
            <el-input v-model="registerForm.newPassword" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <el-input v-model="registerForm.confirm" type="password" placeholder="请确认密码"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="login-user"><span @click="changeForm(false)">去登录</span></p>
            <el-button @click="register" class="register-btn" type="primary">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'Login',
  data () {
    const verifyLoginUser = (rule, value, callback) => {
      const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
      const phoneReg = /^1[3-578]\d{9}$/
      // let reg =  /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/;   //后端正则
      if (!value) {
        callback(new Error('请输入邮箱或手机号'))
      } else {
        if (!reg.test(value) & !phoneReg.test(value)) {
          callback(new Error('请输入正确邮箱格式或正确的手机号码'))
        }
        callback()
      }
    }
    const verifyEmail = (rule, value, callback) => {
      const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
      // let reg =  /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/;   //后端正则
      if (!value) {
        callback(new Error('请输入邮箱'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入正确邮箱格式'))
        }
        callback()
      }
    }
    const verifyPhone = (rule, value, callback) => {
      const phoneReg = /^1[3-578]\d{9}$/
      // let reg =  /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/;   //后端正则
      if (!value) {
        callback(new Error('请输入手机号'))
      } else {
        if (!phoneReg.test(value)) {
          callback(new Error('请输入正确的手机号码'))
        }
        callback()
      }
    }
    const verifyPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 5) {
        callback(new Error('密码长度不少于5位'))
      } else {
        callback()
      }
    }
    const verifyConfirm = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
      } else if (this.registerForm.newPassword !== value) {
        callback(new Error('请确认两次输入的密码一致'))
      } else {
        callback()
      }
    }
    return {
      isRegister: false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        userType: '3',
        name: '',
        email: '',
        phone: '',
        newPassword: '',
        headImage: 'a',
        confirm: ''
      },
      loginRules: {
        username: [
          { required: true, validator: verifyLoginUser, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 5, message: '密码不少于5位数', trigger: 'change' }
        ]
      },
      registerRules: {
        name: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: verifyEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: verifyPhone, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: verifyPassword, trigger: 'blur' }
        ],
        confirm: [
          { required: true, validator: verifyConfirm, trigger: 'blur' }
        ]
      },
      imgSrcs: {
        a: 'static/a.png',
        b: 'static/b.png',
        c: 'static/c.png',
        d: 'static/d.png'
      }
    }
  },
  watch: {
    '$route.query.register': function (nv, ov) {
      console.log('asdfasdf', nv)
      nv && (this.isRegister = true)
    }
  },
  methods: {
    changeForm (val) {
      this.isRegister = val
      const formName = val ? 'registerForm' : 'loginForm'
      Object.assign(this.$data[formName], this.$options.data()[formName])
      this.$nextTick(() => {
        this.$refs && this.$refs[formName] && this.$refs[formName].resetFields()
      })
    },
    async login () {
      try {
        await this.$refs.loginForm.validate()
        const res = await this.$axios.post('/public/login', qs.stringify(this.loginForm))
        if (res.code === 0) {
          this.$message.success('登录成功')
          sessionStorage.setItem('sessionId', res.data.sessionId)
          this.$refs.loginForm.resetFields()
          this.$router.push('/index')
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    async register () {
      try {
        await this.$refs.registerForm.validate()
        const res = await this.$axios.post('/public/register', qs.stringify({
          name: this.registerForm.name,
          password: this.registerForm.newPassword,
          email: this.registerForm.email,
          phone: this.registerForm.phone,
          userType: Number(this.registerForm.userType),
          headImage: this.registerForm.headImage
        }))
        if (res.code === 0) {
          this.$message.success('注册成功')
          this.$refs.registerForm.resetFields()
          this.$router.push('/login')
        }
      } catch (e) {
        console.log(e)
      }
    },
    changeHead (key) {
      this.registerForm.headImage = key
    }
  }
}
</script>

<style lang="less" scoped>
.login {

  .login-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;

  }

  .login-main {
    position: relative;
    margin-top: 80px;
    /deep/ .el-form--label-top .el-form-item__label {
        padding: 0;
    }
    .login-from {
      height: 400px;
      position: absolute;
      width: 40%;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 30px 20px;

      .new-user {
        text-align: right;
        margin-bottom: 10px;

        span {
          cursor: pointer;
        }
        span:hover {
          color: orange;
        }
      }

      .login-tit {
        height: 60px;
        line-height: 60px;
        font-size: 22px;
        text-align: center;
      }

      .login-btn {
        width: 100%;
      }
    }
    .register-from {
      height: 400px;
      position: absolute;
      width: 40%;
      min-width: 300px;
      top: 50px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 30px 20px;

      img {
        width: 40px;
        height: 40px;
        margin-right: 15px;
        border-radius: 50%;
        box-sizing: border-box;
        &.is-active {
          border: 2px solid orange;
        }
      }
      .register-tit {
        height: 60px;
        line-height: 60px;
        font-size: 22px;
        text-align: center;
      }

      .login-user {
        text-align: right;
        margin-bottom: 10px;
        span {
          cursor: pointer;
        }
        span:hover {
          color: orange;
        }
      }
      .register-btn {
        width: 100%;
      }
    }
  }
}
</style>
