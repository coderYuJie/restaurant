<template>
<div class="restaurant-header">
  <header class="index-header">
    <img @click="goHome" src="@/assets/img/logo.png" alt="中餐厅" class="logo">
    <div v-if="!isLogin" class="search">
      <el-input placeholder="请输入餐厅名" v-model="query">
      <el-button @click="handlerClick" slot="append">搜索</el-button>
    </el-input>
    </div>
    <div v-if="!isLogin" class="user">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userData&&userData.name}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu v-if="isPersonal" slot="dropdown">
          <el-dropdown-item icon="el-icon-tickets">我的订单</el-dropdown-item>
          <el-dropdown-item command="/personal" icon="el-icon-tickets">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout" icon="el-icon-switch-button">退出</el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu v-if="isBusiness" slot="dropdown">
          <el-dropdown-item command="/merchant-detail" icon="el-icon-tickets">我的餐厅</el-dropdown-item>
          <el-dropdown-item icon="el-icon-tickets">收益数据</el-dropdown-item>
          <el-dropdown-item command="logout" icon="el-icon-switch-button">退出</el-dropdown-item>
        </el-dropdown-menu>
        <el-dropdown-menu  v-if="isAdmin" slot="dropdown">
          <el-dropdown-item command="/userManagement" icon="el-icon-tickets">用户管理</el-dropdown-item>
          <el-dropdown-item icon="el-icon-tickets">平台数据</el-dropdown-item>
          <el-dropdown-item command="logout" icon="el-icon-switch-button">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div v-if="isLogin" @click="registerClick" class="register">免费注册</div>
  </header>
</div>
</template>

<script>
export default {
  name: 'RestaurantHeader',
  data () {
    return {
      query: '',
      userData: {}
    }
  },
  methods: {
    async getUser () {
      try {
        if (this.$route.path === '/login') return
        const res = await this.$axios.get('/sysUser/getUser')
        if (res.code === 0) {
          this.userData = res.data
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    goHome () {
      this.$router.push('/index')
    },
    handlerClick () {
      this.$emit('search', this.query)
      this.query = ''
    },
    registerClick () {
      this.$emit('register', true)
    },
    async handleCommand (command) {
      try {
        if (command === 'logout') {
          await this.$confirm('你确定要退出登录吗？', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          const res = await this.$axios.post('/public/logout')
          if (res.code === 0) {
            this.$router.push('/login')
            this.$message.success('已退出登录')
          } else {
            this.$message.error(res.msg)
          }
        } else {
          this.$router.push(command)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    isLogin () {
      return this.$route.path === '/login'
    },
    isBusiness () {
      return this.userData && this.userData.userType === 2
    },
    isPersonal () {
      return this.userData && this.userData.userType === 3
    },
    isAdmin () {
      return this.userData && this.userData.userType === 1
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang="less">
.restaurant-header {
  position: fixed;
  width: 100%;
  top: 0;
  background-color: #fff;
  .index-header {
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    border-bottom: 1px solid #ccc;

    .search {
      width: 500px;

      // /deep/ .el-input__inner {
      //   border-color: #ff5000;
      // }
      // /deep/ .el-input-group__append button.el-button {
      //   background-color: #ff5000;
      //   color: #fff;
      //   border: none;
      // }
    }

    .register {
      cursor: pointer;
      line-height: 60px;
    }
    .register:hover {
      color: orange;
    }
  }
}
</style>
