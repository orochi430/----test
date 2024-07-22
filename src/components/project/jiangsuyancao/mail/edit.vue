<template>
<div class="detail" style="margin-top: 0.2rem">
  <van-field label="收件人：" type="textarea" rows="1" autosize v-model="recipient" label-width="1.4rem" right-icon="contact" @click-right-icon="recipientShow = true"/>
  <van-field label="抄送：" type="textarea" rows="1" autosize v-model="carbonCopy" label-width="1.4rem" right-icon="contact" @click-right-icon="carbonCopyShow = true"/>
  <van-field label="主题：" type="textarea" rows="1" autosize v-model="title" label-width="1.4rem"/>
  <van-field type="textarea" rows="8" autosize v-model="content" placeholder="请输入内容"/>
  <div v-html="originalContent" style="padding: 0 0.32rem"></div>
  <div style="padding: 0.32rem">
    <div class="flex jb"><span>添加附件：</span>
      <van-uploader
        :after-read="afterRead"
        accept="*/*"
        class="upload-btn"
      >
        <i class="iconfont iconattachment" style="display: inline-block;transform: rotate(-45deg);font-size: var(--font_size_0)"></i>
      </van-uploader>
    </div>
    <div class="file" v-for="(file,index) in files" :key="index" @click="openFile(file)">
      <!-- <img :src="file.title | fileType" alt=""> -->
      <span class="elps">{{file.title}}</span>
      <van-icon name="eye" color="#3389e0" size="0.32rem" style="padding-right: 0.2rem"/>
      <van-icon name="cross" color="#3389e0" size="0.32rem" @click.stop="del(file, index)"/>
    </div>
  </div>
  <div style="height: 1.2rem">
    <div class="footer">
      <van-button
        class="btn"
        type="info"
        @click="send"
      >发送
      </van-button>
    </div>
  </div>
  <van-popup get-container="#app" v-model="recipientShow" position="bottom" :style="{ height: '100%' }">
    <address-list :show.sync="recipientShow" @getArray="getRecipient"></address-list>
  </van-popup>
  <van-popup get-container="#app" v-model="carbonCopyShow" position="bottom" :style="{ height: '100%' }">
    <address-list :show.sync="carbonCopyShow" @getArray="getCarbonCopy"></address-list>
  </van-popup>
  <van-popup v-model="fileShow" :get-container="'#app'" position="bottom" class="filePop">
    <van-nav-bar :title="fileTitle" @click-left="fileShow = false">
      <template #left>
          <van-icon name="arrow-left" /><span>返回</span>
      </template>
    </van-nav-bar>
    <iframe v-if="fileShow" id="filePreview" :src="fileUrl" frameborder="0" />
  </van-popup>
</div>
</template>

