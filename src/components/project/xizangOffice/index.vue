<template>
<div class="contanier">
    <div class="welcome">欢迎您，{{ name }}</div>
    <div class="search flex jb ac" @click="$router.push('/commonList/200827143925vksrrlGEd1ZTyiwa7tm/200826154812jQpt0dBmNzZXaNnLhTR')">
        <span>请输入关键词</span>
        <i class="iconfont iconsousuo i1"></i>
    </div>
    <div class="card">
        <Squmenu fontsize="0.28rem" :menudata="menuList" />
    </div>
    <div v-if="todo.list.length" class="card">
        <div class="title">
            <span>紧急待办</span>
            <van-icon name="ellipsis" @click="$router.push('/commonList?fileType=xizangJJDB')"/>
        </div>
        <DsList :data="todo.list" noGreenIcon="true" mobileStyle="2" @mainClick="handleActionClick" @commonClick="handleActionClick" :keyColumn="todo.keyColumn" :columns="todo.columns" />
    </div>
    <div v-if="notice.list.length" class="card">
        <div class="title">
            <span>通知公告</span>
            <van-icon name="ellipsis" @click="$router.push('/commonList?fileType=xizangTZGG')"/>
        </div>
        <DsList :data="notice.list" noGreenIcon="true" mobileStyle="2" @mainClick="handleActionClick" @commonClick="handleActionClick" :keyColumn="notice.keyColumn" :columns="notice.columns" :spHandleJs="noticeSpHandleJS"/>
    </div>

    <div class="card">
        <div class="title">
            <span>我的应用</span>
            <van-icon name="ellipsis" @click="goMore" />
        </div>
        <appMenuCenter limitcount="12" :menudata="menuList" />
    </div>
    <van-popup get-container="#app" v-model="showFlowSend"  lock-scroll style="height: 90vh" position="bottom" round>
        <sendFile v-show="showFlowSend" ref="sendFile" :form-data="selected" @change="handleFlowSendChange" @close="showFlowSend = false" />
    </van-popup>
    <van-popup get-container="#app" v-model="showFlowBack"  lock-scroll style="height: 90vh" position="bottom" round>
        <work-flow-dialog ref="wfDialog" :form-data="selected" @change="handleFlowBackChange" @close="showFlowBack = false" />
    </van-popup>
</div>
</template>

<script>
import DsList from "@/components/documentCenter/commonDsList";
import appMenuCenter from "@/components/documentCenter/appMenuCenter";
import Squmenu from "@/components/SquMenu/SquMenu";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";
import sendFile from "@/components/sendFlow/sendFile";
import workFlowDialog from "@/components/dialog/WorkFlowDialog.vue";
export default {
    components: {
        Squmenu,
        DsList,
        appMenuCenter,
        sendFile,
        workFlowDialog
    },
    mixins: [ButtonActions],
    data() {
        return {
            name: dsf.util.loadSessionStore("user").name,
            todo: {
                list: [],
                keyColumn: '',
                columns: []
            },
            notice: {
                list: [],
                keyColumn: '',
                columns: []
            },
            menuList: [],
            showFlowSend: false,
            showFlowBack: false,
            selected: {},
            noticeSpHandleJS: {}
        }
    },
    created() {
        this.getMenu()
        this.getNoticeList()
        this.getTodoList()
        this.noticeSpHandleJS.link = function (listid, moduleId, pk, vueData, itemValue) {
            vueData.$router.push({
                path: `/commonForm/${itemValue.moduleId}/${itemValue.noticeId}?method=view&listId=1808061608052gwg6wWGsNdiXr1yOCx`
            })
        }
    },
    methods: {
        handleFlowSendChange() {
            this.showFlowSend = false;
            this.getTodoList();
        },
        handleFlowBackChange() {
            this.showFlowBack = false;
            this.getTodoList();
        },
        handleActionClick() {
            const action = arguments[0];
            const fn = this[`action-${action}`] || function () {};
            fn(...Array.prototype.slice.call(arguments, 1));
        },
        getMenu() {
            dsf.http.post("fn/newFile/shortcutDing").then(({
                data
            }) => {
                this.menuList = data.data
            })
        },
        goMore() {
            this.$router.push({
                path: '/appMenuCenter'
            })
        },
        getNoticeList() {
            dsf.http.post('/fn/mobileInterfaceController/notice?page=0&limit=3').then(({
                data
            }) => {
                console.log(data);
                const {
                    showColumn,
                    datas = [],
                    keyColumn,
                    total,
                    listButtons,
                    mobileStyle,
                    showTable,
                    showDefault
                } = data;
                this.notice.list = datas;
                this.notice.keyColumn = keyColumn;
                this.notice.columns = showColumn || [];
            })
        },
        getTodoList() {
            dsf.http.post('/fn/mobileInterfaceController/urgentToDo?page=0&limit=3&urgents=2,3').then(({
                data
            }) => {
                console.log(data);
                const {
                    showColumn,
                    datas = [],
                    keyColumn,
                    total,
                    listButtons,
                    mobileStyle,
                    showTable,
                    showDefault
                } = data;
                this.todo.list = datas;
                this.todo.keyColumn = keyColumn;
                this.todo.columns = showColumn || [];
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/themes.scss';
@import '@/assets/styles/mixin.scss';

.contanier {
    background: url('../../../../static/images/xizangOffice/indexBg.png') no-repeat;
    background-size: contain;
    padding: 20px 16px 0px 16px;

    .welcome {
        color: #fff;
        font-size: 22px;
        margin-bottom: 20px;
        margin-top: 38px
    }

    .search {
        margin-top: 30px;
        padding: 8px 16px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 5px;
        color: #fff;
    }

    .card {
        min-height: 100px;
        margin: 16px 0;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        -moz-box-shadow: 2px 2px 10px #f3f3f3;
        /* 老的 Firefox */
        box-shadow: 2px 2px 10px #f3f3f3;

        .title {
            padding: 16px 16px 0 16px;
            margin-bottom: -16px;
            display: flex;
            justify-content: space-between;
            font-size: var(--font_size_2);
            font-weight: 600;
            @include font-theme('normal');
        }
    }
}
</style>
