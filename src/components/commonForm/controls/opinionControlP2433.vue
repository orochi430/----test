<template>
  <div class="opinionControl">
    <div class="inbox">
      <div
        class="footbtn"
        v-if="metaData.extra.showNodeId.includes(formMeta.parameters.nodeId)"
      >
        <span @click="goList">批量维护</span>
        <span @click="goFrom">维护</span>
      </div>
    </div>
    <van-popup
      v-model="show"
      get-container="#app"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <van-sticky v-if="commonPopParam.title">
        <header>
          <van-nav-bar
            :title="commonPopParam.title"
            @click-left="show = false"
            style="z-index: 9"
          >
            <template #left>
              <van-icon name="arrow-left" />
            </template>
          </van-nav-bar>
        </header>
      </van-sticky>
      <default-list
        :key="refreshListKey"
        :params="commonPopParam"
      ></default-list>
    </van-popup>
  </div>
</template>

<script>
import util from "../../../common/util";
import DefaultList from "@/components/documentCenter/DefaultList";
export default {
  props: ["metaData", "formMeta"],
  components: {
    DefaultList,
  },
  data() {
    return {
      opinionNodeName: "",
      opinionNodeNameCondition: "",
      show: false,
      refreshListKey: Math.random(),
      commonPopParam: {
        listId: "231204144747uQcstWFNRUu8AGKK6ml",
        moduleId: "190812173618iFCoPPLoNcCkftTOTHQ",
        name: "意见维护",
        title: "意见维护",
        params: {
          customInfoId: this.formMeta.parameters.pk,
          customPid: this.formMeta.parameters.pId,
          customFlowId: this.formMeta.parameters.flowId,
          opinionNodeId: this.metaData.extra.opinionNodeId,
          opinionNodeName: "",
          // opinionNodeNameCondition: "",
        },
      },
    };
  },
  computed: {},
  beforeCreate() {
    // this.$options.components.defaultList = require("../../documentcenter/defaultlist.vue").default;
  },
  mounted() {
    this.getNodeName();
  },
  methods: {
    getNodeName() {
      let idArr = this.metaData.extra.opinionNodeId.split(",");
      if (idArr.length > 0) {
        idArr.forEach((id) => {
          dsf.http
            .post("/ctrl/opinionControlP2433/getInfo", {
              flowId: this.metaData.extra.flowId,
              opinionNodeId: id,
            })
            .then((res) => {
              // console.log(res);
              if (res.data.code == 200) {
                this.commonPopParam.params.opinionNodeName +=
                  this.commonPopParam.params.opinionNodeName.length == 0
                    ? res.data.data.opinionNodeName
                    : "," + res.data.data.opinionNodeName;
                // this.commonPopParam.params.opinionNodeNameCondition +=
                //   this.commonPopParam.params.opinionNodeNameCondition.length ==
                //   0
                //     ? res.data.data.opinionNodeNameCondition
                //     : "," + res.data.data.opinionNodeNameCondition;
              }
            });
        });
      }
    },
    goFrom() {
      this.$router.push({
        path: `/commonForm/190812173618iFCoPPLoNcCkftTOTHQ`,
        query: {
          customXForm: "231214135820jHjKGpzR7KjN02vKuF1",
          customInfoId: this.formMeta.parameters.pk,
          customPid: this.formMeta.parameters.pId,
          customFlowId: this.formMeta.parameters.flowId,
          opinionNodeId: this.metaData.extra.opinionNodeId,
          opinionNodeName: this.commonPopParam.params.opinionNodeName,
          leaderOpinion: this.metaData.extra.leaderOpinion,
        },
      });
    },
    goList() {
      // this.show = true;
      // this.refreshListKey = Math.random(); // 刷新列表组件
      util.saveToSessionStore("OpinionMaintenance", {
        customXForm: "231214135820jHjKGpzR7KjN02vKuF1",
        customInfoId: this.formMeta.parameters.pk,
        customPid: this.formMeta.parameters.pId,
        customFlowId: this.formMeta.parameters.flowId,
        opinionNodeId: this.metaData.extra.opinionNodeId,
        opinionNodeName: this.opinionNodeName,
        leaderOpinion: this.metaData.extra.leaderOpinion,
      });
      this.$bus.emit("saveFormBus", {
          metaData: this.metaData,
          callback: () => {
            this.$router.push({
              path: '/commonList/231204144747uQcstWFNRUu8AGKK6ml/190812173618iFCoPPLoNcCkftTOTHQ',
              query: {
                title: '意见维护',
                secQuery: JSON.stringify(this.commonPopParam.params)
              }
            })
          },
          isTemp: true
      });

    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.opinionControl {
  .inbox {
    > div {
      padding-bottom: 8px;
    }

    > div:nth-child(n + 2) {
      border-top: 1px solid #eaeaea;
    }

    .title {
      font-size: var(--font_size_2);
      padding: 6px 0;
    }

    .content {
      font-size: var(--font_size_0);
      font-weight: 600;
      text-indent: 1em;
      padding-bottom: 12px;
    }

    .time {
      font-size: var(--font_size_2);
      text-align: right;
    }

    .footbtn {
      padding-bottom: 0;
      text-align: right;

      span {
        padding: 0 10px;
        @include font-theme("normal");
      }
    }
  }
}
</style>
