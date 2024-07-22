<template>
<div>
    <!-- <div v-if="errored">
        数据获取失败！
    </div> -->
    <div v-if="folders.length > 0 || files.length > 0">
        <div v-for="(folder,index) in folders" :key="index">
            <div class="folder">
                <div class="title" @click="link(folder.dataValue)">
                    <div class="typeIcon">
                        <img src="static/images/fileType/folder.png" alt="" />
                    </div>
                    <div class="info">
                        <div class="title">{{ folder.dataValue.name }}</div>
                    </div>
                </div>
                <DsButtonToolbox :buttons="folder.buttons || {}" :more="true" size="small" @commonClick="(action) => { handleActionClick(action, folder, index)}" @mainClick="(action) => { handleActionClick(action, folder, index)}" />
            </div>
        </div>
        <DsList ref="dslist" :data="files" :columns="columns" :spHandleJs="spHandleJS" @mainClick="handleActionClick" @commonClick="handleActionClick"/>
    </div>
    <div v-else>
        <commonempty description="暂无数据" />
    </div>
    <dsf-fab :fab-items="addBtn" @clickItem="btnAction"></dsf-fab>
    <van-dialog v-model="show" :title="dialogTitle" get-container="#app" show-cancel-button @cancel="show = false" @confirm="confirmRename">
        <van-field v-model="title" class="re-title" placeholder="请输入名称"/>
    </van-dialog>
    <chooseFolder v-if="showChoose" :show.sync="showChoose" type="move" @confirmChoose="confirmMove"></chooseFolder>
</div>
</template>

