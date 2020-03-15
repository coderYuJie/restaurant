<template>
<div class="restaurant-header">
  <header class="index-header">
    <img src="@/assets/img/logo.png" alt="中餐厅" class="logo">
    <div v-if="!isLogin" class="search">
      <el-input placeholder="请输入餐厅名" v-model="query">
      <el-button @click="handlerClick" slot="append">搜索</el-button>
    </el-input>
    </div>
    <div v-if="!isLogin" class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          小明<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-tickets">我的订单</el-dropdown-item>
          <el-dropdown-item icon="el-icon-tickets">主页</el-dropdown-item>
          <el-dropdown-item icon="el-icon-switch-button">退出</el-dropdown-item>
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
      query: ''
    }
  },
  methods: {
    handlerClick () {
      this.$emit()
    },
    registerClick () {
      this.$emit('register', true)
      // this.$router.push({ path: '/login', query: { register: true } })

      // }
    }
  },
  computed: {
    isLogin () {
      return this.$route.path === '/login'
    }
  }
}
</script>

<style lang="less">
.restaurant-header {
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
