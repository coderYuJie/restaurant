<template>
  <div class="statistics">
    <restaurant-header></restaurant-header>

    <div class="statistics-main">
      <div class="select">
        <el-date-picker
          v-model="period"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right">
        </el-date-picker>
        <el-button type="primary" plain>查询</el-button>
      </div>
      <div ref="echarts" class="echarts"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import qs from 'qs'

export default {
  name: 'Statistics',
  data () {
    return {
      total: 0,
      option: {
        xAxis: {
          type: 'category',
          data: ['餐厅注册数', '用户注册数', '平台收益']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150],
          type: 'bar'
        }]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      period: ''
    }
  },
  //   countDiningRoom
  // countConsumer
  // sumPrice
  mounted () {
    echarts.init(this.$refs.echarts).setOption(this.option)
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      try {
        // const res = await this.$axios.post('/sysUser/admin/getUserList', qs.stringify({ size: 1, current: 1 }))
        // if (res.code === 0) {
        //   this.total = res.data.total
        //   const data = await this.$axios.post('/sysUser/admin/getUserList', qs.stringify({ total: this.total }))
        //   console.log(data)
        // } else {
        //   this.$message.error(res.msg)
        // }
      } catch (e) {
        console.log(e)
      }
    },
    // 转换时间
    dataConvert (date) {
      const dateBefore = new Date(date)
      const dateAfter = dateBefore.getFullYear() + '-' + (dateBefore.getMonth() + 1) + '-' + dateBefore.getDate() + '' + dateBefore.getHours() + ':' + dateBefore.getMinutes() + ':' + dateBefore.getSeconds()
      return dateAfter
    }

  }
}
</script>

<style lang="less" scoped>
.statistics {
  .statistics-main {
    width: 80%;
    min-width: 800px;
    margin: 0 auto;

    .select {
      margin-top: 20px;
      text-align: center;
    }

    .echarts {
      width: 600px;
      height: 400px;
      margin: 20px auto 0;
    }
  }
}
</style>
