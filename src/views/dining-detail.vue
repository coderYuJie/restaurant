<template>
  <div class="dining-detail">
    <div class="brief-info">
      <div class="img">
        <img src="../assets/img/restaurant.png" alt="商铺图">
      </div>
      <div class="dining-info">
        <h2 class="name">{{diningRoomData && diningRoomData.name || "--"}}</h2>
        <ul class="data-list item">
          <li><span>口味：</span>{{diningRoomData && diningRoomData.taste || "--"}}</li>
          <li><span>标签：</span>{{diningRoomData && diningRoomData.label || "--"}}</li>
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
      <img src="" alt="">
    </div>
    <div class="comment">

    </div>
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
        // DiningMenuComments: {
        //   records: [],
        //   total: 0,
        //   size: 10,
        //   current: 1,
        //   searchCount: true,
        //   pages: 0
        // },
        // diningRoom: {
        //   id: 1,
        //   name: '欢欢餐厅',
        //   phone: '18900998899',
        //   address: '上海宝山区',
        //   image: '@/assets/img/restaurant.png',
        //   introduce: '本店味道极好的',
        //   detailedIntroduce: '本店味道极好的本店味道极好的本店味道极好的本店味道极好的本店味道极好的',
        //   startTime: null,
        //   endTime: null,
        //   taste: '徽菜',
        //   type: '中餐厅',
        //   tables: 23,
        //   gradeScore: 3.4,
        //   commentCount: 34,
        //   userId: null,
        //   consumePerCost: 98,
        //   createTime: '2020-03-14T09:08:39.000+0000'
        // }

      }
    }
  },
  computed: {
    diningRoomData () {
      return this.detailData && this.detailData.diningRoom
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios({
        url: '/public/diningRoomDetail',
        method: 'post',
        data: qs.stringify({ diningRoomId: 1 })
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
  margin: 80px 10% 30px;
  width: 80%;
  min-width: 800px;
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
</style>
