
// 【再担保OA与财务系统对接项目】
const exportObj = {};

// 回收按钮
exportObj.recovery = function (btn, vueData) {
  console.log(btn, vueData.data);
  let data = btn.dataValue
  let id = data.A0001;
  let url = 'fn/collect/recovery';
  debugger
  dsf.http.post(url, { 'id': id }).then((result) => {
    dsf.layer.toast('回收成功！')
    vueData.$eventBus.refresh(vueData)

  })
};
//发送按钮
exportObj.send = function (btn, vueData) {
  console.log(btn, vueData);
  let data = btn.dataValue
  let id = data.A0001
  let url = 'fn/collect/send';
  dsf.http.post(url, { 'id': id }).then((result) => {
    dsf.layer.toast('发送成功！')
    setTimeout(function () {
      vueData.$eventBus.refresh(vueData)
    }, 1000)
  })
};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
  // 判断当前文件状态接口
  let url = 'fn/collect/bdzt';
  dsf.http.post(url, { 'id': pk }).then((result) => {
    console.log(result);
    let type = result.data.message;
    //listId 对应 类List_ 后面的值
    //method 对应 类的方法名
    //pk     对应业务数据主键
    vueData.$router.push({
      name: "commonForm",
      params: {
        moduleId: '220401101744dfdsGX6lJoVuDOW0Z6s',
        pk: pk
      },
      query: {
        listId: "2204011037317J0ANrBJIGcmQFm8MQN",
        method: "viewList"
      }
    })
    // 用户回收二次编辑修改后，列表只显示发送按钮，发送后，未提交状态（3）改成待汇总（1）；
    // 发送后状态由编辑到查看环节。
    if ("3" == type) {
      vueData.$router.push({
        name: "commonForm",
        params: {
          moduleId: '220401101744dfdsGX6lJoVuDOW0Z6s',
          pk: pk
        },
        query: {
          listId: "2204011037317J0ANrBJIGcmQFm8MQN",
          method: "bjList"
        }
      })
    }
  })


};

exportObj.createRow = function (btn, vueData) {
 dsf.http.post("/ctrl/collect/querybm").then(data=>{
 if (data.data.data > 1) {
  dsf.http.post("/ctrl/collect/rbtxbm").then(res => {
    let len = res.data.data.length;
    if (len > 0) {
      let content = "";
      let str = "";
      let promiseArray = [];
      res.data.data.forEach(item => {
        //将异步请求封装进promise
        let p = new Promise(function(resolve, reject) {
          dsf.http
            .post("/ctrl/collect/typeData", { typeId: item })
            .then(res => {
              setTimeout(() => {
                str += `<span id='${item}' style="font-size: 16px;padding: 10px 0px;">${res.data.data[0]}</span>`;
                resolve(str);
              }, 1);
            });
        });
        //数组中放入
        promiseArray.push(p);
      });
      //forEach结束后执行(因为forEach里面是异步操作)
      Promise.all(promiseArray).then(res => {
        content = `<p id='dialogP' style='display: flex; flex-direction: column;'>${str}<p/>`;
        vueData.$dialog.confirm({
          title: "请选择部门",
          showConfirmButton: false,
          showCancelButton: false,
          closeOnClickOverlay: true,
          message: content
        });
        vueData.$nextTick(() => {
          // 给每个a标签添加点击事件
          //事件绑定方法
          function bindEvent(elem, type, fn) {
            elem.addEventListener(type, fn);
          }
          //获取父级元素
          let dialogP = document.getElementById("dialogP");
          // 给父级元素添加绑定事件
          bindEvent(dialogP, "click", event => {
            event.preventDefault();
            console.log(event);
            const target = event.target;
            console.log(target.id);
            // 是否填报校验接口
            dsf.http.post("/fn/collect/rbtxyf", { orgId: target.id }).then(res => {
                if (res.data.code == 200) {
                  if (res.data.message == 0) {
                    // 未填写
                    vueData.$dialog.close();
                    vueData.$router.push({
                      name: "commonForm",
                      params: {
                        moduleId: vueData.moduleId
                      },
                      query: {
                        draftOrgId: target.id
                      }
                    });
                  } else {
                    // 已填写
                    dsf.layer.toast("此部门今日已填写日报,请勿重复填写！");
                  }
                }
              }).error(function(message) {
                dsf.layer.toast(message);
              });
          });
        });
      });
    } else{
      dsf.layer.toast("所有部门今日均已填写日报，请勿重复填写")
    }
  });
 }else{
  vueData.$router.push({
    name: "commonForm",
    params: {
      moduleId: vueData.moduleId,
    }
  })
 }
 })


}

export default exportObj;