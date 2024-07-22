<template>
  <div class="ds-enclosure-button">
    <!--悬浮按钮-->
    <div class="__e_button" @click="showBox">
      <i class="iconfont iconqiehuanfujian"></i> 附件
    </div>
    <transition name="__e_box">
      <div v-show="isShow" class="__e_box" @click="closeBox">
        <div ref="main" class="__e_box_main" @scroll="scrollEvent" @click.stop="emptyEvent">
          <!--请求异常时-->
          <div v-if="isError && !list.length" class="__file_empty">
            <commonempty image="network" description="请求异常" />
          </div>
          <!--列表为空时-->
          <div v-show="!list.length && isLast" class="__file_empty">
            <commonempty description="暂无附件" />
          </div>
          <!--列表不为空-->
          <div class="__file_list">
            <enclosure-item
              v-for="item in list"
              :key="item.id"
              :name="item.title"
              :size="item.size"
              :url="item.url"
              @open="openFile"
            />
          </div>
          <!--加载动画-->
          <div v-show="loading && !isLast" class="__list_loading">
            <van-loading type="spinner" size="24px" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import EnclosureItem from "./EnclosureItem";

export default {
  name: "EnclosureButton",
  components: {
    EnclosureItem
  },
  props: ['fileData'],
  data() {
    return {
      dataValue:{info_id:'',moduleId:''},
      isShow: false,
      overflow: document.body.style.overflow,
      typeConfig: {
        img: "iconpicture",
        text: "iconfile"
      },
      // 请求加载
      loading: false,
      // 是否最后一页
      isLast: false,
      // 请求异常
      isError: false,
      // 请求参数
      params: {
        info_id: '', // 文件id
        infoId: '', // 文件id
        moduleId:'', // 模块id
        nodeId: "", // 流程节点id
        start: 0, // 开始页码
        limit: 10 // 每页条数
      },
      list: [
        // {
        //   id: 0,
        //   title: '梦创虚拟化服务器采购方案梦创虚拟化服务器采购方案.docx',
        //   size: '16.19KB',
        //   url: ''
        // }
        // {
        //   attachType: "1",
        //   document: [
        //     {
        //       infoId: "2004291650365M718g2mYEOduFc3lPb",
        //       canEdit: "1",
        //       canDownLoad: "1",
        //       type: 1,
        //       title: "移动端文件交换需求20200325.docx",
        //       url: "upload/180505162656YILYYOzw1FnE5OzzNxm/2020/5/2005111452571gOVHKyj8FDwvOs6MD4.docx",
        //       isPublicText: "",
        //       isNoModify: "1",
        //       isPublic: "",
        //       isRevise: "1",
        //       canDelete: "1",
        //       id: "2005111452571gOVHKyj8FDwvOs6MD4",
        //       moduleId: "191214123034InZmzpeRpnm7wMqlAsc"
        //     }
        //   ],
        //   name: "附件",
        //   canShow: "1",
        //   showOrder: "0"
        // }
      ]
    };
  },
  watch: {
    isShow(to) {
      if (to) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = this.overflow;
      }
    }
  },
   mounted() {
    let dataValue = {};
    if (this.$route.params.formData) {
      dataValue = this.$route.params.formData.dataValue;
    } else {
      dataValue=this.fileData;
    }

    let isMaster = dataValue.masterId == "200517191343bubbMI4Pg5IyFs0BvPV";
    this.params.info_id = this.params.infoId = isMaster
      ? dataValue.masterId
      : dataValue.info_id ||
        dataValue.fid ||
        dataValue.id ||
        dataValue["A0001"]|| dataValue["SW_XZD.A0001"];
    this.params.moduleId = isMaster
      ? dataValue.masterModuleId
      : dataValue.moduleId || dataValue["A0004"] || dataValue["SW_XZD.A0004"];
    this.postData();
  },
  destroyed() {
    document.body.style.overflow = this.overflow;
  },
  methods: {
    emptyEvent() {
      // 空事件
    },
    showBox() {
      this.isShow = true;
    },
    closeBox() {
      this.isShow = false;
    },
    openFile(url) {
      //debugger
      // 预览文件
      this.$emit("open-file", url);
      this.isShow = false;
    },
    scrollEvent(e) {
      const el = e.target;
      const oh = el.offsetHeight;
      const sh = el.scrollHeight;
      const st = el.scrollTop;
      if (st === 0) {
        console.log("到顶了");
      } else if (st + oh + 100 > sh) {
        this.postData();
      }
    },
    // 数据请求
    postData() {
      if (this.loading || this.isLast) {
        return;
      }
      //debugger
      this.loading = true;
      dsf.http
        .post("fn/mobileAttachment/getFormAttachment", {
          ...this.params,
          start: this.params.start + 1
        })
        .done(res => {
          this.postDataSuccess(res);
        })
        .error(res => {
          this.isError = true;
          this.dsf.layer.toast("请求异常");
        })
        .always(() => {
          this.loading = false;
        });
    },
    postDataSuccess({ rows }) {
      // 判断是否最后一页
      if (!rows.length) {
        this.isLast = true;
        return;
      }
      if (rows.length < this.params.limit) {
        this.isLast = true;
      }
      // 页数加1
      this.$set(this.params, "start", this.params.start + 1);
      // 处理数据
      var timestamp=new Date().getTime()
      rows.map(
        ({ document }) =>
          document &&
          document.forEach(({ id, infoId, title, type, moduleId, size }) => {
            let loginToken = dsf.util.loadSessionStore("loginToken");
            this.list.push({
              id,
              title,
              size: size || "",
              url: dsf.url.getServerUrl(
                `fn/file/download?infoId=${infoId}&fileId=${id}&fileName=${title}&nrType=${type}&moduleId=${moduleId}&x-auth-token=${loginToken}&fullfilename=${timestamp}${title}`
              )
            });
          })
      );
      this.$emit("fileList", this.list);
      if (this.params.start === 1 && this.list.length > 0) {
        this.$emit("open-file", this.list[0].url);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "../../assets/font/font.css";

@import "../../assets/styles/themes.scss";

@import "../../assets/styles/mixin.scss";

// 附件-悬浮按钮
.ds-enclosure-button {
  margin: 0 !important;
  padding: 0 !important;
  height: 0 !important;
  width: 0 !important;
  @include font_4();
  position: relative;
  z-index: 10000;
  * {
    box-sizing: border-box;
  }
  .__e_ {
    &button {
      display: block;
      width: 80px;
      height: 34px;
      color: #fff;
      text-align: center;
      line-height: 34px;
      border-radius: 50px;
      @include background-theme("normal");
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.29);
      position: fixed;
      bottom: 95px;
      right: 14px;
      z-index: 1;
      &::before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: #000;
        border-radius: inherit;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        opacity: 0;
      }
      &:active::before {
        opacity: 0.1;
      }
    }
    &box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.4);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      touch-action: none;
      &_main {
        display: flex;
        flex-direction: column;
        width: 90%;
        max-width: 500px;
        min-height: 280px;
        max-height: 370px;
        background-color: #fff;
        border-radius: 5px;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        position: relative;
        z-index: 3;
      }
      &-enter-active {
        transition: opacity 0.3s ease;
        .__e_box_main {
          transition: transform 0.3s ease;
          transform: translate3d(0, 0, 0);
        }
      }
      &-leave-active {
        transition: opacity 0.3s ease;
        .__e_box_main {
          transition: transform 0.3s ease;
          transform: translate3d(0, 0, 0);
        }
      }
      &-enter,
      &-leave-to {
        opacity: 0;
        .__e_box_main {
          transform: translate3d(0, 20px, 0);
        }
      }
    }
  }
  .__file_ {
    &empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #aaa;
    }
    &list {
      padding: 12px 0;
      display: flex;
      flex-direction: column;
    }
  }
  .__list_loading {
    text-align: center;
  }
}
</style>
