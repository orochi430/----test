<template>
    <div class="card" :style="{height: `calc(100vh - ${$store.state.isShowAppHeader ? '1.32rem' : '0px'})`}">
        <div><van-field v-model="title" label="标题"/></div>
        <div v-if="type == 1" class="preview-box">
            <div class="pageContainer"></div>
        </div>
        <div v-else class="memo-edit">
            <textare-edit v-if="content || isAdd > 0" :textarea-text-val="content" @textareaText="getTextValue"></textare-edit>
        </div>
        <!-- 表单富文本保存按钮 -->
        <div v-if="type == 2">
            <van-button type="primary" block @click="save">保存</van-button>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import SignatureMobile from '@/common/signatureMobile/SignatureMobile.esm.js'
import textareEdit from "@/components/documentCenter/testEdit"
import('@/common/signatureMobile/style/signatureMobile.min.css')
export default {
    components: { textareEdit },
    data() {
        return {
        title: '',
        content: '',
        signMobile: null,
        allNotionData: [], //全部用户的全部图层数据
        currentUserNotionData: [], //当前用户的全部图层数据
        addNotionData: [], //全部的增页图层数据
        currentScrollDom: 0, // 当前滚动到某页的dom
        papersId: this.$route.query.fileId,
        isAdd: this.$route.query.isAdd || -1,
        meetingId: dsf.util.loadSessionStore("meeting").id,
        handwriting: this.$route.query.handwriting || 1,
        type: this.$route.query.type
        }
    },
    mounted () {
        if (this.type == 1) this.initSignatureMobile();
        else if (this.isAdd < 0) this.getMemorandum()
    },
    methods: {
        initSignatureMobile(selector) {
            if (!selector) {
                selector = "pageContainer";
            }
            //参数1：载体dom，目前只支持传null，传null会直接把dom插到body根目录，使用fiexd定位
            //参数2：是否横屏，true:横屏模式，false：竖屏模式
            //参数3：手写签批配置项，暂时为{}即可，无需传其他参数
            //参数4：画板载体集合，只适用于竖屏
            //参数5：是否开启遮罩，只适用于竖屏，暂无效
            this.signMobile = new SignatureMobile(document.querySelector('.preview-box'), false, {}, document.querySelectorAll("." + selector), false,{
                isAutoSign: false,
                zoomNum: 1,
                ispad: dsf.util.getClientType() == 'iPad' ? true : false,
                autographObject: {
                    fontFamily: '',
                    fontSize: '',
                    color: ''
                }
            });
            //设置要隐藏的工具栏，使用索引方式，从0开始
            this.signMobile.hiddenToolIndexList = [2, 4];
            //签名展示模式（canvas则是使用canvas绘制，其他则是使用图片+文本拼接）
            this.signMobile.autographType = "canvas";
            //多画板签批情况下的层级
            this.signMobile.baseZIndex = 99999;
            if (1 == this.handwriting) {
                $("#headerDiv").show();
            } else {
                $("#demo").css("height", "100vh")
            }
            //当前签批显示的元素起始索引
            this.signMobile.currentElementDataStartZIndex = 999;
            if (1 == this.handwriting) {
                this.signMobile.show();
                //设置默认选中的tab，设置index(签批：1，文字：2，签名：3)
                this.signMobile.currentTabIndex = -1;
            }
            //增加了使用具体像素转换，可以传宽度和高度，不传会自动获取宽高
            //参数1：width:number|null
            //参数2：height:number|null
            this.signMobile.setContainerWH();
            // getCurrentUserOpinionList();
            //签名图片
            // getCurrentUserSignatureInfo();
            // setOpinionEdit();
            // setOpinionAdd();
            // setOpinionDel();
            this.setAddsheets(selector);
            this.setCompleteHandle();
            if(this.isAdd < 0) this.getAllNotionData(selector);
            //获取所有增页信息

            //返回点击回调事件（返回{e:MouseEvent}）
            /*this.signMobile.backHandle = function (object) {

            }*/
            //批注记录点击回调事件（返回{e:MouseEvent}）
            /*this.signMobile.recordHandle = function (object) {
                dsf.layer.toast("点击了批注记录暂未实现");
            }*/

            //设置工具栏样式
            this.setToolbarStyle();

            $(".preview-box").on('scroll', function(outE){
                $('.pageContainer').each(function (i, ele) {
                        if (outE.target.scrollTop >= ($(ele).outerHeight(true) * i)) {
                            this.currentScrollDom = i;
                        }
                    })
            })
        },
        getAllNotionData(selector) {
            let loading = dsf.layer.loading()
            let data = {
                //papersPage: "",
                id: this.papersId,
                //addPageId: "",
            }
            dsf.http.post("fn/conferenceMemorandum/getMemorandum", data).then((res) => {
                dsf.layer.closeLoading(loading)
                if (res.data.type == 'success') {
                    let data = res.data.data;
                    if (this.isAdd > 0) {
                        this.title = ''
                    } else {
                        this.title = data.bt
                    }
                    if (data.content) {
                        let content = JSON.parse(data.content);
                        console.log(data.content);
                        content.forEach(item => {item.isSelf = true})
                        let addPageData = [];
                        addPageData = addPageData.concat(content.filter(function(_item, index) {
                            return _item.addPageId != '';
                        }))
                        this.loadAddPage(addPageData, selector);
                        this.signMobile.initCurrentData(content);
                    }
                } else {
                    dsf.layer.toast("获取失败");
                }
            });
        },
        loadAddPage(addPageData, selector) {
            let self = this;
            addPageData.forEach(function(item) {
                let addPageId = item.addPageId;
                if (addPageId && addPageId != "" && document.querySelectorAll(".addpage-" + addPageId).length == 0) {
                    let pageItem = document.querySelector('.' + selector);
                    let newPageElement = pageItem.cloneNode(true); //深拷贝一页的dom
                    newPageElement.dataset.pid = addPageId; //设置增页id
                    newPageElement.dataset.new = '1'; //标记是增页
                    newPageElement.innerHTML = '';
                    newPageElement.style.position = "relative";
                    if (item.isSelf) {
                        let deleteButton = document.createElement("div");
                        deleteButton.className = "delete-page-btn";
                        deleteButton.style.position = "absolute";
                        deleteButton.style.zIndex = "999";
                        deleteButton.style.right = "0";
                        deleteButton.style.top = "0";
                        deleteButton.style.background = "#C33E32";
                        deleteButton.style.width = "90px";
                        deleteButton.style.height = "28px";
                        deleteButton.style.color = "#FFFFFF";
                        deleteButton.style.textAlign = "center";
                        deleteButton.style.fontSize = "14px";
                        deleteButton.style.cursor = "pointer";
                        deleteButton.style.lineHeight = "28px";
                        deleteButton.style.zIndex = 99999;
                        deleteButton.innerHTML = "删除增页";
                        $(deleteButton).click(self.deletePageHandler).mousedown(function(e) {
                            e.stopPropagation();
                        });
                        if (1 == self.handwriting) {
                            newPageElement.append(deleteButton); //添加删页按钮
                        }
                    }
                    let pagesList = document.querySelector(".preview-box"); //.pdfViewer
                    if (!pagesList) {
                        pagesList = document.querySelector(".svgWrapper");
                    }
                    pagesList.appendChild(newPageElement);
                    if (item.isSelf) {
                        var board = self.signMobile.newChildBoard(newPageElement, false, '', item.addPageId, {
                            addPageId: item.addPageId,
                            papersPage: "",
                            isChild: true
                        });
                    }
                }
            });
        },
        //添加增页按钮
        setAddsheets(selector) {
            let self = this
            self.signMobile.addsheetsHandle = function(val) {
                let currentLength = document.querySelectorAll('[data-new="1"]').length;
                let data = {
                    papersId: this.papersId,
                    showOrder: currentLength + 1
                }
                let loading = dsf.layer.loading()
                dsf.http.post("fn/hm/addPage/save", data).then((res) => {
                    if (res.data.type == 'success') {
                        // createNewPageContainer(selector, res.data)
                        dsf.layer.closeLoading(loading)
                        self.createNewPageContainer(selector,res.data.data, {
                            target: self.currentScrollDom,
                            site: val.val,
                            pid: ''
                        })
                    } else {
                        dsf.layer.toast("操作失败");
                    }
                });
            }
        },
        createNewPageContainer(selector, data, addPosition) {
            let pageItem = document.querySelector('.' + selector);
            let newPageElement = pageItem.cloneNode(true); //深拷贝一页的dom

            newPageElement.dataset.pid = data.id; //设置增页id
            newPageElement.dataset.new = '1'; //标记是增页
            newPageElement.innerHTML = '';
            let deleteButton = document.createElement("div");
            deleteButton.className = "delete-page-btn";
            deleteButton.style.position = "absolute";
            deleteButton.style.right = "0";
            deleteButton.style.top = "0";
            deleteButton.style.background = "#C33E32";
            deleteButton.style.width = "90px";
            deleteButton.style.height = "28px";
            deleteButton.style.color = "#FFFFFF";
            deleteButton.style.textAlign = "center";
            deleteButton.style.fontSize = "14px";
            deleteButton.style.cursor = "pointer";
            deleteButton.style.lineHeight = "28px";
            deleteButton.style.zIndex = 9999;
            deleteButton.innerHTML = "删除增页";
            $(deleteButton).click(this.deletePageHandler).mousedown(function(e) {
                e.stopPropagation();
            });
            if (1 == this.handwriting) {
                newPageElement.appendChild(deleteButton); //添加删页按钮
            }
            let pagesList = document.querySelector('.preview-box'); //.pdfViewer
            if (!pagesList) {
                pagesList = document.querySelector(".svgWrapper");
            }
            let dom = null

            switch (addPosition.site) {
                case '1':
                    dom = document.querySelectorAll('.pageContainer')[addPosition.target]
                    pagesList.prepend(newPageElement); //插入首页
                    addPosition.pid = dom.getAttribute('data-pid')
                    break;
                case '2': // 插入页前
                    dom = document.querySelectorAll('.pageContainer')[addPosition.target]
                    pagesList.insertBefore(newPageElement, dom)
                    addPosition.pid = dom.getAttribute('data-pid')
                    break
                case '3': // 插入页后
                    let pageContainer = document.querySelectorAll('.pageContainer')
                    if(pageContainer[addPosition.target + 1]){
                        let domAfter = pageContainer[addPosition.target + 1]
                        pagesList.insertBefore(newPageElement, domAfter)
                        addPosition.pid = domAfter.getAttribute('data-pid')
                    }else{
                        pagesList.appendChild(newPageElement); //插入尾页
                    }

                    break
                case '4':
                    pagesList.appendChild(newPageElement); //插入尾页
                    break
            }

            newPageElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            });
            this.signMobile.newChildBoard(newPageElement, false, '', data.id,{
                addPosition: addPosition
            });
            dsf.layer.toast("添加增页成功");

        },

        deletePageHandler(e) {
            let target = e.currentTarget.parentElement;
            //删除增页
            dsf.http.post("fn/hm/addPage/del", { id: target.dataset.pid }).then((res) => {
                if (res.data.type == 'success') {
                    this.signMobile.deleteChildBoard(target);
                    target.remove();
                    dsf.layer.toast("删除成功");
                } else {
                    dsf.layer.toast("删除失败");
                }
            });
        },

        setCompleteHandle() {
            let self = this;
            self.signMobile.completeHandle = function(result) {
                // alert(JSON.stringify(result))
                // console.log(result)
                // return;
                $(".svgWrapper").css("margin-top", "0px");
                // let data = {
                //     "imgData": "",
                //     "type": 3,
                //     "content": '',
                //     "this.papersId": this.papersId,
                //     "flowId": flowId,
                //     "nodeId": nodeId,
                //     "packetContent": JSON.stringify(result)
                // };
                let data = {
                    id: self.papersId,
                    bt: self.title || '暂无标题',
                    content: JSON.stringify(result),
                    meetingId:self.meetingId
                };

                if (self.currentUserNotionData && self.currentUserNotionData.length > 0) {
                    data["id"] = self.currentUserNotionData[0].id; //传id为update,不传为insert
                }
                self.saveNotion(data);
            }
        },

        //保存图层的方法
        saveNotion(data) {
            let self = this;
            let loading = dsf.layer.loading()
            dsf.http.post("fn/conferenceMemorandum/saveMemorandum", data).then((res) => {
                dsf.layer.closeLoading(loading)
                $("#demo").css("height", "100vh");
                $("#headerDiv").hide();
                $(".delete-page-btn").hide();
                if (res.data.type == 'success') {
                    console.log(res);
                    dsf.layer.toast("保存成功", true, () => {
                        $("#headerDiv").hide();
                        self.$router.back()
                    });
                } else {
                    dsf.layer.toast("保存失败");
                }
            });
        },
        setToolbarStyle() {
        if (window.screen.width > window.screen.height) {
            $(".smt-tab, #headerDiv").css("height", "14.8vh");
            $(".smt-tab-item div").css("font-size", "3.47vh");
            $(".smt-tab-item").css("padding-top", "2vh");
        }
        $(".smib-opinion-btn, .smib-opinion-save-btn").css("display", "none");
        },
        // 表单富文本模式
        //获取富文本编辑器内容
        getTextValue(value) {
            this.content = value
        },
        getMemorandum() {
            let loading = dsf.layer.loading()
            dsf.http.post('fn/conferenceMemorandum/getMemorandum', {id: this.papersId}).then(res => {
                if (res.data.type == 'success') {
                    this.title = this.isAdd > 0 ? '' : res.data.data.bt
                    this.content = res.data.data.content
                } else {
                    dsf.layer.toast(res.data.message)
                }
            }).always(() => {
                dsf.layer.closeLoading(loading)
            })
        },
        save() {
            dsf.http.post("fn/conferenceMemorandum/saveMemorandum", {
                id: this.papersId,
                meetingId: this.meetingId,
                bt: this.title,
                content: this.content,
                type: 2
            }).then((res) => {
                if (res.data.type == 'success') {
                    dsf.layer.toast("保存成功", true, () => {
                        this.$router.back()
                    });
                } else {
                    dsf.layer.toast("保存失败");
                }
            });
        }
    }
}
</script>
<style lang='scss' scoped>
.card {
  margin: 10px;
  background-color: #fff;
  box-shadow: 0 1px 20px 4px rgba(191,191,191,0.26);
  border-radius: 7px;
//   overflow: hidden;
  display: flex;
  flex-direction: column;
  .van-field {
    align-items: center;
    padding-bottom: 0;
    ::v-deep .van-field__label {
      width: auto;
    }
    ::v-deep .van-field__value {
      background: #FBFBFB;
      border: 1px solid rgba(198,198,198,1);
      border-radius: 4px;
      padding: 8px;
    }
  }
  .preview-box {
    flex: 1;
    overflow: auto;
    margin: 16px;
    .pageContainer {
      height: 100%;
      background: #FBFBFB;
      border: 1px solid rgba(198,198,198,1);
      border-radius: 4px;
      &:nth-last-child(1) {
        margin-bottom: 100px;
      }
      // margin: 16px;
    }
  }
}
</style>
<style lang="scss">
.memo-edit {
    padding: 16px;
    flex: 1;
    overflow: hidden;
    > div {
        height: 100%;
    }
    .quill-editor {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .ql-container {
        flex: 1;
        overflow: hidden;
        .ql-editor {
            height: 100%;
        }
    }
}
</style>
