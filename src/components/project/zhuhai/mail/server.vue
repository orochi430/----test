<template>
<div>
  <van-tabs>
    <van-tab title="POP">
      <van-field label="邮箱地址" placeholder="必填" type="textarea" rows="1" autosize v-model="POPaddress" label-width="1.4rem"/>
      <div class="sub-title">收件地址</div>
      <van-field label="服务器" placeholder="必填" type="textarea" rows="1" autosize v-model="POPserver1" label-width="1.4rem"/>
      <van-field label="用户名" placeholder="必填" type="textarea" rows="1" autosize v-model="POPaddress1" label-width="1.4rem"/>
      <van-field label="密码" placeholder="必填" type="password" rows="1" autosize v-model="POPpassword1" label-width="1.4rem"/>
      <van-field label="端口" placeholder="必填" type="textarea" rows="1" autosize v-model="POPsort1" label-width="1.4rem"/>
      <van-cell center title="SSL">
        <template #right-icon>
          <van-switch v-model="POPSSL1" size="24" />
        </template>
      </van-cell>
      <div class="sub-title">发件服务器</div>
      <van-field label="服务器" placeholder="必填" type="textarea" rows="1" autosize v-model="POPserver2" label-width="1.4rem"/>
      <van-field label="用户名" placeholder="必填" type="textarea" rows="1" autosize v-model="POPaddress2" label-width="1.4rem"/>
      <van-field label="密码" placeholder="必填" type="password" rows="1" autosize v-model="POPpassword2" label-width="1.4rem"/>
      <van-field label="端口" placeholder="必填" type="textarea" rows="1" autosize v-model="POPsort2" label-width="1.4rem"/>
      <van-cell center title="SSL">
        <template #right-icon>
          <van-switch v-model="POPSSL2" size="24" />
        </template>
      </van-cell>
    </van-tab>
    <van-tab title="IMAP">
      <van-field label="邮箱地址" placeholder="必填" type="textarea" rows="1" autosize v-model="IMAPaddress" label-width="1.4rem"/>
      <div class="sub-title">收件地址</div>
      <van-field label="服务器" placeholder="必填" type="textarea" rows="1" autosize v-model="IMAPserver1" label-width="1.4rem"/>
      <van-field label="用户名" placeholder="必填" type="textarea" rows="1" autosize v-model="IMAPaddress1" label-width="1.4rem"/>
      <van-field label="密码" placeholder="必填" type="password" rows="1" autosize v-model="IMAPpassword1" label-width="1.4rem"/>
      <van-field label="端口" placeholder="必填" type="textarea" rows="1" autosize v-model="IMAPsort1" label-width="1.4rem"/>
      <van-cell center title="SSL">
        <template #right-icon>
          <van-switch v-model="IMAPSSL1" size="24" />
        </template>
      </van-cell>
      <div class="sub-title">发件服务器</div>
      <van-field label="服务器" placeholder="必填" type="textarea" rows="1" autosize v-model="IMAPserver2" label-width="1.4rem"/>
      <van-field label="用户名" placeholder="必填" type="textarea" rows="1" autosize v-model="IMAPaddress2" label-width="1.4rem"/>
      <van-field label="密码" placeholder="必填" type="password" rows="1" autosize v-model="IMAPpassword2" label-width="1.4rem"/>
      <van-field label="端口" placeholder="必填" type="textarea" rows="1" autosize v-model="IMAPsort2" label-width="1.4rem"/>
      <van-cell center title="SSL">
        <template #right-icon>
          <van-switch v-model="IMAPSSL2" size="24" />
        </template>
      </van-cell>
    </van-tab>
  </van-tabs>
  <div style="height: 1.2rem">
    <div class="footer">
      <van-button 
        class="btn"
        type="info" 
        @click="next"
      >完成
      </van-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      POPaddress: '',
      POPserver1: '',
      POPaddress1: '',
      POPpassword1: '',
      POPsort1: '',
      POPSSL1: true,
      POPserver2: '',
      POPaddress2: '',
      POPpassword2: '',
      POPsort2: '',
      POPSSL2: true,
      IMAPaddress: '',
      IMAPserver1: '',
      IMAPaddress1: '',
      IMAPpassword1: '',
      IMAPsort1: '',
      IMAPSSL1: true,
      IMAPserver2: '',
      IMAPaddress2: '',
      IMAPpassword2: '',
      IMAPsort2: '',
      IMAPSSL2: true,
    }
  },
  created() {
    this.POPaddress=this.POPaddress1=this.POPaddress2=this.IMAPaddress=this.IMAPaddress1=this.IMAPaddress2 = JSON.parse(this.$route.query.obj).address
    this.POPpassword1=this.POPpassword2=this.IMAPpassword1=this.IMAPpassword2 = JSON.parse(this.$route.query.obj).password
  },
  methods: {
    next(){
      this.$router.go(-3)
    }
  }
}
</script>
<style lang='scss' scoped>
.sub-title {
  padding: 10px 16px;
}
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