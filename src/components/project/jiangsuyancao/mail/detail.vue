<template>
<div class="detail" style="margin-top: 0.2rem">
  <van-field label="主题：" type="textarea" rows="1" autosize :value="title" readonly label-width="1.4rem"/>
  <van-field :label="$route.query.type == 1 ? '收件人：' : '发件人：'" type="textarea" rows="1" autosize :value="$route.query.type == 1 ? recipient : sender" readonly label-width="1.4rem">
    <template #button>
      <span style="color: #3389e0;font-size: var(--font_size_3)" @click="showDetail = !showDetail">{{showDetail ? '隐藏详情' : '显示详情'}}</span>
    </template>
  </van-field>
  <div v-if="showDetail">
    <van-field :label="$route.query.type == 1 ? '发件人：' : '收件人：'" type="textarea" rows="1" autosize :value="$route.query.type == 1 ? sender : recipient" readonly label-width="1.4rem" />
    <van-field label="抄送：" type="textarea" rows="1" autosize :value="carbonCopy" readonly label-width="1.4rem" />
    <van-field label="时间：" type="textarea" rows="1" autosize :value="createTime" readonly label-width="1.4rem" />
  </div>
  <div style="padding: 0.2rem 0.32rem 0;white-space:pre-wrap;line-height: 0.46rem" v-html="content"></div>
  <div style="padding: 0.32rem">
    附件：
    <div class="file" v-for="(file,index) in files" :key="index" @click="openFile(file)">
      <!-- <img :src="file.title | fileType" alt=""> -->
      <span class="elps">{{file.title}}</span>
      <van-icon name="eye" color="#3389e0" size="0.32rem"/>
    </div>
  </div>
  <div style="height: 1.2rem">
    <div class="footer">
      <DsfButtonToolbox :more="true" :is-form-btn="true" :buttons="buttons" size="small" @mainClick="handlerBtn" @commonClick="handlerBtn" />
      <!-- <template v-for="button in buttons">
        <div class="btn" v-if="button.showType.indexOf($route.query.type) > -1" :key="button.action" @click="handlerBtn(button.action)">
          <div><van-icon :name="button.icon" size="0.48rem" color="#3389e0"/></div>
          <span class="sub-font">{{button.name}}</span>
        </div>
      </template> -->
    </div>
  </div>
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
import DsfButtonToolbox from "@/components/documentCenter/DsfButtonToolbox";
export default {
  components: {DsfButtonToolbox},
  data() {
    return {
      showDetail: false,
      // buttons: [{
      //   action: "del",
      //   icon: "delete-o",
      //   name: "删除",
      //   showType: "0,1"
      // },{
      //   action: "forward",
      //   icon: "share-o",
      //   name: "转发",
      //   showType: "0,1"
      // },{
      //   action: "replay",
      //   icon: "comment-o",
      //   name: "回复",
      //   showType: "0"
      // }],
      title: '',
      sender: '',
      recipient: '',
      carbonCopy: '',
      createTime: '',
      content: '',
      files: [],
      mail: null,
      fileShow: false,
      fileTitle: '',
      fileUrl: '',
    }
  },
  filters: {
    fileType: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  computed: {
    buttons() {
      if(this.$route.query.type == '0') {
        return {
          mainButtons: [{
            action: "replay",
            icon: "iconreply",
            name: "回复",
          },{
            action: "forward",
            icon: "iconshare",
            name: "转发",
          },{
            action: "del",
            icon: "icondelete",
            name: "删除",
          }]
        }
      }else if(this.$route.query.type == '1') {
        return {
          mainButtons: [{
            action: "forward",
            icon: "iconshare",
            name: "转发",
          },{
            action: "del",
            icon: "icondelete",
            name: "删除",
          }]
        }
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      let loading = dsf.layer.loading()
      dsf.http.post('/fn/mail/detail', {
        id: this.$route.query.id,
        type: this.$route.query.type
      }).then(res => {
        this.title = res.data.title || ''
        this.sender = res.data.sender || ''
        this.recipient = res.data.recipient || ''
        this.carbonCopy = res.data.carbonCopy || ''
        this.createTime = res.data.createTime || ''
        this.content = res.data.content.replace(/\\n/gm,"<br/>") || ''
        this.files = res.data.files || []
        this.mail = res.data
      }).finally(() => {
        dsf.layer.closeLoading(loading)
      })
    },
    openFile(file) { // 企业微信预览文件
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
    handlerBtn(action) {
      this[action]()
    },
    del() {
      console.log('删除')
      dsf.layer.confirm({
        message: '是否确认删除该邮件',
        confirmButtonText: '确认'}, () => {
          dsf.http.post('fn/mail/toTrash', {
            id: this.$route.query.id
          }).then(res => {
            if(res.data.code == 200) {
              dsf.layer.toast('删除成功')
              this.$router.back()
            }
          })
      })
    },
    forward() {
      console.log('转发')
      this.$router.push({
        path: '/jiangsuyancaoMailEdit',
        query: {
          type: 'forward',
          mail: JSON.stringify(this.mail)
        }
      })
    },
    replay() {
      console.log('回复')
      this.$router.push({
        path: '/jiangsuyancaoMailEdit',
        query: {
          type: 'replay',
          mail: JSON.stringify(this.mail)
        }
      })
    }
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
.footer {
    position: fixed;
    bottom: 0;
    height: 1.2rem;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #fff;
    border-top: 1px solid #F1F1F1;
    padding: 0 10px;
    box-sizing: border-box;
    .btn {
      text-align: center;
      .van-icon {
        vertical-align: bottom;
      }
      span {
        font-size: var(--font_size_4);
        color: #999;
      }
    }
}
.sub-font{
  color: #999;
  font-size: var(--font_size_4);
}
.van-cell::after{
      border-bottom: 1px solid #cfcfcf;
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
