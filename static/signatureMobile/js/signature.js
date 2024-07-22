layui.use(['layer'], function() {
    var layer = layui.layer;
    initSignatureMobile();
});

var papersId = DSF.getURLParam("fileId");
var flowId = DSF.getURLParam("flowId") || "0";
var nodeId = DSF.getURLParam("nodeId") || "-1";
var showhw = DSF.getURLParam("showhw") || -1;
var handwriting = DSF.getURLParam("handwriting") || 1;
$(function() {
    var previewType = DSF.getURLParam("previewType");
    if ("ofd" == previewType && (1 == handwriting || 1 == showhw)) {
        if (1 == handwriting) {
            $(".svgWrapper").css("margin", "12vh auto");
        }

        initSignatureMobile('svgItem');
    }
});
var signMobile = null;
var currentUserNotionData = []; //当前用户的全部图层数据
var otherUserNotionData = []; //非当前用户的全部图层数据
var addNotionData = []; //全部的增页图层数据

//获取当前用户常用意见列表
function getCurrentUserOpinionList() {
    DSF.Utils.ajaxRequest("fn/hm/customOpinion/list", {}, function(res) {
        if (res && res.code == 0) {
            signMobile.opinionList = res.data;
        }
    });
}

//获取签名信息
function getCurrentUserSignatureInfo() {
    //签名图片
    var configUrl = DSF.getURLRoot(`ajax`) + "fn/hm/sign/config";
    $.ajax({
        url: configUrl,
        type: "get",
        success: function(result) {
            if (result && "success" == result.type) {
                if (result.data.imageData && result.data.imageData != "") {
                    signMobile.autographImage = result.data.imageData;
                }
                signMobile.autographDate = result.data.signTimeShort;
                signMobile.autographDateFont = "18px STKaiti";
                //签名展示模式（canvas则是使用canvas绘制，其他则是使用图片+文本拼接）
                signMobile.autographType = "canvas";
                //console.log(data.data);
            }

        }
    });
}

//指定常用意见的编辑回调
function setOpinionEdit() {
    signMobile.opinionEditHandler = function(object) {
        layer.load();
        DSF.Utils.ajaxRequest("fn/hm/customOpinion/save", object, function(result) {
            layer.closeAll('loading');
            if (result && result.msg == 'success') {
                layer.msg("修改成功");
                signMobile.opinionList = result.list;
            } else {
                layer.msg("操作失败");
            }
        });
    }
}

function setOpinionAdd() {
    signMobile.opinionAddHandler = function(object) {
        layer.load();
        DSF.Utils.ajaxRequest("/fn/hm/customOpinion/save", object, function(result) {
            layer.closeAll('loading');
            if (result && result.msg == 'success') {
                layer.msg("保存成功");
                signMobile.opinionList = result.list;
            } else {
                layer.msg("操作失败");
            }
        });
    }
}

function setOpinionDel() {
    signMobile.opinionDelHandler = function(object) {
        layer.load();
        DSF.Utils.ajaxRequest("fn/hm/customOpinion/del", { "id": object.id }, function(result) {
            layer.closeAll('loading');
            layer.msg("删除成功");
        });
    };
}

//添加增页按钮
function setAddsheets(selector) {
    signMobile.addsheetsHandle = function() {
        var currentLength = document.querySelectorAll('[data-new="1"]').length;
        var data = {
            papersId: papersId,
            showOrder: currentLength + 1
        }
        layer.load();
        DSF.Utils.ajaxRequest("fn/hm/addPage/save", data, function(res) {
            if (res && res.type == 'success') {
                createNewPageContainer(selector, res.data)
            } else {
                layer.closeAll('loading');
                layer.msg("操作失败");
            }
        });
    }
}

