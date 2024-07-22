<template>
  <div class="main">
    <div v-for="(item, index) in list" :key="index" class="ding" @click="$router.push(item.path)">
      <img :src="item.photo" alt=""  />
    </div>
  </div>
</template>

<script>
export default {
  name: "zhezhengding",
  data() {
    return {
      list: [
        {
          photo: require("static/images/zhezhengding/001.png"),
          path: 'commonList/200911142920UwkuoHF1p4f701fQLI6/200911111924QC1hnPJ7MS9hXogFwV7?isPreview=1',
        },
        {
          photo: require("static/images/zhezhengding/002.jpg"),
          path: 'commonList/200922145756DgbPB26q5QcQlWojqaf/2009221409159aZ4SuFQXz6HtgGESwP?isPreview=1',
        },
        {
          photo: require("static/images/zhezhengding/003.png"),
          path: 'commonList/2104021531155mPjlN1o1MGxpmU3qBL/201208111223GHQwIx3kfSIpGU0OH0P?isPreview=1',
        },
        {
          photo: require("static/images/zhezhengding/004.png"),
          path: 'commonList/220704164449m3aN0dfeIuD30mIV1WH/220704162457a6QM5uCc3jNE2beQVZ5?isPreview=1',
        },
      ],
    };
  }
};
</script>
<style lang='scss' scoped>
.main {
  background-color: rgb(238, 238, 238);
  padding: 5% 4%;
  height: 95vh;
  .ding {
    height: 17.2%;
    padding: 2% 2.7% 1.9% 2.7%;
    margin-bottom: 5%;
    background-color: #ffffff;
    border-radius: 15px;
    opacity: 0.8;

    img {
      height: 100%;
    }
  }
}
</style>