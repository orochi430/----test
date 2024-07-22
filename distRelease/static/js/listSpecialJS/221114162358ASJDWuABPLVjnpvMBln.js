
(function () {
  // 督办台账   阿拉善会议议题
  const exportObj = {};

  exportObj.initHandle = function (vueData) {
    vueData.showProgress = true;
    vueData.StartTime = 'B0013' //进度条起始时间
    vueData.EndTime = 'C-DB-0052' //进度条结束时间
    console.log(vueData);
    let FormType = vueData.$route.query
    console.log(FormType);

  }
  exportObj.dataFilter = function (listData, vueData) {
    listData.forEach(element => {
      let buttons = element.buttons.commonButton

      let dbzrr = element.dataValue['C-DB-0016.value']
      let status = element.dataValue['C-DB-0054.value']
      let sourceUserId = element.dataValue['C-DB-0095.value']
      let userId = dsf.util.loadSessionStore("user").user_id
      let masterId = element.dataValue['C-DB-0086']
      let id = element.dataValue['A0001']
      let fid = element.dataValue['A0031']
      let feedbackSystem = element.dataValue['C-DB-0078.value']
      let flag = feedbackSystem === "2";
      let SUB_COUNT = element.dataValue['SUB_COUNT']

      // 待确认无反馈情况和接收情况
      if (status == "1") {
        element.buttons.commonButton.splice(0, element.buttons.commonButton.length)
        element.buttons.mainButtons.splice(0, element.buttons.mainButtons.length)
      }
      // 办结才能评价
      if (status != "5") {
        element.buttons.commonButton = element.buttons.commonButton.filter(item => item.action != 'pingJia')
      }
      if ("2" != status && "4" != status) {
        //督办项目如果不是接收阶段，
        element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['banJie', 'ApplyDelay', 'increaseChengBan', 'bianGengPlan', 'saveDBCB'].find(action => item.action == action)))
        // output.find('li[lay-event="feedback"]').remove();
        // output.find('li[lay-event="deptFeedback"]').remove();
        // output.find('li[lay-event="urge"]').remove();
        // output.find('li[lay-event="defer"]').remove();
        // output.find('li[lay-event="end"]').remove();
        // output.find('li[lay-event="change"]').remove();
        // output.find('li[lay-event="changeScheduledTask"]').remove();
        // output.find('li[lay-event="addCBBM"]').remove();
        if (SUB_COUNT <= 0) {
          element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['pingJia'].find(action => item.action == action)))
          //     output.find('li[lay-event="evaluate"]').remove();
        } else {
          if (dbzrr != userId) {
            element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['pingJia'].find(action => item.action == action)))
            //         //评价
            //         output.find('li[lay-event="evaluate"]').remove();
          }
        }
      } else {
        //如果不是接收阶段
        if (id != masterId) {
          element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['banJie', 'ApplyDelay', 'increaseChengBan', 'bianGengPlan'].find(action => item.action == action)))
          // //办结
          // output.find('li[lay-event="end"]').remove();
          // //延期
          // output.find('li[lay-event="defer"]').remove();
          // //
          // output.find('li[lay-event="changeScheduledTask"]').remove();
          // output.find('li[lay-event="addCBBM"]').remove();
        } else {
          // element.buttons.commonButton = buttons.filter(item => ['banJie', 'ApplyDelay', 'increaseChengBan', 'bianGengPlan'].find(action => item.action == action))
          // //反馈
          // output.find('li[lay-event="feedback"]').remove();
          // //部门内反馈
          // output.find('li[lay-event="deptFeedback"]').remove();
          // //变更
          // output.find('li[lay-event="change"]').remove();
        }
        if (dbzrr != userId) {
          element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['ApplyDelay'].find(action => item.action == action)))
          // //延期
          // output.find('li[lay-event="defer"]').remove();
          // //反馈
          // output.find('li[lay-event="feedback"]').remove();
          // //部门内反馈
          // output.find('li[lay-event="deptFeedback"]').remove();
        }
        //如果没有下级项目则不出现催办按钮
        if (SUB_COUNT <= 0) {
          // 催办
          if (dbzrr === userId) {
            element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['saveDBCB'].find(action => item.action == action)))
            // output.find('li[lay-event="urge"]').remove();
          }
          //评价
          element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['pingJia'].find(action => item.action == action)))
          // output.find('li[lay-event="evaluate"]').remove();
        } else {
          if (dbzrr != userId) {
            element.buttons.commonButton = element.buttons.commonButton.filter(item => !(['saveDBCB', 'pingJia'].find(action => item.action == action)))
            //评价
            // output.find('li[lay-event="evaluate"]').remove();
            //催办
            // output.find('li[lay-event="urge"]').remove();
          }
        }

      }
    })
  }

  exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    let formId = ''
    // itemValue['A0008']可能返回pc的formId，需要替换为移动的formId
    if (itemValue['A0008'] == '210603150328F0MZfmD9XRPUpOizTBE') formId = '210811160010bnCI2CV4zrvjD56VJCe'
    if (itemValue['A0008'] == '210618140056OnLd4wKQO1SsOrvalVh') formId = '220728163210x4gM7QlAmfnYYMWK55M'
    if (itemValue['A0008'] == '210807171451JlBvcNeaVsqMIyHKAkj') formId = '220804173346Gc6TBu49r2FTwnibsrW'
    // 非待接收状态 跳到督办项目查看节点
    vueData.$router.push({
      path: "/commonForm/2106021016102xjgjpCc6tqdMZkrX20/" + pk,
      query: {
        listId: itemValue['C-DB-0054.value'] != '1' ? '210602101612cwrG8N6w79LnSWR8gSY' : '',
        method: itemValue['C-DB-0054.value'] != '1' ? 'SuperviseProjectView' : '',
        formId: formId
      }
    });
  }

  exportObj.createGroup = function (itemValue, vueData) {
    let pk = itemValue.dataValue["A0001"]
    dsf.http.post('/ctrl/superviseV6/approval/group/chat/id', { pk }).then(res => {
      if (res.data.code == 200) {
        if (res.data.data != null && res.data.data.length) {//存在群  直接打开
          vueData.chatJS.toGroupChat(res.data.data)
        }//否则创建群
        else {
          let updateGroupInfo = function (groupId) {
            dsf.http.post('/ctrl/superviseV6/approval/group/chat/bind', { pk: pk, groupChatId: groupId }).then(res => {
              console.log("更新群ID", res)
            })
          }
          dsf.http.post('/ctrl/superviseV6/approval/group/chat/create/members', { pk }).then(res => {
            if (res.data.code == 200 && res.data.data != null && res.data.data.length) {
              let users = []
              res.data.data.forEach(element => {
                users.push({ id: element.userId, name: element.userName, avatar: "", type: "user" })
              });
              vueData.chatJS.createGroup(users, null, updateGroupInfo)
            } else {
              dsf.layer.toast("查询建群用户信息异常！")
            }
          })
        }
      } else {
        dsf.layer.toast("查询群信息异常！")
      }
    })
  }


  window.spListJS = exportObj;
})();