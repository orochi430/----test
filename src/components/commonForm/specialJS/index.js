import axios from "axios"
let spJS = {}
let spHandleJS = {}
let spHandleJS_subform = {}
// let requireComponent = require.context(
//   "./", // 在当前目录下查找
//   false, // 不遍历子文件夹
//   /\.js$/ // 正则匹配 以 .vue结尾的文件
// )
spJS.init = function (moduleid, formid, initAfter) {
  return new Promise(async (resolve, reject) => {
    //载入表单对应的处理JS
    spHandleJS = {}
    spJS.spHandleJS = {}
    await import(/* webpackChunkName: 'formSpecialJS' */ `./${moduleid}_${formid}.js`)
      .then(res => {
        spHandleJS = res.default
        spJS.spHandleJS = spHandleJS
        initAfter ? initAfter() : ""
      })
      .catch(err => {
        console.log("无特殊js")
      })
    await import(/* webpackChunkName: 'formSpecialJS' */ `./${moduleid}_${formid}_subform.js`)
      .then(res => {
        spHandleJS_subform = res.default
        spJS.spHandleJS_subform = spHandleJS_subform
        initAfter ? initAfter() : ""
      })
      .catch(err => {
        console.log("无特殊子表js")
      })
    // requireComponent.keys().forEach(fileName => {
    //   let fileKey = fileName.replace(/\.\/|\.js/g, "")
    //   if (fileKey == moduleid + "_" + formid) {
    //     spHandleJS = requireComponent(fileName).default
    //     spJS.spHandleJS = spHandleJS
    //     initAfter ? initAfter() : ""
    //   } else if (fileKey == moduleid + "_" + formid + "_subform") {
    //     spHandleJS_subform = requireComponent(fileName).default
    //     spJS.spHandleJS_subform = spHandleJS_subform
    //   }
    // })
    let scriptTag = document.createElement("script")
    scriptTag.type = "text/javascript"
    scriptTag.src = "./static/js/formSpecialJS/" + moduleid + "_" + formid + ".js" + "?random=" + Math.random()
    scriptTag.onerror = function () {
      //alert("error")
      resolve()
    }
    window.noJS = false
    document.body.appendChild(scriptTag)
    scriptTag.onload = function () {
      if (!window.noJS) {
        //后台拦截器拦截到没有JS时会返回noJS=true，这个时候就不用再替换spHandleJS等对象 2023年3月24日16:41:57 @luy
        spHandleJS = window.spJS
        spJS.spHandleJS = spHandleJS
        initAfter ? initAfter() : ""
      }
      resolve()
    }
  })
}
spJS.WatchHandle = function (newValur, oldValue, formData, formStruct, org, vueData) {
  //根据对象变化，执行特殊JS
  if (spHandleJS.handle) {
    spHandleJS.handle(newValur, oldValue, formData, formStruct, org, vueData)
  }
}
spJS.initHandle = function (formData, formStruct, VueData) {
  //初始化数据后执行一次
  if (spHandleJS.initHandle) {
    spHandleJS.initHandle(formData, formStruct, VueData)
  }
}
//等价于saveFilter <=> saveBefore
spJS.saveFilter = function (formData, formStruct, VueData, action) {
  //初始化数据后执行一次
  if (spHandleJS.saveFilter) {
    return spHandleJS.saveFilter(formData, formStruct, VueData, action)
  }
}

spJS.handleFormData = function (formData, formStruct, VueData, action) {
  if (spHandleJS.handleFormData) {
    return spHandleJS.handleFormData(formData, formStruct, VueData, action)
  }
}

spJS.leaveHandle = function (formData, formStruct, VueData, routeObj) {
  if (spHandleJS.leaveHandle) {
    return spHandleJS.leaveHandle(formData, formStruct, VueData, routeObj)
  }
}

spJS.saveAfter = function (vueData, formStruct, formData) {
  if (spHandleJS.saveAfter) {
    return spHandleJS.saveAfter(vueData, formStruct, formData)
  }
}
spJS.sendAfter = function (formData, formStruct, VueData) {
  if (spHandleJS.sendAfter) {
    return spHandleJS.sendAfter(formData, formStruct, VueData)
  }
}

