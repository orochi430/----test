<template>
  <div class="contacts-container">
    <div class="top">
      <van-cell
        title="参会名单"
        icon="arrow-left"
        center
        @click="$router.back()"
      ></van-cell>
    </div>
    <div class="content">
      <div class="left">
        <van-search
          v-model="keyword"
          placeholder="请输入姓名查找"
          center
          @search="onSearch"
        />
        <nameList
          :list="nameList"
          :default-id="defaultId"
          class="content"
          @clickItem="showDetail"
        ></nameList>
      </div>
      <div class="right">
        <div class="title">个人信息</div>
        <div class="content">
          <div class="top">
            <img :src="dsf.url.getWebPath(currentUser.img)" :onerror="default_avatar" alt="" />
            <div class="name">{{ currentUser.name }}</div>
          </div>
          <van-cell :value="currentUser.sex != '0' ? (currentUser.sex == '1' ? '男' : '女') : '未知'" title="性别" center></van-cell>
          <van-cell :value="currentUser.orgName" title="部门" center></van-cell>
          <van-cell :value="currentUser.telephone" title="手机号码" center></van-cell>
          <van-cell
            :value="currentUser.zwText"
            title="参会身份"
            center
          ></van-cell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nameList from "@/components/meetingPad/components/nameList";
export default {
  name: "contacts",
  components: {
    nameList
  },
  data() {
    return {
      default_avatar:
        'this.src="' + require("static/images/meetingPad/avatar.png") + '"',
      nameList: [],
      currentOrg:{},
      currentUser: {},
      keyword: "",
      meeting: dsf.util.loadSessionStore("meeting"),
      defaultId:""
    };
  },
  created() {
    let self = this;
    self.getData();
  },
  mounted() {},
  methods: {
    showDetail(val) {
      this.currentUser = val;
    },
    onSearch() {
      this.getData()
    },
    getData() {
      dsf.http
        .post(`fn/conferenceMobile/contactDetails`, {
          meetingId: this.meeting.id,
          type: 0,
          query_key: this.keyword
        })
        .done(result => {
          if (result.code == 200 && result.data.length > 0) {
            this.nameList = result.data;
            if(this.nameList.length > 0){
              this.currentOrg = this.nameList[0]
              if(this.nameList[0].users.length > 0){
                this.currentUser = this.nameList[0].users[0];
                this.defaultId = this.nameList[0].users[0].userId;
              }
            }
          }
        })
        .error(error => {
          console.log("error", error);
        })
        .always(() => {});
    }
  }
};
</script>

<style lang="scss">
.contacts-container {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    .van-cell__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600 !important;

      span {
        font-size: 0.88rem;
        padding-left: 0.4rem;
      }
    }

    .van-cell__left-icon {
      font-size: 0.8rem;
    }
  }

  > .content {
    flex: 1;
    overflow: hidden;
    display: flex;

    .left {
      width: 53%;
      // border: 1px solid #ddd;
      overflow: auto;
      padding: 40px;
      display: flex;
      flex-direction: column;

      .content {
        flex: 1;
        overflow: auto;
      }
      .van-search {
        padding: 0.2rem 0rem;
      }
    }

    .right {
      padding: 40px;
      // border: 1px solid #ddd;
      flex: 1;
      display: flex;
      flex-direction: column;

      .title {
        font-weight: 600;
      }

      .content {
        flex: 1;
        overflow: auto;

        .top {
          text-align: center;
          padding: 60px 0;

          img {
            width: 222px;
            height: 222px;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
</style>
