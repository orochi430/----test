<template>
  <div class="inspector-feedback">
    <!-- <div class="_search">
      <router-link to="/search" class="search">
        <i class="iconfont iconsousuo i1"></i>
        <span>搜索</span>
      </router-link>
    </div> -->
    <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
      <van-list
        :finished="finished"
        :finished-text="data.length ? finishedTips : ''"
        v-model="loading"
        :offset="10"
        @load="onLoad"
      >
        <DsList
          :type="tab"
          :data="data"
          :columns="columns"
          @mainClick="handleActionClick"
          @commonClick="handleActionClick"
        >
          <template v-slot:item-extend="slotProps">
            <div class="progress-wrap">
              <!-- <van-progress
                :percentage="getPercent(slotProps)"
                :color="getColor(slotProps)"
                :show-pivot="false"
                stroke-width="10"
                class="_progress"
              />
              <span v-if="getPercent" class="process-text">{{ getPercent(slotProps) }} %</span> -->
            </div>
          </template>
        </DsList>
      </van-list>
    </van-pull-refresh>
    <!-- 选人 -->
    <van-popup :get-container="getContainer" :style="{ height: '90vh' }" v-model="showPerson" :close-on-click-overlay="false" lock-scroll position="bottom">
      <selectPerson v-if="showPerson" :type="0" @getSelectUser="getSelectUser" @cancePerson="cancePerson"></selectPerson>
    </van-popup>
    <van-popup :get-container="getContainer" v-model="showFlowSend" :close-on-click-overlay="false" lock-scroll style="height:90vh" position="bottom">
      <sendFile v-if="showFlowSend" ref="sendFile" :form-data="selected" @change="handleFlowSendChange" @close="closeSendFile" />
    </van-popup>
    <van-popup :get-container="getContainer" v-model="showFlowBack" :close-on-click-overlay="false" lock-scroll style="height:90vh" position="bottom">
      <work-flow-dialog v-if="showFlowBack" ref="wfDialog" :form-data="selected" @change="handleFlowBackChange" @close="showFlowBack = false" />
    </van-popup>
  </div>
</template>

