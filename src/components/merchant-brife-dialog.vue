<template>
  <!-- 商户-简要信息修改dialog  用户评论dialog-->
  <el-dialog :title="dialogTitle" :visible="showDialog" width="600px" center :before-close="hideDialog">
    <!-- 修改餐厅信息 -->
    <el-form
      v-show="formType==1 || formType==8 && Object.keys(diningData).length"
      label-width="80px"
      :model="diningData">
      <el-form-item label="餐厅名">
        <el-input v-model="diningData.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="diningData.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="diningData.address"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="diningData.introduce"></el-input>
      </el-form-item>
      <el-form-item label="详细介绍">
        <el-input type="textarea" v-model="diningData.detailedIntroduce"></el-input>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-date-picker
          v-model="dataValue"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="diningData.type" placeholder="请选择餐厅类型">
          <el-option
            v-for="(item, key) in typeArr"
            :key="key"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="口味">
        <el-select v-model="diningData.tatste" placeholder="请选择餐厅口味">
          <el-option
            v-for="(item, key) in tasteArr"
            :key="key"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签">
        <el-select v-model="diningData.lable" placeholder="请选择餐厅标签">
          <el-option
            v-for="(item, key) in labelArr"
            :key="key"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="座位数">
        <el-input-number v-model="diningData.tables" :min="1" :max="100" label="餐厅座位数"></el-input-number>
      </el-form-item>
      <el-form-item label="人均消费">
        <el-input-number v-model="diningData.consumePerCost" :min="1" :max="1000" label="人均消费"></el-input-number>
      </el-form-item>
    </el-form>

    <!-- 添加一个菜单 2添加5编辑 -->
    <el-form
      v-show="formType==2 || formType==5"
      label-width="80px"
      :model="menu">
      <el-form-item label="菜单名称">
        <el-input v-model="menu.greesName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number v-model="menu.greesPrice" :min="1" :max="1000" label="单价"></el-input-number>
      </el-form-item>
      <el-form-item label="菜单图片">
        <img v-if="formType==5 && menu.greesPic" :src="menu.greesPic" alt="菜单图片">
        <el-upload
          v-else
          class="upload-demo"
          accept=".jpg, .jpeg, .png, .gif"
          :headers="{'Authorization': headerId}"
          :with-credentials="true"
          :action="configApi + '/common/upload'"
          :on-success="uploadSuccess"
          :on-error="uploadError">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="含量">
        <el-input-number v-model="menu.gressContent" :min="1" :max="1000" label="含量"></el-input-number>
      </el-form-item>
      <el-form-item label="菜单描述">
        <el-input type="textarea" v-model="menu.describe"></el-input>
      </el-form-item>
    </el-form>

    <!-- 用户评论餐厅 userComment-->
    <el-form
      v-show="formType==3"
      label-width="80px"
      :model="userComment">
      <el-form-item label="评分">
        <el-input-number v-model="userComment.grade" :min="1" :max="10" label="评分"></el-input-number>
      </el-form-item>
      <el-form-item label="评论">
        <el-input type="textarea" v-model="userComment.comment"></el-input>
      </el-form-item>
    </el-form>

    <!-- 用户修改订单信息 deku有bug -->
    <el-form
      v-show="formType==6"
      label-width="80px"
      :model="editOrderInfo">
      <el-form-item label="价格">
        <el-input-number v-model="editOrderInfo.prize" :min="1" :max="1000" label="价格"></el-input-number>
      </el-form-item>
      <el-form-item label="预约时间">
        <el-date-picker
          v-model="editOrderInfo.appointmentTime"
          type="datetime"
          placeholder="选择预约时间">
        </el-date-picker>
      </el-form-item>
    </el-form>

    <!-- 用户预约菜单 -->
    <el-form
      v-show="formType==7"
      label-width="80px"
      :model="newOlder">
      <el-form-item label="预约时间">
        <el-date-picker
          v-model="newOlder.appointmentTime"
          type="datetime"
          placeholder="选择预约时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="选择菜品">
        <el-checkbox-group v-model="newOlder.orderList">
          <el-checkbox v-for="(val, idx) in orderRest"
            :key="idx"
            :label="idx + '-' + val.greesPrice">
            {{val.greesName}}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="订单金额">
        {{sumOlder}}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="editBrifeForm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import qs from 'qs'

