<template>
  <div class="personal">
    <restaurant-header></restaurant-header>

    <div class="personal-main">
      <img :src="headImgUrl"  class="head-logo">
      <ul>
        <li>积分：{{userData.score}}</li>
        <li>用户类型：消费者</li>
        <li>用户名：{{userData.name}}</li>
        <li>手机号：{{userData.phone}}</li>
        <li>邮箱：{{userData.email}}</li>
        <li>联系方式：{{userData.phone}}</li>
      </ul>
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
  computed: {
    headImgUrl () {
      let name = 'a'
      if (this.userData && ['a', 'b', 'c', 'd'].includes(this.userData.headImage)) {
        name = this.userData.headImage
      }
      return require(`@/assets/img/${name}.png`)
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
  margin: 120px auto 0;
  width: 80%;
  min-width: 800px;
  text-align: center;
  img {
    width: 80px;
    height: 80px;
    border-radius: 40px;
  }
  li {
    margin: 10px;
  }
}
</style>
