import dsf from "../../../common"

const exportObj = {}
exportObj.initHandle = function (formData, formStruct, vueData) {
  let C0002 = formStruct.controls.find(ctrl => ctrl.metaId == "C-BJ-0002")
  C0002.extra.tabs = []
  dsf.http.post("ctrl/capacityManagement/getThisUserInfo").then(res => {
    if (res.data.code == 200) {
      let userInfo = res.data.data.userInfo
      let hideUserPar = res.data.data.bjsyrPar
      let hideUserCur = res.data.data.bjsyrCur
      let hideDeptList = res.data.data.hideDeptList
      let hideUserList = res.data.data.hideUserList

      let selfUnit = {
        name: "本机构", //标签tab名称
        action: "ctrl/nodeSelect/treeData?name=本机构&metaKey=&t=1654157356838&moduleId=undefined&flowId=undefined&nodeId=undefined&excludeIds=undefined",
        urlParams: {
          async: true,
          isShowUpName: true, //是否显示上层名称
          selectType: "user", //选择类型 user,dept,unit (多种类型用英文逗号分割)
          multiple: true, //多选 true,  单选 false
          title: "用户选择", //自定义弹框标题
          isRealUser: true, //层级关系是否与当前人有关 有关true,  无关false
          stNodeId: "", //与登录人无关时，需指定起始节点的ID,如果未指定，则根据起始层级加载(当与登录人有关时,该参数可以省略)
          //是否按层级加载 是true:需标注stLevel及endLevel;否false(仅限于与登录人有关):需标注loadType,stInLevel,stType, endInLevel
          loadByLevel: false,
          stLevel: 4, //开始层级 step的位数  4的倍数
          //与登录人有关时 从登录人主部门向上查找至该层级
          endLevel: 16, //结束层级 step的位数   4的倍数
          loadType: "unit", //表示以登录人的机构unit/部门dept为基准
          stInLevel: 0, //从登录人的机构/部门向上几层开始(正数为向上，0表示当前层级)
          stType: "unit", //开始节点的类别 unit机构 dept 部门
          //endInLevel:20,//从开始节点向下几层结束
          showRange: "unit,dept,user" //展示范围  unit表示展示子机构，dept表示展示子部门,user 表示展示人员
        }
      }
      //不显示上级机构的子机构
      let parUnit = {
        name: "上级机构", //标签tab名称
        action: "ctrl/nodeSelect/treeData?name=上级机构&metaKey=&t=1654157356838&moduleId=undefined&flowId=undefined&nodeId=undefined&excludeIds=undefined",
        urlParams: {
          async: true,
          isShowUpName: true, //是否显示上层名称
          selectType: "user", //选择类型 user,dept,unit (多种类型用英文逗号分割)
          multiple: true, //多选 true,  单选 false
          isShowUpName: true, //是否显示上层名称
          selectType: "user", //选择类型 user,dept,unit (多种类型用英文逗号分割)
          multiple: true, //多选 true,  单选 false
          title: "用户选择", //自定义弹框标题
          isRealUser: true, //层级关系是否与当前人有关 有关true,  无关false
          stNodeId: "", //与登录人无关时，需指定起始节点的ID,如果未指定，则根据起始层级加载(当与登录人有关时,该参数可以省略)
          //是否按层级加载 是true:需标注stLevel及endLevel;否false(仅限于与登录人有关):需标注loadType,stInLevel,stType, endInLevel
          loadByLevel: false,
          stLevel: 4, //开始层级 step的位数  4的倍数
          //与登录人有关时 从登录人主部门向上查找至该层级
          endLevel: 16, //结束层级 step的位数   4的倍数
          loadType: "unit", //表示以登录人的机构unit/部门dept为基准
          stInLevel: 1, //从登录人的机构/部门向上几层开始(正数为向上，0表示当前层级)
          stType: "unit", //开始节点的类别 unit机构 dept 部门
          endInLevel: 3, //从开始节点向下几层结束
          showRange: "dept,user" //展示范围  unit表示展示子机构，dept表示展示子部门,user 表示展示人员
        }
      }
      //同级机构 县级用户可以有这个标签
      let tjjgUnit_qx = {
        name: "同级机构", //标签tab名称
        action: "ctrl/nodeSelect/treeData?name=同级机构&metaKey=&t=1654157356838&moduleId=undefined&flowId=undefined&nodeId=undefined&excludeIds=undefined",
        urlParams: {
          async: true,
          isShowUpName: true, //是否显示上层名称
          selectType: "user", //选择类型 user,dept,unit (多种类型用英文逗号分割)
          multiple: true, //多选 true,  单选 false
          isRealUser: true,
          stNodeId: "",
          loadByLevel: false,
          stLevel: 4,
          endLevel: 16,
          loadType: "unit",
          stInLevel: 1,
          stType: "unit",
          endInLevel: 3,
          showRange: "unit,dept,user"
        }
      }
      let tjjgUnit_sj = {
        name: "同级机构", //标签tab名称
        action: "ctrl/nodeSelect/treeData?name=同级机构&metaKey=&t=1654157356838&moduleId=undefined&flowId=undefined&nodeId=undefined&excludeIds=undefined",
        urlParams: {
          async: true,
          isShowUpName: true, //是否显示上层名称
          selectType: "user", //选择类型 user,dept,unit (多种类型用英文逗号分割)
          multiple: true, //多选 true,  单选 false
          isRealUser: true,
          stNodeId: "",
          loadByLevel: false,
          stLevel: 4,
          endLevel: 16,
          loadType: "unit",
          stInLevel: 1,
          stType: "unit",
          endInLevel: 2,
          endType: "dept",
          showRange: "unit,dept,user"
        }
      }
      let private_group = {
        name: "我的小组", //标签tab名称
        action: "ctrl/nodeSelect/treeData?name=我的小组&metaKey=&t=1654157356838&moduleId=undefined&flowId=undefined&nodeId=undefined&excludeIds=undefined",
        urlParams: {
          async: true,
          isShowUpName: true, //是否显示上层名称
          selectType: "user", //选择类型 user,dept,unit (多种类型用英文逗号分割)
          multiple: true, //多选 true,  单选 false
          isOtherData: true,
          classPath: "cn.dreamit.p2085.notepaper.service.impl.CapacityManagementServiceImpl",
          method: "getGroupInfo",
          otherParams: "{}"
        }
      }
      let hideArrayIds = new Array()
      //没有本级私有上报员 不显示本级私有人
      if (!userInfo.benjisysby) {
        //隐藏本机构的私有人
        for (var key in hideUserCur) {
          hideArrayIds.push("user_" + key)
        }
      }
      //没有上级私有上报员 不显示本级私有人
      if (!userInfo.sjsysby) {
        //隐藏上级机构的私有人
        for (var key in hideUserPar) {
          hideArrayIds.push("user_" + key)
        }
      }
      selfUnit.urlParams["hideNodeArray"] = hideArrayIds.join(",")
      parUnit.urlParams["hideNodeArray"] = hideArrayIds.join(",")
      tjjgUnit_qx.urlParams["hideNodeArray"] = hideArrayIds.join(",")
      tjjgUnit_sj.urlParams["hideNodeArray"] = hideArrayIds.join(",")
      private_group.urlParams["hideNodeArray"] = hideArrayIds.join(",")

      C0002.extra.tabs.push(selfUnit)
      //有 上级便笺上报员 显示上级机构tab
      if (userInfo.shangjibjsby) {
        C0002.extra.tabs.push(parUnit)
      }
      if (userInfo.unitType >= 16) {
        //可以发送至同级机构
        let tjjgUnit = userInfo.unitType == 16 ? tjjgUnit_sj : tjjgUnit_qx
        let hideDeptIds = new Array()
        if (hideDeptList != null) {
          for (var deptId in hideDeptList) {
            hideDeptIds.push("dept_" + deptId)
          }
        }
        if (userInfo.thisUnitId) {
          hideDeptIds.push("unit_" + userInfo.thisUnitId)
        }
        if (userInfo.unitType == 16 && hideUserList != null && hideUserList.length > 0) {
          $.each(hideUserList, function (x, userItem) {
            hideDeptIds.push("user_" + userItem.id)
          })
        }
        tjjgUnit.urlParams["hideNodeIdsInTab"] = hideDeptIds.join(",")
        C0002.extra.tabs.push(tjjgUnit)
      }

      C0002.extra.tabs.push(private_group)
    }
  })
  let obj = {
    moduleId: vueData.moduleId
  }
  if (vueData.$route.query.replyId) {
    obj.replyId = vueData.$route.query.replyId
  } else if (vueData.$route.query.forwardIds) {
    obj.forwardIds = vueData.$route.query.forwardIds
  } else {
    obj.pk = vueData.$route.params.pk
  }
  dsf.http.post("fn/mobileNote/getNotepaperById", obj).then(data => {
    vueData.noteId = data.data.id
    if (!vueData.$route.query.replyId) vueData.$set(formData.main, "B0001", { value: data.data.noteTitle || "" })
    vueData.$set(formData.main, "B0006", { value: data.data.jjcd || "", text: data.data.jjcdText || "" })
    vueData.$set(formData.main, "C-BJ-0001", { value: data.data.content || "", text: data.data.contentText || "" })
    vueData.$set(formData.main, "C-BJ-0002", { value: data.data.range, text: data.data.rangeName, schema: data.data.rangeSchema })
    if (vueData.allFile.length) {
      vueData.allFile[0].file = data.data.file
        ? data.data.file.attach.map(item => {
            return {
              id: item.fileId,
              title: item.fileName,
              type: item.nrType,
              size: item.showFileSize,
              navtiveUrl: item.filePath,
              url:
                ["jpeg", "bmp", "webp", "svgz", "svg", "gif", "jpg", "ico", "png", "tif"].indexOf(item.extension) > -1
                  ? dsf.url.getServerUrl(`fn/mobileFileDownload/download?fileId=${item.fileId}&moduleId=${vueData.moduleId}&fileName=${item.fileName}&isTemp=true`)
                  : dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${item.fileId}&moduleId=${vueData.moduleId}&x-auth-token=${dsf.util.loadSessionStore("loginToken")}`),
              // "infoId":"220324174728uVnzn8JwigsgotL9MLz",
              moduleId: vueData.moduleId,
              isHandwrite: "-1",
              isRevise: "-1",
              canEdit: "-1",
              canDownLoad: "1",
              name: "附件"
            }
          })
        : []
      vueData.allFile[0].uploadObj = data.data.file ? data.data.file.attach : []
    }
  })
}

export default exportObj;
