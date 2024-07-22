<template>
  <div class="receipt">
    <form-frame title="收文">
      <template slot="default">
        <van-form @submit="onSubmit">
          <van-field type="textarea" rows="2" v-model="form.wjbt" label="*文件标题" placeholder="请输入文件标题">
            <template #label>
              <span><label class="mast-input">*</label>文件标题：</span>
            </template>
          </van-field>
          <van-field v-model="form.lwdw" label="来文单位：" placeholder="请输入来文单位" />
          <van-field v-model="form.lwwh" label="来文文号：" placeholder="请输入来文文号" />
          <van-field readonly clickable name="calendar" :value="form.lwrq" label="来文日期：" placeholder="点击选择日期"
            @click="showCalendar1 = true" />
          <van-field readonly clickable name="calendar" :value="form.swrq" label="收文日期：" placeholder="点击选择日期"
            @click="showCalendar2 = true" />
          <van-calendar v-model="showCalendar1" @confirm="onConfirm($event, 'lwrq')" first-day-of-week="1"/>
          <van-calendar v-model="showCalendar2" @confirm="onConfirm($event, 'swrq')" first-day-of-week="1"/>
          <van-calendar v-model="showCalendar3" @confirm="onConfirm($event, 'blqx')" first-day-of-week="1"/>
          <van-field v-model="form.swbh" label="收文编号：" placeholder="请输入收文编号" />
          <van-field name="radio" label="加急程度：">
            <template #input>
              <van-radio-group v-model="form.jjcd" direction="horizontal">
                <van-radio name="1">普通</van-radio>
                <van-radio name="2">平急</van-radio>
                <van-radio name="3">加急</van-radio>
                <van-radio name="4">特急</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field readonly clickable name="calendar" :value="form.blqx" label="办理期限：" placeholder="点击选择日期"
            @click="showCalendar3 = true" />

          <van-field name="uploader" class="meeting-upload">
            <template #label>
              <span><label class="mast-input">*</label>正文：</span>
            </template>
            <template #input>
              <van-uploader v-model="form.uploaderZW" accept=".txt,.pdf,.doc,.docx,.xls,.xlsx" upload-icon="plus">
              </van-uploader>
            </template>
          </van-field>
          <!-- <van-field name="uploader" label="附件：">
            <template #input>
              <van-uploader>
                上传附件
              </van-uploader>
            </template>
          </van-field> -->
          <van-field v-model="form.meeting" class="meeting-upload" name="file" label="附件">
            <!-- <template #input>
              <van-uploader v-model="form.uploader" upload-icon="plus" />
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
          <van-button type="info" native-type="button" @click="tempSend">发送</van-button>
        </van-form>
      </template>
      <template slot="button">
        <DsButtonToolbox :buttons="buttons" @leftClick="handleLeftClick" @rightClick="handleRightClick" />
      </template>
    </form-frame>
  </div>
</template>

