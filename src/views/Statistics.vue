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
        <el-button @click="serchData" type="primary" plain>查询</el-button>
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
        title: {
          left: 'center',
          text: '本月综合数据'
        },
        xAxis: {
          type: 'category',
          data: ['餐厅注册数', '用户注册数', '平台收益']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [0, 0, 0],
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
      period: null
    }
  },
  mounted () {
    const myEcharts = echarts.init(this.$refs.echarts)
    myEcharts.setOption(this.option)
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      try {
        const res = await this.$axios.post('/adminData/listDiningRoom')
        if (res.code === 0) {
          const data = []
          data.push(res.data.countDiningRoom, res.data.countConsumer, res.data.sumPrice)
          this.option.series[0].data = data
          this.option.title.text = '本月综合数据'
          const myEcharts = echarts.init(this.$refs.echarts)
          myEcharts.setOption(this.option)
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 转换时间
    dataConvert (date) {
      const dateBefore = new Date(date)
      const dateAfter = dateBefore.getFullYear() + '-' + (dateBefore.getMonth() + 1) + '-' + dateBefore.getDate()
      return dateAfter
    },
    // 查询对应时间的数据
    async serchData () {
      try {
        if (this.period === null) {
          this.getUserList()
        } else {
          const res = await this.$axios.post('/adminData/listDiningRoom', qs.stringify({ startTime: this.dataConvert(this.period[0]), endTime: this.dataConvert(this.period[1]) }))
          if (res.code === 0) {
            const data = []
            data.push(res.data.countDiningRoom, res.data.countConsumer, res.data.sumPrice)
            this.option.series[0].data = data
            this.option.title.text = '该时间段综合数据'
            const myEcharts = echarts.init(this.$refs.echarts)
            myEcharts.setOption(this.option)
          } else {
            this.$message.error(res.msg)
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.statistics {
  position: relative;
  .statistics-main {
    width: 80%;
    min-width: 800px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);

    .select {
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
