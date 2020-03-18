<template>
  <div class="personal">
    <restaurant-header></restaurant-header>

    <div class="personal-main">
      <ul>
        <li>用户名：{{userData.name}}</li>
        <li>手机号：{{userData.phone}}</li>
        <li>邮箱：{{userData.email}}</li>
      </ul>

      {{userData}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {}
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      try {
        const res = await this.$axios.get('/sysUser/getUser')
        if (res.code === 0) {
          this.userData = res.data
        } else {
          this.$message.error(res.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style lang="less" scoped>
.personal-main {
  margin: 80px auto 0;
  width: 80%;
  min-width: 800px;
}
</style>
