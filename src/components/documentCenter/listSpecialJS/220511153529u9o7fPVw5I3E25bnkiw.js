import dsf from "../../../common";

//上海地产原始房源列表JS
const exportObj = {};

exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: moduleId,
      pk: pk
    },
    query:{
      listId :"220511153529u9o7fPVw5I3E25bnkiw",
      validateByList:1,
      method:vueData.params.method
    }
  });
}

exportObj.init = function (vueData) {
  vueData.confirmCheckFuc = (data) => {
    console.log(data)
    let params = {
      pks: []
    }
    data.forEach(element => {
      params.pks.push(element.dataValue["A0001"])
    });
    dsf.http.post("fn/fygl/spaceConfirm", params).then(res => {
      console.log(res)
      if (res.data.flag == "true") {
        function subdata(status) {
          let remark = document.getElementById("remarktxt").value
          dsf.http.post("fn/resSpace/changeStatus", { pks: params.pks, type: status, remark: remark }).then(({ data }) => {
            document.getElementById("remarktxt").value = ""
            if (data.action == "refreshList") {
              dsf.layer.toast(data.message);
              setTimeout(() => {
                vueData.showCheck = false
                vueData.checkList.forEach((item) => {
                  item.checked = false
                })
                vueData.checkList = []
                vueData.onRefresh()
              }, 1000);
            } else {
              vueData.showCheck = false
              vueData.checkList.forEach((item) => {
                item.checked = false
              })
              vueData.checkList = []
            }

          })
        }
        dsf.layer.confirm({
          title: '房源确认申请',
          message: '<div style="border:1px solid #CFCFCF"><textarea id="remarktxt" rows="3" placeholder="请填写发布备注" class="van-field__control" style="height: 66px;"></textarea></div>',
          confirmButtonText: '拟发布',
          cancelButtonText: '拟不发布',
          cancelButtonColor: "black",
          closeOnClickOverlay: true,
          allowHtml: true
        }, () => {
          subdata("1")
        }, () => {
          subdata("-1")
        })
      }
    }).error(function (message) {
      dsf.layer.toast(message);
    })
  }
}
exportObj.spaceComfirm = function (btn, vueData) {
  vueData.showCheck = true;
}

export default exportObj;
