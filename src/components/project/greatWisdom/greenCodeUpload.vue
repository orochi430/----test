<template>
  <!-- 智慧人大，绿码上传 -->
  <div class="green_code_upload">
    <van-cell-group class="group_one">
      <van-cell :value="user_message.name" title="姓名" />
      <van-cell title="身份证" class="identity">
        <template #default>
          <van-field
            v-model="user_message.identity"
            placeholder="请输入身份证号"
            clearable
          />
        </template>
      </van-cell>
      <van-cell :value="user_message.phone" title="手机号" />
      <van-cell :value="user_message.date" title="上传日期" />
    </van-cell-group>

    <van-cell-group class="group_two">
      <van-cell title="上午体温" class="identity">
        <template #default>
          <van-field
            v-model="user_message.temperatureAm"
            placeholder="请输入体温度数"
            clearable
          />
        </template>
      </van-cell>
      <van-cell title="下午体温" class="identity">
        <template #default>
          <van-field
            v-model="user_message.temperaturePm"
            placeholder="请输入体温度数"
            clearable
          />
        </template>
      </van-cell>
      <van-cell
        :value="code_about.name"
        :class="code_about.class"
        title="核酸或抗原检测"
        is-link
        @click="show_code = true"
      />
      <van-cell title="上传图片">
        <template #label>
          <van-uploader
            :after-read="afterRead"
            v-model="file_list"
            :max-count="1"
          />
        </template>
      </van-cell>
    </van-cell-group>

    <van-action-sheet
      v-model="show_code"
      :actions="actions"
      @select="onSelect"
    />

    <div class="operate">
      <van-button :disabled="no_submit" type="info" @click="submitGreenCode">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'green_code_upload',
  data() {
    return {
      date: new Date().toLocaleDateString().replace(/\//g, '-'),
      file_list: [],
      no_submit: true, //是否允许提交
      show_code: false,
      code_about: { name: '阴性', class: 'green' },
      actions: [
        { name: '阴性', class: 'green' },
        { name: '阳性', class: 'red' },
      ],

      user_message: {}, //人员的相关信息
    }
  },
  watch: {
    file_list: {
      handler(newV, oldV) {
        if (newV.length) {
          this.no_submit = false
        } else {
          this.$nextTick(() => {
            this.no_submit = true
          })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.getGreenCodeData()
  },
  methods: {
    getGreenCodeData() {
      //获取一开始的绿码上传数据
      dsf.http
        .get('action?EpidemicAppAction=2', {
          userId: dsf.util.loadSessionStore('user').user_id,
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            this.user_message = data.data
            if (!this.user_message.date) {
              let temp = new Date()
              this.user_message.date = `${temp.getFullYear()}-${
                temp.getMonth() + 1 > 9
                  ? temp.getMonth() + 1
                  : '0' + (temp.getMonth() + 1)
              }-${temp.getDate() > 9 ? temp.getDate() : '0' + temp.getDate()}`
            }
            if (this.user_message.photoPath) {
              this.file_list = [
                { url: this.user_message.photoPath, isImage: true },
              ]
            }
          }
        })
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      file.status = 'uploading'
      file.message = '上传中...'
      this.uploadFile(file)
    },
    uploadFile(file) {
      //上传图片
      let forms = new FormData()
      forms.append('file', file.file)
      forms.append('userId', dsf.util.loadSessionStore('user').user_id)
      dsf.http
        .post('action?EpidemicAppAction=4', forms, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            file.status = 'success'
            file.message = '上传成功'

            this.user_message.photo = data.data.id
          }
        })
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show_code = false
      this.code_about = item
    },
    submitGreenCode() {
      //提交绿码
      dsf.http
        .get('action?EpidemicAppAction=3', {
          userId: dsf.util.loadSessionStore('user').user_id,
          id: this.user_message.id,
          name: this.user_message.name,
          phone: this.user_message.phone,
          identity: this.user_message.identity,
          healthCode: this.code_about.name,
          photo: this.user_message.photo,
          date: this.user_message.date,
          temperatureAm: this.user_message.temperatureAm,
          temperaturePm: this.user_message.temperaturePm
        })
        .then((res) => {
          let data = res.data
          if (data.code == 200) {
            dsf.layer.alert(
              {
                title: '温馨提示',
                message: data.message,
              },
              () => {
                this.$router.back()
              },
            )
          }
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.green_code_upload {
  height: calc(100vh - 46px);
  background: #fff;
}
.group_two {
  padding-top: 15px;
  position: relative;
  &::before {
    content: '';
    width: 100%;
    height: 15px;
    background: #f5f5f5;
    left: 0;
    top: 0;
    position: absolute;
  }
  .van-cell {
    ::v-deep .van-cell__label {
      margin-top: 15px;
    }
  }
}
.van-cell {
  border-bottom: 1px solid #cfcfcf;
  padding-left: 0;
  padding-right: 0;
  margin: 0 15px;
  box-sizing: border-box;
  width: calc(100% - 30px);
  font-size: var(--font_size_2);
  padding: 15px 0;
  &:last-child {
    border-bottom: none;
  }
  ::v-deep .van-field {
    padding: 0;
    margin: 0;
    width: 100%;
  }
  ::v-deep .van-field input {
    text-align: right;
  }
}
.identity {
  ::v-deep .van-cell__value {
    flex: 1.5;
  }
}
.group_one {
  //   .van-cell {
  //   }
  ::v-deep .van-cell__value {
    color: #333;
  }
}
.green {
  ::v-deep .van-cell__value {
    color: #26b774;
  }
}
.yellow {
  ::v-deep .van-cell__value {
    color: #ffa422;
  }
}
.red {
  ::v-deep .van-cell__value {
    color: #d11c1c;
  }
}
.operate {
  background: #ffffff;
  box-shadow: 0px -7px 9px 0px rgba(171, 177, 182, 0.12);
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px 0;
  .van-button {
    width: 90%;
    margin: 0 5%;
    border-radius: 4px;
  }
}
</style>
