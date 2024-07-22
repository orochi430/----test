<template>
<div>
  <van-field label="发信昵称" placeholder="必填" type="textarea" rows="1" autosize v-model="name" label-width="1.4rem"/>
  <van-field label="邮箱地址" placeholder="必填" type="textarea" rows="1" autosize v-model="address" label-width="1.4rem"/>
  <van-field label="密码" placeholder="必填" type="textarea" rows="1" autosize v-model="password" label-width="1.4rem"/>
  <div style="height: 1.2rem">
    <div class="footer">
      <van-button 
        class="btn"
        type="info" 
        @click="next"
      >下一步
      </van-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      address: '',
      password: '',
    }
  },
  methods: {
    next() {
      if(!this.name) {
        dsf.layer.toast('请输入发信昵称')
        return
      }else if(!this.address) {
        dsf.layer.toast('请输入邮箱地址')
        return
      }else if(!this.password) {
        dsf.layer.toast('请输入密码')
        return
      } else {
        this.$router.push({
          path: '/zhuhaiMailServer',
          query: {
            obj: JSON.stringify({name: this.name,address: this.address,password: this.password})
          }
        })
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if(from.name != 'zhuhaiMailServer') {
          vm.name = ''
          vm.address = ''
          vm.password = ''
      }
    })
  }
}
</script>
<style lang='scss' scoped>
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 12px;
    box-sizing: border-box;
    .btn{
      width: 100%;
    }
}
</style>