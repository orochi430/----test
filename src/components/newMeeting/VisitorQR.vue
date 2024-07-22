<template>
  <div class="VisitorQR">
    <div class="main">
      <div class="info">
        <img :src="avatar" alt="" />
        <p>{{ userInfo.name }}</p>
        <ol>
          <li>
            <label for=""></label>
            <span>{{ userInfo.unitName }}</span>
          </li>
          <li>
            <label for=""></label>
            <span>{{ userInfo.deptName }}</span>
          </li>
        </ol>
      </div>
      <div class="code"></div>
      <img src="../../assets/imgs/visitor4.png" alt="" />
      <span>扫一扫识别二维码</span>
    </div>
    <!-- <p>说明：请主动出示参会码，用于核验进入上海市黄浦区人民大道200号</p> -->
  </div>
</template>

<script>
export default {
  name: "VisitorQR",

  components: {},
  data() {
    return {
      avatar: "",
      userInfo: dsf.util.loadSessionStore("user"),
    };
  },
  computed: {},
  watch: {
    active(val) {},
  },
  methods: {
    getAvatar() {
      this.avatar =
        this.userInfo?.photo ||
        require("static/images/EnterpriseServices/default-avatar.png");
    },
  },
  created() {},
  mounted() {
    this.getAvatar();
    console.log(dsf.util.loadSessionStore("user"));
  },
  destroyed() {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.VisitorQR {
  padding: 59px 12px 0;
  width: 100%;
  height: 100%;
  background: #f5f5f5;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 58px;
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    .info {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 110px;
      background: url("../../assets/imgs/visitor1.png") no-repeat;
      background-size: 100% 100%;
      img {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border: 5px solid #fff;
      }
      p {
        padding-top: 42px;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        font-weight: bold;
      }
      ol {
        display: flex;
        align-items: center;
        margin-top: 11px;
        padding-left: 10px;
        width: 100%;
        li {
          display: flex;
          align-items: center;
          margin-right: 30px;
          label {
            margin-right: 3px;
            width: 15px;
            height: 15px;
          }
          span {
            padding-bottom: 2px;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.8);
            text-align: center;
          }
          &:nth-child(1) {
            label {
              background: url("../../assets/imgs/visitor2.png") no-repeat;
              background-size: 100% 100%;
            }
          }
          &:nth-child(2) {
            margin-right: 0;
            label {
              background: url("../../assets/imgs/visitor3.png") no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .code {
      margin-top: 40px;
      width: 225px;
      height: 225px;
      background: url("../../assets/imgs/erweima.png") no-repeat;
      background-size: 100% 100%;
    }
    > img {
      margin-top: 20px;
      width: 15px;
      height: 6px;
    }
    > span {
      margin-top: 5px;
      font-size: 12x;
      color: #0064c2;
    }
  }
  > p {
    margin-top: 15px;
    padding: 0 48px;
    font-size: var(--font_size_4);
    text-align: center;
    color: #666666;
  }
}
</style>
