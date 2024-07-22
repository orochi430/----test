<template>
  <div class="single_login init-div"></div>
</template>

<script>
import store from '@/common/util'
export default {
  name: 'single_login',
  data() {
    return {}
  },
  created() {
    this.loading = dsf.layer.loading('登录中...')
    this.singleLogin()
  },
  mounted() {},
  methods: {
    singleLogin() {
      dsf.http
        .get(
          `action?peoplesCongressInterfaceAction=1&userId=${this.$route.params.userId}`,
          {},
        )
        .then((result) => {
          result = result.data
          console.log(result)
                dsf.layer.closeLoading(this.loading);
          if (String(result.rcode) === '1') {
            store.saveToSessionStore('user', result.data)
            store.saveToSessionStore('loginToken', result.data.auth.token)
            store.saveToLocalStore('loginToken', result.data.auth.token)
            store.saveToLocalStore('user', JSON.stringify(result.data))
            this.$router.replace('/'+this.$route.params.url)

          } else {
            dsf.layer.alert(
              {
                title: '温馨提示',
                message: '所在机构无用户信息，请重新登录',
              },
              () => {
                this.singleLogin()
              },
            )
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
