<template>
  <div class="receipt">
    <div class="header" v-if='type==1'>
      <van-nav-bar title="申请延期" left-text="取消" @click-left="cancel()" />
    </div>
    <div class="form-frame">
      <div class="form-contain" style="position: relative;">
        <van-form @submit="onSubmit">
          <van-field input-align="right" v-model="sqdw" label="*申请单位" placeholder="请输入">
            <template #label>
              <span><label class="mast-input">*</label>申请单位</span>
            </template>
          </van-field>
          <van-field input-align="right" v-model="sqr" label="*申请人" placeholder="请选择" @click="selectUser">
            <template #label>
              <span><label class="mast-input">*</label>申请人</span>
            </template>
          </van-field>
          <van-popup v-model="showPicker" position="bottom" round>
            <van-datetime-picker type="datetime" v-model="currentDate" :min-date="minDate" :max-date="maxDate"
              @confirm="onConfirm" @cancel="showPicker = false" />
          </van-popup>
          <van-popup v-model="showPicker1" position="bottom" round>
            <van-datetime-picker type="datetime" v-model="currentDate" :min-date="minDate" :max-date="maxDate"
              @confirm="onConfirm1" @cancel="showPicker1 = false" />
          </van-popup>

          <van-field input-align="right" readonly clickable name="calendar" :value="sqrq" placeholder="请选择"
            @click="showPicker = true">
            <template #label>
              <span><label class="mast-input">*</label>申请日期</span>
            </template>
          </van-field>
          <van-field input-align="right" readonly clickable name="calendar" :value="yqrq" placeholder="请选择"
            @click="showPicker1 = true">
            <template #label>
              <span><label class="mast-input">*</label>延期日期</span>
            </template>
          </van-field>
          <van-field class="reset" type="textarea" rows="2" v-model="yqyy" placeholder="请输入">
            <template #label>
              <span><label class="mast-input">*</label>延期原因</span>
            </template>
          </van-field>
          <van-field class="reset" name="uploader" label="附件">
            <!-- <template #input>
              <van-uploader v-model="fileList" accept=".jpg,.gif,.png,.jpeg,.txt,.pdf,.doc,.docx,.xls,.xlsx"
                upload-icon="plus" multiple />
            </template> -->
            <template #input>
              <div class="dofile" style="width:100%">
                <div class="upload-files">
                  <div class="file-list" v-for="(item,index) in attach_1" :key="index">
                    <i class="iconfont iconfile"></i>
                    <span>{{item.title}}</span>
                    <!-- <van-icon name="clear" @click="removeFile(item)" /> -->
                  </div>
                </div>
                <van-uploader class="upload-btn" :after-read="afterRead">
                  <span class="add-file">
                    <van-icon name="plus" /></span>
                </van-uploader>
              </div>
            </template>
          </van-field>
          <div class="submit">
            <van-button square block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
        <van-popup :close-on-click-overlay='false' v-model="showPerson" position="bottom" :style="{ height: '100%' }">
          <selectPerson @getSelectUser="getSelectUser" @cancePerson="cancePerson" :type='0'></selectPerson>
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
  import selectPerson from "@/components/selectPerson/DsfSelectPerson";
  export default {
    name: 'DelayForm',
    props: ['type'],
    components: {
      selectPerson
    },
    data() {
      return {
        formData: {},
        attach_1: [],
        showPerson: false,
        sqdw: "", //申请单位
        sqr: '', //申请人
        sqrq: "", //申请日期
        yqrq: "", //延期日期
        yqyy: "", //延期原因
        showPicker: false,
        showPicker1: false,
        minDate:new Date(new Date().getFullYear() - 40, 0, 1),//可选择的最小日期
				maxDate:new Date(new Date().getFullYear() + 10, 11, 31),//可选择的最大日期
        currentDate: new Date(),
        fileList: [],
        maininfo: {},
        moduleId: "190323161611pdCmmXaqoOhKvPKgG7X",
        formId: "190323193106NSc1cNEPPG8YB06DLQd",
        info_id: "",
      };
    },
    computed: {},
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      onSubmit(fn) {
        // if (!this.sqdw) {
        //   this.$toast.fail("请输入申请单位")
        //   return
        // }
        // if (!this.sqr) {
        //   this.$toast.fail("请选择申请人")
        //   return
        // }
        // if (!this.sqrq) {
        //   this.$toast.fail("请选择申请日期")
        //   return
        // }
        // if (!this.yqrq) {
        //   this.$toast.fail("请输入延期日期")
        //   return
        // }
        // if(!this.yqyy) {
        //   this.$toast.fail("请输入延期原因")
        //   return
        // }
        console.log("===提交")
        // fn/supervise/approval/delay
        this.maininfo['B0010'] = {};
        this.maininfo['B0009'] = {};
        this.maininfo['B0013'] = {};
        this.maininfo['C-DB-YQ-0002'] = {};
        this.maininfo['C-DB-YQ-0003'] = {};

        this.maininfo['B0010'].value = this.sqdw;
        this.maininfo['B0009'].value = this.sqr;
        this.maininfo['B0013'].value = this.sqrq;
        this.maininfo['C-DB-YQ-0002'].value = this.yqrq;
        this.maininfo['C-DB-YQ-0003'].value = this.yqyy;
        let newObj = {}
        Object.keys(this.maininfo).forEach((obj, index) => {
          newObj[obj] = {}
          newObj[obj].values = [{
            "key": "value",
            "value": this.maininfo[obj].value
          }]
        })
        let params = {
          moduleId: this.moduleId,
          pk: this.info_id,
          formId: this.formId,
          __DATA: JSON.stringify({
            maininfo: newObj
          })
        }
        let self = this;
        console.log(params)
        console.log(JSON.stringify(newObj))
        dsf.http
          .post("/fn/xform/save", params)
          .then(function (data) {
            console.log(data)
            self.$emit("change");
            fn();
          });
      },
      cancel() {
        this.$emit("close");
      },
      onConfirm(date) {
        this.sqrq = dsf.date.format(date, "yyyy-mm-dd");
        this.showPicker = false;
      },
      onConfirm1(date) {
        this.yqrq = dsf.date.format(date, "yyyy-mm-dd");
        this.showPicker1 = false;
      },
      getUserList() {
        // fn/xform/data?pk=200511112501nzdwnaz3P1uxylO61wC
        let that = this;
        dsf.http
          .get("/fn/xform/data?pk=&moduleId=190323161611pdCmmXaqoOhKvPKgG7X", {})
          .then(function (res) {
            console.log("===请求表单数据接口")
            console.log(res.data.main)
            that.maininfo = res.data.main;
            that.info_id = res.data.main["A0001"].value
            console.log(that.maininfo)
          });
      },
      cancePerson() {
        this.showPerson = false;
      },
      getUserNames(data) {
        var str = "";
        data.forEach((obj, index) => {
          if (str == "") {
            str = obj.name;
          } else {
            str += "," + obj.name;
          }
        });
        return str;
      },
      getSelectUser(data) {
        console.log("我的", data);
        if (data.length > 0) {
          this.sqr = this.getUserNames(data);
        }
      },
      selectUser() {
        this.showPerson = true;
        console.log("选人");
      },
      //上传文件
      doFileRead(file, filetype) {
        let self = this;
        let url =
          "/fn/mobileAttachment/upload?fileId=&moduleId=" + this.moduleId + "&mid=" + this.moduleId +
          "&pId=0&pnId=0&nodeName=" + encodeURI("拟稿") + "&nrType=" + filetype + "&pk=" + this.info_id +
          "&newFileFlag=0";

        dsf.http
          .upload(url, {}, file)
          .then(function (data) {
            console.log(data)
            self.getWebFiles()

          });
      },
      afterRead(file) {
        let that = this
        this.$toast.loading({
          message: '上传中...',
          forbidClick: true,
          duration: 0,
          overlay: true
        });
        this.onSubmit(function (obj) {
          that.doFileRead(file, 1)
        })

      },
      getWebFiles() {
        let params = {
          info_id: this.info_id,
          infoId: this.info_id,
          moduleId: this.moduleId,
          nodeId: "",
          start: 0,
          limit: 100
        }
        let that = this
        dsf.http
          .post("/fn/mobileAttachment/getFormAttachment", params)
          .then(function (data) {
            console.log(data.data)
            if (data && data.data && data.data.rows) {
              data.data.rows.forEach((obj, index) => {
                if (obj.attachType == '1') {
                  that.attach_1 = obj.document
                }
              })
            }
            that.$toast.clear()
          });
      },
      removeFile(item) {
        console.log(item)
        let params = {
          pk: item.infoId,
          fileId: item.id,
          moduleId: item.moduleId,
          nrType: item.type,
          fileName: item.title
        }
        let that = this
        dsf.http
          .post("/fn/mobileFileUpload/delete", params)
          .then(function (data) {
            that.getWebFiles()
          });

      },
      //保存-督办延期
      delayData() {
        // fn/supervise/approval/delay?pk=111&fid=222
        let url = "/fn/supervise/approval/delay?pk=" + this.moduleId + "&fid=" + this.moduleId;
      }
    },
    created() {
      this.formData = this.$route.params.formData;
      console.log(this.formData)
    },
    mounted() {
      this.getUserList()
    },
    destroyed() {},
  }

</script>

<style scoped>
  .form-frame .van-cell.reset {
    flex-direction: column;
  }

  .form-frame .van-cell.reset>>>.van-field__control {
    padding-left: 6px;
    padding-top: 7px;
  }

  .reset>>>.van-uploader__preview-image,
  .reset>>>.van-uploader__file,
  .reset>>>.van-uploader__upload {
    width: 48px;
    height: 48px;
    background-color: #eee;
    border-radius: 3px;
    border: 1px solid #eee;
  }

  .submit {
    position: fixed;
    bottom: 10px;
    width: 100%;
    height: 65px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .van-button {
    width: 90%;
    border-radius: 3px;
    font-size: var(--font_size_1);
  }

</style>
