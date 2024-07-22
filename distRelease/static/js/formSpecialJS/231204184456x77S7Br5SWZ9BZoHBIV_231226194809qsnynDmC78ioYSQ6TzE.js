// 一体化市教委--建议提案表单
(function () {
  const exportObj = {}
  exportObj.initHandle = function (formData, formStruct, vueData) {
    MajorSender()
    function MajorSender(){  //意见痕迹
      dsf.http
      .post("ctrl/suggestionProposal/isMajorSender", {
        pk: formStruct.parameters.pk,
      })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.code == "200"&&res.data.data) {
          getModifiedOpinion(formData, formStruct, vueData)
        }else{
          formStruct.controls.forEach((item) => {
            item.metaId == "C-JYTA-0077"
              ? vueData.$set(item, "show", 0)
              : ""; //意见痕迹
          });
        }
      });
    }

    function getModifiedOpinion(formData, formStruct, vueData){  //获取意见痕迹
      dsf.http
      .post("ctrl/suggestionProposal/getModifiedOpinion", {
        pk: formStruct.parameters.pk,
      })
      .then((res) => {
        if (res.data.code == "200") {
          vueData.$set(formData.main, "C-JYTA-0077", {value: res.data.data});
        }
      });
    }

    if (formData.main["C-JYTA-0081"]&&!formData.main["C-JYTA-0081"].value) {
      dsf.http
      .post("ctrl/suggestionProposal/getDeadlineDay", {
        week: formData.main['C-JYTA-0072'].value,
      })
      .then((res) => {
        if (res.data.code == "200") {
            vueData.$set(formData.main, "C-JYTA-0081", {value: res.data.message});
        }
      });
    }

    if (formData.main["C-JYTA-0082"]&&!formData.main["C-JYTA-0082"].value) {
      dsf.http
      .post("ctrl/suggestionProposal/getDeadlineDay", {
        week: formData.main['C-JYTA-0073'].value,
      })
      .then((res) => {
        if (res.data.code == "200") {
            vueData.$set(formData.main, "C-JYTA-0082", {value: res.data.message});
        }
      });
    }
  }
  function getChooseUserId(obj){
    if(obj && obj.checkedUserList){
        var nodeArr = obj.checkedUserList
        if(nodeArr && nodeArr.length>0){
            var rslt = '';
            for(var i=0;i<nodeArr.length;i++){
                var sid = nodeArr[i].UserID;
                if(sid){
                    if(i>0){
                        rslt+=',';
                    }
                    rslt+=sid;
                }
            }
            return rslt;
        }
    }
    return null;
  }
  exportObj.beforeRealSend = function(data, vueData) {
    return new Promise((resolve, reject) => {
      let nodeId = vueData.formMeta.parameters.nodeId
      console.log(data)
      if(nodeId == 'XA0wASbLnJDq7rc'){
        //主办处长
        if(data && data.length>0){
            var hasXbfc = false; //协办副处
            var hasFc = false; //是否有副处
            var xbfcUserId = '';
            var fcUserId = '';
            var hasXbry = false; //协办人
            var hasZbry = false;//是否有主办人
            var xbryUserId = '';
            var zbryUserId = '';
            for(var i=0;i<data.length;i++){
                var obj = data[i];
                if(obj && obj.lineID && obj.lineID == 'jcy7yigJZb5HfdS'){
                    hasXbfc = true;
                    xbfcUserId = getChooseUserId(obj);
                }
                if(obj && obj.lineID && obj.lineID == 'OkV6bgiEotISueG'){
                    hasXbry = true;
                    xbryUserId = getChooseUserId(obj);
                }

                if(obj && obj.lineID && obj.lineID == 'Xwm5PYeYGttnwRS'){
                    hasFc = true;
                    fcUserId = getChooseUserId(obj);
                }
                if(obj && obj.lineID && obj.lineID == 'yxFCTS1VARGWrkP'){
                    hasZbry = true;
                    zbryUserId = getChooseUserId(obj);
                }
            }

            if(hasFc && hasZbry ){
                dsf.layer.toast("不能同时发送副处与办理人员!");
                return false;
            }

            if(hasXbfc){
                //有协办副处 必须有副处，并且选择的人不同
                if(hasFc){
                    if(xbfcUserId.indexOf(fcUserId)>-1){
                        dsf.layer.toast("协办副处环节人员与副处环节人员不能为同一人!");
                        return false;
                    }
                }else{
                    dsf.layer.toast("选择协办副处环节同时必须选择副处环节!");
                    return false;
                }
            }

            if(hasXbry){
                if(hasZbry){
                    if(xbryUserId.indexOf(zbryUserId)>-1){
                        dsf.layer.toast("协办人员环节人员与办理人员环节人员不能为同一人!");
                        return false;
                    }
                }else{
                    dsf.layer.toast("选择协办人员环节同时必须选择办理人员环节!");
                    return false;
                }
            }
        }
    }else if(nodeId == 'BGHYBunEVkbE56g'){
        //会办处长

        if(data && data.length>0){
            var hasXbfc = false; //协办副处
            var hasFc = false; //是否有副处
            var xbfcUserId = '';
            var fcUserId = '';
            var hasXbry = false; //协办人
            var hasZbry = false;//是否有主办人
            var xbryUserId = '';
            var zbryUserId = '';
            var hasNq = false; //内勤
            for(var i=0;i<data.length;i++){
                var obj = data[i];
                if(obj && obj.lineID && obj.lineID == 'ELuo0KtvzPbqgo1'){
                    hasXbfc = true;
                    xbfcUserId = getChooseUserId(obj);
                }
                if(obj && obj.lineID && obj.lineID == 'TnOFutmDwEejQCL'){
                    hasXbry = true;
                    xbryUserId = getChooseUserId(obj);
                }

                if(obj && obj.lineID && obj.lineID == '58mXzb6y8x6gkde'){
                    hasFc = true;
                    fcUserId = getChooseUserId(obj);
                }
                if(obj && obj.lineID && obj.lineID == 'k3svnLq4nfvZ9xE'){
                    hasZbry = true;
                    zbryUserId = getChooseUserId(obj);
                }
                if(obj && obj.lineID && obj.lineID == 'tKxFWjj26DXKodP'){
                    hasNq = true;
                }
            }

            if(hasFc && hasZbry ){
                dsf.layer.toast("不能同时发送副处与办理人员!");
                return false;
            }

            if(hasXbfc){
                //有协办副处 必须有副处，并且选择的人不同
                if(hasFc){
                    if(xbfcUserId.indexOf(fcUserId)>-1){
                        dsf.layer.toast("协办副处环节人员与副处环节人员不能为同一人!");
                        return false;
                    }
                }else{
                    dsf.layer.toast("选择协办副处环节同时必须选择副处环节!");
                    return false;
                }
            }
            if(hasXbry){
                if(hasZbry){
                    if(xbryUserId.indexOf(zbryUserId)>-1){
                        dsf.layer.toast("协办人员环节人员与主办人员环节人员不能为同一人!");
                        return false;
                    }
                }else{
                    dsf.layer.toast("选择协办人员环节同时必须选择主办人员环节!");
                    return false;
                }
            }
            if(hasNq){
                if(hasXbfc || hasFc || hasXbry || hasZbry){
                    dsf.layer.toast("选择处室内勤同时不能选择其他环节!");
                    return false;
                }
            }
        }
    }else if(nodeId == 'eO06jO8u1mQEJ9u'){
        //副处
        if(data && data.length>0){
            var hasXbry = false; //协办人
            var xbUserId = '';
            var hasZbry = false;//主办人
            var zbUserId = '';
            for(var i=0;i<data.length;i++){
                var obj = data[i];
                if(obj && obj.lineID && obj.lineID == 'bGNTwaH3s6teANV'){
                    hasXbry = true;
                    xbUserId = getChooseUserId(obj);
                }
                if(obj && obj.lineID && obj.lineID == 'DPWB0nBg7aOmhlH'){
                    hasZbry = true;
                    zbUserId = getChooseUserId(obj);
                }

            }

            if(hasXbry){
                if(hasZbry){
                    if(xbUserId.indexOf(zbUserId)>-1){
                        dsf.layer.toast("协办人员环节人员与办理人员环节人员不能为同一人!");
                        return false;
                    }
                }else{
                    dsf.layer.toast("选择协办人员环节同时必须选择办理人员环节!");
                    return false;
                }
            }
        }
    }else if(nodeId == 'cEyPsDkBYvKjUXW'){
        //副处（会办处室）
        if(data && data.length>0){
            var hasXbry = false; //协办人
            var xbUserId = '';
            var hasZbry = false;//主办人
            var zbUserId = '';
            var hasCz = false;//处长
            for(var i=0;i<data.length;i++){
                var obj = data[i];
                if(obj && obj.lineID && obj.lineID == 'OB3wSTgyzgMps0E'){
                    hasXbry = true;
                    xbUserId = getChooseUserId(obj);
                }
                if(obj && obj.lineID && obj.lineID == 'TgdAEfS0V639iDx'){
                    hasZbry = true;
                    zbUserId = getChooseUserId(obj);
                }

                if(obj && obj.lineID && obj.lineID == 'BKo91p4kjcHHxKu'){
                    hasCz = true;
                }

            }

            if(hasXbry){
                if(hasZbry){
                    if(xbUserId.indexOf(zbUserId)>-1){
                        dsf.layer.toast("协办人员环节人员与主办人员环节人员不能为同一人!");
                        return false;
                    }
                }else{
                    dsf.layer.toast("选择协办人员环节同时必须选择主办人员环节!");
                    return false;
                }
            }
            if(hasCz){
                if(hasXbry || hasZbry){
                    dsf.layer.toast("选择返回处长环节不能选择其他环节!");
                    return false;
                }
            }

        }
      }
      resolve()
    })
  }
  window.spJS = exportObj
})();
