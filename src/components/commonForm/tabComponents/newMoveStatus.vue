<template>
  <div class="container">
    <div class="tabs">
      <div class="left">
        <span :class="{ active: showAll }" @click="showAll = true">全部</span>
        <span :class="{ active: !showAll }" @click="showAll = false">与我相关</span>
      </div>
      <div class="right">
        <span class="tag" @click="showFlowMonitor">流转监控</span>
        <span class="tag" @click="showFlowChart">流程图</span>
      </div>
    </div>
    <div class="list-wrap">
      <div v-for="item in list" class="list-item" v-show="showAll || item.userName == myInfo.name || (item.receivers && item.receivers.find(it => it.userName == myInfo.name))">
        <div class="flex ac top" v-if="item.userName || item.deptName">
          <!-- <img src="" alt="" /> -->
          <div class="avatar" :style="{ backgroundColor: item.sex == 2 ? '#EE7DB7' : '#0087ED' }">{{ item.userName | filterName }}</div>
          <div>
            <p style="color: var(--normal)">{{ item.userName }}</p>
            <p class="gray-font">{{ item.deptName }}</p>
          </div>
        </div>
        <div class="content" @click="handleClick" v-html="item.content"></div>
        <div class="content" v-if="item.hasHandWriteImg && item.hasHandWrite">
          <img style="width: 150px;" :src="dsf.url.getWebPath(item.hasHandWriteImg)" alt="">
        </div>
        <div class="gray-font" v-show="item.eDate || item.nodeName">{{ item.eDate }} [{{ item.nodeName }}]</div>
        <div class="gray-font" v-show="item.receivers">接收人：{{ item.receivers | receivers }}</div>
        <!-- <van-button class="cuiban" v-if="item.status >= 0" type="warning" size="small" @click="cuiban">催办</van-button> -->
      </div>
    </div>
    <round-popup :show.sync="isShowFlowMonitor" title="流转监控" :isRound="false" :containerStyle="{ backgroundColor: '#f8f8f8' }" style="height: 100vh">
      <template #container>
        <div class="monitor-container">
          <div class="tabs">
            <div v-for="tab in monitorTabs" :class="['tab', { tabActive: tab.active }]" @click="clickMonitorTab(tab)">
              <div :style="{ color: tab.color }" class="num">{{ tab.num }}</div>
              <div>{{ tab.title }}</div>
            </div>
          </div>
          <div v-if="monitorLoading">
            <van-loading size="24px">加载中...</van-loading>
          </div>
          <div v-else class="group-wrap">
            <template v-if="nodeGroups.length">
              <div v-for="nodeGroup in nodeGroups" class="group">
                <div class="group-name">{{ nodeGroup.node }}({{ nodeGroup.num }})</div>
                <div v-for="item in nodeGroup.list" class="group-item">
                  <div class="avatar" :style="{ backgroundColor: item.sex == 2 ? '#EE7DB7' : '#0087ED' }">{{ item.showName | filterName }}</div>
                  <div>
                    <div class="item-name">
                      {{ item.showDeptName }}({{ item.showName }})
                      <span v-show="item.pDate" class="tag">已查看</span>
                    </div>
                    <div>接收时间： {{ item.rDate }}</div>
                    <div>操作时间： {{ item.eDate }}</div>
                    <div v-show="item.handleTime">耗时： {{ item.handleTime }}</div>
                  </div>
                </div>
              </div>
            </template>
            <commonempty v-else description="暂无数据" />
          </div>
        </div>
      </template>
    </round-popup>
    <round-popup :show.sync="isShowFlowChart" title="流程图" :isRound="false" :containerStyle="{ padding: '0' }" style="height: 100vh">
      <template #container>
        <iframe v-if="flowChartUrl" :src="flowChartUrl" frameborder="0" style="width: 100%; height: 100%"></iframe>
        <commonempty v-else description="暂无流程信息" />
      </template>
    </round-popup>
  </div>
</template>

