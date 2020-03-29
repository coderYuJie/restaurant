<template>
  <div class="user-management">
    <restaurant-header></restaurant-header>

    <div class="management-main">
      <!-- 添加用户按钮 -->
      <el-button @click="isShowAddUserDialog" class="adduser" type="primary" plain>添加用户</el-button>
      <!-- 用户管理列表 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="user">
          <el-table
            :data="userList"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              width="120"
              label="昵称">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="score"
              width="120"
              label="积分">
            </el-table-column>
            <el-table-column
              prop="status"
              width="120"
              label="状态">
              <template v-slot:default="obj">
                <el-switch
                  @change="setStatus(obj.row.id,obj.row.status)"
                  v-model="obj.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template v-slot:default="obj">
                <el-button @click="delUser(obj.row.id)" type="danger" size="small" plain icon="el-icon-delete"></el-button>
                <el-button @click="isShowEditUserDialog(obj.row)" type="primary" size="small" plain icon="el-icon-edit"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleUserSizeChange"
            @current-change="handleUserCurrentChange"
            :current-page.sync="sendUserData.current"
            :page-size="sendUserData.size"
            layout="prev, pager, next, jumper"
            :total="total.userTotal">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="商家管理" name="business">
          <el-table
            :data="businessList"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              width="120"
              label="昵称">
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号">
            </el-table-column>
            <el-table-column
              prop="score"
              width="120"
              label="积分">
            </el-table-column>
            <el-table-column
              prop="status"
              width="120"
              label="状态">
              <template v-slot:default="obj">
                <el-switch
                  @change="setStatus(obj.row.id,obj.row.status)"
                  v-model="obj.row.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template v-slot:default="obj">
                <el-button @click="delUser(obj.row.id)" type="danger" size="small" plain icon="el-icon-delete"></el-button>
                <el-button @click="isShowEditUserDialog(obj.row)" type="primary" size="small" plain icon="el-icon-edit"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleBusinessSizeChange"
            @current-change="handleBusinessCurrentChange"
            :current-page.sync="sendBusinessData.current"
            :page-size="sendBusinessData.size"
            layout="prev, pager, next, jumper"
            :total="total.businessTotal">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>

      <!-- 添加用户对话框 -->
      <el-dialog
        @close="clearAddForm"
        title="添加用户"
        :visible.sync="addUserDialogVisible"
        width="40%">
        <el-form :model="addUserForm" :rules="addUserRules" ref="addUserForm" label-width="80px">
          <el-form-item label="类型">
            <el-radio v-model="addUserForm.userType" label="3">个人</el-radio>
            <el-radio v-model="addUserForm.userType" label="2">商家</el-radio>
          </el-form-item>
          <el-form-item label="头像">
            <template v-for="(val, key) in imgSrcs">
              <img :src="val" :key="key" :class="{'is-active': addUserForm.headImage == key}" @click="changeHead(key)" alt="">
            </template>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="addUserForm.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="addUserForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="newPassword">
            <el-input v-model="addUserForm.newPassword" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <el-input v-model="addUserForm.confirm" type="password" placeholder="请确认密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户对话框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editUserDialogVisible"
        width="40%">
        <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="80px">
          <el-form-item label="类型">
            <el-radio v-model="editForm.userType" label="3">个人</el-radio>
            <el-radio v-model="editForm.userType" label="2">商家</el-radio>
          </el-form-item>
          <el-form-item label="头像">
            <template v-for="(val, key) in imgSrcs">
              <img :src="val" :key="key" :class="{'is-active': editForm.headImage == key}" @click="changeEditHead(key)" alt="">
            </template>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="editForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="editForm.newPassword" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm">
            <el-input v-model="editForm.confirm" type="password" placeholder="请确认密码"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editUserDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'UserManagement',
  data () {
    const verifyEmail = (rule, value, callback) => {
      const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/
      // let reg =  /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/;   //后端正则
      if (!value) {
        callback(new Error('请输入邮箱'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('请输入正确邮箱格式'))
        }
        callback()
      }
    }
    const verifyPhone = (rule, value, callback) => {
      const phoneReg = /^1[3-578]\d{9}$/
      // let reg =  /^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$/;   //后端正则
      if (!value) {
        callback(new Error('请输入手机号'))
      } else {
        if (!phoneReg.test(value)) {
          callback(new Error('请输入正确的手机号码'))
        }
        callback()
      }
    }
    const verifyPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else if (value.length < 5) {
        callback(new Error('密码长度不少于5位'))
      } else {
        callback()
      }
    }
    const verifyConfirm = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
      } else if (this.addUserForm.newPassword !== value) {
        callback(new Error('请确认两次输入的密码一致'))
      } else {
        callback()
      }
    }
    const verifyEditConfirm = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认密码'))
      } else if (this.editForm.newPassword !== value) {
        callback(new Error('请确认两次输入的密码一致'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'user',
      sendUserData: {
        size: 5,
        current: 1,
        userType: 3
      },
      sendBusinessData: {
        size: 5,
        current: 1,
        userType: 2
      },
      userList: [],
      businessList: [],
      total: {
        userTotal: 0,
        businessTotal: 0
      },
      addUserDialogVisible: false,
      editUserDialogVisible: false,
      addUserForm: {
        userType: '3',
        name: '',
        email: '',
        phone: '',
        newPassword: '',
        headImage: 'a',
        confirm: ''
      },
      imgSrcs: {
        a: 'static/a.png',
        b: 'static/b.png',
        c: 'static/c.png',
        d: 'static/d.png'
      },
      addUserRules: {
        name: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: verifyEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: verifyPhone, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: verifyPassword, trigger: 'blur' }
        ],
        confirm: [
          { required: true, validator: verifyConfirm, trigger: 'blur' }
        ]
      },
      editForm: {
        id: 0,
        name: '',
        newPassword: '',
        email: '',
        phone: '',
        userType: 0,
        headImage: '',
        confirm: ''
      },
      editRules: {
        name: [
          { required: true, message: '请输入用户昵称', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: verifyEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: verifyPhone, trigger: 'blur' }
        ],
        newPassword: [
          { validator: verifyPassword, trigger: 'blur' }
        ],
        confirm: [
          { validator: verifyEditConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取用户数据
    async getUserList () {
      try {
        const res = await this.$axios.post('/sysUser/admin/getUserList', qs.stringify(this.sendUserData))
        if (res.code === 0) {
          res.data.records.forEach(item => {
            item.status === 1 ? item.status = true : item.status = false
          })
          this.total.userTotal = res.data.total
          this.userList = res.data.records
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 获取商家数据
    async getBusinessList () {
      try {
        const res = await this.$axios.post('/sysUser/admin/getUserList', qs.stringify(this.sendBusinessData))
        if (res.code === 0) {
          res.data.records.forEach(item => {
            item.status === 1 ? item.status = true : item.status = false
          })
          this.total.businessTotal = res.data.total
          this.businessList = res.data.records
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 设置用户状态
    async setStatus (id, val) {
      try {
        if (!val) {
          const res = await this.$axios.get(`/sysUser/admin/lock/${id}`)
          if (res.code === 0) {
            this.$message.success('已禁用该用户')
          } else {
            this.$message.error(res.msg)
          }
        } else {
          const res = await this.$axios.get(`/sysUser/admin/audit/${id}`)
          if (res.code === 0) {
            this.$message.success('已启用该用户')
          } else {
            this.$message.error(res.msg)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    handleUserSizeChange (val) {
      this.sendUserData.size = val
      this.getUserList()
    },
    handleUserCurrentChange (val) {
      this.sendUserData.current = val
      this.getUserList()
    },
    handleBusinessSizeChange (val) {
      this.sendBusinessData.size = val
      this.getBusinessList()
    },
    handleBusinessCurrentChange (val) {
      this.sendBusinessData.current = val
      this.getBusinessList()
    },
    // 删除用户
    async delUser (id) {
      try {
        await this.$confirm('您确定要删除该用户吗？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await this.$axios.delete(`/sysUser/admin/delete/${id}`)
        if (res.code === 0) {
          if (this.userList.length === 1 && this.sendUserData.current > 1) {
            this.sendUserData.current--
          }
          this.$message.success(res.msg)
          this.getUserList()
        } else {
          this.$message.error(res.code)
        }
      } catch (e) {
        console.log(e)
      }
    },
    isShowAddUserDialog () {
      this.addUserDialogVisible = true
    },
    changeHead (key) {
      this.addUserForm.headImage = key
    },
    changeEditHead (key) {
      this.editForm.headImage = key
    },
    isShowEditUserDialog (row) {
      this.editUserDialogVisible = true
      this.editForm.id = row.id
      this.editForm.name = row.name
      this.editForm.email = row.email
      this.editForm.phone = row.phone
      this.editForm.userType = row.userType + ''
      this.editForm.headImage = row.headImage[row.headImage.length - 1]
    },
    // 添加用户
    async addUser () {
      try {
        await this.$refs.addUserForm.validate()
        const res = await this.$axios.post('/sysUser/admin/addUser', qs.stringify({
          name: this.addUserForm.name,
          password: this.addUserForm.newPassword,
          email: this.addUserForm.email,
          phone: this.addUserForm.phone,
          userType: Number(this.addUserForm.userType),
          headImage: this.addUserForm.headImage
        }))
        if (res.code === 0) {
          this.$message.success('成功添加该用户')
          if (this.addUserForm.userType === '3') {
            this.getUserList()
          } else {
            this.getBusinessList()
          }
          this.$refs.addUserForm.resetFields()
          this.addUserDialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    clearAddForm () {
      this.$refs.addUserForm.resetFields()
    },
    // 修改用户信息
    async editUser () {
      try {
        await this.$refs.editForm.validate()
        const res = await this.$axios.post('/sysUser/updateUserInfo', qs.stringify({
          id: this.editForm.id,
          name: this.editForm.name,
          password: this.editForm.newPassword,
          email: this.editForm.email,
          phone: this.editForm.phone,
          userType: Number(this.editForm.userType),
          headImage: this.editForm.headImage
        }))
        if (res.code === 0) {
          this.$message.success('修改成功')
          this.getUserList()
          this.getBusinessList()
          this.editUserDialogVisible = false
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  created () {
    this.getUserList()
    this.getBusinessList()
  }
}
</script>

<style lang="less" scoped>
.management-main {
  width: 80%;
  min-width: 800px;
  margin: 80px auto 0;
  .adduser {
    margin: 20px 0;
  }
  /deep/ .el-table {
    margin-top: 20px;
    min-height: 330px;
  }

  img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    border-radius: 50%;
    box-sizing: border-box;
    &.is-active {
      border: 2px solid orange;
    }
  }
  /deep/ .el-pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
