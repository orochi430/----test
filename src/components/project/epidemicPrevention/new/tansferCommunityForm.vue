<template>
<div>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
    dsf.http.post('ctrl/community/getCommunityId').then(res => {
      if(res.data.code == 200) {
        this.$router.replace(`/commonForm/220319161951C1yU9QKfTJAvq2nIEF7/${res.data.data.communityId}?method=view&listId=communityForm&formId=220406201147rVA7eCOsQ0tTsNGCkH8`)
      }
    })
  }
}
</script>
<style lang='scss' scoped>
</style>