<script>
import roundPopup from "@/components/commonComponents/roundPopup.vue"
const groupBy = require("lodash/groupBy.js") //以后lodash函数按需引入,减少打包体积
import Clipboard from 'clipboard'

export default {
  props: ["formData", "formMeta"],
  components: { roundPopup },
  filters: {
    filterName(name) {
      return name.slice(name.length - 2)
    },
    receivers(arr) {
      if (arr) {
        return arr.map(item => item.userName).join(",")
      } else {
        return ""
      }
    }
  },
  data() {
    return {
      showAll: true,
      list: [],
      myInfo: dsf.util.loadSessionStore("user"),
      isShowFlowMonitor: false,
      isShowFlowChart: false,
      flowChartUrl: "",
      monitorLoading: true,
      nodeGroups: [],
      monitorTabs: [
        {
          num: 0,
          title: "总人数",
          active: true,
          color: "#0091FF",
          searchDataStatus: ""
        },
        {
          num: 0,
          title: "已提交",
          active: false,
          color: "#00D046",
          searchDataStatus: 1
        },
        {
          num: 0,
          title: "未提交",
          active: false,
          color: "#9500FF",
          searchDataStatus: 2
        },
        {
          num: 0,
          title: "已查看",
          active: false,
          color: "#00C1FF",
          searchDataStatus: 3
        },
        {
          num: 0,
          title: "未查看",
          active: false,
          color: "#F13838",
          searchDataStatus: 4
        }
      ],
      btnCopy:null
    }
  },
  created() {
    this.getFlow()
  },
  methods: {
    cuiban(){

    },
    handleClick(event) {
      // 判断点击的元素是否为按钮
      if (event.target.classList.contains('copyel')) {
        let text = $(event.target).attr("data-text")
        let id = $(event.target).attr("id")
        const clipboard = new Clipboard("."+id, {
          text: () => text
        });

        clipboard.on('success', (e) => {
          dsf.layer.toast('复制成功');
        });

        clipboard.on('error', (e) => {
          dsf.layer.toast('复制失败');
        });

        clipboard.onClick(event);

      }
    },
    getFlow() {
      dsf.flow.getWorkFlowNodes({
        param: {
          infoId: this.formMeta.parameters.pk,
          sort: 'eDate',
          order: 'desc',
        },
        thenFun: (res, data) => {
          this.list = data.passedNodes || []
          this.list.forEach((item, index)=>{
            if(item.content && dsf.config.commonFlow.showCopyOpinionBtn){
              this.$set(item,"content", item.content + `<a class='copyel copyel_${index}' id='copyel_${index}'  data-text='${item.content}'">复制意见</a>`)
            }
          })

        }
      })
    },
    showFlowMonitor() {
      this.isShowFlowMonitor = true
      this.getMonitorTabsNum()
      this.getMonitorList()
    },
    getMonitorTabsNum() {
      this.monitorLoading = true
      dsf.http
        .post("fn/flowinfo/showPnodesStatus", {
          sourceType: 16,
          infoId: this.formMeta.parameters.pk
        })
        .then(res => {
          this.monitorLoading = false
          this.monitorTabs.forEach((tab, index) => {
            tab.num = res.data[`total${index}`]
          })
        })
    },
    getMonitorList(searchDataStatus) {
      dsf.http
        .post("fn/flowinfo/showPnodes", {
          sourceType: 16,
          noOptionList: 1,
          infoId: this.formMeta.parameters.pk,
          page: 1,
          limit: 999,
          searchDataStatus: searchDataStatus || ""
        })
        .then(res => {
          let data = res.data.data.map(item => {
            item.showName = item.nodeType == 2 ? item.sender : (item.actName && item.mUName ? item.mUName : item.uName)
            item.showDeptName = item.nodeType == 2 ? ( item.fOrgNameLv3 || item.fOrgNameLv2 || item.fOrgNameLv1 ) : (item.orgNameLv5 || item.orgNameLv4 || item.orgNameLv3 || item.orgNameLv2 || item.orgNameLv1 )
            item.sex = item.nodeType == 2 ? res.data.data.find(user => user.id == item.fId)?.sex : item.sex
            return item
          })
          let arr = groupBy(data.reverse(), function (val) {
            return val.wfNodeCaption
          })
          this.nodeGroups = Object.keys(arr).map(item => {
            return {
              node: item,
              num: arr[item].length,
              list: arr[item]
            }
          })
        })
    },
    clickMonitorTab(tab) {
      this.monitorTabs.forEach(item => (item.active = false))
      tab.active = true
      this.getMonitorList(tab.searchDataStatus)
    },
    showFlowChart() {
      // if (!this.formData.main["A0006"]?.value || !this.formData.main["A0007"]?.value) {
      //   dsf.layer.toast('暂无流程信息')
      //   return
      // }
      dsf.http
        .post("fn/flow/getShowFlow", {
          flowId: this.formData.main["A0006"]?.value || "",
          tpId: this.formData.main["A0007"]?.value || "",
          pk: this.formMeta.parameters.pk,
          moduleId: this.formMeta.parameters.moduleId,
        })
        .then(res => {
          if (res.data.data) {
            let data = res.data.data
            let url = data.flowUrl + "/admin_client/workflow/views/flow_index_workinfo_mobile.html?id=" + data.flowId + "&tpid=" +this.formData.main["A0007"]?.value + "&mtpid=" +this.formData.main["A0007"]?.value + "&sAPPName=" + data.appName
                    + "&sAPPID=" + data.appId + "&sUnitID=" + data.unitId + "&sModuleID=&sName=" + encodeURIComponent(data.flowName)
            if(data.showStages){
                url += "&showStages=" + data.showStages ;
            }
            if(data.startPnId){
                url += "&startPnId=" + data.startPnId ;
            }
            this.flowChartUrl = url
            if (dsf.util.getClientName() == 'browser') {
              this.isShowFlowChart = true
            } else {
              dsf.util.openWebviewToUrl({url: this.flowChartUrl, title: '流程图'})
            }
          }
        })

    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.08);
  border-radius: 3px;


  .tabs {
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 8px;
    .left {
      span {
        font-size: var(--font_size_2);
        padding: 0 8px;
      }
      .active {
        color: var(--normal);
      }
    }
    .right {
      .tag {
        font-size: var(--font_size_4);
        padding: 4px;
        border: 1px solid var(--normal);
        border-radius: 2px;
        color: var(--normal);
      }
    }
  }
  .list-wrap {
    flex: 1;
    overflow: auto;
    .list-item {
      position: relative;
      padding-top: 15px;
      .cuiban{
        height: 25px;
        position: absolute;
        right: 0;
        top: 15px;
      }
      &:not(:last-child) {
        border-bottom: 1px dashed #999999;
        padding-bottom: 15px;
      }
      .top {
        font-size: 15px;
      }
      .content {
        padding: 7px 0 10px;
        color: #333;

        /deep/ a{
          text-decoration: underline;
          margin-left: 10px;
          color: var(--normal);
        }
      }
      .gray-font {
        color: #666;
      }
    }
  }
  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-right: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
  }
}
.monitor-container {
  background-color: #fff;
  border-radius: 3px;
  padding: 10px;
  height: 100%;
  display: flex;
  flex-direction: column;
  .tabs {
    padding: 0;
    .tab {
      flex: 1;
      text-align: center;
      padding-bottom: 10px;
      .num {
        font-size: 22px;
        line-height: 1.5;
        font-weight: 700;
      }
    }
    .tabActive {
      border-bottom: 2px solid var(--normal);
    }
  }
  .group-wrap {
    flex: 1;
    overflow: auto;
    font-size: var(--font_size_2);
    line-height: 1.2;
    .group {
      &-name {
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
      }
      &-item {
        padding: 10px 0;
        border-bottom: 1px solid #ccc;
        display: flex;
        color: #666;
        .item-name {
          color: var(--normal);
          padding: 7px 0;
          .tag {
            border: 1px solid #2abdc2;
            border-radius: 2px;
            color: #2abdc2;
            padding: 4px 8px;
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>
