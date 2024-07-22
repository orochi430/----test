<template>
  <div class="contaniner">
    <div v-if="errored" class="init-div">
      您进行了未授权的访问,请重新登录！
    </div>
    <div class="declare">
      <van-form @submit="onSubmit" @failed="onFailed">
        <van-cell-group>
          <van-cell v-if="!readonly">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="title">
                <span class="bar"></span>
                <span class="txt">填写防疫申报表单</span>
              </div>
            </template>
          </van-cell>
          <van-cell title="姓名" :value="userNmae"></van-cell>
          <van-cell
            :is-link="!readonly"
            @click="showPersonType = true"
            :value="
              readonly
                ? personTypeText
                : personTypeText
                ? personTypeText
                : '请选择'
            "
            :rules="[{ required: true, message: '请选择用户类型' }]"
            center
          >
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span v-if="!readonly" class="asterisk">*</span>人员类型
            </template>
          </van-cell>
          <van-action-sheet
            v-if="!readonly"
            v-model="showPersonType"
            :actions="personTypes"
            @select="onPersonTypeSelect"
          />
          <van-field
            v-model="temperature"
            type="number"
            placeholder="请输入体温"
            input-align="right"
            :readonly="readonly"
            :rules="[{ validator: tempValidator, message: '请输入正确的体温' }]"
            center
          >
            <template #label>
              <span v-if="!readonly" class="asterisk">*</span>体温（℃）
            </template></van-field
          >
          <div v-if="readonly">
            <van-cell
              v-for="(item, idx) in controls"
              :key="idx"
              :title="item.columnName"
              :value="item.type == 1 ? item.value : item.text"
            >
            </van-cell>
          </div>
          <div v-else>
            <van-field
              v-for="(item, idx) in controls"
              :key="idx"
              v-model="item.value"
              input-align="right"
              placeholder="请填写内容"
            >
              <template #label>
                <span v-if="!readonly" class="asterisk">*</span
                >{{ item.columnName }}
              </template>
              <template v-if="!readonly && item.type == 2" #input>
                <van-radio-group v-model="item.value" direction="horizontal">
                  <van-radio name="1">是</van-radio>
                  <van-radio name="0">否</van-radio>
                </van-radio-group>
              </template>
            </van-field>
          </div>
          <van-cell>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div>特别情况记录：</div>
              <div v-if="readonly" class="textarea">{{ specialRecord }}</div>
              <van-field
                v-else
                class="textarea"
                v-model="specialRecord"
                rows="1"
                autosize
                type="textarea"
                maxlength="100"
                placeholder="请输入备注"
                show-word-limit
                :readonly="readonly"
              />
            </template>
          </van-cell>
          <van-cell>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="upload_msg">
                <span v-if="!readonly" class="asterisk">*</span
                >健康码、行程码、核酸检测的截图：
              </div>
              <van-image
                v-if="readonly"
                width="1.6rem"
                height="1.6rem"
                fit="contain"
                :src="imgHealthUrl"
                @click="showImgPreview(imgHealthUrl)"
              />
              <van-uploader
                v-else
                :after-read="afterReadHealth"
                v-model="imgHealth"
                :max-count="1"
              >
                <div class="imgbox">
                  <van-image
                    width="28"
                    height="24"
                    src="static/images/shandongyancao/conference/camera.png"
                  />
                  <div>健康码</div>
                </div>
                <template #preview-cover="{ file }">
                  <div class="preview-cover van-ellipsis">健康码</div>
                </template>
              </van-uploader>
              <van-image
                v-if="readonly"
                width="1.6rem"
                height="1.6rem"
                fit="contain"
                :src="imgJourneyUrl"
                @click="showImgPreview(imgJourneyUrl)"
              />
              <van-uploader
                v-else
                :after-read="afterReadJourney"
                v-model="imgJourney"
                :max-count="1"
              >
                <div class="imgbox">
                  <van-image
                    width="28"
                    height="24"
                    src="static/images/shandongyancao/conference/camera.png"
                  />
                  <div>行程码</div>
                </div>
                <template #preview-cover="{ file }">
                  <div class="preview-cover van-ellipsis">行程码</div>
                </template>
              </van-uploader>
              <van-image
                v-if="readonly"
                width="1.6rem"
                height="1.6rem"
                fit="contain"
                :src="imgNucleicAcidUrl"
                @click="showImgPreview(imgNucleicAcidUrl)"
              />
              <van-uploader
                v-else
                :after-read="afterReadNucleicAcid"
                v-model="imgNucleicAcid"
                :max-count="1"
              >
                <div class="imgbox">
                  <van-image
                    width="28"
                    height="24"
                    src="static/images/shandongyancao/conference/camera.png"
                  />
                  <div>核酸检测</div>
                </div>
                <template #preview-cover="{ file }">
                  <div class="preview-cover van-ellipsis">核酸检测</div>
                </template>
              </van-uploader>
            </template>
          </van-cell>

          <van-cell>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div>
                <span v-if="!readonly" class="asterisk">*</span
                >本次会议防疫政策：
              </div>
              <div v-if="readonly" class="textarea">
                {{ meeting.edPolicy }}
              </div>
              <van-checkbox
                v-else
                v-model="iAgree"
                shape="square"
                :disabled="readonly"
              >
                {{ meeting.edPolicy }}
              </van-checkbox>
            </template>
          </van-cell>
        </van-cell-group>
        <div v-if="!readonly" class="blank"></div>
        <div v-if="!readonly" class="btn-container">
          <van-button class="btn" type="info" native-type="submit">
            我要提交
          </van-button>
        </div>
      </van-form>
    </div>
    <van-image-preview
      v-model="imgPreview"
      :images="previewImg"
      closeable
    ></van-image-preview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userNmae: "",
      pk: this.$route.params.pk,
      iAgree: false,
      imgHealth: [
        // { url: "https://fastly.jsdelivr.net/npm/@vant/assets/leaf.jpeg" }
        // // Uploader 根据文件后缀来判断是否为图片文件
        // // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        // { url: "https://cloud-image", isImage: true }
      ],
      imgJourney: [],
      imgNucleicAcid: [],
      specialRecord: "",
      showPersonType: false,
      personTypes: [
        { id: 1, name: "暂住" },
        { id: 2, name: "常驻" }
      ],
      personType: "",
      personTypeText: "",
      temperature: undefined,
      isToHighDanger: "0",
      isDiscomfort: "0",
      isAllVaccineInoc: "1",
      isContactDanger: "0",
      loading: null,
      errored: false,
      meeting: dsf.util.loadSessionStore("meeting"),
      imgPreview: false,
      previewImg: [],
      controls: []
    };
  },
  computed: {
    readonly: function() {
      return this.pk ? true : false;
    },
    imgJourneyUrl: function() {
      return this.imgJourney.length > 0 ? this.imgJourney[0].url : "";
    },
    imgHealthUrl: function() {
      return this.imgHealth.length > 0 ? this.imgHealth[0].url : "";
    },
    imgNucleicAcidUrl: function() {
      return this.imgNucleicAcid.length > 0 ? this.imgNucleicAcid[0].url : "";
    }
  },
  created() {
    let self = this;
    self.init();
  },
  methods: {
    tempValidator(val) {
      let flag = 35 <= val && val <= 42;
      if (!flag) dsf.layer.toast("请输入正确的体温", false);
      return flag;
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },
    showImgPreview(url) {
      this.imgPreview = true;
      this.previewImg = [url];
    },
    // 提交
    onSubmit(values) {
      console.log("submit", values);
      let self = this;
      if (self.checkRequired()) {
        self.loading = dsf.layer.loading();
        self.controls.forEach(item => {
          if (item.type == 1) {
            item.text = item.value;
          } else if (item.type == 2) {
            item.text = item.value == "1" ? "是" : "否";
          }
        });
        let params = {
          id: null,
          bt: null,
          fid: self.meeting.id,
          personType: self.personType,
          personTypeText: self.personTypeText,
          temperature: self.temperature,
          isToHighDanger: self.isToHighDanger,
          isToHighDangerText: self.isToHighDanger == "0" ? "否" : "是",
          isDiscomfort: self.isDiscomfort,
          isDiscomfortText: self.isDiscomfort == "0" ? "否" : "是",
          isAllVaccineInoc: self.isAllVaccineInoc,
          isAllVaccineInocText: self.isAllVaccineInoc == "0" ? "否" : "是",
          isContactDanger: self.isContactDanger,
          isContactDangerText: self.isContactDanger == "0" ? "否" : "是",
          specialRecord: self.specialRecord,
          healthyCard: self.imgHealth[0].name,
          walkWayCard: self.imgJourney[0].name,
          checkCard: self.imgNucleicAcid[0].name,
          epSetups: self.controls
        };
        console.log("params", params);
        dsf.http
          .post(`fn/sdycMeeting/saveEDData`, params, {
            headers: {
              // 'x-auth-token': dsf.util.loadSessionStore("loginToken"),
              "Content-Type": "application/json;charset=UTF-8"
            }
          })
          .done(res => {
            if (res.type == "success") {
              dsf.layer.toast("提交成", true, () =>
                self.$router.replace(`SDYCConferenceIndex/${self.meeting.id}`)
              );
            }
          })
          .error(error => {
            console.log("saveEDData-error", error);
          })
          .always(() => {
            dsf.layer.closeLoading(self.loading);
          });
      }
    },
    // 校验必填
    checkRequired() {
      let tip,
        flag = true,
        self = this;
      if (!self.iAgree) {
        flag = false;
        tip = "请先阅读并勾选个人承诺";
      } else if (!self.personType) {
        flag = false;
        tip = "请选择人员类型";
      } else if (!self.temperature) {
        flag = false;
        tip = "请填写体温";
      } else if (self.imgHealth.length == 0) {
        flag = false;
        tip = "请上传健康码";
      } else if (self.imgJourney.length == 0) {
        flag = false;
        tip = "请上传行程码";
      } else if (self.imgNucleicAcid.length == 0) {
        flag = false;
        tip = "请上传核酸检测";
      }
      self.controls.forEach(item => {
        if (!item.value) {
          flag = false;
          tip =
            item.type == 1
              ? `请填写${item.columnName}`
              : `请选择${item.columnName}`;
        }
      });
      if (!flag) dsf.layer.toast(tip, false);
      return flag;
    },
    afterReadHealth(file) {
      this.uploadImage(file, 0);
    },
    afterReadJourney(file) {
      this.uploadImage(file, 1);
    },
    afterReadNucleicAcid(file) {
      this.uploadImage(file, 2);
    },
    // 上传图片
    uploadImage(file, fileType) {
      let self = this;
      file.status = "uploading";
      file.message = "上传中...";

      dsf.http
        .upload(`fn/sdycMeeting/uploadImage`, { fileType: fileType }, file)
        .done(function(res) {
          if (res.type == "success") {
            file.status = "done";
            file.name = res.data.fileName;
            file.url = dsf.url.getServerUrl(
              `fn/sdycMeeting/downloadImage?fileName=${res.data.fileName}`
            );
            file.isImage = true;
          } else {
            file.status = "failed";
            file.message = "上传失败";
            dsf.layer.toast(res.message);
          }
        })
        .error(error => {
          console.log("uploadImage-error", error);
          file.status = "failed";
          file.message = "上传失败";
        });
    },
    // 选择人员类型
    onPersonTypeSelect(item) {
      let self = this;
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      self.showPersonType = false;
      self.personType = item.id;
      self.personTypeText = item.name;
    },
    init() {
      let self = this;
      self.loading = dsf.layer.loading();
      if (self.pk) {
        dsf.http
          .post(`fn/sdycMeeting/getEDData`, {
            // meetingId: self.meeting.id,
            pk: self.pk
          })
          .done(res => {
            if (res.type == "success") {
              self.iAgree = true;
              self.userNmae = res.data.ngr;
              self.personTypeText = res.data.personTypeText;
              self.temperature = res.data.temperature;
              self.isToHighDanger = res.data.isToHighDanger;
              self.isDiscomfort = res.data.isDiscomfort;
              self.isAllVaccineInoc = res.data.isAllVaccineInoc;
              self.isContactDanger = res.data.isContactDanger;
              self.specialRecord = res.data.specialRecord;
              self.imgHealth.push({
                url: dsf.url.getServerUrl(
                  `fn/sdycMeeting/downloadImage?fileName=${res.data.healthyCard}&infoId=${self.pk}`
                ),
                isImage: true,
                name: res.data.healthyCard
              });
              self.imgJourney.push({
                url: dsf.url.getServerUrl(
                  `fn/sdycMeeting/downloadImage?fileName=${res.data.walkWayCard}&infoId=${self.pk}`
                ),
                isImage: true,
                name: res.data.walkWayCard
              });
              self.imgNucleicAcid.push({
                url: dsf.url.getServerUrl(
                  `fn/sdycMeeting/downloadImage?fileName=${res.data.checkCard}&infoId=${self.pk}`
                ),
                isImage: true,
                name: res.data.checkCard
              });
              self.controls = res.data.epSetups;
            }
          })
          .error(error => {
            console.log("getPersonTypes-error", error);
          })
          .always(() => {
            dsf.layer.closeLoading(self.loading);
          });
      } else {
        self.userNmae = dsf.util.loadSessionStore("user").name;
        self.getPersonTypes();
        self.getCustomItems();
      }
    },
    getPersonTypes() {
      let self = this;
      dsf.http
        .get(`fn/sdycMeeting/getPersonTypes`)
        .done(res => {
          if (res.type == "success") {
            self.personTypes = res.data.map(item => {
              return {
                id: item.value,
                name: item.text
              };
            });
          }
        })
        .error(error => {
          console.log("getPersonTypes-error", error);
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    },
    getCustomItems() {
      let self = this;
      dsf.http
        .post(`fn/sdycMeeting/getCustomItems`, {
          meetingId: self.meeting.id
        })
        .done(res => {
          if (res.type == "success") {
            self.controls = res.data;
          }
        })
        .error(error => {
          console.log("getCustomItems-error", error);
        })
        .always(() => {
          dsf.layer.closeLoading(self.loading);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";

.contaniner {
  .declare {
    .asterisk {
      color: #ff2200;
    }
    .van-cell::after {
      border-bottom: 1px solid #ebedf0;
    }
    .van-cell__title {
      width: 15em;
      flex: auto;
    }
    .van-cell__value {
      color: #323233;
    }
    ::v-deep .van-field__label {
      width: 15em;
    }
    .textarea {
      padding: 10px 0;
      font-weight: bold;
    }
    .title {
      display: flex;
      align-items: center;
      .bar {
        display: inline-block;
        width: 0.1rem;
        height: 0.32rem;
        margin-right: 0.1rem;
        // background: #e91619;
        @include background-theme("normal");
      }
      .txt {
        flex: 1;
        // font-size: var(--font_size_2);
        font-weight: bold;
      }
    }
    .van-checkbox {
      padding: 0.4em;
      margin-top: 0.4em;
      align-items: flex-start;
      background-color: #f6f6f6;
    }
    .upload_msg {
      margin-bottom: 0.4em;
    }
    .blank {
      height: 1.2rem;
    }
    .btn-container {
      background-color: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 12px;

      .btn {
        width: 100%;
        // background-color: #e91619;
        border: none;
      }
    }

    .van-uploader {
      .imgbox {
        width: 1.6rem;
        height: 1.6rem;
        background: rgba(0, 0, 0, 0.05);
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        font-size: var(--font_size_4);
      }
      .van-image {
        margin: 2em 0 0.5em 0;
      }
      .preview-cover {
        position: absolute;
        bottom: 0;
        box-sizing: border-box;
        width: 100%;
        padding: 4px;
        color: #fff;
        font-size: var(--font_size_4);
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
