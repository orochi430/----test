<template>
  <div class="wisdom_form">
    <van-cell
      v-for="items in file_list"
      :key="items.nrid"
      :value="items.nrbt"
      @click="openFile(items)"
    />

    <div v-if="!file_list.length" class="no_notice">暂无附件</div>
  </div>
</template>

<script>
import urlJs from '@/common/url'
export default {
  name: 'wisdom_form',
  data() {
    return {
      file_list: [],
    }
  },
  created() {
    this.query = this.$route.query
    urlJs.setTitle(this.query.title)
    this.getFile()
  },
  methods: {
    getFile() {
      dsf.http
        .get('action?peoplesCongressInterfaceAction=5', {
          id: this.query.id,
        })
        .then((res) => {
          console.log(res)
          let data = res.data
          this.file_list = data.files
        })
    },
    openFile(item) {
      this.$router.push({
        name: 'dsfIframe',
        params: {
          url: item.path,
          title: item.nrbt,
        },
        query: {
          url: item.path,
          title: item.nrbt,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.no_notice {
  text-align: center;
  margin-top: 100px;
}
</style>
