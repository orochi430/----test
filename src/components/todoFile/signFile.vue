<template>
  <div class="ds-sign-file">
    <van-popup v-model="isShow" class="ds-sign-file-pop" position="bottom" get-container="#app" round>
      <div class="header">
        <van-nav-bar title="报名" left-text="取消" @click-left="cancel" />
      </div>
      <div class="body" v-if="data.deptBaoming">
        <!-- 是否出席 -->
        <div class="join">
          <label for>是否出席:</label>
          <van-radio-group v-model="isAttend" direction="horizontal">
            <van-radio :name="true" shape="square">出席</van-radio>
            <van-radio :name="false" shape="square">{{'请假/委托'}}</van-radio>
          </van-radio-group>
        </div>
        <!-- 参会人员 -->
        <div v-if="isJoin" class="confrence">
          <van-field
            v-model="joinPerson"
            readyonly
            input-align="left"
            label="参会人员:"
            placeholder="请选择"
            type="textarea"
            autosize
            rows="1"
            @click="showPerson = true"
          >
            <template #label>
              <span>
                <label class="mast-input"></label>参会人员:
              </span>
            </template>
          </van-field>
        </div>
        <!-- 代会人员 -->
        <div v-else class="congressPerson">
          <van-field
            v-model="congressPerson"
            :readonly="true"
            input-align="left"
            label="代会人员:"
            placeholder="请选择"
            type="textarea"
            autosize
            rows="1"
            @click="showPerson = true"
          >
            <template #label>
              <span>
                <label class="mast-input"></label>代会人员：
              </span>
            </template>
          </van-field>
        </div>
        <!-- 请假理由 -->
        <van-field
          v-show="!isJoin"
          v-model="leaveReason"
          rows="4"
          autosize
          label="请假理由:"
          type="textarea"
          placeholder="请输入请假理由"
        />
      </div>
      <div v-else  class="body"><!--个人报名-->
        <!-- 是否出席 -->
        <div class="join">
          <label for>是否出席:</label>
          <van-radio-group v-model="isAttend" direction="horizontal">
            <van-radio :name="true" shape="square">出席</van-radio>
            <van-radio :name="false" shape="square">{{'请假/委托'}}</van-radio>
          </van-radio-group>
        </div>
        <!-- 代会人员 -->
        <div v-if="!isJoin" class="confrence">
          <van-field
            v-model="congressPerson"
            :readonly="true"
            input-align="left"
            label="代会人员:"
            placeholder="请选择"
            type="textarea"
            autosize
            rows="1"
            @click="showPerson = true"
          >
            <template #label>
              <span>
                <label class="mast-input"></label>代会人员：
              </span>
            </template>
          </van-field>
        </div>
        <!-- 请假理由 -->
        <van-field
          v-show="!isJoin"
          v-model="leaveReason"
          rows="4"
          autosize
          label="请假理由:"
          type="textarea"
          placeholder="请输入请假理由"
        />
      </div>
      <div class="footer">
    		<debounce-click>
          <van-button type="theme" @click="submit">提交</van-button>
        </debounce-click>
      </div>
    </van-popup>
    <van-popup
      :style="{ height: '90%' }"
      :close-on-click-overlay="false"
      v-model="showPerson"
      position="bottom"
      get-container="#app"
      round
    >
      <selectPerson v-if="showPerson" :extra="extra" @getSelectUser="getSelectUser" :type="0" @cancePerson="showPerson = false"></selectPerson>
    </van-popup>
  </div>
</template>

<script>
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
import DebounceClick from '@/components/common/debounceClick.jsx'
import store from "@/common/util";