<script>
import DsList from "@/components/documentCenter/DsList";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
import selectPerson from "@/components/selectPerson/DsfSelectPerson";
export default {
  name: "InspectorFeedback",
  components: {
    DsList,
    selectPerson
  },
  mixins: [ButtonActions],
  data() {
    return {
      finished: false,
      loading: false,
      isLoading: false,
      showPerson: false,
      selected: null,
      showFlowSend: false,
      showFlowBack: false,
      finishedTips: "",
      searchValue: "",
      listData: [
        {
          dataValue: {
            bt: "已按要求做好相关工作,请毅松、志强、联姘同志阅示",
            wj: "文件种类",
            zt: "进行中",
            bjrq: "5天",
            progress: "progressprogress",
            status: "going"
          },
          buttons: {
            commonButton: [
              {
                icon: "iconguanzhu",
                action: "gz",
                name: "关注"
              },
              {
                icon: "iconzhiding",
                action: "zd",
                name: "置顶"
              },
              {
                icon: "iconshijian",
                action: "yqcl",
                name: "延期处理"
              }
            ],
            mainButtons: [
              {
                action: "bj",
                name: "办结"
              },
              {
                action: "fk",
                name: "反馈"
              }
            ]
          }
        },
        {
          dataValue: {
            bt: "已按要求做好相关工作,请毅松、志强、联姘同志阅示",
            wj: "文件种类",
            zt: "进行中",
            bjrq: "5天",
            progress: "progressprogress",
            status: "finish"
          },
          buttons: {
            commonButton: [
              {
                icon: "iconguanzhu",
                action: "gz",
                name: "关注"
              },
              {
                icon: "iconzhiding",
                action: "zd",
                name: "置顶"
              },
              {
                icon: "iconshijian",
                action: "yqcl",
                name: "延期处理"
              }
            ],
            mainButtons: [
              {
                action: "bj",
                name: "办结"
              },
              {
                action: "fk",
                name: "反馈"
              }
            ]
          }
        }
      ],
      columns: [
        {
          showCategory: "mainTitle",
          showMetaColumn: "bt"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "wj",
          icon: "iconwenjianleixing"
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "zt",
          icon: "iconzhuangtai",
          color: ""
        },
        {
          showCategory: "subTitle",
          showMetaColumn: "bjrq",
          icon: "iconriqi",
          color: ""
        }
      ],
      colorStyle: ["#F66C6C", "#67C23B"],
      data: [],
      tab: 'db',

      start: 1
    };
  },
  mounted() {
    // this.fetchData();
  },
  activated() {
    this.showFlowSend = false;
  },
  methods: {
    handleFlowSendChange() {
      this.showFlowSend = false;
      this.onRefresh();
    },
    handleFlowBackChange() {
      this.showFlowBack = false;
      this.onRefresh();
    },
    getContainer() {
      return document.body;
    },
    getPercent({ item }) {
      const target = item.dataValue || {};
      const ytj = target.ytj ? parseInt(target.ytj) : 0;
      const wtj = target.wtj ? parseInt(target.wtj) : 0;
      return parseFloat((ytj / (ytj + wtj)).toFixed(2)) * 100 || 0;
    },
    getColor({ item }) {
      const target = item.dataValue || {};
      const bjrq = new Date(target.bjrq).getTime();
      const cd = new Date().getTime();
      return bjrq > cd ? "#F66C6C" : "#67C23B";
    },
    fetchData() {
      this.loading = true;
      dsf.http
        .post("fn/supervise/approval/getToOverseeList", {
          start: this.start,
          page: this.start,
          limit: 15,
          fileType: "ToOversee",
          showTotal: true
        })
        .then(({ status, data }) => {
          const { showColumn, datas = [], listButtons, total } = data;
          if (status === 200) {
            this.start += 1;
            this.data = [...this.data, ...datas];
            this.columns = showColumn || [];
            this.listButtons = listButtons || {};
            if (
              datas == null ||
              this.data.length === total ||
              datas.length === 0 ||
              datas.length < 15
            ) {
              // 加载结束
              this.finished = true;
            }
            if (datas.length < this.start) {
              if (datas == null || datas.length === 0) {
                if (this.start === 0) {
                  this.finishedTips = "暂无数据";
                } else {
                  this.finishedTips = "没有更多了";
                }
              } else {
                this.finishedTips = "没有更多了";
              }
            }
          } else {
            this.dsf.layer.toast(message);
            this.finished = true;
            this.finishedTips = message;
          }
        })
        .catch(({ message }) => {
          this.finished = true;
          this.dsf.layer.toast(message);
          this.finishedTips = message;
        })
        .finally(() => {
          this.loading = false;
          this.isLoading = false;
        });
    },
    // 按钮
    handleActionClick() {
      const action = arguments[0];
      const fn = this[`action-${action}`] || function () { };
      fn(...Array.prototype.slice.call(arguments, 1));
    },
    onLoad() {
      /**
       * 上拉加载
       */
      this.fetchData();
    },
    /**
     * 下拉刷新
     */
    onRefresh() {
      this.finished = false;
      this.loading = true;
      this.data = [];
      this.start = 1;
      this.fetchData();
    },
    // 取消选人
    cancePerson() {
      this.showPerson = false;
    },
    // 选人
    getSelectUser(data) {
      console.log("我的", data);
      if (data.length > 0) {
        const ids = data.map(item => item.id);
        let toast = {};
        if (this.isTransfer) {
          if (data.length > 1) {
            dsf.layer.toast("请选择一个人", true);
            return;
          }
          const type = this.getType();
          const user = dsf.util.loadSessionStore('user');
          const loading = dsf.layer.loading('取消中');
          const { dataValue } = this.selected;
          if (type === 1) {
            dsf.changeUser.flowChangeUser({
              param: {
                pk: dataValue.info_id,
                pId: dataValue.pid,
                pnId: dataValue.pnid,
                fromUserId: user.user_id,
                userId: ids.join(','),
                userName: data.map(it => it.name).join(','),
                deptId: data.map(it => it.pid).join(','),
                deptName: '',
              },
              thenFun: () => this.onRefresh && this.onRefresh(),
              finallyFun: () => dsf.layer.closeLoading(loading),
            });
          } else if (type === 3) {
            dsf.changeUser.superviseChangeUser({
              param: {
                pk: dataValue.info_id||dataValue.id,
                userId: ids.join(','),
              },
              thenFun: () => this.onRefresh && this.onRefresh(),
              finallyFun: () => dsf.layer.closeLoading(loading),
            });
          }
        } else if (this.isDing) {
          dsf.dd.Ding({
            users: ids, // 用户列表，工号
            type: 2, // 附件类型 1：image  2：link
            alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
            alertDate: { format: "yyyy-MM-dd HH:mm", value: "2020-05-13 20:00" },
            attachment: {
              images: [""]
            }, // 附件信息
            text: this.selected.dataValue.bt || this.selected.item.dataValue['B0001'], // 正文
            bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
            onSuccess: function () {
              this.dsf.layer.toast('操作成功');
            },
            onFail: function () {
              this.dsf.layer.toast('操作失败');
            }
          });
        } else {
          dsf.http
            .post("fn/newMobileMeeting/sendMeetingSq", {
              pk: this.selected.dataValue.info_id,
              userIds: ids,
              bt: this.selected.dataValue.bt
            })
            .then(res => {
              if (res.data.type == 'success') {
                dsf.layer.toast("操作成功", true);
              }
            })
            .catch(response => {
              toast = {
                msg: "操作异常",
                type: false
              };
            })
            .finally(res => {
              if (toast.msg) {
                dsf.layer.toast(toast.msg, toast.type);
              }
            });
        }
      }
    },
    closeSendFile() {
      this.showFlowSend = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
::v-deep.inspector-feedback {
  display: flex;
  flex-direction: column;
  ._search {
    height: 54px;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    ._input {
      width: 345px;
      height: 28px;
      background: #ecedee;
      border-radius: 13px;
      @include font_6(true);
      padding: 6px;
    }
    .iconsousuo {
      color: #999;
    }
  }
  ._progress {
    width: 227px;
  }
  .progress-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    @include font_5;
    ._progress {
      margin-right: 15px;
    }
  }
  ._search {
    width: 100%;
    padding: 15px;
    box-sizing: border-box;

    .search {
      height: 28px;
      width: 100%;
      display: block;
      background: #ecedee;
      border-radius: 7px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 5px;
      box-sizing: border-box;
      color: $fontColor_sub;
      @include font_6;

      .i1,
      .i2 {
        flex-basis: 20px;
      }

      span {
        display: block;
        flex-basis: calc(100% - 60px);
      }
    }
  }
}
</style>
