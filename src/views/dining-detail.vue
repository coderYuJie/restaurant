<template>
<!-- 首页->商铺详情 -->
  <div class="dining-detail">
    <restaurant-header></restaurant-header>
    <div class="detail-wrapper header-bottom">
      <div class="brief-info">
        <div class="img">
          <img src="../assets/img/restaurant.png" alt="商铺图">
        </div>
        <div class="dining-info">
          <h2 class="name">{{diningRoomData && diningRoomData.name || "--"}}</h2>
          <ul class="data-list item">
            <li><span>口味：</span>{{diningRoomData && diningRoomData.tatste || "--"}}</li>
            <li><span>标签：</span>{{diningRoomData && diningRoomData.lable || "--"}}</li>
            <li><span>类型：</span>{{diningRoomData && diningRoomData.type || "--"}}</li>
          </ul>
          <div class="item"><span>地址：</span>{{diningRoomData && diningRoomData.addres || "--"}}</div>
          <div class="item"><span>热线：</span>{{diningRoomData && diningRoomData.phone || "--"}}</div>
          <!-- 开店时间-关店时间 -->
          <div class="item"><span>时间：</span>{{diningRoomData && diningRoomData.phone || "--"}}</div>
          <div class="item"><span>餐位：</span>{{diningRoomData && diningRoomData.tables || "--"}}</div>
          <!--  -->
          <div class="order-btn item">立即预约</div>
        </div>
      </div>
      <div class="menu-wrapper">
        <div class="block-title">菜单详情</div>
        <template v-if="detailData && detailData.menuList && detailData.menuList.length ">
          <img src="" alt="">
        </template>
      </div>
      <div class="comment">
        <div class="block-title">网友点评</div>
          <template v-if="detailData && detailData.DiningMenuComments && !detailData.DiningMenuComments.total">
            暂无评论
          </template>
          <template v-if="detailData && detailData.DiningMenuComments && detailData.DiningMenuComments.records">
            <div class="item" v-for="(val, idx) in detailData.DiningMenuComments.records" :key="idx">
              <div class="user-name">用户名： xxx  </div>
              <div class="user-grade">评分：{{val.grade}}</div>
              <img v-if="val.commentPic" :src="val.commentPic" alt="">
              <div class="tiem">评论时间：{{val.createTime}}</div>
              <h4>店家回复</h4>
              <div v-if="val.commentBack">{{val.commentBack}}</div>
              <!-- <template v-else>
                <el-input v-model="backCommentData[idx]" placeholder="请输入评论回复"></el-input>
                <i class="el-icon-edit-outline" @click="backComment(val.id, idx)">商家回复</i>
              </template> -->
            </div>
          </template>

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
  data () {
    return {
      // 餐厅详情
      detailData: {
      },
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
  }
}
</style>
