<template>
<!-- 首页->商铺详情 -->
  <div class="dining-detail">
    <restaurant-header @getUserId="getUserId"></restaurant-header>
    <div class="detail-wrapper header-bottom">
      <div class="brief-info">
        <div class="dining-info">
          <img v-if="diningRoomData && diningRoomData.image" :src="diningRoomData.image" alt="">
          <img v-else src="@/assets/img/restaurant.png" alt="">
          <h2 class="name">{{diningRoomData && diningRoomData.name || "--"}}</h2>
          <ul class="data-list item">
            <li><span>口味：</span>{{diningRoomData && diningRoomData.tatste || "--"}}</li>
            <li><span>标签：</span>{{diningRoomData && diningRoomData.lable || "--"}}</li>
            <li><span>类型：</span>{{diningRoomData && diningRoomData.type || "--"}}</li>
          </ul>
          <div class="item"><span>地址：</span>{{diningRoomData && diningRoomData.address || "--"}}</div>
          <div class="item"><span>热线：</span>{{diningRoomData && diningRoomData.phone || "--"}}</div>
          <!-- 开店时间-关店时间 -->
          <div class="item"><span>时间：</span>{{diningRoomData && diningRoomData.startTime || "--"}}</div>
          <div class="item"><span>剩余餐位：</span>{{lastTables}}</div>
          <!--  -->
          <div class="order-btn item" @click="order">立即预约</div>
        </div>
      </div>
      <div class="menu-wrapper">
        <div class="block-title">菜单详情</div>
        <div class="block-content" v-if="detailData && detailData.menuList && detailData.menuList.length ">
          <div v-for="(val, key, idx) in detailData.menuList" :key="idx" class="menu-item">
            <img :src="configApi + val.greesPic" alt="商家图片">
            <div class="info-wrapper">
              <div class="item">
                <span>{{val.greesName}}</span>
                <span>单价：{{val.greesPrice}}</span>
                <span>重量：{{val.gressContent}}</span>
                <span>描述：{{val.describe}}</span>
              </div>
            </div>
          </div>
        </div>
        <span class="block-content" v-else>餐厅暂无菜单</span>
      </div>
      <div class="comment">
        <div class="block-title">
          网友点评
          <i class="el-icon-edit-outline" @click="discussDining">评论餐厅</i>
        </div>
        <div class="block-content" v-if="detailData && detailData.DiningMenuComments && detailData.DiningMenuComments.total">
          <div class="discuss-item" v-for="(val, idx) in detailData.DiningMenuComments.records" :key="idx">
            <div class="flex-inline">
              <div class="user-name">【消费者{{idx+1}}】</div>
              <div class="user-grade">评分：{{val.grade}}</div>
            </div>
            <img v-if="val.commentPic" :src="val.commentPic" alt="">
            <div class="flex-inline">
              <div class="user-grade">评论：{{val.comment}}</div>
              <span class="time">{{val.createTime}}</span>
            </div>
            <div class="back">
              <b>店家回复：</b>
              <span>{{val.commentBack || '暂无回复'}}</span>
            </div>
          </div>
        </div>
        <span class="block-content" v-else>餐厅暂无评论</span>
      </div>
    </div>

    <form-dialog
      :dialogTitle="formType==3?'餐厅评论':'预约餐厅'"
      :showDialog="showDialog"
      :formType="formType"
      :userComment="userComment"
      :resId="detailData && detailData.diningRoom && detailData.diningRoom.id"
      :orderRest="detailData && detailData.menuList"
      @hideDialog="hideDialog">
  </form-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'diningDetail',
  components: {
    formDialog: () => import('@/components/merchant-brife-dialog')
  },
  data () {
    return {
      // 餐厅详情
      detailData: {
      },
      showDialog: false,
      userComment: {
        userId: null, // 用户id
        diningRoomId: null, // 餐厅id
        grade: 0, // 评分
        comment: '', // 评论内容
        comment_pic: []
      }, // 评论
      userId: null,
      lastTables: null, // 剩余餐位
      formType: null
    }
  },
  computed: {
    diningRoomData () {
      return this.detailData && this.detailData.diningRoom
    }
  },
  watch: {
    '$route.query.id': {
      immediate: true,
      handler (nv) {
        nv && (this.getData(nv))
        if (nv) {
          this.getData(nv)
          this.getLastTables()
        }
      }
    }
  },
  created () {
  },
  methods: {
    getData (id) {
      this.$axios({
        url: '/public/diningRoomDetail',
        method: 'post',
        data: qs.stringify({ diningRoomId: id })
      }).then(res => {
        if (res) {
          this.detailData = res.data
        } else {
        }
      }).catch(err => {
        console.log(err)
      })
    },

    getUserId (val) {
      this.userId = val
    },

    discussDining () {
      this.showDialog = true
      this.formType = 3
      this.userComment.userId = this.userId
      this.userComment.diningRoomId = this.detailData.diningRoom.id
    },

    order () {
      if (this.detailData.menuList.length) {
        this.showDialog = true
        this.formType = 7
      } else {
        this.$message.warning('该餐厅暂无菜单！')
      }
    },

    hideDialog () {
      this.showDialog = false
      this.getData(this.$route.query.id)
    },

    // 获取剩余餐位 GET /dining-menu-order/selectDiningRoomTables/{id}
    getLastTables () {
      this.$axios({
        url: `/dining-menu-order/selectDiningRoomTables/{id}?id=${this.$route.query.id}`,
        method: 'GET'
      }).then(res => {
        if (res) {
          this.lastTables = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    }

  }

}
</script>

<style lang="less" scoped>
.dining-detail {
  .detail-wrapper {
    .brief-info {
      display: flex;
      .img {
        margin-right: 60px;
      }
      .dining-info {
        color: rgba(0,0,0,0.68);
        img {
          max-width: 240px;
        }
        h2 {
          color: #000;
        }
        .data-list {
          display: inline-flex;
          li {
            margin-right: 25px;
          }
        }
        .item {
          margin-top: 12px;
        }
      }

    }
    .menu-wrapper {
      .block-content .menu-item {
        margin-bottom: 18px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
        }
        .info-wrapper {
          span {
            margin-right: 20px;
          }
        }
      }
    }
    // 评论
    .comment {
      .discuss-item {
        border-bottom: 1px solid #d9d9d9;
        padding-bottom: 20px;
        margin-bottom: 20px;
        .flex-inline {
          position: relative;
          width: 100%;
          display: flex;
          margin-bottom: 10px;
          .time {
            position: absolute;
            right: 0;
            color: #d9d9d9;
            font-size: 12px;
          }
        }
      }
      .el-icon-edit-outline {
        cursor: pointer;
        color: rgb(255,140,0);
        padding: 0 20px 40px;
      }
    }
  }
}
</style>
