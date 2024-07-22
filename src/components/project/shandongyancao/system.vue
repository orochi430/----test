<template>
<div class="dept-contanier">
  <div v-for="(item, index) in dept" :key="index" class="dept" @click="toList(item)">
    <span>{{item.orgName}}（{{item.zdCount}}）</span>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      dept: []
    }
  },
  created() {
    this.getDept()
  },
  methods: {
    getDept() {
      dsf.http.post('ctrl/sdycMobile/getZdDeptList').then(res => {
        this.dept = res.data
      })
    },
    toList(item) {
      this.$router.push(`/commonList?fileType=SDYCzdwj&title=制度文件&secQuery={"deptId":"${item.orgId}"}`)
    }
  }
}
</script>
<style lang='scss' scoped>
.dept-contanier {
  margin-top: 16px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  .dept {
    width: 48%;
    background-color: #f7f7f7;
    text-align: center;
    margin-bottom: 16px;
    padding: 16px;
    border-radius: 6px;
  }
}
</style>