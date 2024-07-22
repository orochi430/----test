<template>
  <div class="workerHeader">
    <div class="header">
      <div class="welcom">欢迎您{{ user }}</div>
      <!-- <div class="search" @click="goSearch">
        <img src="static/images/project/zhenhuaIndustry/search.png" alt="" />
        <span>搜索</span>
      </div> -->
    </div>
    <div class="menu">
      <div class="item" @click="scanCode">
        <img src="static/images/project/zhenhuaIndustry/sweep.png" alt="" />
        <div class="name">扫一扫</div>
      </div>
      <div class="item" @click="goNext">
        <img src="static/images/project/zhenhuaIndustry/contacts.png" alt="" />
        <div class="name">通讯录</div>
      </div>
      <div class="item" @click="inforCard">
        <img src="static/images/project/zhenhuaIndustry/evidence.png" alt="" />
        <div class="name">亮证</div>
      </div>
      <div class="item" @click="questionFeed">
        <img src="static/images/project/zhenhuaIndustry/feedback.png" alt="" />
        <div class="name">问题反馈</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "workerHeader",
  data() {
    return {
      user: dsf.util.loadSessionStore("user").name,
    };
  },
  methods: {
    goSearch() {
      // this.$router.push('/diskSearch');
      this.$router.push("/commonList?fileType=zhcx&title=文件查询");
    },
    goNext() {
      this.$router.push("/mailList");
    },
    scanCode() {
      dsf.util.haddlerSacnCodeType((res)=>{
        console.log('res: ', res.text);
      })
    },
    inforCard() {
      dsf.layer.toast("正在开发中")
    },
    questionFeed() {
      dsf.layer.toast("正在开发中")
    }
  },
};
</script>
<style lang="scss" scoped>
.workerHeader {
  background: url("../../../../../static/images/project/zhenhuaIndustry/headbg.png") no-repeat;
  background-size: 100%;
  padding: 10px 10px 16px;
  min-height: 300px;
  height: 352px;
  // margin-top: -70px;

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 20px;

    /* margin-top: 66px; */
    .welcom {
      font-size: 17px;
      color: #ffffff;
      font-weight: 400;
      margin-top: 70px;
    }

    .search {
      display: flex;
      color: #fff;
      font-size: 0.34rem !important;
      align-items: center;

      img {
        width: 20px;
      }

      span {
        margin-left: 5px;
      }
    }
  }

  .menu {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    font-size: 20px;
    margin: 35px 15px 15px 15px;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      /* flex-wrap: nowrap; */
      /* width: 70px; */
      margin-bottom: 10px;
      img {
        width: 40px;
        height: 40px;
      }
      .name {
        font-size: 14px;
        color: #ffffff;
        font-weight: 500;
      }
    }
  }
}</style>