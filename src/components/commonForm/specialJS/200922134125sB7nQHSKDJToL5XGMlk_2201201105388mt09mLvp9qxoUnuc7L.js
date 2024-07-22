/* 
中共徐州市委党校迁建工程智慧校园平台软件 工作台-物品采购模块
@fangpangen 2022/7/11
*/
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {
  // 遍历子表行 除名称和数量是否可编辑
  function listForChange(item, boolean) {
    item.structControl.forEach((element) => {
      if (element.metaId === "C-QT-CUSTOM-0001" || element.metaId === "C-QT-CUSTOM-0000") {
        vueData.$set(element, "privilege", {
          editable: !boolean,
          visible: true,
        });
      } else {
        vueData.$set(element, "privilege", {
          editable: boolean,
          visible: true,
        });
      }
    });
  }
  // 遍历所有子表是否可编辑
  function trueOrFalseListForChange (bool) {
    boolean = bool;
    Subtables.forEach((item) => {
      listForChange(item, bool);
    });
  }
  // 全部子表行是否可编辑
  function allListForChange(bool){
    boolean = bool
    Subtables.forEach((item) => {
      item.structControl.forEach((element) => {
          vueData.$set(element, "privilege", {
            editable: boolean,
            visible: true,
          });
      });
    });
  }
  // 计算总和
  function calculateSum() {
    // 子表数据
    let subdata = formData.multinfos["220627143634ntIGxrlJ8dHr90RVOGZ"].rows;
    let sum = 0;
    subdata.forEach((item) => {
      item["C-QT-CUSTOM-0016"].value =
        Number(item["C-QT-CUSTOM-0000"].value) *
        Number(item["C-QT-CUSTOM-0019"].value);
      sum += item["C-QT-CUSTOM-0016"].value;
    });
    formData.main["C-ERP-PURCHASE-0004"].value = sum;
  }

  // 子表元数据
  let Subtables =
    vueData.$refs.formTab[0].$refs["220627143634ntIGxrlJ8dHr90RVOGZ"][0].$refs
      .subform.formData.rows;

  // 控制子表里的控件是否可编辑
  let boolean = true;
  // 初始化子表
function initialize(){
  if (formData.main["C-ERP-PURCHASE-0008"].value === "1" && formStruct.parameters.nodeId === "0") {
    trueOrFalseListForChange (false)
  } else if(formData.main["C-ERP-PURCHASE-0008"].value === "1" && formStruct.parameters.nodeId === "tbfk9oa8D06FBe1") {
    trueOrFalseListForChange (true)
  } else if(formData.main["C-ERP-PURCHASE-0008"].value === "0" && formStruct.parameters.nodeId === "0"){
    allListForChange (true)
  } else if(formData.main["C-ERP-PURCHASE-0008"].value === "0" && formStruct.parameters.nodeId === "tbfk9oa8D06FBe1") {
    allListForChange(false)
  }
}
 
  // 下拉列表数据
  let listData = []
  let listData1 = formStruct.subform["220627143634ntIGxrlJ8dHr90RVOGZ"].controls
    .find((item) => item.metaId === "C-QT-CUSTOM-0027")
    .enumData.slice(0, 6);
  let listData2 = formStruct.subform["220627143634ntIGxrlJ8dHr90RVOGZ"].controls
    .find((item) => item.metaId === "C-QT-CUSTOM-0027")
    .enumData.slice(6);

  // 下拉列表 showCheckBox 事件
  vueData.$bus.on("showCheckBox", function (vueObj) {
      if(vueObj.metaData.metaId == "C-QT-CUSTOM-0027") {
        vueObj.controlData.columnsValue.columns = listData;
        vueObj.currentColumns = listData;
      }
  });

  // 监听单选框的 inputRadio 事件
  vueData.$bus.on("inputRadio", function (busObj) {
    // 指定 是否协同采购 控件,
    if (busObj.metaData.metaId === "C-ERP-PURCHASE-0008") {
      if (busObj.value === "1") {
        // “是否协同采购”默认是，采购清单子表内容除名称和数量由拟稿人填写，其他均由采购小组人员填写。
        if (formStruct.parameters.nodeId === "0") {
          trueOrFalseListForChange (false)
        } else if (formStruct.parameters.nodeId === "tbfk9oa8D06FBe1") {
          // 采购小组审批节点可编辑
          trueOrFalseListForChange (true)
        }
      } else if (busObj.value === "-1") {
        // “是否协同采购”选择否，采购清单子表内容全部由拟稿人填写。
        if (formStruct.parameters.nodeId === "0") {
          allListForChange(true)
        } else if (formStruct.parameters.nodeId === "tbfk9oa8D06FBe1") {
          // 采购小组审批节点不可编辑
          allListForChange(false)
        }
      }
    }
    // 指定子表 是否固定资产 控件
    if (busObj.metaData.metaId === "C-QT-CUSTOM-0025") {
      listData = busObj.value === "1" ? listData1 : listData2;
    }
  });
  // 输入框 blurBus 事件
  vueData.$bus.on("blurBus", function (busObj) {
    // 自动计算各项之和（数量，单价）
    if (
      busObj.metaData.metaId === "C-QT-CUSTOM-0000" ||
      busObj.metaData.metaId === "C-QT-CUSTOM-0019"
    ) {
      calculateSum();
    }
  });
  // 监听子表新增 subFormAdd 事件
  vueData.$bus.on("subFormAdd", function (busObj) {
    if (busObj.subFormId === "220627143634ntIGxrlJ8dHr90RVOGZ") {
      initialize()
    }
  });
  // 监听子表删除 subFormDelete 事件
  vueData.$bus.on("subFormDelete", function (busObj) {
    if (busObj.subFormId === "220627143634ntIGxrlJ8dHr90RVOGZ") {
      initialize()
      calculateSum();
    }
    //
  });
};
export default exportObj;