<script>
import chooseFolder from './chooseFolder'
// import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
import DsButtonToolbox from "@/components/documentCenter/DsfButtonToolbox";
import dsfFab from "@/components/dsfFab/dsfFab";
import DsList from "@/components/documentCenter/commonDsList";
export default {
    components: {
        DsList,
        dsfFab,
        DsButtonToolbox,
        chooseFolder
    },
    // mixins: [ButtonActions],
    data() {
        return {
            files: [],
            folders: [],
            loading: null,
            folderid: "",
            errored: false,
            isFirstLoad: false, // 是否初次加载
            columns: [{
                "showCategory": "mainTitle",
                "showName": "标题",
                "showMetaColumn": "name"
            },
            {
                "showCategory": "subTitleA",
                "showName": "模块名称",
                "icon": "iconwenjianleixing",
                "showMetaColumn": "moduleName"
            },
            {
                "showCategory": "subTitleC",
                "showName": "创建人",
                "icon": "iconfl-renyuan",
                "showMetaColumn": "createUname"
            }],
            addBtn: [{
                icon: "iconjiahao",
                title: "新增",
                type: "event", // 'event'
                action: "add",
            }],
            spHandleJS: {},
            dialogTitle: '新建目录',
            title: '',
            show: false,
            reTitleId: '',
            showChoose: false,
            needMoveId: ''
        }
    },
    created() {
        let self = this;
        if(self.$route.query.title) dsf.url.setTitle(self.$route.query.title); // 设置页面title
        self.loading = dsf.layer.loading();
        self.isFirstLoad = true;
        self.folderid = self.$route.params.folderid;
        self.getFiles();
        this.spHandleJS.link = function (listid, moduleId, pk, vueData, itemValue) {
            vueData.$router.push({
                path: `/commonForm/${itemValue.moduleId}/${itemValue.infoId}`
            })
        }
    },
    activated() {
        // let self = this;
        // // 刷新文件列表
        // if (!self.isFirstLoad) {
        //     self.loading = dsf.layer.loading();
        //     self.getFiles();
        // }
        // self.isFirstLoad = false;
    },
    mounted() {},
    methods: {
        uncode(str) {
            return str.replace(/&#(x)?([^&]{1,5});?/g, function (a, b, c) {
                return String.fromCharCode(parseInt(c, b ? 16 : 10));
            })
        },
        getFiles() {
            let self = this;
            self.folders = []
            self.files = []
            // if (self.$route.params.folderid || self.$route.params.driveType) {
            let url = `fn/myFavorite/list`;
            dsf.http.post(url, {
                isDirectory: '0',
                dataId: self.$route.params.folderid || '0' ,
                key: ""
            }).then(res => {
                // console.log(result);
                if (res.data.code == "200") {
                    let result = res.data.data.data
                    result.forEach(element => {
                        element.name = self.uncode(element.name)
                        if (element.isDirectory == 1) {
                            element.type = "folder"
                            self.folders.push({
                                buttons: {
                                    commonButton: [{action: "del",condition: "",icon: "icondelete",name: "删除",showIndex: 0}],
                                    mainButtons: [{action: "reTitle",condition: "",icon: "",name: "重命名",showIndex: 0},
                                    {action: "moveGuanZhu",condition: "",icon: "",name: "移动",showIndex: 0}]
                                },
                                dataValue: element
                            })
                        } else {
                            // element.type = element.name.split('.')[1]
                            self.files.push({
                                buttons: {
                                    commonButton: [],
                                    mainButtons: [{action: "quXiaoGuanZhu",condition: "",icon: "",name: `取消${dsf.config.setting['SYS-MOBILE-LIST-0005'] || '收藏'}`,showIndex: 0},
                                    {action: "moveGuanZhu",condition: "",icon: "",name: "移动",showIndex: 0}]
                                },
                                dataValue: element
                            })
                        }
                    });
                    // self.files = result.filter(item => item.type != undefined);
                }
            }).error(error => {
                self.errored = true;
            }).always(() => {
                dsf.layer.closeLoading(self.loading);
            });
        },
        link(item) {
          this.$router.push(`/myFavorite/${item.id}?title=${item.name}`)
        },
        handleActionClick() {
            const action = arguments[0];
            const fn = this[`action-${action}`] || function () {};
            fn(...Array.prototype.slice.call(arguments, 1));
        },
        btnAction(val) {
            console.log(val);
            this[val.action](val);
        },
        // 新建目录
        add() {
            this.show = true
            this.dialogTitle = '新建目录'
        },
        confirmRename() {
            if(this.dialogTitle == '新建目录') {
                dsf.http.post("/fn/myFavorite/add", {
                    name: this.title,
                    isDirectory: 1,
                    rowState: -1,
                    fId: this.$route.params.folderid || '0',
                })
                .then((res) => {
                    this.show = false;
                    dsf.layer.toast(res.data.message);
                    if (res.data.code == "200") {
                        // this.$emit('rename',this.reTitle,this.reItem,this.)
                        this.title = '';
                        this.getFiles()
                    }else {
                        dsf.layer.toast(res.data.message)
                    }
                })
                .catch((err) => {
                    dsf.layer.toast("接口异常");
                    console.log(err);
                });
            } else {
                dsf.http.post("/fn/myFavorite/reName", {
                    name: this.title,
                    id: this.reTitleId
                })
                .then((res) => {
                    this.show = false;
                    dsf.layer.toast(res.data.message);
                    if (res.data.code == "200") {
                        // this.$emit('rename',this.reTitle,this.reItem,this.)
                        this.title = '';
                        this.getFiles()
                    }else {
                        dsf.layer.toast(res.data.message)
                    }
                })
                .catch((err) => {
                    dsf.layer.toast("接口异常");
                    console.log(err);
                });
            }
            
        },
        // 取消关注
        "action-quXiaoGuanZhu"(item, index) {
            this.$toast.loading({
                forbidClick: true,
                message: "提交中"
            });
            console.log(item)
            dsf.http.post("/fn/mobileFocus/deleteFocus", {
                infoId: item.dataValue.fid || item.dataValue.info_id || item.dataValue.infoId || item.dataValue['A0001'] || item.dataValue.id || item.dataValue['SW_XZD.A0001'] || item.dataValue['G_INFOS.A0001']
            }).then(({
                data
                }) => {
                const {
                    message,
                    result,
                    type
                } = data;
                if (type === "success" || result) {
                    this.getFiles()
                }
                this.dsf.layer.toast("操作成功");
            })
            .catch(() => {
            this.$toast.clear();
            });
        },
        // 删除目录
        "action-del"(item, index) {
            console.log(item)
            dsf.layer.confirm({
                message: '是否确认删除该目录',
                confirmButtonText: '确认'
            }, () => {
                dsf.http.post("/fn/myFavorite/delete",{id: item.dataValue.id}).then((res) => {
                    if(res.data.code == 200) {
                        this.getFiles()
                    } else {
                        dsf.layer.toast(res.data.message)
                    }
                })
            })
        },
        // 重命名
        "action-reTitle"(item, index) {
            this.show = true
            this.dialogTitle = '重命名'
            this.reTitleId = item.dataValue.id
            this.title = item.dataValue.name
        },
        "action-moveGuanZhu"(item, index) {
            this.showChoose = true
            this.needMoveId = item.dataValue.id
        },

        confirmMove(fid) {
            dsf.http.post("/fn/myFavorite/move",{dataIds: this.needMoveId, fid: fid}).then((res) => {
                if(res.data.code == 200) {
                    this.getFiles()
                }
                dsf.layer.toast(res.data.message)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.folder {
    // padding: 0.32rem 0.4rem;
    background-color: #fff;
    // display: flex;
    margin: 16px;
    &:last-child {
      margin-bottom: 0;
    }
    .title {
        padding: 10px 16px 12px;
        display: flex;
        align-items: center;
        .typeIcon {
            width: 0.6rem;
            height: 0.5rem;
            margin-right: 0.4rem;
            position: relative;

            ::v-deep .van-badge {
                position: absolute;
                top: 0;
                right: -4px;
            }
        }
        .info {
            margin-top: 8px;
            flex: 1;
        }
    }
    ::v-deep .ds-button-toolbox {
        border-top: 1px solid #ddd;
        padding: 10px 16px;
    }
}
.file-empty {
    display: flex;
    flex-direction: row;
    padding: 0.2rem 0.5rem;

    ::v-deep .van-empty__image {
        flex: none;
    }

    ::v-deep .van-empty__description {
        padding: 0;
    }
}

.flex {
    justify-content: center;
    height: 100vh;
}

::v-deep.van-divider {
    margin: 0;
    padding: 0 16px;
    border-color: #ddd;
    background-color: #fff;
}
.re-title {
    border-radius: 3px;
    box-sizing: border-box;
    border: 1px solid #cfcfcf;
    margin: 16px auto;
    padding: 5px;
    width: 90%;

    ::v-deep .van-field__control {
        text-align: left !important;
    }
}
</style>
