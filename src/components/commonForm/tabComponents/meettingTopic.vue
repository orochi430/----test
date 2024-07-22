<template>
  <div class="meettingTopic">
    <div class="lists" v-for="(item, index) in lists" :key="index">
      <div class="title" :class="{ active: item.show }" @click="toggle(index)">
        <span>议题{{ index + 1 }}：{{ item.title }}</span>
        <van-icon
          v-if="item.attach.length > 0"
          :class="{ active: item.show }"
          name="arrow"
        />
      </div>
      <div class="texts">
        <div class="inputs" v-if="item.ytkssj && item.ytjssj">
          <span>议题时间：</span>
          <p>
            <label for="">{{ item.ytkssj.substr(11) }}</label>
            &nbsp;-&nbsp;
            <label for="">{{ item.ytjssj.substr(11) }}</label>
          </p>
        </div>
        <div class="inputs" v-if="item.reporter">
          <span>汇报人员：</span>
          <p>{{ item.reporter }}</p>
        </div>
        <div class="inputs" v-if="item.cyldText">
          <span>参与领导：</span>
          <p>{{ item.cyldText }}</p>
        </div>
        <div class="inputs" v-if="item.cydwText">
          <span>参与单位：</span>
          <p>{{ item.cydwText }}</p>
        </div>
        <div class="inputs" v-if="item.attendDept">
          <span>参会部门：</span>
          <p>{{ item.attendDept }}</p>
        </div>
        <div class="inputs" v-if="item.ycnrValue">
          <span>议程内容：</span>
          <p>{{ item.ycnrValue }}</p>
        </div>
        <ol class="inputs2" :class="{ active: item.show }">
          <li v-for="(ele, i) in item.tag" :key="i">{{ ele }}</li>
        </ol>
        <!-- <div class="inputs">
          <span>议题标签：</span>
          <p>{{ item.tag }}</p>
        </div> -->
        <div
          class="inputs3"
          style="border: none"
          v-if="item.attach.length > 0"
          :class="{ active: item.show }"
        >
          <span>议题材料：</span>
        </div>
        <div class="files" :class="{ active: item.show }">
          <div v-for="obj in item.attach" :key="obj.id" @click="openFile(obj)">
            <span>
              <van-image
                :src="'../../../../static/images/fileType/' + obj.ext + '.png'"
              >
                <template v-slot:error>
                  <img
                    src="../../../../static/images/fileType/cloud.png"
                    alt=""
                    srcset=""
                  />
                </template>
              </van-image>
            </span>
            <p>{{ obj.fileName }}</p>
          </div>
        </div>
      </div>
    </div>
    <van-image-preview
      v-model="imgPreview"
      :images="previewImg"
      closeable
    ></van-image-preview>
    <van-popup
      v-model="showFile"
      :close-on-click-overlay="true"
      class="file-preview"
      lock-scroll
      position="bottom"
      style="height: 100vh"
      get-container="#app"
    >
      <!-- <van-nav-bar
        :title="filename"
        left-text="返回"
        left-arrow
        fixed
        placeholder
        @click-left="closeFile"
      >
      </van-nav-bar> -->
      <!-- <file :file-url="fileUrl" style="height: calc(100vh - 0.92rem)"></file> -->
      <van-nav-bar
        :title="filename"
        @click-left="closeFile()"
        @click-right="closeFile()"
      >
        <template v-if="appTopMenu" #left>
          <van-icon name="arrow-left" /><span>返回</span>
        </template>
        <template v-else #right>
          <span>关闭文件</span>
        </template>
      </van-nav-bar>
      <enclosure-preview
        :file="popFile"
        v-if="dsf.config.commonForm.LocalDocPreview"
        :is-preview="true"
        :is-show-cur-person="true"
      ></enclosure-preview>
      <iframe
        v-else
        id="filePreview"
        :src="fileUrl"
        :key="`${popFile.id}_${new Date()}`"
        frameborder="0"
      />
    </van-popup>
  </div>
</template>

