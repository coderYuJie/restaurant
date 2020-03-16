<template>
  <!-- 商户-查看个人主页 -->
  <div class="merchant-detail">
    <restaurant-header></restaurant-header>
    <div class="detail-wrapper header-bottom">
      <div class="brief-info">
        <div class="block-title">
          简要信息
          <i class="el-icon-edit-outline" @click="toogleDialog(true, 1)"></i>
        </div>
        <div class="block-content" v-if="merchantData && merchantData.diningRoom">
          <div class="wrapper">
            <span class="name">头像：</span>
            <img :src="merchantData.diningRoom.image" alt="">
          </div>
          <div v-for="(val, key, idx) in brifeInfo" :key="idx" class="wrapper">
            <span class="name">{{val}}</span>
            {{merchantData.diningRoom[key] || '--'}}
          </div>
        </div>
      </div>
      <div class="menu-info">
        <div class="block-title">
          菜单信息
          <i class="el-icon-edit-outline" @click="toogleDialog(true, 2)"></i>
        </div>
        <div class="menu-wrapper">
          <template v-if="merchantData && merchantData.menuList && merchantData.menuList.length">

          </template>
          <template v-else>
            暂无菜单信息
          </template>
        </div>
      </div>
      <div class="comment-info">
        <div class="block-title">顾客评论</div>
        <div class="comment-wrapper">
          <template v-if="merchantData && merchantData.DiningMenuComments && !merchantData.DiningMenuComments.total">
            暂无评论
          </template>
          <template v-if="merchantData && merchantData.DiningMenuComments && merchantData.DiningMenuComments.records">
            <div class="item" v-for="(val, idx) in merchantData.DiningMenuComments.records" :key="idx">
              <div class="user-name">用户名： xxx  </div>
              <div class="user-grade">评分：{{val.grade}}</div>
              <img v-if="val.commentPic" :src="val.commentPic" alt="">
              <div class="tiem">评论时间：{{val.createTime}}</div>
              <h4>店家回复</h4>
              <div v-if="val.commentBack">{{val.commentBack}}</div>
              <template v-else>
                <el-input v-model="backCommentData[idx]" placeholder="请输入评论回复"></el-input>
                <i class="el-icon-edit-outline" @click="backComment(val.id, idx)">商家回复</i>
              </template>
            </div>
          </template>
        </div>
      </div>
    </div>

    <form-dialog
      :dialogTitle="dialogTitle"
      :showDialog="showDialog"
      :formType="formType"
      :diningData="merchantData && merchantData.diningRoom"
      @toogleDialog="toogleDialog">
    </form-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  name: 'merchantDetail',
  components: {
    formDialog: () => import('@/components/merchant-brife-dialog')
  },
  data () {
    return {
      // 餐厅详情
      merchantData: {},
      page: {
        size: 10,
        current: 1
      },
      brifeInfo: {
        name: '用户名',
        phone: '电话',
        address: '地址',
        introduce: '简介',
        detailedIntroduce: '详细介绍',
        startTime: '营业时间',
        endTime: '关门时间',
        type: '类型',
        tatste: '口味',
        lable: '标签',
        tables: '座位数',
        commentCount: '评论数',
        consumePerCost: '人均消费'
      },
      formType: 1, // 1 餐厅简要详情  2 菜单
      showDialog: false,
      dialogTitle: '商户详情表单',
      backCommentData: [], // 商家回复内容
    }
  },
  computed: {

  },
  watch: {
  },
  created () {
    this.getData()
  },
  methods: {
    // POST /dining-room/merchant/getDiningRoom 商户查询商户自己的餐厅信息
    getData () {
      this.$axios({
        url: '/dining-room/merchant/getDiningRoom',
        method: 'post',
        data: qs.stringify(this.page)
      }).then(res => {
        if (!res.code) {
          this.merchantData = res.data
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 表单弹窗
    toogleDialog (val, type) {
      this.showDialog = val
      type && (this.formType = type)
      this.dialogTitle = ['餐厅详情表单', '餐厅菜单'][type - 1]
      this.getData()
    },

    // POST /dining-menu-comment/merchant/backDiningMenuComment 商家回复评论
    backComment (id, valIdx) {
      if (!this.backCommentData[valIdx]) {
        this.$message.warning('请输入回复内容！')
        return
      }
      const page = {
        id: id,
        commentBack: this.backCommentData[valIdx]
      }
      this.$axios({
        url: '/dining-menu-comment/merchant/backDiningMenuComment',
        method: 'post',
        data: qs.stringify(page)
      }).then(res => {
        if (!res.code) {
          this.$message.success('回复评论成功！')
          this.backCommentData[valIdx] = ''
          this.getData()
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
.merchant-detail .detail-wrapper {

}
</style>