<script>
import addressList from './addressList'
export default {
  components: { addressList },
  data() {
    return {
      recipient: '',
      carbonCopy: '',
      title: '',
      content: '',
      files: [],
      originalMail: null,
      originalContent: '',
      recipientShow: false,
      carbonCopyShow: false,
      fileShow: false,
      fileTitle: '',
      fileUrl: '',
    }
  },
  created() {
    if(this.$route.query.mail) {
      this.setOriginalMail()
    }
  },
  methods: {
    setOriginalMail() {
      this.originalMail = JSON.parse(this.$route.query.mail)
      this.originalContent = `<br />---------- Origin message ----------<br />&gt;From：&quot;${this.originalMail.sender.split('@')[0]}&quot; &lt;${this.originalMail.sender}&gt;<br />&gt;To：&quot;${this.originalMail.recipient.split('@')[0]}&quot; &lt;${this.originalMail.recipient}&gt;<br />&gt;Subject：${this.originalMail.title}<br />&gt;Date：${this.originalMail.createTime}<blockquote style=\"margin:0 0 0 .8ex;border-left:1px #00c solid;padding-left:1ex\">${this.originalMail.content}</blockquote>\n`
      this.files = this.originalMail.files
      switch (this.$route.query.type) {
        case 'forward':
          this.title = `转发：${this.originalMail.title}`
          break;
        case 'replay':
          this.title = `回复：${this.originalMail.title}`
          this.recipient = this.originalMail.sender
          break;
        default:
          break;
      }
      console.log(this.originalMail)
      console.log(this.content)
    },
    afterRead(file) {
      this.$toast.loading({
        message: "上传中...",
        forbidClick: true,
        duration: 0,
        overlay: true,
      });
      console.log(file)
      dsf.http.upload('fn/mail/upload',{}, file).then(res => {
        if(res.data.code == 200) {
          this.files.push(res.data.data)
        }
        this.$toast.clear()
        this.dsf.layer.toast(res.data.message)
      })
    },
    del(file, index) {
      dsf.layer.confirm({
        message: '是否确认删除该附件',
        confirmButtonText: '确认'}, () => {
          dsf.http.post('fn/mail/delFile', file).then(res => {
            if(res.data.code == 200) {
              dsf.layer.toast('删除成功')
              this.files.splice(index, 1)
            }
          })
      })
    },
    send() {
      if (!this.recipient) {
        this.$toast.fail("请选择收件人")
        return
      }
      if (!this.content) {
        this.$toast.fail("请输入内容")
        return
      }
      let _loading = dsf.layer.loading('发送中');
      dsf.http.post('fn/mail/send', {
        title: this.title,
        recipient: this.recipient,
        carbonCopy: this.carbonCopy,
        content: this.originalContent ? `${this.content}<br/>------------------------<br/>${this.originalContent}` : this.content,
        files: JSON.stringify(this.files)
      }).then(res => {
        console.log(res)
        if(res.data.code == 200) {
          dsf.layer.toast('发送成功')
          setTimeout(() => {
            if(this.$route.query.mail) {
              this.$router.go(-2)
            } else {
              this.$router.go(-1)
            }
          }, 1000)
        } else {
          dsf.layer.toast(res.data.message)
        }
      }).catch(() => {
        dsf.layer.closeLoading(_loading);
      })
    },
    getRecipient(val) {
      let array = []
      val.forEach(item => {
        if (item.EMAIL) {
          array.push(item.EMAIL)
        }
      })
      this.recipient = Array.from(new Set([...array])).join(',')
    },
    getCarbonCopy(val) {
      let array = []
      val.forEach(item => {
        if (item.EMAIL) {
          array.push(item.EMAIL)
        }
      })
      this.carbonCopy = Array.from(new Set([...array])).join(',')
    },
    openFile(file) { // 企业微信预览文件
      // console.log(dsf.url.getServerUrl(file.url))
      // wx.previewFile({
      //   url:  dsf.url.getServerUrl(file.url), // 需要预览文件的地址(必填，可以使用相对路径)
      //   name: file.title, // 需要预览文件的文件名(不填的话取url的最后部分)
      //   size: 1048576, // 需要预览文件的字节大小(必填)
      //   hidePreviewMenuList : [] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
      // });
      this.fileShow = true
      this.fileTitle = file.title
      this.fileUrl = dsf.config.previewSetting.previewLocation + file.url
    },
  }
}
</script>
<style lang='scss' scoped>
.detail {
  background-color: #fff;
  font-size: var(--font_size_2);
  .van-cell {
    font-size: var(--font_size_2);
    padding: 16px;
  }
}
.file {
  border: 1px solid #cfcfcf;
  padding: 16px;
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    color: #999;
    flex: 1;
  }
}
.van-cell::after{
  border-bottom: 1px solid #cfcfcf;
}
.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 12px;
    .btn{
      width: 100%;
    }
}
.filePop {
    height: 100%;
    display: flex;
    flex-direction: column;

    iframe {
        flex: 1;
    }
}
</style>