<script>
import file from "@/components/common/file";
// import EnclosurePreview from "@/components/enclosure/EnclosurePreview";
export default {
  props: {
    formData: {
      type: Object,
      default: {},
    },
  },
  name: "meettingTopic",
  components: {
    file,
    'EnclosurePreview': () => import('@/components/enclosure/EnclosurePreview'),
  },
  data() {
    return {
      lists: [],
      imgType: [
        "jpeg",
        "bmp",
        "webp",
        "svgz",
        "svg",
        "gif",
        "jpg",
        "ico",
        "png",
        "tif",
      ],
      imgPreview: false,
      previewImg: [],
      showFile: false,
      filename: "",
      fileUrl: "",
      fileType: "",
      popFile: {},
      appTopMenu: dsf.config.appTopMenu.value,
      params: dsf.util.loadSessionStore("meetingTopicParams") || {},
    };
  },
  computed: {},
  watch: {},
  methods: {
    toggle(index) {
      this.$set(this.lists[index], "show", !this.lists[index].show);
    },
    initTopicData() {
      console.log(this.params);
      let params = { pk: this.formData.main["A0001"].value };
      params = Object.assign(params, this.params);
      dsf.http.post("/fn/meetingNotice/getTopic", params).then((res) => {
        console.log(res.data.data);
        if (res.data.code == 200 && res.data.data.length > 0) {
          res.data.data.forEach((item, index) => {
            if (index == 0) {
              item.show = true;
            } else {
              item.show = false;
            }
            if (item.attach && item.attach.length > 0) {
              item.attach.forEach((obj) => {
                obj.ext = "";
                obj.ext = obj.fileName
                  .substr(obj.fileName.lastIndexOf(".") + 1)
                  .toLowerCase();
              });
            }
            if (item.tag) {
              item.tag = item.tag.split(",");
              item.tag.push(item.reportTime + "min");
            }
            console.log(item.attach);
          });
          this.lists = res.data.data;
        }
      });
    },
    //打开附件
    openFile(item) {
      console.log(item);
      this.filename = item.fileName;
      this.fileType = item.fileName.substr(item.fileName.lastIndexOf(".") + 1);
      const loginToken = dsf.util.loadSessionStore("loginToken");
      let url = "";
      if (this.imgType.indexOf(this.fileType) > -1) {
        // 图片格式的预览地址
        url = dsf.url.getServerUrl(
          `fn/mobileFileDownload/download?fileId=${item.fileId}&moduleId=${this.moduleId}&fileName=${item.fileName}`
        );
        this.imgPreview = true;
        this.previewImg = [url];
      } else {
        url = dsf.url.getServerUrl(
          `fn/office/openMobileOffice?fileId=${item.fileId}&moduleId=${this.moduleId}&x-auth-token=${loginToken}`
        );
        if (dsf.config.previewSetting.previewType == 4) {
          dsf.http
            .post(`fn/office/mobile/wpsPreview`, {
              fileId: item.fileId,
              readOnly: item.canEdit > 0 ? true : false,
            })
            .then(({ data }) => {
              this.showFile = true;
              this.fileUrl = data.data;
            });
        } else if (dsf.config.commonForm.webViewPreview) {
          let tempurl =
            dsf.config.serverUrl + dsf.config.webRoot + url.replace("../", "");
          console.log(tempurl);
          xsfWindow.openWebView({
            title: item.fileName,
            url: tempurl,
            colorString: "#111111",
          });
        } else {
          this.showFile = true;
          this.fileUrl = url;
          this.popFile = {
            id: item.fileId,
            name: item.filename,
            infoId: item.infoId,
            moduleId: item.moduleId,
            flowId: item.flowId,
            nodeId: item.nodeId,
          };
        }
      }
    },
    closeFile() {
      this.showFile = false;
    },
  },
  created() {},
  mounted() {
    this.initTopicData();
  },
  destroyed() {},
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/themes.scss";
@import "../../../assets/styles/mixin.scss";

.meettingTopic {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 10px;

  .lists {
    width: 100%;
    height: auto;
    background: #fff;
    box-sizing: border-box;
    padding: 15px 15px 5px;
    border-radius: 5px;
    margin-bottom: 10px;

    .title {
      margin-bottom: 10px;
      width: 100%;
      height: 52px;
      display: flex;
      align-items: center;
      font-size: var(--font_size_2);
      color: #333;
      font-weight: bold;
      border: none;
      border-bottom: 1px solid #ebebeb;

      //   &::before {
      //     width: 4px;
      //     height: 20px;
      //     @include background-theme("normal");
      //     content: "";
      //     margin-right: 10px;
      //   }

      & > span {
        flex: 1;
      }

      .van-icon {
        flex-shrink: 0;
        font-size: var(--font_size_0);
        color: #999;
        transition: all linear 0.2s;
        transform: rotate(270deg);
        &.active {
          transform: rotate(90deg);
          transition: all linear 0.2s;
        }
      }
    }

    .texts {
      width: 100%;
      height: auto;
      box-sizing: border-box;
      //   padding-left: 14px;

      .inputs {
        margin: 5px 0;
        width: 100%;
        min-height: 21px;
        display: flex;
        align-items: start;
        // border-bottom: 1px solid #ebebeb;

        span {
          width: 80px;
          height: 100%;
          font-size: var(--font_size_3);
          color: #333;
        }

        p {
          flex: 1;
          display: flex;
          align-items: start;
          justify-content: start;
          height: 100% !important;
          font-size: var(--font_size_3);
          color: #666;
        }
        label {
          padding-top: 2px;
          font-size: var(--font_size_3);
          color: #666;
        }

        // &:last-child {
        //   border: none;
        // }
      }
      .inputs2 {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin-top: 10px;
        padding-bottom: 5px;
        &.active {
          border-bottom: 1px solid #ebebeb;
        }
        li {
          margin-bottom: 10px;
          margin-right: 8px;
          padding: 0 8px;
          height: 24px;
          line-height: 24px;
          text-align: center;
          @include font-theme("normal");
          border: 1px solid;
          @include border-color-theme("normal", true);
          border-radius: 14px;
        }
      }
      .inputs3 {
        margin: 15px 0 10px;
        display: none;
        &.active {
          display: block;
          transition: all linear 0.8s;
        }
        span {
          font-size: var(--font_size_2);
          color: #333;
          font-weight: bold;
        }
      }

      .files {
        width: 100%;
        height: auto;
        margin: 15px 0 20px;
        display: none;
        &.active {
          display: block;
          transition: all linear 0.8s;
        }
        & > div {
          width: 100%;
          min-height: 30px;
          display: flex;
          box-sizing: border-box;
          padding-left: 10px;

          & > span {
            width: 14px;
            height: auto;
            flex-shrink: 0;
            margin-right: 10px;
            margin-top: 5px;

            .van-image {
              width: 14px;
              height: 17px;
            }
          }

          & > p {
            margin-top: 2px;
            font-size: var(--font_size_2);
            @include font-theme("normal");
          }
        }
      }
    }
  }
}
.van-nav-bar {
  @include font-theme("normal");

  .van-icon {
    @include font-theme("normal");
    @include font_5;
    margin-right: 3px;
  }

  .van-nav-bar__title {
    font-weight: bold;
  }
}
</style>
