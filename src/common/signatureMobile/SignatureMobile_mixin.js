import SignatureMobile from './SignatureMobile.min.js'
export default {
  data() {
    return {
      signMobile: null,
      allNotionData: [], //全部用户的全部图层数据
      currentUserNotionData: [], //当前用户的全部图层数据
      otherUserNotionData: [], //非当前用户的全部图层数据
      addNotionData: [], //全部的增页图层数据
      currentScrollDom: 0, // 当前滚动到某页的dom
    }
  },
  methods: {
    // 初始化签批插件
    initSignatureMobile(selector, SignatureMobileParameters, hiddenToolIndexList, isShowHeader, isShowOpinion) {
      let self = this;
      if (!selector) {
        selector = "pageContainer";
      }

      //参数1：载体dom，目前只支持传null，传null会直接把dom插到body根目录，使用fiexd定位
      //参数2：是否横屏，true:横屏模式，false：竖屏模式
      //参数3：手写签批配置项，暂时为{}即可，无需传其他参数
      //参数4：画板载体集合，只适用于竖屏
      //参数5：是否开启遮罩，只适用于竖屏，暂无效
      //参数6：isAutoSign是否自动署名 zoomNum:放大比例 ispad:是否pad端
      console.log(dsf.util.getClientType() == 'iPad')
      this.signMobile = new SignatureMobile(SignatureMobileParameters);
      // 展示列表时或弹出层显示时，工具栏距顶变为46px
      let topdistance = 0;
      if (dsf.config.appTopMenu && dsf.config.appTopMenu.value) topdistance = 46;
      document.querySelector('.smt-tab').style.top = JSON.stringify(this.isTabType ? topdistance + 50 : 46) + 'px';
      //设置要隐藏的工具栏，使用索引方式，从0开始
      this.signMobile.hiddenToolIndexList = hiddenToolIndexList || [];
      //签名展示模式（canvas则是使用canvas绘制，其他则是使用图片+文本拼接）
      this.signMobile.autographType = "canvas";
      //多画板签批情况下的层级
      this.signMobile.baseZIndex = 999;
      // $("#headerDiv").show();
      $("#demo").css("height", "100vh")
      //当前签批显示的元素起始索引
      this.signMobile.currentElementDataStartZIndex = 999;

      //显示顶部插件 (openHandwrite对应个人设置里面开启手写签批)
      if (isShowHeader) {
        // debugger
        this.signMobile.show();
        $("#headerDiv").show();
        $("#headerDiv").height($('.smt-tab').height());
      }
      //设置默认选中的tab，设置index(签批：1，文字：2，签名：3)
      this.signMobile.currentTabIndex = -1;
      //增加了使用具体像素转换，可以传宽度和高度，不传会自动获取宽高
      //参数1：width:number|null
      //参数2：height:number|null
      this.signMobile.setContainerWH();
      if (!hiddenToolIndexList?.includes(2)) {
        this.getCurrentUserSignatureInfo();
      }
      this.setAddsheets(selector);
      this.setCompleteHandle();
      if (isShowOpinion) {
        this.getCurrentUserOpinionList();
        this.setOpinionEdit();
        this.setOpinionAdd();
        this.setOpinionDel();
      }
      
      this.getAllNotionData(selector);
      // this.recordHandle();
    },
    //获取全部签批图层的数据
    getAllNotionData(selector) {
      let self = this;
      dsf.layer.loading();
      self.dsfLoading = dsf.layer.loading();
      var data = {
        papersId: self.curFileId, //文件id
        flowId: self.formInfo ? self.formInfo.flowId : (self.file.flowId ? self.file.flowId : ''),
        // nodeId: self.formInfo ? self.formInfo.nodeId : (self.file.nodeId?self.file.nodeId:''),
        userId: ""
      }
      dsf.http.get('fn/hm/notation/data/all', data)
        .then(res => {
          dsf.layer.closeLoading(self.dsfLoading);
          if (res && res.data && res.data.type == 'success') {
            var allData = res.data.data.all;
            var currentUserData = res.data.data.userData;
            var currentUserDataIds = currentUserData.map(item => item.id);
            var otherUserData = allData.filter(item => !currentUserDataIds.includes(item.id))
            self.insetChoosePeople(res.data.data); //批注人筛选
            var addPageData = [];
            allData.forEach(item => {
              var itemPacket = JSON.parse(item.packetContent);
              itemPacket.forEach((_item, num) => {
                // console.log(_item)
                _item.createUserId = item.createUserId;
                _item.isSelf = currentUserData.length == 0 ? false : item.createUserId == currentUserData[0].createUserId; //是否当前用户的增页
              });
              addPageData = addPageData.concat(itemPacket.filter(function (_item, index) {
                return _item.addPageId != '';
              }))
            });
            self.allNotionData = allData;
            self.currentUserNotionData = currentUserData;
            self.otherUserNotionData = otherUserData;

            self.addNotionData = addPageData;
            currentUserData.map(item => {
              if (item.packetContent && item.packetContent != "") {
                var packet = JSON.parse(item.packetContent); //全部画板的数据
                if (packet && packet.length > 0) {
                  console.log(packet, '打印自己');
                  packet.forEach(k => {
                    k.createUserId = item.createUserId
                    k.isSelf = currentUserData.length == 0 ? false : item.createUserId == currentUserData[0].createUserId
                    k.id = item.id
                  })
                }
                self.$set(item, 'packetContent', JSON.stringify(packet))
              }
              return item
            });
            //处理非自己的数据
            otherUserData.forEach(function (item, index) {
              if (item.packetContent && item.packetContent != "") {
                var packet = JSON.parse(item.packetContent); //全部画板的数据
                if (packet && packet.length > 0) {
                  console.log(packet, '打印其他');
                  packet.forEach(k => {
                    k.createUserId = item.createUserId
                    k.isSelf = currentUserData.length == 0 ? false : item.createUserId == currentUserData[0].createUserId
                    k.id = item.id
                  })
                }
                self.$set(item, 'packetContent', JSON.stringify(packet))
              }
            })
            self.renderCanvasData({
              currentUserData: currentUserData,
              otherUserData: otherUserData
            })
            self.$nextTick(() => {
              self.renderRecord(allData); //批注记录
            })

          } else {
            dsf.layer.toast("获取失败");
          }
        })
        .error(error => { })
        .always(() => {
          dsf.layer.closeLoading(self.dsfLoading);
        });
    },
    //插件的增页回调
    setAddsheets(selector) {
      let self = this;
      let _loading = dsf.layer.loading();
      self.signMobile.addsheetsHandle = function (val) {
        console.log(val)
        var currentLength = document.querySelectorAll('[data-new="1"]').length;
        var data = {
          papersId: self.curFileId,
          showOrder: currentLength + 1
        }
        dsf.http.get("fn/hm/addPage/save", data)
          .then(res => {
            if (res && res.data && res.data.type == 'success') {
              self.handleCreateNewPage(res.data.data, res.data.data.id, {
                addPosition: {
                  target: self.currentScrollDom,
                  site: val.val,
                  pid: ''
                },
                isMove: true,
                isSelf: true,
                isBack: false
              }, function () {
                dsf.layer.toast("增页成功");
                self.sortPageNum()
              })
            } else {
              dsf.layer.toast("操作失败");
            }
          })
          .error(error => { })
          .always(() => {
            dsf.layer.closeLoading(_loading);
          });
      }
    },
    //指定保存退出签批的回调(保存全部画板数据)
    setCompleteHandle(val) {
      let self = this;
      let pnId = (self.formMeta && self.formMeta.parameters && self.formMeta.parameters.pnId) ? self.formMeta.parameters.pnId : "";
      if (val) {
        // 表单发送时调用
        var result = self.signMobile.getAllData();
        var data = {
          "imgData": "",
          "type": 3,
          "content": '',
          "papersId": self.curFileId,
          "flowId": self.formInfo ? self.formInfo.flowId : (self.file.flowId ? self.file.flowId : ''),
          "nodeId": self.formInfo ? self.formInfo.nodeId : (self.file.nodeId ? self.file.nodeId : ''),
          "packetContent": JSON.stringify(result),
          "pnId": pnId
        };
        if (self.currentUserNotionData && self.currentUserNotionData.length > 0) {
          data["id"] = self.currentUserNotionData[0].id; //传id为update,不传为insert
        }
        if (self.isShowCurPerson || (self.formMeta && self.formMeta.parameters && self.formMeta.parameters.isShowCurPerson)) {
          self.saveNotion(data, val); //只显示当前人签批时直接保存
        } else {
          self.getCoverData(result, data)
        }
      } else {
        self.signMobile.completeHandle = function (result) {
          console.log(result, '保存数据');

          // let arr = result.map(item => {
          //     let res = JSON.parse(
          //         JSON.stringify(item).replace(/data/g, 'packetContent')
          //     );
          //     return res
          // })
          var data = {
            "imgData": "",
            "type": 3,
            "content": '',
            "papersId": self.curFileId,
            "flowId": self.formInfo ? self.formInfo.flowId : (self.file.flowId ? self.file.flowId : ''),
            "nodeId": self.formInfo ? self.formInfo.nodeId : (self.file.nodeId ? self.file.nodeId : ''),
            "packetContent": JSON.stringify(result),
            "pnId": pnId
          };
          if (self.currentUserNotionData && self.currentUserNotionData.length > 0) {
            data["id"] = self.currentUserNotionData[0].id; //传id为update,不传为insert
          }
          if (self.isShowCurPerson || (self.formMeta && self.formMeta.parameters && self.formMeta.parameters.isShowCurPerson)) { //
            self.saveNotion(data, val);
          } else {
            self.getCoverData(result, data)
          }
        }
      }
    },
    // 保存图层
    saveNotion(data, val) {
      let self = this;
      let packet = JSON.parse(data.packetContent);
      packet.forEach(ele => {
        ele['packetContent'] = ele.data;
        delete ele.data;
      });
      data.packetContent = JSON.stringify(packet);
      dsf.http.post("fn/hm/notation/save", data)
        .then(res => {
          $("#demo").css("height", "100vh");
          $("#headerDiv").hide();
          $(".delete-page-btn").hide();
          if (res && res.data && res.data.type == 'success') {
            dsf.layer.toast('保存成功', true, function () {
              self.goPreview();
            })
          } else {
            dsf.layer.toast("获取失败");
          }
        })
        .error(error => {
          console.log(error)
        })
        .always(() => { });
    },
    //获取当前用户常用意见列表
    getCurrentUserOpinionList() {
      let self = this;
      dsf.http.post("fn/hm/customOpinion/list", {}).then(res => {
        if (res && res.data && res.data.code == 0) {
          self.signMobile.opinionList = res.data.data;
        }
      });
    },
    // 获取签名信息
    getCurrentUserSignatureInfo() {
      let self = this;
      dsf.http.get("fn/hm/sign/config", {}).then(res => {
        if (res && res.data && res.data.type == 'success') {
          self.signConfigObj = res.data.data;
          console.log(self.signConfigObj)
          if (res.data.data.imageData && res.data.data.imageData != "") {
            self.signMobile.autographImage = res.data.data.imageData;
          } else {
            self.signMobile.autographFont = res.data.data.signUserName
          }
          self.signMobile.autographDate = res.data.data.signTimeShort;
          self.signMobile.autographDateFont = "18px STKaiti";
          //签名展示模式（canvas则是使用canvas绘制，其他则是使用图片+文本拼接）
          self.signMobile.autographType = "canvas";
        }
      });
    },
    // 常用意见保存
    customOpinionSave(object) {
      let self = this;
      dsf.http.post("fn/hm/customOpinion/save", object)
        .then(result => {
          if (result && result.data && result.data.msg == 'success') {
            dsf.layer.toast("保存成功");
            self.signMobile.opinionList = result.data.list;
          } else {
            dsf.layer.toast("操作失败");
          }
        });
    },
    //指定常用意见的编辑回调
    setOpinionEdit() {
      let self = this;
      self.signMobile.opinionEditHandler = function (object) {
        self.customOpinionSave(object)
      }
    },
    // 添加常用意见模板
    setOpinionAdd() {
      let self = this;
      self.signMobile.opinionAddHandler = function (object) {
        self.customOpinionSave(object)
      }
    },
    // 常用意见删除
    setOpinionDel() {
      let self = this;
      self.signMobile.opinionDelHandler = function (object, fn) {
        // console.log(object)
        dsf.layer.confirm({
          message: '确定要删除意见吗？',
          className: 'delDialog',
        }, () => {
          fn(true)
          dsf.http.get("fn/hm/customOpinion/del", {
            "id": object.id
          }).then(res => {
            if (res && res.data.msg == 'success') {
              dsf.layer.toast("删除成功");
            } else {
              dsf.layer.toast("删除失败");
            }
          })
        }, () => {
          fn(false)
        })
      }
    },
  }
}