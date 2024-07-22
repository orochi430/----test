<template>
<div id="common-tabs">
    <!-- <van-nav-bar v-if="tabsConfig" :title="tabsConfig.remark" left-arrow @click-left="$router.go(-1)" /> -->
    <van-search v-model="tempKeyWord" show-action placeholder="请输入查询信息" left-icon="" shape="round" @search="onSearch" v-if="tabsConfig&&tabsConfig.showSearchBox">
        <template #right-icon>
            <div @click="onSearch" class="flex ac">
                <van-icon name="search" size="0.44rem" />
            </div>
        </template>
        <template #action>
            <div @click="onSearch" class="flex ac">
                <img class="search-icon" src="static/images/EnterpriseServices/icon-menu.png" alt="">
            </div>
        </template>
    </van-search>
    <van-tabs v-model="active" sticky @change="tabChange" :offset-top="isShowAppHeader?'0.92rem':'0'" swipeable>
        <van-tab :title="'tabs'+item.name" :badge="item.count|badgeCount" v-for="(item,index) in tabParams.tabslist" :key="index">
            <!-- tab前置插槽 -->
            <template #title>
                <van-icon v-if="item.icon" :name="item.icon" />
                <span>{{item.name}}
                    <!-- <span v-if="item.badgeUrl&&item.count" class="badge">{{item.count}}</span> -->
                </span>
            </template>
            <keep-alive v-if="item.goRoute == 'defaultList'">
                <default-list :currentTabs="index" :params="item" :tabsPage="tabsPage" :clickTabIndex="clickTabIndex" :routeKey="routeKey" :mainKeyWord="realKeyWord" :oppsetTop="isShowAppHeader ? '1.8rem' : '0.88rem'"></default-list>
            </keep-alive>
            <jiangsuyancao-table v-else-if="item.goRoute == 'jiangsuyancaoTable'" :clickTabIndex="active + 1" :allTab="tabParams.tabslist.length" :params="item" :oppsetTop="isShowAppHeader ? '1.8rem' : '0.88rem'"></jiangsuyancao-table>
            <commonForm v-else-if="item.goRoute == 'commonForm'" :_moduleId="item.params.moduleId" :_pk="item.params.pk"></commonForm>
            <tab-todo v-else :params="item"></tab-todo>
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
import urlJs from "@/common/url";
import defaultList from "@/components/documentCenter/DefaultList"
import jiangsuyancaoTable from "@/components/project/jiangsuyancao/table.vue"
import tabTodo from "@/components/documentCenter/commonTabTodo.vue"
import commonForm from "@/components/commonForm/commonForm.vue"

export default {
    props: ['value', "tabKey"],
    name: "customTabs",
    model: {
        prop: 'value',
        event: 'input'
    },
    components: {
        defaultList,
        tabTodo,
        jiangsuyancaoTable,
        commonForm
    },
    data() {
        return {
            active: 0,
            tabParams: {},
            tabsPage: false,
            clickTabIndex: 0,
            routeKey: "",
            tabsConfig: null,
            tempKeyWord: '',
            realKeyWord: '',
            docTitle: ''
        }
    },
    computed: {
        ...mapState({
            isShowAppFooter: state => state.isShowAppFooter,
            isShowAppHeader: state => state.isShowAppHeader
        })
    },
    created() {
        let data = dsf.config.tableTabs;
        this.routeKey = this.tabKey || this.$route.params.key
        this.tabsConfig = data[this.routeKey];
        //console.log(this.tabsConfig)
        if (this.tabsConfig) {
            this.docTitle = this.$route.query.title || this.tabsConfig.remark;;
            urlJs.setTitle(this.docTitle);
            this.tabParams = JSON.parse(JSON.stringify(this.tabsConfig)); //深度赋值，不修改原始的对象
            this.tabParams.tabslist.map(item => {
                Object.keys(item.params).forEach(element => { //循环params的属性  替换值
                    item.params[element] = dsf.util.getReplaceUrl(item.params[element])
                });
                if (item.badgeUrl) {
                    item.badgeUrl = dsf.util.getReplaceUrl(item.badgeUrl)
                    dsf.http.get(item.badgeUrl, {}).then((data) => {
                        this.$delete(item, "count")
                        let total = data.data.total || data.data.badge || data.data.data;
                        //total = Number(total) > 99 ? "99+" : total
                        this.$set(item, "count", total)
                        console.log(item)
                    })
                }
            })
        }
    },
    filters: {
        badgeCount(val) {
            if (val > 100) {
                return "99+"
            }
            if (val < 1) {
                return ""
            }
            return val
        }
    },
    methods: {
        tabChange(index, title) {
            console.log(index + "---" + title)
            this.clickTabIndex = index
            // switch (index) {
            // 	case 0:
            // 		this.clickTabIndex = 0
            // 		break
            // 	case 1:
            // 		this.clickTabIndex = 1
            // 		break
            // 	case 2:
            // 		this.clickTabIndex = 2
            // 		break
            // }
        },
        onSearch() {
            this.realKeyWord = this.tempKeyWord;
        }
    },
    deactivated() {
        let arr = [
            "jiangsuyancaoNewsDetail"
        ];
        if (!arr.filter((item) => item == this.$route.name).length) {
            //this.$destroy();
        }
    },
    beforeRouteLeave(to, from, next) {
        if (to.name == "commonList"||to.name == "index") { //如果是去列表的话   则销毁，解决tab页固定的问题 2022年3月20日16:20:01  @ly
            this.$destroy();
        }
        next();
    }
}
</script>

<style lang="scss" scoped>
#common-tabs {
    .van-info {
        top: 10px;
    }

    .van-sticky {
        background: white;
        z-index: 999;
        /* padding: 15px; */
    }
    ::v-deep .van-tabs__wrap {
      display: none;
    }
    ::v-deep .van-nav-bar .van-icon {
        color: #000;
    }
}

.search-icon {
    width: 30px;
}

.badge {
    font-size: var(--font_size_4);
    background-color: #F65959;
    color: #FFF;
    border-radius: 50%;
    padding: 1px 5px;
    position: relative;
    left: -2px;
}
</style>
