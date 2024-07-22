export default {
  methods: {
    afterGetinfoFunc() {
      if (window.wx) {
        wx.onMenuShareAppMessage({
          title: document.title, // 分享标题
          desc: document.title, // 分享描述
          link: `https://open.weixin.qq.com/connect/oauth2/authorize?target=out&appid=${dsf.util.loadSessionStore('wxParams').corpId}&redirect_uri=${encodeURIComponent(dsf.url.getRootPath() + 'ctrl/rztAuth/redirectWorkbench?field=rzt&encodeData=' + dsf.base64.encode(JSON.stringify({ 'pcUrl': `ctrl/formControl/form?moduleId=${vueObj.$route.params.moduleId}&pk=${vueObj.$route.params.pk}&todoId=${vueObj.$route.query.todoId || ''}&&agencyUserId=&agencyUserName=&validateByList=1&listId=PCJudgePermission&method=verify`, 'mobileUrl': vueObj.$route.fullPath + (vueObj.$route.fullPath.indexOf('?') > -1 ? '&' : '?') + 'validateByList=1&listId=MobileJudgePermission&method=verify' })))}&response_type=code&scope=snsapi_base&agentid=1000219#wechat_redirect`, // 分享链接
          imgUrl: '', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log(`https://open.weixin.qq.com/connect/oauth2/authorize?target=out&appid=${dsf.util.loadSessionStore('wxParams').corpId}&redirect_uri=${encodeURIComponent(dsf.url.getRootPath() + 'ctrl/rztAuth/redirectWorkbench?field=rzt&encodeData=' + dsf.base64.encode(JSON.stringify({ 'pcUrl': `ctrl/formControl/form?moduleId=${vueObj.$route.params.moduleId}&pk=${vueObj.$route.params.pk}&todoId=${vueObj.$route.query.todoId || ''}&&agencyUserId=&agencyUserName=&validateByList=1&listId=PCJudgePermission&method=verify`, 'mobileUrl': vueObj.$route.fullPath + (vueObj.$route.fullPath.indexOf('?') > -1 ? '&' : '?') + 'validateByList=1&listId=MobileJudgePermission&method=verify' })))}&response_type=code&scope=snsapi_base&agentid=1000219#wechat_redirect`)
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      }

    }
  },
}
