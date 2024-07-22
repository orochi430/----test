<template>
  <div class="test-chat-user-dialog" >
    <div class="header">
      <van-nav-bar
        title="选择审批人发起沟通"
        left-text="取消"
        right-text="确定"
        @click-left="cancel()"
      />
    </div>
    <div>
      <div v-for="item in users" class="user">
        <van-checkbox v-model="item.checked">
          <img :src="item.img" :onerror="default_avatar" />
          {{item.name}}
        </van-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sendFile",
  data() {
    return {
      text: "退回",
      showDialog: false,
      default_avatar: 'this.src="' + require('static/images/EnterpriseServices/default-avatar.png') + '"',
      users: [{
        name: '孙子茹',
        img: dsf.url.getWebPath('fn/file/downloadImage?fileName=230505145142PVYJEQWTi6BtVmzPxxG.png'),
        checked: true
      },{
        name: '李武元',
        img: dsf.url.getWebPath('fn/file/downloadImage?fileName=230501135759SRglaLJWa92YZjiAiJR.png'),
        checked: true,
        disabled: true
      },{
        name: '郑琼',
        img: '',
        checked: true
      },{
        name: '王强',
        img: dsf.url.getWebPath('fn/file/downloadImage?fileName=230430173158BuORnzGXkfHhZDyL6Ax.png'),
        checked: true
      },{
        name: '陈杨',
        img: dsf.url.getWebPath('fn/file/downloadImage?fileName=230505145457DDSwQbGBxRIpBSD4rDn.png'),
        checked: true
      }]
    };
  },
  created() {},
  mounted() {},
  computed: {
    isShowUser() {
      return this.columns.length > 1;
    },
  },
  methods: {
    cancel() {
      this.h = 0;
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.test-chat-user-dialog {
  .user {
    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      object-fit: contain;
      display: inline-block;
      margin: 0 10px;
    }
    margin: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid #dfdfdf;
    font-size: var(--font_size_2);
  }
}
</style>
