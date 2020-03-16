<template>
  <!-- 商户-简要信息修改dialog  用户评论dialog-->
  <el-dialog :title="dialogTitle" :visible="showDialog" width="600px" center>
    <el-form
      v-show="formType==1 && Object.keys(diningData).length"
      label-width="80px"
      :model="diningData">
      <el-form-item label="商铺图片">
        <img v-if="diningData.image" :src="diningData.image" alt="">
        <el-upload
          v-else
          class="upload-demo"
          action="http://www.kaico.site:1819/orderingmeals/common/upload"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名">
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
    // 表单类型 1 商户详情  2商户菜单 3用户评论  4菜单信息
    formType: {
      type: Number
    },
    // 商户详情数据
    diningData: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      dataValue: [new Date(2020, 3, 17, 10, 10, 10), new Date(2222, 3, 17, 10, 10, 1)],
      typeArr: ['中餐厅', '日料', '韩国寿司', '大排档', '烧烤'],
      tasteArr: ['麻辣', '鲜香', '清淡', '变态辣'],
      labelArr: ['聚会轰趴', '国宴大厨', '味道', '年会生日会'],
      fileList: []
    }
  },
  computed: {

  },
  watch: {
  },
  created () {
  },
  methods: {
    hideDialog () {
      this.$emit('toogleDialog', false)
    },

    // 编辑餐厅信息POST /dining-room/merchant/updateDiningRoom
    editBrifeForm () {
      const obj = JSON.parse(JSON.stringify(this.diningData))
      delete obj.gradeScore
      delete obj.commentCount
      delete obj.userId
      delete obj.createTime
      obj.startTime = this.dateConvert(this.dataValue[0])
      obj.endTime = this.dateConvert(this.dataValue[1])
      obj.image = 'asdfasd'
      this.$axios({
        url: '/dining-room/merchant/updateDiningRoom',
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
    }
  }

}
</script>

<style lang="less" scoped>
</style>