function createNewPageContainer(selector, data) {

    var pageItem = document.querySelector('.' + selector);
    var newPageElement = pageItem.cloneNode(true); //深拷贝一页的dom

    newPageElement.dataset.pid = data.id; //设置增页id
    newPageElement.dataset.new = '1'; //标记是增页
    newPageElement.innerHTML = '';
    var deleteButton = document.createElement("div");
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
    $(deleteButton).click(deletePageHandler).mousedown(function(e) {
        e.stopPropagation();
    });
    if (1 == handwriting) {
        newPageElement.appendChild(deleteButton); //添加删页按钮
    }
    var pagesList = document.querySelector('.container'); //.pdfViewer
    if (!pagesList) {
        pagesList = document.querySelector(".svgWrapper");
    }
    pagesList.prepend(newPageElement);
    signMobile.newChildBoard(newPageElement, false, '', data.id);
    layer.closeAll('loading');
    layer.msg("添加增页成功");

}

function deletePageHandler(e) {
    var target = e.currentTarget.parentElement;
    //删除增页
    DSF.Utils.ajaxRequest("fn/hm/addPage/del", { id: target.dataset.pid }, function(res) {
        if (res && res.type == 'success') {
            signMobile.deleteChildBoard(target);
            target.remove();
            layer.msg("删除成功");
        } else {
            layer.msg("删除失败");
        }
    });
}

function setCompleteHandle() {
    signMobile.completeHandle = function(result) {
        // alert(JSON.stringify(result))
        // console.log(result)
        // return;
        $(".svgWrapper").css("margin-top", "0px");
        var data = {
            "imgData": "",
            "type": 3,
            "content": '',
            "papersId": papersId,
            "flowId": flowId,
            "nodeId": nodeId,
            "packetContent": JSON.stringify(result)
        };

        if (currentUserNotionData && currentUserNotionData.length > 0) {
            data["id"] = currentUserNotionData[0].id; //传id为update,不传为insert
        }
        saveNotion(data);
    }
}

//保存图层的方法
function saveNotion(data) {
    layer.load();
    DSF.Utils.ajaxRequest("fn/hm/notation/save", data, function(res) {
        layer.closeAll('loading');
        $("#demo").css("height", "100vh");
        $("#headerDiv").hide();
        $(".delete-page-btn").hide();
        if (res && res.type == 'success') {
            console.log(res);
            layuiOk("保存成功", function() {
                window.history.back();
            });
            try {
                // window.parent.onExist();//通知父页面
            } catch (e) {
                console.error(e);
            }

        } else {
            layuiError("获取失败");
        }
    });
}

//获取全部签批图层的数据
function getAllNotionData(selector) {
    layer.load();
    var data = {
        //papersPage: "",
        papersId: papersId,
        //addPageId: "",
        flowId: flowId,
        nodeId: nodeId,
        userId: ""
    }
    DSF.Utils.ajaxRequest("fn/hm/notation/data/all", data, function(res) {
        layer.closeAll('loading');
        if (res && res.type == 'success') {
            var allData = res.data.all;
            var currentUserData = res.data.userData;
            var currentUserDataIds = currentUserData.map(function(item) {
                return item.id;
            });
            var otherUserData = allData.filter(function(item, index) {
                return !currentUserDataIds.includes(item.id);
            })
            var addPageData = [];
            allData.forEach(function(item) {
                var itemPacket = JSON.parse(item.packetContent);
                itemPacket.forEach(function(_item) {
                    _item.createUserId = item.createUserId; //补充信息
                    _item.isSelf = currentUserData.length == 0 ? false : item.createUserId == currentUserData[0].createUserId; //是不是当前用户的增页
                });

                addPageData = addPageData.concat(itemPacket.filter(function(_item, index) {
                    return _item.addPageId != '';
                }))
            });
            //因为此处接口将一次性返回全部图层数据,而ofd页面是分页的,所以存起来当分页再初始化
            currentUserNotionData = currentUserData;
            otherUserNotionData = otherUserData;
            addNotionData = addPageData;
            //用于回显当前人可编辑的数据包
            loadAddPage(addPageData, selector);
            currentUserData.forEach(function(item, index) {
                if (item.packetContent && item.packetContent != "") {
                    var packet = JSON.parse(item.packetContent); //全部画板的数据
                    if (packet && packet.length > 0) {
                        signMobile.initCurrentData(packet);
                    }
                }
            });
        } else {
            layer.msg("获取失败");
        }
    });
}