//属性联动JS方法
spJS.propertyJoinHandle = function (formData, formStruct, VueData) {
  //操作是否显示的函数
  let operatorCtr = function (it) {
    let operateTargetList = it.operateTarget ? it.operateTarget.split(",") : []
    operateTargetList.forEach(element => {
      let showCtr = formStruct.controls.find(item => item.metaId == element)
      if (showCtr) {
        if (it.operation == "5") {
          // 显示内容
          if (VueData.notVaildateMetas.indexOf(showCtr.metaId) > -1) {
            //大于-1才删除
            VueData.notVaildateMetas.splice(VueData.notVaildateMetas.indexOf(showCtr.metaId), 1)
          }
          VueData.$set(showCtr, "show", 1)
        } else if (it.operation == "1") {
          // 隐藏内容
          if (VueData.notVaildateMetas.indexOf(showCtr.metaId) < 0) {
            //已经存在则不添加
            VueData.notVaildateMetas.push(showCtr.metaId)
          }
          VueData.$set(showCtr, "show", 0)
        } else if (it.operation == "7") {
          // 清空
          if (formData.main[showCtr.metaId].hasOwnProperty("text")) {
            VueData.$set(formData.main, showCtr.metaId, {
              text: "",
              value: ""
            })
          } else {
            VueData.$set(formData.main[showCtr.metaId], "value", "")
          }
        } else if (it.operation == "2" && formStruct.rows) {
          // 隐藏行
          if (VueData.notVaildateMetas.indexOf(showCtr.metaId) < 0) {
            //已经存在则不添加
            VueData.notVaildateMetas.push(showCtr.metaId)
          }
          // 找到行内其他控件
          let controlId = showCtr.controlId
          let rows = []
          for (let i = 0; i < formStruct.rows.length; i++) {
            if (formStruct.rows[i].controls?.find(it => it == controlId)) {
              rows = formStruct.rows[i].controls
              break
            }
          }
          rows.forEach(ctrid => {
            let rowCtr = formStruct.controls.find(item => item.controlId == ctrid)
            VueData.$set(rowCtr, "show", 0)
          })
        } else if (it.operation == "6" && formStruct.rows) {
          // 显示行
          if (VueData.notVaildateMetas.indexOf(showCtr.metaId) > -1) {
            //大于-1才删除
            VueData.notVaildateMetas.splice(VueData.notVaildateMetas.indexOf(showCtr.metaId), 1)
          }
          // 找到行内其他控件
          let controlId = showCtr.controlId
          let rows = []
          for (let i = 0; i < formStruct.rows.length; i++) {
            if (formStruct.rows[i].controls?.find(it => it == controlId)) {
              rows = formStruct.rows[i].controls
              break
            }
          }
          rows.forEach(ctrid => {
            let rowCtr = formStruct.controls.find(item => item.controlId == ctrid)
            VueData.$set(rowCtr, "show", 1)
          })
        } else if (it.operation == "4") {
          // 必填
          VueData.$set(showCtr.validator, "required", {})
        } else if (it.operation == "15") {
          // 不必填
          VueData.$delete(showCtr.validator, "required")
        } else if (it.operation == "12") {
          // 级联
          console.log(it)
          let triggerConditionValue = formData.main[it.triggerCondition].value
          let operateTargetValue = formData.main[showCtr.metaId].value
          if (triggerConditionValue) {
            let triggerConditionCtr = formStruct.controls.find(item => item.metaId == it.triggerCondition)
            let codeFid = triggerConditionCtr.enumData.find(col => col.value == triggerConditionValue)?.id
            dsf.http.post("fn/propertyJoint/getCodeItems", { codeFid: codeFid, queryModuleId: VueData.moduleId, triggerCondition: it.triggerCondition }).then(res => {
              if (res.data.code == 200) {
                VueData.$set(showCtr, "enumData", res.data.data)
                if (!res.data.data.find(obj => obj.value == operateTargetValue)) {
                  VueData.$set(formData.main, showCtr.metaId, {
                    text: "",
                    value: ""
                  })
                }
              }
            })
          }
        } else if (it.operation == "calc") {
          if (it.targetContent == "proposedOpinion") {
            // 联动拟办意见
            console.log(formStruct.propertyJoin)
            let proposedOpinionElem = formStruct.propertyJoin.filter(pro => pro.operateTarget == it.operateTarget)
            let opinionCtr = formStruct.controls.find(item => item.metaId == it.operateTarget)
            if (opinionCtr) {
              let postData = {
                showTemplateId: opinionCtr.extra.showTemplate
              }
              proposedOpinionElem.forEach(ele => {
                postData[ele.triggerCondition] = getRelationMetaValue(ele.triggerCondition)
              })
              dsf.http.post("fn/proposedOpinion/getOpinion", postData).then(res => {
                if (res.data.type == "success") {
                  VueData.$set(formData.main, showCtr.metaId, {value: res.data.data})
                }
              })
            }
            function getRelationMetaValue(metaId) {
              let value = ""
              let metaData = formData.main[metaId] || {}
              //这个地方要判断是什么
              let schema = metaData.schema
              if (schema) {
                //选人控件--都是同一种类型
                if (schema.indexOf("1::") >= 0) {
                  let userSchemaArray = schema.split(",") || []
                  let userValueArray = metaData.value.split(",") || []
                  let userTextArray = metaData.text.split(",") || []
                  let len = userSchemaArray.length
                  let dataList = []
                  for (let index = 0; index < len; index++) {
                    let userSchema = userSchemaArray[index]
                    let userValue = userValueArray[index]
                    let userText = userTextArray[index]
                    dataList.push(userText + "^" + userValue + "^" + userSchema.substring(3))
                  }
                  value = "userInfos:" + dataList.join(",")
                } else {
                  value = metaData.text
                  if (value) {
                    value = value.replace(/,/g, "、")
                  }
                }
              } else {
                value = metaData.text || metaData.value || ""
              }
              return value
            }
          }
        }
      }
    })
    // 无操作对象operateTarget的属性联动
    if (it.operation == "10" || it.operation == "11") {
      // 根据样式隐藏 || 显示
      let showCtrs = formStruct.controls.filter(item => item.extra.eatraClass?.includes(it.targetContent))
      let show = it.operation == "10" ? 0 : 1
      showCtrs.forEach(ctr => VueData.$set(ctr, "show", show))
    }
  }

  //检验是否显示
  let checkShow = function (newVal, propertyJoin, controls) {
    //循环处理联动规则
    propertyJoin.forEach(item => {
      //解决下拉多选时选择多个时属性联动无效的bug 2022年7月13日@ly
      if (item.operation == "12") {
        // 12为级联操作，不需要配规则值
        operatorCtr(item)
      } else if (item.operation == "calc") {
        // calc为计算，不需要配规则值
        operatorCtr(item)
      } else if (item.operator == "1") {
        //item.operator == "1"    属于   用规则值与控件值进行比较，控件值有一个值在规则值当中就满足条件
        let selectedValues = item.selectedValues.split(",")
        selectedValues.forEach(element => {
          if (String(newVal.value).split(",").indexOf(element) > -1) {
            operatorCtr(item)
          }
        })
      } else if (item.operator == "2") {
        //item.operator == "2"   不属于    用控件值与规则值进行比较，控件值要全部不在规则值当中才满足条件
        let newVals = String(newVal.value).split(",")
        let isGo = true
        newVals.forEach(element => {
          if (item.selectedValues.split(",").indexOf(element) > -1) {
            isGo = false //如果存在一个不满足不属于的值就给false   不再走联动操作
          }
        })
        if (isGo) {
          operatorCtr(item)
        }
      }
    })
  }

  //属性联动JS方法
  if (formStruct.propertyJoin && formStruct.propertyJoin.length > 0) {
    let ctrArr = []
    formStruct.controls.forEach(ctr => {
      let tc = formStruct.propertyJoin.filter(item => item.triggerCondition == ctr.metaId)
      if (tc.length) {
        ctrArr.push({
          ctrMetaId: ctr.metaId,
          tcArr: tc,
          ctr: ctr
        })
      }
    })
    // 在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。
    // 解决方案： 观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。
    // 该处 VueData.mainData 为 formData.main 的深拷贝计算属性
    VueData.$watch(
      function () {
        return VueData.mainData
      },
      function (n, o) {
        ctrArr.forEach(item => {
          if (!o || n[item.ctrMetaId].value != o[item.ctrMetaId].value) {
            // 如果没有旧值表示初始执行，或者值变化时执行
            // item.ctr.show 仅当控件显示时才操作属性联动，解决问题：a隐藏b、c，但b又显示c，此时b不显示则不再执行c的显示操作
            if (item.ctr.show) checkShow(n[item.ctrMetaId], item.tcArr, formStruct.controls)
          }
        })
      },
      {
        deep: true,
        immediate: true
      }
    )
  }
}

//控件根据当前数据行来判断是否显示和隐藏
spJS.checkShowByData = function (params) {
  if (spHandleJS.checkShowByData) {
    return spHandleJS.checkShowByData(params);
  } else {
    return true
  }
}

spJS.initHandle_subform = function (formData, formStruct, VueData) {
  //初始化数据后执行一次
  if (spHandleJS_subform.initHandle) {
    spHandleJS_subform.initHandle(formData, formStruct, VueData);
  }
}
spJS.saveFilter_subform = function (formData, formStruct, VueData, action) {
  //初始化数据后执行一次
  if (spHandleJS_subform.saveFilter) {
    return spHandleJS_subform.saveFilter(formData, formStruct, VueData, action);

  }
}

//控件肯定当前数据行来判断是否显示和隐藏
spJS.checkShowByData_subform = function (params) {
  if (spHandleJS_subform.checkShowByData) {
    return spHandleJS_subform.checkShowByData(params);
  } else {
    return true
  }
}
// 重新加载控件后执行方法
spJS.initDataAfter = function (formData, formStruct, VueData) {
  if (spHandleJS.initDataAfter) {
    return spHandleJS.initDataAfter(formData, formStruct, VueData)
  }
}
export default spJS
