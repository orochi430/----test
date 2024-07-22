<template>
    <!-- 法律法规库 -->
    <div class="law_index">
        <div class="header_search">
            <img src="static/images/ghjoa/fa.png"/>
            <div class="search">
                <van-search v-model="keyword" show-action placeholder="请输入搜索关键词" left-icon="">
                <template #action>
                    <div @click="skipToSearch('', keyword)"><van-icon name="search" color="#2291ff" size="20"/></div>
                </template>
            </van-search>
            </div>
        </div>
        <!-- 内容 -->
        <div class="content_part">
            <h3 class="text_color">
                <span @click="content_active = 'rule'" :class="
                    content_active == 'rule' ? 'active' : 'not_active'
                ">最新法律法规</span>
                <span class="vertical_line"></span>
                <span @click="content_active = 'catalog'" :class="
                    content_active == 'catalog' ? 'active' : 'not_active'
                ">目录分类</span>
            </h3>
            <van-pull-refresh v-if="content_active == 'rule'" v-model="isLoading" @refresh="getLawData()">
                <van-list finished-text="没有更多了">
                    <van-cell v-for="(item, index) in last_law" :key="index" :title="item.fbbt" :label="`发布单位：${item.fbdw}${item.fbrq}`" @click="skipToDetail(item)"/>
                </van-list>
            </van-pull-refresh>
            <van-pull-refresh v-else v-model="isLoading" @refresh="getCatalogue()">
                <van-list finished-text="没有更多了">
                    <van-cell v-for="(item, index) in catalogue_list" :key="index" :title="item.fjlxname" :value="`数量：${item.fjlxcount}`" @click="skipToSearch(item.fjlxname, '', item.fjlxvalue)"/>
                </van-list>
            </van-pull-refresh>
        </div>
        <!-- 底部 -->
        <div class="law_bottom text_color">
            <p class="up down">
                <img src="static/images/ghjoa/fa_name.png"/>
                <span>法律法规库</span>
            </p>
            <p class="down">
                <span class="line"></span>
                <span class="fs-16">上海市规划与自然资源局综合事务系统</span>
                <span class="line"></span>
            </p>
            <div class="question" @click="$router.push({path:'questionOnline'})">
                <img src="static/images/ghjoa/qa.png" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "lawIndex",
    data() {
        return {
            isLoading: true,
            content_active: "rule", //内容区显示， 法律法规/目录分类
            keyword: "", //搜索关键字
            last_law: [], //最新法规
            catalogue_list: [], //目录数据
        };
    },
    created() {
        this.getLawData();
        this.getCatalogue();
    },
    methods: {
        getLawData() {
            //获取最新法规
            dsf.http.post(`fn/flfgyd/flfgquery?yhid=${dsf.util.loadSessionStore("user").user_id}`).then(({data}) => {
                console.log(data);
                this.last_law = data.data;
                this.isLoading = false
            });
        },
        getCatalogue() {
            //获取目录分类
            dsf.http.post(`fn/flfgyd/flfgquerylmfl`).then(({data}) => {
                console.log(data);
                this.catalogue_list =  data.data;
                this.isLoading = false
            });
        },
        skipToSearch(value, keyword, type_id) {
            //跳转到搜索
            console.log(this.keyword);
            let obj = {
                type_value: value, //类型名
                wjjbvalue: type_id, //类型id
                gjzname: keyword, //查询项内容
            };
            this.$router.push({ path: "/catalogSearch", query: {index_obj: obj}});
        },
        skipToDetail(items) {
            this.$router.push({ path: "/contentDetail", query: {
                    wjid: items.wjid,
                    title: items.fbbt,
                    from: 'one'
                }
            });
            console.log(items);
        }
    }
};
</script>

<style lang="scss" scoped>
.law_index {
    height: calc(100vh - 0.93rem);
    width: 100vw;
    background-color: white;
    .text_color {
        color: #2291ff;
    }
    .header_search {
        padding-top: 10px;
        img{
            margin: 0 auto;
            height: 88px;
            width: 76px;
        }
    }
    .search {
        width: 60%;
        margin: 0 auto;
        border-bottom: 2px solid #2291ff;
    }
    .content_part {
        width: 80%;
        margin: auto;
        .content {
            padding: 10px 0;
            border-bottom: 1px solid #d3d3d3;
            .fs-14 {
                color: #3d3d3d;
                margin: 0;
            }
            .fs-12 {
                display: flex;
                margin: 10px 0 0;
                justify-content: space-between;
            }
        }
        .not_active {
            //内容区默认
            color: #999;
            font-size: var(--font_size_3);
        }
        .active {
            color: #2291ff;
            font-size: var(--font_size_2);
        }
    }

    .law_bottom {
        bottom: 10px;
        position: absolute;
        width: 100%;
        .up img{
            width: 20px;
            height: 24px;
        }
    }

    .down {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 8px;
    }

    .question {
        position: absolute;
        right: 4%;
        bottom: 20px;
        width: 10%;

        .badge {
            position: absolute;
            top: -9px;
            right: -15px;
        }
    }

    .line {
        height: 2px;
        width: 25%;
        display: inline-block;
    }
    .fs-16{
        min-width: 238px;
        display: inline-block;
    }
    h3 {
        height: 14vw;
        line-height: 14vw;
        width: 62%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .vertical_line {
        width: 1px;
        height: 18px;
        display: inline-block;
        margin-top: 2px;
    }

    .catalog {
        width: 80%;
        left: 10%;
        height: 40%;
    }

    .catalog_content {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #d9d9d9;
        padding: 10px 0;
        margin: 0;
    }

    .rule {
        height: 40% !important;
        top: calc(51vw + var(--f7-navbar-height));
        width: 86% !important;
        left: 7%;
    }
}
>>>.van-search {
    padding: 0;
    .van-search__content {
        padding: 0;
        background-color: white;
    }
}
>>>.van-cell{
    padding-left: 0;
    padding-right: 0;
    border-bottom: 1px #ccc solid;
    .van-cell__title{
        width: 150px;
    }
    .van-cell .van-cell__value{
        text-align:right;
    }
}
>>>.van-pull-refresh{
    height: 55vh;
    overflow:scroll;
}
>>>.van-pull-refresh::-webkit-scrollbar{
    display: none;
}
</style>