export default {
  name: "SignFile",
  components: {
    selectPerson,
    DebounceClick
  },
  data() {
    return {
      isShow: false,
      resolve: () => {},
      reject: () => {},
      data: {deptBaoming:true},
      showPerson: false,
      userInfo:{},
      joinPersons: [],
      joinPersonIds: "",
      joinPerson: "",
      congressPersons: [],
      congressPersonIds: "",
      congressPerson: "",
      leaveReason: "",
      isAttend: true,
      isJoin: true,
      attendMeetingUrl:dsf.config.meetingConfig.attendMeetingUrl,
      extra:{}
    };
  },
  watch: {
    isAttend() {
      this.isJoin = !this.isJoin;
      this.showPerson = false;
    },
  },
  methods: {
    init() {
      const userInfo = store.loadSessionStore("user");
      this.userInfo=userInfo;
      // let joinPersons = [{
      //   id: userInfo.user_id,
      //   pid: userInfo.deptId,
      //   name: userInfo.name
      // }];
      let joinPersons = [];
      // let congressPersons = [{
      //   id: userInfo.user_id,
      //   pid: userInfo.deptId,
      //   name: userInfo.name
      // }];
      let congressPersons = [];
      this.data = null;
      this.showPerson = false;
      this.joinPersons = joinPersons;
      this.joinPersonIds = joinPersons.length > 0 ? joinPersons[0].id : "";
      this.joinPerson = joinPersons.length > 0 ? joinPersons[0].name : "";
      this.congressPersons = congressPersons;
      this.congressPersonIds =
        congressPersons.length > 0 ? congressPersons[0].id : "";
      this.congressPerson =
        congressPersons.length > 0 ? congressPersons[0].name : "";
      this.leaveReason = "";
      this.isAttend = true;
      this.isJoin = true;
    },
    show(data) {
      this.init();
      this.data = data;
      console.log(this.data);
      this.isShow = true;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    cancel() {
      this.isShow = false;
      this.reject("流程被中断");
    },
    submit() {
      // 表单校验
      let params = {
        meetingtzId: this.data.meetingtzId,
        pk: this.data.pk,
        pnId: this.data.pnId,
        attendance: this.isAttend ? "1" : "-1",
        leaveReason: this.leaveReason,
        "x-auth-token": store.loadSessionStore("loginToken"),
        requestEnv: "mobile",
      };
      if (this.data.deptBaoming) {
        params.attendType = 2;
      } else {
        params.attendType = 1;
      }
      if (this.isAttend) {
        if(!this.data.deptBaoming)
        {
          this.joinPersons=[this.userInfo.name];
          this.joinPerson=this.userInfo.name;
          this.joinPersonIds=this.userInfo.user_id;
        }
        if (!this.joinPersons.length) {
          dsf.layer.toast("请选择参会人员");
          return;
        }
        params.userName = this.joinPerson;
        params.userId = this.joinPersonIds;
      } else {
        if (!this.congressPersons.length&&this.data.deptBaoming) {
          dsf.layer.toast("请选择代会人员");
          return;
        }
        if (!this.leaveReason.length) {
          dsf.layer.toast("请填写请假理由");
          return;
        }
        params.userName = this.congressPerson;
        params.userId = this.congressPersonIds;
      }
      let _loading = dsf.layer.loading();
      dsf.http
        .post(this.attendMeetingUrl, params)
        .done((res) => {
          if (res.code === "200") {
            this.isShow = false;
            this.resolve(res);
            this.isAttend=true;
            this.isJoin=true;

          } else {
            dsf.layer.toast("请求异常");
          }
        })
        .error(() => {
          dsf.layer.toast("请求异常");
        })
        .always(() => {
          dsf.layer.closeLoading(_loading);
        });
    },
    getUserNames(data) {
      let names = [];
      let ids = [];
      let persons = data.map((v) => {
        names.push(v.name);
        ids.push(v.attrs.idValue);
        return {
          id: v.attrs.idValue,
          pid: v.attrs.pidValue,
          name: v.name,
        };
      });
      return {
        names: names.join(","),
        ids: ids.join(","),
        persons,
      };
    },
    getSelectUser(data) {
      if (data.length > 0) {
        //去掉父节点，保留选中的子节点
        data.forEach((item, index) => {
          if (item.children && item.children.length > 0) {
            data.splice(index, 1);
          }
        });
        let { names, ids, persons } = this.getUserNames(data);
        if (this.isAttend) {
          this.joinPerson = names;
          this.joinPersonIds = ids;
          this.joinPersons = persons;
        } else {
          this.congressPerson = names;
          this.congressPersonIds = ids;
          this.congressPersons = persons;
        }
      } else {
        this.joinPerson = "";
        this.joinPersonIds = "";
        this.joinPersons = "";
        this.congressPerson = "";
        this.congressPersonIds = "";
        this.congressPersons = "";
      }
    },
    /***********************/
    /****使用演示，请不要copy ****/
    /* <pop-template ref="popTemplate" /> */
    /***********************/
    // pop () {
    //   let data = {}; // 你要传递给弹窗的参数
    //   this.$refs.popTemplate
    //     .show(data)
    //     .then(res => {
    //       // success(res = 你要传递的消息)
    //     }, res => {
    //       // error(res = 流程被中断)
    //     });
    // }
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.ds-sign-file {
  &-pop {
    display: flex;
    flex-direction: column;
    height: 90vh; // 弹窗高度
    @include font_4();
    * {
      box-sizing: border-box;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .van-tabs__line {
      bottom: 0;
    }
    .body {
      flex: auto;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      border-top: 16px solid #f3f3f3;
      border-bottom: 16px solid #f3f3f3;
      .join {
        display: flex;
        align-items: center;
        margin-top: 10px;
        width: 100%;
        height: 1.2rem;
        background: #fff;
        label {
          margin-left: 15px;
          @include font_4();
        }
        span {
          @include font_4();
        }
        .van-radio-group {
          margin-left: 20px;
          ::v-deep .van-radio__label {
            @include font_4();
          }
        }
      }
      .confrence {
        display: flex;
        align-items: center;
        margin-top: 10px;
        width: 100%;
        height: 40px;
        background: #fff;
        label {
          @include font_4();
        }
        span {
          @include font_4();
        }
      }
      .congressPerson {
        display: flex;
        align-items: center;
        margin-top: 10px;
        width: 100%;
        height: 40px;
        background: #fff;
        label {
          @include font_4();
        }
        span {
          @include font_4();
        }
      }
    }
    .footer {
      display: flex;
      flex: none;
      justify-content: space-between;
      align-items: center;
      padding: 15px 18px;
      height: 75px;
      width: 100%;
      background-color: #fff;
      .van-button {
        flex: auto;
        height: 48px;
      }
    }
  }
}
</style>
