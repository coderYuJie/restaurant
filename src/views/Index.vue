<template>
  <div class="index">
    <restaurant-header @search="handleSearch"></restaurant-header>
    <div class="index-main">

      <!-- 餐厅展示列表 -->
      <ul class="restaurant-list">
        <li v-for="item in restaurantList" :key="item.id" class="restaurant-item">
          <img v-if="item && item.image" :src="item.image" alt="">
          <img v-else src="@/assets/img/restaurant.png" alt="">
          <!-- <img src="@/assets/img/restaurant.png" alt=""> -->
          <div class="item-main">
            <div class="item-tit">{{item.name}}</div>
            <div class="item-info">
              <span>口味:{{item.tatste || '-'}}</span>
              <span>人均:{{item.consumePerCost || '-'}}</span>
              <span>评分:{{item.gradeScore || '-'}}</span>
              <span>评论:{{item.commentCount || '-'}}</span>
            </div>
            <div class="tag">
              标签：
              <span>{{item.label || '-'}}</span>
            </div>
            <div class="order-btn" @click="skipDetail(item.id)">立即预约</div>
          </div>
          <div class="hot"></div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="search.current"
        :page-size="search.size"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'Index',
  data () {
    return {
      search: {
        size: 5,
        current: 1,
        diningRoomName: ''
      },
      restaurantList: [],
      total: 0
    }
  },
  created () {
    this.getRestaurantList()
  },
  methods: {

    async getRestaurantList () {
      try {
        const res = await this.$axios.post('/public/index', qs.stringify(this.search))
        if (res.code === 0) {
          this.restaurantList = res.data.diningRoomIPage.records
          this.total = res.data.diningRoomIPage.total
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleSizeChange (val) {
      this.search.size = val
    },
    handleCurrentChange (val) {
      this.search.current = val
      this.getRestaurantList()
    },
    handleSearch (val) {
      this.search.diningRoomName = val
      this.search.current = 1
      this.getRestaurantList()
    },
    // 跳转详情
    skipDetail (id) {
      this.$router.push({
        name: 'diningDetail',
        query: { id: id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  .index-main {
    margin-top: 100px;
    margin-bottom: 100px;
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
        margin: 5px auto 20px;
        &:hover {
          border-color: rgb(255,85,1);
          box-shadow: 1px 2px 3px rgb(255,85,1,0.6);
        }

        img {
          height: 140px;
          max-width: 240px;
          min-width: 240px;
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
    /deep/ .el-pagination {
      text-align: center;
      margin-top: 20px;
    }
  }
}

</style>
