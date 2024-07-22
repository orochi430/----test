//政务微信 信息通报列表 点击列表进附件预览
(function (){
  const exportObj = {};
  exportObj.initHandle = function (vueData) {
    vueData.readStatusKey = 'XXBS_FWJL.230601155316AhhCZ7nIfqa8jZ0ZcHE'
    vueData.haveReadVal = 1
  }
  exportObj.link = function (listId, moduleId, pk, vueData, itemValue) {
      dsf.http.post("ctrl/reportReadLog/accessed", { infoId: pk }).then(res => {
      if (res.data.code == 200) {
        itemValue['XXBS_FWJL.230601155316AhhCZ7nIfqa8jZ0ZcHE'] = 1
      }
    })
        let params = {
            pk:pk,
            nrType:1
        }
        dsf.http.post("fn/editor/getAttachInfoData",params).then(({data})=>{
            let fileArray = data.data.fileArray
            if(fileArray.length!= 0){
                vueData.$router.push({
                    path:`/filePreview/${fileArray[0].fileId}/2202091645019EwnRvzIOtMjqPqi2a4`,
                    query:{
                        title: itemValue["XXTB.B0001"]
                    }
                })
            }else{
                dsf.layer.toast("暂无附件")
            }
        })
    }

    window.spListJS = exportObj;

})()
