<template>
  <div class="ds-ask-leave">
    <van-popup v-model="isShow" class="ds-ask-leave-pop" position="bottom" get-container="#app" round>
      <div class="header">
        <van-nav-bar title="请假" left-text="取消" @click-left="cancel" />
      </div>
      <div class="body">
        <!-- 代会人员 -->
        <div class="congressPerson">
          <van-field
            v-model="congressPerson"
            readyonly
            input-align="left"
            label="代会人员:"
            placeholder="请选择"
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
          v-model="leaveReason"
          rows="2"
          autosize
          label="请假理由:"
          type="textarea"
          placeholder="请输入请假理由"
        />
      </div>
      <div class="footer">
        <van-button type="theme" @click="submit">提交</van-button>
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
      <selectPerson @getSelectUser="getSelectUser" @cancePerson="showPerson = false"></selectPerson>
    </van-popup>
  </div>
</template>

<script>
  import selectPerson from "@/components/selectPerson/DsfSelectPerson";
  import store from "@/common/util";

  export default {
    name: 'AskLeave',
    components: {
      selectPerson
    },
    data() {
      return {
        isShow: false,
        resolve: () => {},
        reject: () => {},
        data: null,
        showPerson: false,
        congressPersons: [],
        congressPersonIds: '',
        congressPerson: '',
        leaveReason: ''
      }
    },
    methods: {
      init () {
        const userInfo = store.loadSessionStore("user");
        let congressPersons = [{
          id: userInfo.user_id,
          pid: userInfo.deptId,
          name: userInfo.name
        }];
        this.data = null;
        this.showPerson = false;
        this.congressPersons = congressPersons;
        this.congressPersonIds = congressPersons[0].id;
        this.congressPerson = congressPersons[0].name;
        this.leaveReason = '';
      },
      show (data) {
        this.init();
        this.data = data;
        this.isShow = true;
        return new Promise((resolve, reject) => {
          this.resolve = resolve;
          this.reject = reject;
        });
      },
      // 关闭弹窗
      cancel () {
        this.isShow = false;
        this.reject('流程被中断');
      },
      submit () {
        // 表单校验
        if (!this.congressPersons.length) {
          dsf.layer.toast("请选择代会人员");
          return;
        }
        if (!this.leaveReason.length) {
          dsf.layer.toast("请填写请假理由");
          return;
        }
        let _loading = dsf.layer.loading();
        dsf.http.post("fn/mobilePDMeeting/attendMeeting", {
          attendance: -1,
          meetingtzId: this.data.meetingtzId,
          leaveReason: this.leaveReason,
          userName: this.congressPerson,
          userId: this.congressPersonIds,
          'x-auth-token': store.loadSessionStore("loginToken")
        }).done(res => {
          if (res.code === '200') {
            this.isShow = false;
            this.resolve(res)
          } else {
            dsf.layer.toast("请求异常");
          }
        }).error(() => {
          dsf.layer.toast("请求异常");
        }).always(() => {
          dsf.layer.closeLoading(_loading);
        });
      },
      getUserNames(data) {
        let names = [];
        let ids = [];
        let persons = data.map(v => {
          names.push(v.name);
          ids.push(v.attrs.idValue);
          return {
            id: v.attrs.idValue,
            pid: v.attrs.pidValue,
            name: v.name
          };
        });
        return {
          names: names.join(","),
          ids: ids.join(","),
          persons
        };
      },
      getSelectUser(data) {
        if (data.length > 0) {
          let { names, ids, persons } = this.getUserNames(data);
          this.congressPerson = names;
          this.congressPersonIds = ids;
          this.congressPersons = persons;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/styles/themes.scss";
  @import "../../assets/styles/mixin.scss";

  .ds-ask-leave-pop{
    display: flex;
    flex-direction: column;
    height: 90%;
    @include font_4();
    *{
      box-sizing: border-box;
    }
    .van-tabs__nav{
      padding: 0;
    }
    .van-tabs__line{
      bottom: 0;
    }
    .body {
      flex: auto;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
      border-top: 16px solid #f3f3f3;
      border-bottom: 16px solid #f3f3f3;
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
</style>