<script>
  import FormFrame from './FormFrame'
  import DsButtonToolbox from '../documentCenter/DsfButtonToolbox';
  export default {
    name: 'Receipt',
    components: {
      FormFrame,
      DsButtonToolbox
    },
    data() {
      return {
        attach_1: [],
        showCalendar1: false,
        showCalendar2: false,
        showCalendar3: false,
        form: {
          wjbt: '',
          lwdw: '',
          lwwh: '',
          lwrq: null,
          swrq: null,
          swbh: '',
          jjcd: '',
          blqx: '',
          uploaderZW: [],
          uploader: [],
        },
        buttons: {
          commonButton: [{
              icon: "icondayin1",
              action: "dataview",
              name: "打印"
            },
            {
              icon: "icongoutong",
              action: "batchaction",
              name: "沟通"
            },
            {
              icon: "icongengduo1",
              action: "batchaction2",
              name: "更多"
            }
          ],
          mainButtons: [{
            action: "send",
            name: "发送"
          }]
        },
        maininfo: {},
        moduleId: "2001131007187DmPkCTl0HFmPhHOk1c",
        formId: "200113100719hXrt1hyEVW3CD5kSDQ8",
        info_id: "",
      };
    },
    computed: {},
    watch: {},
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      },
      onSubmit() {
        //         文件标题	B0001
        // 来文单位	C-LW-0001
        // 来文文号	C-LW-0016
        // 来文日期	B0013
        // 收文日期	B0021
        // 收文编号	B0003
        // 紧急程度	B0006
        // 办理期限	B0018
        // 领导批示	B0027
        // 拟办意见	C-LW-0022
        // 办理情况	C-DB-FK-0006
        // 正文
        // 附件
        this.maininfo['B0001'] = {};
        this.maininfo['C-LW-0001'] = {};
        this.maininfo['C-LW-0016'] = {};
        this.maininfo['B0013'] = {};
        this.maininfo['B0021'] = {};
        this.maininfo['B0003'] = {};
        this.maininfo['B0006'] = {};
        this.maininfo['B0018'] = {};
        this.maininfo['B0027'] = {};
        this.maininfo['C-LW-0022'] = {};
        this.maininfo['C-DB-FK-0006'] = {};
        this.maininfo['B0001'].value = this.form.wjbt;
        this.maininfo['C-LW-0001'].value = this.form.lwdw;
        this.maininfo['C-LW-0016'].value = this.form.lwwh;
        this.maininfo['B0013'].value = this.form.lwrq;
        this.maininfo['B0021'].value = this.form.swrq;
        this.maininfo['B0003'].value = this.form.swbh;
        this.maininfo['B0006'].value = this.form.jjcd;
        this.maininfo['B0018'].value = this.form.blqx;
        this.maininfo['B0027'].value = '';
        this.maininfo['C-LW-0022'].value = '';
        this.maininfo['C-DB-FK-0006'].value = '';
        let newObj = {}
        Object.keys(this.maininfo).forEach((obj, index) => {
          newObj[obj] = {}
          newObj[obj].values = [{
            "key": "value",
            "value": this.maininfo[obj].value
          }]
        })
        // console.log(newObj['A0001'].value)
        let params = {
          moduleId: this.moduleId,
          // pk: newObj['A0001'][0].value,
          pk: this.info_id,
          formId: this.formId,
          __DATA: JSON.stringify({
            maininfo: newObj
          })
          // __DATA: {
          //   "maininfo": JSON.stringify(newObj)
          // }
        }
        console.log(params)
        console.log(JSON.stringify(newObj))
        dsf.http
          .post("/fn/xform/save", params)
          .then(function (data) {
            console.log(data)
          });
      },
      onConfirm(time, name) {
        console.log(time)
        if (name == 'lwrq') {
          this.form.lwrq = dsf.date.format(time, "yyyy-mm-dd");
          this.showCalendar1 = false;
        } else if (name == 'swrq') {
          this.form.swrq = dsf.date.format(time, "yyyy-mm-dd");
          this.showCalendar2 = false;
        } else {
          this.form.blqx = dsf.date.format(time, "yyyy-mm-dd");
          this.showCalendar3 = false;
        }
      },
      onConfirmJJCD(value) { //紧急程度
        this.jjcd = value;
        this.showPicker = false;
      },
      handleLeftClick(name) {
        // eslint-disable-next-line no-console
        console.log(name);
        if (name == "send") {
          this.doSend()
        }
      },
      handleRightClick(name) {
        // eslint-disable-next-line no-console
        console.log(name);
      },
      getUserList() {
        // fn/xform/data?pk=200511112501nzdwnaz3P1uxylO61wC
        let that = this;
        dsf.http
          .get("/fn/xform/data?pk=&moduleId=200514112152rWCht6hUiXVRuSKXPMZ", {})
          .then(function (res) {
            console.log("===请求表单数据接口")
            console.log(res.data.main)
            that.maininfo = res.data.main;
            that.info_id = res.data.main["A0001"].value
            console.log(that.maininfo)
          });
      },
      tempSend() {
        this.onSubmit()
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

      }
    },
    created() {},
    mounted() {
      this.getUserList()
    },
    destroyed() {},
  }

</script>

<style lang="scss" scoped>
  .meeting-upload {
    flex-direction: column;
    height: auto;

    .van-field__label {
      /* position: absolute;
      left: 36px;
      top: 10px; */
    }

    .van-cell__value {
      margin-top: 10px;
      padding-left: 20px;
    }

    .van-uploader__preview-image,
    .van-uploader__file,
    .van-uploader__upload {
      width: 48px;
      height: 48px;
      background-color: #eee;
      border-radius: 3px;
      border: 1px solid #eee;
    }
  }

</style>
