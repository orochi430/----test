<template>
  <div>
    <div style="height: 100vh;"></div>
    <iframe :src="`http://10.1.214.47:6001/DreamWeb/fn/office/openMobileOffice?fileId=240130191342CFMNn0Pmx3zidPghmTD&moduleId=231217111548cK1MmZRUNdcrlp4nnLu&fileName=%E5%85%B3%E4%BA%8E2023%E5%B9%B4%E5%85%A8%E7%9C%81%E6%8E%A8%E5%8A%A8%E5%9B%9B%E5%A5%BD%E5%86%9C%E6%9D%91%E8%B7%AF%E5%92%8C%E4%B9%A1%E6%9D%91%E8%BF%90%E8%BE%93%E9%87%91%E9%80%9A%E5%B7%A5%E7%A8%8B%E9%AB%98%E8%B4%A8%E9%87%8F%E5%8F%91%E5%B1%95%E7%8E%B0%E5%9C%BA%E4%BC%9A%E6%9C%89%E5%85%B3%E6%83%85%E5%86%B5%E7%9A%84%E6%8A%A5%E5%91%8A.ofd&nodeId=U9g3xMVE5v50gTJ&flowId=231217151048YhtMY0trWgLaTOByiMI&x-auth-token=${dsf.util.loadSessionStore('loginToken')}&screenWidth=640`" frameborder="0" height="500px" width="100%"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    // this.$router.replace({
    //   path: "/iframe",
    //   query: {
    //     title: '每日动态',
    //     url: "http://61.129.192.41:8088/DreamWeb/fn/office/openMobileOffice?fileId=231011142704aHFDT5Gn7dVfmlWAKft&moduleId=230504192223hNSFfFucFKid9ZUWQ37&fileName=测试文件加载速度.docx&nodeId=-7&flowId=0&x-auth-token=230427004921Uj5bi7NeDqFcuzFs4rj-d28b36fccd984448ae0a50bf2375ce87&screenWidth=375"
    //   }
    // })
  }
}
</script>
<style lang="scss" scoped></style>
