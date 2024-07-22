<template>
    <!--  查询结果 -->
    <div class="catalog_search">
        <!-- 搜索头部 -->
        <div class="search_body">
            <van-search v-model="keyword" show-action action-text="搜索" right-icon="search" left-icon=""
                placeholder="请输入搜索关键词" @search="page = 1; getData('', 'search');">
                <template #action>
                    <div @click="page = 1; getData('', 'search');">搜索</div>
                </template>
            </van-search>
        </div>
        <!-- 结果总览 -->
        <div class="result_overview">
            <span>共 <span class="text_color2">{{ count }}</span> 条</span>
            <div>
                <span @click="sortData('effect')" :class="{
                    text_color: sort_active === 'effect' ? true : false,
                }">文件排序
                    <van-icon :name="file_icon" />
                </span>
                <span @click="sortData('time')" style="margin-left: 5px" :class="{
                    text_color: sort_active === 'time' ? true : false,
                }">时间排序
                    <van-icon :name="time_icon" />
                </span>
            </div>
        </div>
        <!-- 具体结果 -->
        <scroller class="contents" :on-refresh="refresh" :on-infinite="infinite" ref="scroller">
            <div class="content" v-for="(items, index) in result_list" :key="index" @click="skipToDetail(items)">
                <span class="left text_color">{{ index + 1 }}</span>
                <div class="right">
                    <p v-html="items.title_obj || items.fbbt"></p>
                    <p class="text_color3">
                        <span style="flex: 1">发布单位：<span>{{ items.fbdw }}</span></span>
                        <span style="flex: 1">发布时间：{{ items.fbrq }}</span>
                    </p>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
export default {
    name: "catalogSearch",
    data() {
        return {
            keyword: "", //搜索关键字
            type_value: "", //类型名
            type_id: "", //类型id
            sort_active: "effect", //效力排序 effect/time 效力/时间
            page_size: 10, //每页分页量
            page: 0, //当前分页值
            sort_type: 1, //排序分类， 1：文件升序，2：文件降序，3：时间升序， 4：时间降序
            result_list: [], //结果列表
            file_icon: "ascending", //文件排序的图标， 升序/降序
            time_icon: "ascending", //时间排序的图标，升序/降序
            count: 0, //数据总量
        };
    },
    created() {
        this.index_obj = this.$route.query.index_obj
        console.log(this.index_obj);
        this.keyword = this.index_obj.gjzname;
        this.type_value = this.index_obj.type_value;
        this.type_id = this.index_obj.wjjbvalue;
        console.log(this.keyword, this.type_value, this.type_id);
    },
    activated() {
        if (JSON.stringify(this.$route.query.index_obj) !== `"[object Object]"`) {
            this.index_obj = this.$route.query.index_obj
            console.log(this.index_obj);
            this.keyword = this.index_obj.gjzname;
            this.type_value = this.index_obj.type_value;
            this.type_id = this.index_obj.wjjbvalue;
            console.log(this.keyword, this.type_value, this.type_id);
            this.getData()
        }
    },
    methods: {
        refresh(done) {
            //刷新数据
            this.page = 1;
            this.getData(done);
        },
        infinite(done) {
            //加载数据
            this.page++;
            this.getData(done);
        },
        sortData(active) {
            //对数据进行排序
            this.sort_active = active;
            if (active === "effect") {
                if (this.file_icon == "ascending") {
                    this.file_icon = "descending";
                    // 1：文件升序，2：文件降序，3：时间升序， 4：时间降序
                    this.sort_type = 2;
                } else {
                    this.file_icon = "ascending";
                    this.sort_type = 1;
                }
            } else {
                if (this.time_icon === "ascending") {
                    this.time_icon = "descending";
                    // 1：文件升序，2：文件降序，3：时间升序， 4：时间降序
                    this.sort_type = 4;
                } else {
                    this.time_icon = "ascending";
                    this.sort_type = 3;
                }
            }
            this.page = 1;
            console.log(this.sort_type);
            this.getData("", "refresh");
        },
        getData(done, mes) {
            //获取数据
            console.log(this.keyword);
            dsf.http.post(
                `fn/flfgyd/flfgquerygjzcx?wjjbvalue=${this.type_id}&gjzname=${this.keyword}&limit=${this.page_size}&page=${this.page}&type=${this.sort_type}`).then((res) => {
                    console.log(res);
                    let keyword = this.keyword;
                    if (keyword) {
                        res.data.data.forEach((ele, index) => {
                            if (ele.fbbt.includes(keyword)) {
                                let title = ele.fbbt.split(keyword);
                                // console.log(title);
                                let dom_obj = `<span>${title[0]}</span><span style="color: #ff7070;">${keyword}</span><span>${title[1]}</span>`;
                                // ele.dom_obj = dom_obj;
                                res.data.data[index].title_obj = dom_obj;
                            }
                        });
                    }
                    if (mes === "search") {
                        this.result_list = [];
                        this.$refs.scroller.scrollTo(0, 0, true); //变换顺序时scroller跳转到顶部
                    }
                    if (this.page == "1") {
                        this.result_list = res.data.data;
                    } else {
                        this.result_list.push(...res.data.data);
                    }
                    this.count = res.data.count;
                    this.result_list = Object.assign([], this.result_list);
                    console.log(this.result_list);
                    if (res.data.data.length < this.page_size) {
                        if (done) {
                            done(true); //获取数量不足，没有多余数据
                        } else {
                            this.$refs.scroller.finishPullToRefresh(true);
                        }
                    } else {
                        if (done) {
                            done(); //获取数量不足，没有多余数据
                        } else {
                            this.$refs.scroller.finishPullToRefresh();
                        }
                    }

                    if (mes == "refresh") {
                        this.$nextTick(() => {
                            setTimeout(() => {
                                console.log('刷新了');
                                this.$refs.scroller.scrollTo(0, 0, true);
                            }, 200);
                        });
                    }
                });
        },
        skipToDetail(items) {   //跳转到内容详情
            console.log(items);
            this.$router.push({
                path: "/contentDetail", query: { wjid: items.fbid, title: items.fbbt, from: 'one' }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.catalog_search {
    height: calc(100vh - 0.93rem);

    .text_color {
        color: #349aff;
    }

    .text_color2 {
        color: #ff7070;
    }

    .text_color3 {
        color: #666666;
    }

    .search_body {
        height: 54px;
        padding: 10px;
        background-color: #349aff;
    }

    .result_overview {
        height: 7vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 5%;
        margin-right: 5%;
        border-bottom: 1px solid #b3d8ff;
    }

    .contents {
        top: calc(var(--f7-navbar-height) + 15vw + 13vw);
        margin: 0 5%;
        width: 90%!important;
        height: 78vh!important;

        .left {
            width: 20px;
        }

        .right {
            width: calc(100% - 30px);
            padding-bottom: 4.5%;
            border-bottom: 1px solid #b3d8ff;
        }

        .content {
            padding: 4.5% 0 0;
            display: flex;
            justify-content: space-between;
            align-items: baseline;
        }

        p {
            margin: 0;
        }

        p:first-child {
            margin-bottom: 2%;
        }

        .text_color3 {
            display: flex;
            justify-content: space-between;
        }
    }
}

>>>.van-search {
    padding: 0;
}
</style>