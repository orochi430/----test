<template>
  <div>
  <div class="mould">
    <div class="_file_log">
      <van-tag v-for="(item, index) in tags" :key="index" class="_file_tags elps" size="medium" type="primary" @click="addContent(item)">
        {{ item.context }}
      </van-tag>
    </div>
    <div class="setting" @click="idealClick()">更多</div>
  </div>
  <van-popup v-model:show="showIdeal" position="bottom" round :style="{ height: '80%' }" get-container="#app">
    <div class="ideal" style="width: 100%; height: 100%">
      <van-nav-bar title="意见维护" :left-text="`共${this.tags.length}条`"></van-nav-bar>
      <draggable group="people" class="list-group" ghost-class="ghost" chosenClass="chosen" v-model="tags" animation="200" handle=".sort" @sort="onEnd">
        <div class="list-group-item" v-for="(item, index) in tags" :key="index" @click.stop="tagClick(item.context)">
          <span>{{ item.context }}</span>
          <van-icon v-if="!dsf.config.commonForm.hideSendOpinionOrder" name="sort" color="#666666" size="15" class="sort" />
          <van-icon name="close" size="20" @click.stop="clearTags(item)" />
        </div>
      </draggable>
      <div class="footer-btn">
        <input type="text" v-model="newValue" placeholder="请输入意见" />
        <van-button type="primary" @click="addTemplate">添加</van-button>
      </div>
    </div>
  </van-popup>
  </div>
</template>

<script>
// import draggable from "vuedraggable"
export default {
  components: {
    "draggable": () => import("vuedraggable"),
  },
  data() {
    return {
      tags: [],
      showIdeal: false,
      newValue: ''
    }
  },

  methods: {
    // 获取常见意见模板
    getAdvice() {
      dsf.http.get("fn/mobileUsedOpinion/find").then(res => {
        this.tags = res.data.rows
      })
    },
    onEnd() {
      console.log(this.tags)
      this.tags.forEach(ele => {
        this.ids += ele.id + ","
      })
      dsf.http
        .post("/fn/mobileUsedOpinion/moveIndex", {
          templateIds: this.ids
        })
        .then(() => {
          // this.getAdvice();
        })
    },
    tagClick(val) {
      this.metaData.extra.opinionContent += val
      this.showIdeal = !this.showIdeal
    },
    idealClick() {
      this.showIdeal = !this.showIdeal
    },
    clearTags(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否确认删除该常用意见"
        })
        .then(() => {
          dsf.http.get("fn/mobileUsedOpinion/delete?id=" + item.id).then(() => {
            this.getAdvice()
          })
        })
    },
    addContent(item) {
      this.metaData.extra.opinionContent += item.context
      // this.flowinfo[this.flowKey].opinionContent = item.context
      // this.$emit("controlEditOpinion", this.flowinfo)
    },
    addTemplate() {
      if (this.showIdeal) {
        if (this.tags.find(item => this.newTagValue == item.context)) {
          dsf.layer.toast("模板内容已重复")
          return
        }
      } else {
        if (this.tags.find(item => this.metaData.extra.opinionContent == item.context)) {
          dsf.layer.toast("模板内容已重复")
          return
        }
      }
      if (this.newTagValue != "" && this.newTagValue.trim().length > 0) {
        dsf.http
          .post("fn/mobileUsedOpinion/add", {
            __DATA: JSON.stringify({
              opinion: this.showIdeal ? this.newTagValue : this.metaData.extra.opinionContent
            })
          })
          .then(data => {
            dsf.layer.toast("设为模板成功")
            this.newTagValue = ""
            this.getAdvice()
          })
      } else {
        dsf.layer.toast("请输入内容")
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.mould {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
    align-items: flex-end;

    .show-more {
      @include font-theme("normal");
    }

    .ideal-span {
      margin-left: 5px;
      @include font-theme("normal");
    }

    .mould-button {
      margin-left: 10px;
      margin-right: 3px;
      font-size: var(--font_size_5);
      @include font-theme("normal");
      border: 1px solid;
      @include border-color-theme("normal", true);
      padding: 5px 6px;
      border-radius: 2px;
    }
    img {
      display: inline-block;
      width: 24px;
      height: 24px;
      margin-bottom: 10px;
    }
  }

  ::v-deep ._file_log {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    width: 100%;
    // min-height: 50px;
    max-height: 68px;
    overflow: hidden;
    padding-bottom: 0;

    .van-tag--medium {
      // font-size: var(--font_size_4);
      // @include font-theme("normal");
      // color: #fff;
      // @include font_6;
      // @include background-theme("normal");
    }
  }

  ._file_tags {
    display: inline-block;
    font-size: var(--font_size_4);
    margin-right: 8px;
    margin-bottom: 8px;
    padding: 5px 10px;
    border-radius: 3px;
    word-break: break-all;
    background-color: #f4f4f4;
    color: #333;
  }

  ._file_icon {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .iconfont {
      @include font-theme("normal");
      @include font_4;
      margin-right: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
  .setting {
    @include font-theme("normal");
    font-size: var(--font_size_4);
    margin: 10px 0;
    flex-shrink: 0;
    img {
      display: inline-block;
      width: 17px;
      height: 17px;
      vertical-align: sub;
    }
  }


.ideal {
  position: relative;
  overflow: hidden;

  .van-nav-bar {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 50px;
    border-bottom: 2px solid #f1f2f4;
  }
  .chosen{
    @include background-theme("normal", true);
    span{
      color: #fff;
    }
  }
  .list-group {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 50px;
    padding: 0 10px;
    width: 100%;
    overflow: auto;

    .list-group-item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 8px;
      height: 45px;
      border-bottom: 2px solid #f1f2f4;
      > span {
        margin-right: 5px;
        flex: 1;
        font-size: var(--font_size_3);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      i{
        width: 20px;
      }
      .van-icon-close{
        margin-left: 15px;
      }
    }
  }

  .footer-btn {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 50px;

    input {
      padding: 0 5px;
      width: calc(100% - 70px);

      height: 40px !important;
      border: 2px solid #f1f2f4 !important;

      &::-webkit-input-placeholder {
        color: #cfd0d2;
      }
    }

    .van-button {
      padding: 0 12px;
      height: 38px;
    }
  }

  .flip-list-move {
    -webkit-transition: -webkit-transform 0.5s;
    transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
    transition: transform 0.5s, -webkit-transform 0.5s;
  }

  .no-move {
    -webkit-transition: -webkit-transform 0s;
    transition: -webkit-transform 0s;
    transition: transform 0s;
    transition: transform 0s, -webkit-transform 0s;
  }

  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
}
</style>