export default {
  name: 'dialog',

  props: {
    dialogTitle: {
      type: String
    },
    showDialog: {
      type: Boolean
    },
    // 表单类型 1 商户详情  2商户菜单添加 3用户评论  4菜单信息  5 菜单编辑  6 用户修改订单信息  7 预约菜单
    formType: {
      type: Number
    },
    // 商户详情数据
    diningData: {
      type: Object,
      default () {
        return {}
      }
    },
    // 编辑菜单信息
    editMenuData: {
      type: Object,
      default () {
        return {}
      }
    },
    // 用户评论餐厅
    userComment: {
      type: Object,
      default () {
        return {}
      }
    },
    // 用户修改订单信息
    editOrderInfo: {
      type: Object,
      default () {
        return {}
      }
    },

    // 用户预约餐厅菜单  type 7
    orderRest: {
      type: Array,
      default () {
        return []
      }
    },

    // 餐厅id
    resId: {
      type: Number
    }
  },

  data () {
    return {
      dataValue: [new Date(2020, 3, 17, 10, 10, 10), new Date(2222, 3, 17, 10, 10, 1)],
      typeArr: ['中餐厅', '日料', '韩国寿司', '大排档', '烧烤'],
      tasteArr: ['麻辣', '鲜香', '清淡', '变态辣'],
      labelArr: ['聚会轰趴', '国宴大厨', '味道', '年会生日会'],
      fileList: [],
      menu: {
        greesName: '', // 菜单名称
        greesPrice: 0, // 价格
        greesPic: [], // 图片路径 deku需要转换
        gressContent: 0, // 菜单含量（单位：g）
        describe: '' // 菜单描述
      }, // 单个菜单信息
      newOlder: {
        appointmentTime: null, // 预约时间
        orderList: []
      },
      headerId: null
    }
  },
  computed: {
    sumOlder () {
      let sum = 0
      if (this.newOlder.orderList.length) {
        const arr = this.newOlder.orderList.map(i => Number(i.split('-')[1]))
        sum = arr.reduce((prev, current, index, arr) => {
          return prev + current
        })
      }
      return sum
    }
    // headers () {
    //   return { Authorization: sessionStorage.getItem('sessionId') }
    // }
  },
  watch: {
    showDialog: {
      handler (nv) {
        if (nv) {
          if (this.formType === 5) {
            this.menu = JSON.parse(JSON.stringify(this.editMenuData))
          } else {
            Object.assign(this.$data.menu, this.$options.data().menu)
          }
        }
      }
    }

  },
  created () {
    this.headerId = sessionStorage.getItem('sessionId')
  },
  methods: {
    hideDialog () {
      this.$emit('toogleDialog', false)
      this.$emit('hideDialog', false)
    },

    editBrifeForm () {
      if (this.formType === 1 || this.formType === 8) {
        this.editResInfo()
      } else if (this.formType === 2 || this.formType === 5) {
        this.addMenu()
      } else if (this.formType === 3) {
        this.addComment()
      } else if (this.formType === 6) {
        this.editOrder()
      } else if (this.formType === 7) {
        this.addNewOlder()
      }
    },

    // 编辑餐厅信息POST /dining-room/merchant/updateDiningRoom
    editResInfo () {
      const obj = JSON.parse(JSON.stringify(this.diningData))
      delete obj.gradeScore
      delete obj.commentCount
      delete obj.userId
      delete obj.createTime
      if (this.formType === 1) {
        var url = '/dining-room/merchant/updateDiningRoom'
      } else {
        url = '/dining-room/merchant/addDiningRoom'
      }
      obj.startTime = this.dateConvert(this.dataValue[0])
      obj.endTime = this.dateConvert(this.dataValue[1])
      obj.image = 'asdfasd'
      this.$axios({
        url: url,
        method: 'post',
        data: qs.stringify(obj)
      }).then(res => {
        if (res) {
          this.$message.success('餐厅信息编辑成功')
          this.hideDialog()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 时间转换
    dateConvert (date) {
      const dateBefore = new Date(date)
      const dateAfter = dateBefore.getFullYear() + '-' + (dateBefore.getMonth() + 1) + '-' + dateBefore.getDate() + ' ' + dateBefore.getHours() + ':' + dateBefore.getMinutes() + ':' + dateBefore.getSeconds()
      return dateAfter
    },

    // 编辑订单 /dining-menu-order/consumer/updateDiningMenuOrder?id=2&prize=1212&appointmentTime=
    editOrder () {
      this.$axios({
        url: `/dining-menu-order/consumer/updateDiningMenuOrder?id=${this.editOrderInfo.id}&prize=${this.editOrderInfo.prize}&appointmentTime=${this.editOrderInfo.appointmentTime}`,
        method: 'post'
      }).then(res => {
        if (res) {
          this.$message.success(res.msg)
          this.$emit('hideDialog')
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 添加菜单 POST /dining-menu/merchant/addDiningRoom
    // 编辑菜单信息 /dining-menu/merchant/updateDiningRoom
    addMenu () {
      const obj = JSON.parse(JSON.stringify(this.menu))
      // obj.greesPic = 'asdfasdf' // deku假路径
      const url = this.formType === 5 ? '/dining-menu/merchant/updateDiningRoom' : '/dining-menu/merchant/addDiningRoom'
      this.$axios({
        url: url,
        method: 'post',
        data: qs.stringify(obj)
      }).then(res => {
        if (res) {
          const msg = this.formType === 5 ? '菜单编辑成功' : '菜单添加成功'
          this.$message.success(msg)
          this.hideDialog()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 用户添加评论 POST /dining-menu-comment/consumer/addDiningRoom
    addComment () {
      this.$axios({
        url: '/dining-menu-comment/consumer/addDiningRoom',
        method: 'post',
        data: qs.stringify(this.userComment)
      }).then(res => {
        if (res) {
          this.$message.success(res.msg)
          this.hideDialog()
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 用户添加订单 POST /dining-menu-order/consumer/addDiningMenuOrder
    addNewOlder () {
      const obj = {
        diningRoomId: this.resId,
        prize: this.sumOlder,
        appointmentTime: this.dateConvert(this.newOlder.appointmentTime)
      }

      this.$axios({
        url: '/dining-menu-order/consumer/addDiningMenuOrder',
        method: 'post',
        data: qs.stringify(obj)
      }).then(res => {
        if (res) {
          this.$message.success(res.msg)
          this.$emit('hideDialog')
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 上传控制
    uploadSuccess (res, file) {
      if (res && res.url) {
        this.$message.success('图片上传成功')
        this.menu.greesPic = res.url
      } else {
        this.$message.error(res.message)
      }
    },
    uploadError () {
      this.$message.error('图片上传失败')
    },
    beforeUpload (file) {
      console.log(file.type, 'asdfasdf')
      const isJPG = file && (['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].indexOf(file.type) > -1)
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('仅支持JPG，JPEG，GIF，PNG图片文件!')
      }
      if (!isLt1M) {
        this.$message.error('文件大小不能超过10M')
      }
      return isJPG && isLt1M
    }
  }

}
</script>

<style lang="less" scoped>

</style>
