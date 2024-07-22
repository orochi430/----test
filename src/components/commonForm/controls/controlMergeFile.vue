<template>
  <div>
    <div class="relation-list" v-if="list.length">
      <div class="relation-type" v-for="row in list" :key="row.relaValue" :style="{ padding: `0` }">
        <template v-if="row.canShow">
          <div class="type-name" v-if="metaData && metaData.showLabel">
            <span :class="[`size-${dsf.config.commonForm.fontLevel ? dsf.config.commonForm.fontLevel : 3}`]">
              <span>{{ row.name }}</span>
            </span>
          </div>
          <div class="fileList" v-for="(item, index) in row.document" :key="item.info_id" @click="toDtail(item)">
            <div class="fileBody flex1">
              <div class="fileTitle flex ac">
                <img src="static/images/platform/relation.png" alt="" />
                <span class="ellipsis" style="flex: 1">{{ item.itemsContents }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <van-popup v-model="showForm" position="bottom" :style="{ height: '100%' }" get-container="#app">
      <van-nav-bar title="并文" @click-left="showForm = false">
        <template #left>
          <van-icon name="arrow-left" />
          <span>返回</span>
        </template>
      </van-nav-bar>
      <common-form v-if="showForm" :_moduleId="relaForm.moduleId" :_pk="relaForm.pk" :_params="relaForm.params || {}" :isPop="true"></common-form>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {
    commonForm: () => import("@/components/commonForm/commonForm")
  },
  props: ["formMeta", "metaData", "topformMeta"],
  data() {
    return {
      list: [],
      value: "",
      data: {},
      show: false,
      relaIds: [],
      relaForm: {},
      showForm: false
    }
  },
  beforeCreate() {
    // 组件之间循环引用
    this.$options.components.commonForm = require("@/components/commonForm/commonForm").default
  },
  created() {
    this.getList()
  },
  computed: {},
  methods: {
    getList() {
      dsf.http
        .get("/fn/mobile/bw/getBWList", {
          pk: this.formMeta.parameters.pk
        })
        .then(res => {
          this.list = res.data.rows
          if (this.list.length == 0) {
            this.metaData.show = 0
          }
        })
    },
    toDtail(obj) {
      this.showForm = true
      this.relaForm = {
        moduleId: obj.moduleId,
        pk: obj.info_id,
        params: {
          listId: 'MobileBW',
          method: 'view'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";
.announcementbox {
  width: 100%;
  height: 100%;
}
.fc {
  display: flex;
  flex-direction: column;
}
.flex1 {
  flex: 1;
}
.verticalScroll {
  overflow-y: scroll;
  overflow-x: hidden;
}

.delRelation {
  position: absolute;
  top: 5px;
  right: 5px;
  .iconfont {
    font-size: 26px;
  }
}
.relation-list {
  // padding: 0 0.2rem;
  background-color: #fff;
  .relation-type {
    border-bottom: 1px solid #e5e5e5;
    padding: 20px 10px;
    &:last-child {
      border-bottom: 0;
    }
    .type-name {
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 0.3rem;
      font-weight: bold;
      align-items: center;
      > span {
        line-height: 24px;
      }
      .fileIcon {
        @include font-theme("normal");
      }
    }
    .fileList {
      &:not(:last-child) {
        padding-bottom: 10px;
      }
      .fileTitle {
        font-size: var(--font_size_2);
        img {
          width: 30px;
          height: 30px;
          display: inline-block;
          margin-right: 5px;
        }
        .iconfont {
          color: #999999;
          font-size: var(--font_size_2);
        }
      }
      .fileModule {
        display: flex;
        color: #999;
        padding-top: 10px;
        .fileBtn {
          flex: 1;
        }
      }
    }
    .fileBtn {
      text-align: right;
      .fileButton {
        display: inline-block;
        // width:48px;
        margin: 0 0.04rem;
        text-align: center;
        border-radius: 0.48rem;
        border: 1px solid #e5e5e5;
        white-space: nowrap;
        padding: 0 0.2rem;
        font-size: var(--font_size_4);
        line-height: 0.42rem;
      }
    }
  }
}
.size-1 {
  font-size: var(--font_size_3);
  // font-weight: 500;
}

.size-2 {
  font-size: 0.3rem;
  // font-weight: 600;
}

.size-3 {
  font-size: var(--font_size_2);
  // font-weight: 700;
}

.size-4 {
  font-size: var(--font_size_1);
  // font-weight: 700;
}

.size-5 {
  font-size: 0.36rem;
  // font-weight: 700;
}
</style>
