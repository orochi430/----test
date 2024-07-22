//流程转交
function flowChangeUser({
  param,
  thenFun,
  catchFun,
  finallyFun
}) {
  let that = this,
    loader = dsf.layer.loading("转交中"),
    params = param || {
      pk: '1', //当前文件id
      pId: '1', //当前文件流程实例id
      pnId: '1', //当前环节id
      fromUserId: '1', //从哪个人移交，如果为空，使用当前人
      userId: '1', //要移交到的用户id
      userName: '1', //要移交到的用户姓名
      deptId: '1', //要移交到的用户部门id
      deptName: '1' //要移交到的用户部门名称
    }
  dsf.http.post("/fn/flow/changeUser", params)
    .then((res) => {
      if (res.data.type == "success"||res.type == "success") {
        dsf.layer.toast('转交成功', true);
        thenFun && thenFun(res, res);
      } else {
        dsf.layer.toast(res.data.message, false);
      }
    }).catch((e) => {
      catchFun && catchFun(e);
    }).finally((e) => {
      finallyFun && finallyFun(e);
      //loader && dsf.layer.closeLoading(loader)
    })
}
//督办转交
function superviseChangeUser({
  param,
  thenFun,
  catchFun,
  finallyFun
}) {
  let that = this,
    loader = dsf.layer.loading("转交中"),
    params = param || {
      pk: '1', //当前文件id
      userId: '1', //要移交到的用户id
    }
  dsf.http.get(`/fn/supervise/approval/transfer?pk=${params.pk}&userId=${params.userId}`, {})
    .then((res) => {
      if (res.data.type == "success"||res.type == "success") {
        dsf.layer.toast('转交成功', true);
      } else {
        dsf.layer.toast(res.data.message, false);
      }
      thenFun && thenFun(res, res);
    }).catch((e) => {
      catchFun && catchFun(e);
    }).finally((e) => {
      finallyFun && finallyFun(e);
      // loader && dsf.layer.closeLoading(loader)
    })
}
export default {
  flowChangeUser,
  superviseChangeUser
}