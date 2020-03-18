<template>
<!-- 用户-我的订单页面 -->
  <div class="order">
    <restaurant-header @getUserId="getUserId"></restaurant-header>
    <div class="detail-wrapper header-bottom">
      <el-table
        :data="orderData && orderData.records"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="prize"
          width="120"
          label="价钱">
        </el-table-column>
        <el-table-column
          prop="appointmentTime"
          label="预订时间">
        </el-table-column>
        <el-table-column
          prop="payTime"
          label="支付时间">
        </el-table-column>
        <el-table-column
          prop="isPay"
          width="120"
          label="是否支付">
        </el-table-column>
        <el-table-column
          label="操作">
          <template v-slot:default="obj">
            <el-button @click="deleteOrder(obj.row.id)" type="danger" size="small" plain icon="el-icon-delete"></el-button>
            <el-button @click="payOlder(obj.row.id)" size="small" plain icon="el-icon-coin"></el-button>
            <el-button @click="editOlder(obj.row)" size="small" plain icon="el-icon-edit-outline"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="orderData.current"
        :page-size="orderData.size"
        layout="prev, pager, next, jumper"
        :total="orderData.userTotal">
      </el-pagination>
    </div>
    <form-dialog
      dialogTitle="订单修改"
      :showDialog="showDialog"
      :formType="6"
      :editOrderInfo="editOrderInfo"
      @hideDialog="hideDialog">
    </form-dialog>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  components: {
    formDialog: () => import('@/components/merchant-brife-dialog')
  },
  data () {
    return {
      orderData: {}, // 用户的订单信息
      userId: null,
      pageConfig: {
        size: 10,
        current: 1,
        total: null
      },
      showDialog: false,
      editOrderInfo: {
        id: null,
        prize: 0,
        appointmentTime: null
      } // 修改订单信息
    }
  },
  mounted () {
  },
  methods: {
    getUserId (val) {
      this.userId = val
      this.getData()
    },

    // 获取用户所有的订单信息 POST /dining-menu-order/adminConsumer/listDiningMenuOrderByConsume
    getData () {
      this.$axios({
        url: `/dining-menu-order/adminConsumer/listDiningMenuOrderByConsumer?size=${this.pageConfig.size}&current=${this.pageConfig.current}&id=${this.userId}`,
        method: 'post'
      }).then(res => {
        if (res) {
          this.orderData = res.data
          this.pageConfig.total = this.orderData.total
        } else {
        }
      }).catch(err => {
        console.log(err)
      })
    },

    handleSizeChange (val) {
      this.pageConfig.size = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.pageConfig.current = val
      this.getData()
    },

    // 删除订单信息DELETE /dining-menu-order/consumer/deleteDiningMenuOrder/{id
    deleteOrder (id) {
      this.$axios({
        url: `/dining-menu-order/consumer/deleteDiningMenuOrder/{id}?id=${id}`,
        method: 'DELETE'
      }).then(res => {
        if (res) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 付款 完成订单 POST /dining-menu-order/consumer/pay?id=2&price=15.00
    payOlder (id) {
      const price = 12 // deku 金额是假数据 这边后端没有给price数据 默认是0所以需要修改
      this.$axios({
        url: `/dining-menu-order/consumer/pay?id=${id}&price=${price}`,
        method: 'POST'
      }).then(res => {
        if (res) {
          this.$message.success(res.msg)
          this.getData()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    editOlder (row) {
      this.editOrderInfo.id = row.id
      this.editOrderInfo.prize = row.prize
      this.editOrderInfo.appointmentTime = row.appointmentTime
      this.showDialog = true
    },

    hideDialog () {
      this.showDialog = false
      this.getData()
    },
  }
}
</script>

<style>

</style>
