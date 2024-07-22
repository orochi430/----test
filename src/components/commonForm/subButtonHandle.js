// 所有子表特殊按钮 
// param为按钮配置的参数字符串
export default {
  methods: {
    // 督办子任务 保存主表后进行类别转换跳转新表单
    DBsubForm(param) {
      function saveCallback(VueData) { // VueData为commonForm的vue对象
        dsf.http.post('fn/convert/moduleRuleConvert', {
          convertId: "210807173604X5XSzA4sBEKDTXEgYWN",
          initDataSource: 1,
          srcInfo: VueData.formParams.pk
        }).then(res => {
          if (res.data.code == 200) {
            let specialSaveObj = JSON.stringify({ relationId: VueData.formParams.pk })
            if (!VueData.$route.params.pk) { // 拟稿情况下先将路由替换成带pk的，否则跳转后再返回又到新的拟稿表单
              VueData.$router.replace({
                path: `/commonForm/${VueData.moduleId}/${VueData.formParams.pk}`,
                query: VueData.$route.query
              })
            }
            VueData.$router.push({
              path: `/commonForm/${res.data.data.moduleId}/${res.data.data.pk}`,
              query: {
                specialSaveObj: specialSaveObj,
                endDate: VueData.formData.main['C-DB-0052'].value,
                initDataSource: 1,
                listId: '210807171452Aq5XM4u7yTrwKPu4MAy',
                method: 'maintenanceData'
              }
            })
          }
        })
      }
      this.$bus.emit("saveFormBus", {
        metaData: this.metaData,
        callback: saveCallback
      });
    },
    showRestVacations(param) {//大事务子表按钮查看假期余额
      let content = '<div style="padding: 20px"><font size="5px"> 公休剩余天数: <font color="red">' +
        this.topformData.main["C-LEAVE-0019"].value + '</font> <br>调休剩余天数：<font color="red"> ' +
        this.topformData.main["C-LEAVE-0011"].value + '</font></font></div>'
      this.$dialog.alert({
        title: '',
        message: content,
      }).then(() => { });
    },
    importWork(param) { // 一体化工作周报 导入最近计划
      dsf.http.post('ctrl/integration/workPlan/getLatestPlan', { pk: this.topformMeta.parameters.pk }).then(res => {
        if (res.data.code == 200) {
          let length = res.data.data.length
          if (length > 0) {
            this.addMultipleCard(length).then(newDataArr => {
              for (let i = 0; i < newDataArr.length; i++) {
                this.$set(newDataArr[i], 'B0060', res.data.data[i]['B0060'])
                this.$set(newDataArr[i], 'C-LASTWEEK-WORK-SUB-0001', res.data.data[i]['C-LASTWEEK-WORK-SUB-0001'])
                this.$set(newDataArr[i], 'C-LASTWEEK-WORK-SUB-0002', res.data.data[i]['C-LASTWEEK-WORK-SUB-0002'])
              }
            })
          }

        }
      })
    },
    "xform.saveFormTemporarily"() {
      console.log(this);
      this.$bus.emit("saveFormBus", { isTemp: true })
    }
  }
}