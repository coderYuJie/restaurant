<template>
  <div class="index">
    <header class="index-header">
      <img src="@/assets/img/logo.png" alt="中餐厅" class="logo">
      <div class="search">
        <el-input placeholder="请输入餐厅名" v-model="query">
        <el-button slot="append">搜索</el-button>
      </el-input>
      </div>
      <div class="user">
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
    </header>
    <div class="index-main">
      <!-- 餐厅分类 -->
      <div class="restaurant-classify">

      </div>

      <!-- 餐厅展示列表 -->
      <ul class="restaurant-list">
        <li class="restaurant-item">
          <img src="@/assets/img/restaurant.png" alt="">
          <div class="item-main">
            <div class="item-tit">米其林餐厅</div>
            <div class="item-info">
              <span>口味:5</span>
              <span>人均:99</span>
              <span>评分:5</span>
              <span>评论:345</span>
            </div>
            <div class="tag">
              标签：
              <span>五角场</span>
              <span>火锅/干锅</span>
              <span>特色口味</span>
            </div>
            <div class="reservation"></div>
          </div>
          <div class="hot"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      query: ''
    }
  }
  // mounted () {
  //   this.getUser()
  // },
  // methods: {
  //   async getUser () {
  //     const res = await this.$axios.post('/sysUser/getUser')
  //     console.log(res)
  //   }
  // }
}
</script>

<style lang="less" scoped>
.index {
  .index-header {
    display: flex;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

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
  }
  .index-main {
    padding: 0 30px;

    .restaurant-list {

      .restaurant-item {
        position: relative;
        display: flex;
        width: 80%;
        min-width: 800px;
        height: 160px;
        padding: 10px 30px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin: 5px auto;

        img {
          height: 140px;
        }

        .item-main {
          flex: 1;
          margin-left: 30px;

          .item-tit {
            font-size: 24px;
            line-height: 40px;
            color: #000;
          }
          span {
            margin-right: 20px;
          }
          .item-info {
            line-height: 30px;
          }
          .tag {
            line-height: 30px;
            span {
              color: #4fabe4;
            }
          }

          .reservation {
            margin-top: 10px;
            width: 80px;
            height: 30px;
            background: url('../assets/img/reservation-btn.png');
            background-size: 100%;
          }
        }

        .hot {
          position: absolute;
          top: 0;
          right: 0;
          width: 40px;
          height: 40px;
          background: url('../assets/img/hot.png') no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}

</style>