function loadAddPage(addPageData, selector) {
    addPageData.forEach(function(item) {
        var addPageId = item.addPageId;
        if (addPageId && addPageId != "" && document.querySelectorAll(".addpage-" + addPageId).length == 0) {
            var pageItem = document.querySelector('.' + selector);
            var newPageElement = pageItem.cloneNode(true); //深拷贝一页的dom
            newPageElement.dataset.pid = addPageId; //设置增页id
            newPageElement.dataset.new = '1'; //标记是增页
            newPageElement.innerHTML = '';
            newPageElement.style.position = "relative";
            newPageElement.className = "addPage addpage-" + addPageId;
            if (item.isSelf) {
                var deleteButton = document.createElement("div");
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
                $(deleteButton).click(deletePageHandler).mousedown(function(e) {
                    e.stopPropagation();
                });
                if (1 == handwriting) {
                    newPageElement.appendChild(deleteButton); //添加删页按钮
                }
            }
            var pagesList = document.querySelector(".container"); //.pdfViewer
            if (!pagesList) {
                pagesList = document.querySelector(".svgWrapper");
            }
            pagesList.prepend(newPageElement);
            if (signMobile) {
                signMobile.newChildBoard(newPageElement, false, "", addPageId);
            }
        }
    });


}

function initSignatureMobile(selector) {
    if (!selector) {
        selector = "pageContainer";
    }
    //参数1：载体dom，目前只支持传null，传null会直接把dom插到body根目录，使用fiexd定位
    //参数2：是否横屏，true:横屏模式，false：竖屏模式
    //参数3：手写签批配置项，暂时为{}即可，无需传其他参数
    //参数4：画板载体集合，只适用于竖屏
    //参数5：是否开启遮罩，只适用于竖屏，暂无效
    signMobile = new SignatureMobile(null, false, {}, document.querySelectorAll("." + selector), false);
    //设置要隐藏的工具栏，使用索引方式，从0开始
    signMobile.hiddenToolIndexList = [2, 4];
    //签名展示模式（canvas则是使用canvas绘制，其他则是使用图片+文本拼接）
    signMobile.autographType = "canvas";
    //多画板签批情况下的层级
    signMobile.baseZIndex = 99999;
    if (1 == handwriting) {
        $("#headerDiv").show();
    } else {
        $("#demo").css("height", "100vh")
    }
    //当前签批显示的元素起始索引
    signMobile.currentElementDataStartZIndex = 999;
    if (1 == handwriting) {
        signMobile.show();
        //设置默认选中的tab，设置index(签批：1，文字：2，签名：3)
        signMobile.currentTabIndex = -1;
    }
    //增加了使用具体像素转换，可以传宽度和高度，不传会自动获取宽高
    //参数1：width:number|null
    //参数2：height:number|null
    signMobile.setContainerWH();
    // getCurrentUserOpinionList();
    //签名图片
    // getCurrentUserSignatureInfo();
    // setOpinionEdit();
    // setOpinionAdd();
    // setOpinionDel();
    setAddsheets(selector);
    setCompleteHandle();
    getAllNotionData(selector);
    //获取所有增页信息

    //返回点击回调事件（返回{e:MouseEvent}）
    /*signMobile.backHandle = function (object) {

    }*/
    //批注记录点击回调事件（返回{e:MouseEvent}）
    /*signMobile.recordHandle = function (object) {
        layer.msg("点击了批注记录暂未实现");
    }*/

    //设置工具栏样式
    setToolbarStyle();

}

function setToolbarStyle() {
    if (window.screen.width > window.screen.height) {
        $(".smt-tab, #headerDiv").css("height", "14.8vh");
        $(".smt-tab-item div").css("font-size", "3.47vh");
        $(".smt-tab-item").css("padding-top", "2vh");
    }
}