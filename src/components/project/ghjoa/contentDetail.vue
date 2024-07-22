<template>
    <!-- 内容详情 -->
    <div class="content_detail">
        <div class="contents">
            <!-- 头部搜索 -->
            <div class="search_body">
                <van-search v-model="keyword" show-action action-text="查询" right-icon="search" left-icon=""
                    placeholder="请输入搜索关键词" @search="searchKeyword()" @cancel="searchKeyword()" />
            </div>
            <!-- 中部内容 -->
            <div class="content_part">
                <div class="p_content" v-html="content" ref="pContent"></div>
            </div>
            <!-- 底部按钮操作 -->
            <div class="bottom_operate">
                <div @click="allShare">
                    <van-icon name="orders-o" size="30px" />
                    <span>全文分享</span>
                </div>
                <div>
                    <van-icon name="share-o" size="30px" />
                    <span>摘录分享</span>
                </div>
                <div @click="collect">
                    <van-icon name="star-o" size="30px" />
                    <span>添加收藏</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import replace$ from 'dingtalk-jsapi/api/biz/navigation/replace';
export default {
    name: "contentDetail",
    data() {
        return {
            keyword: "", //关键字搜索
            content: "", //内容详情
            content_copy: "", //内容详情副本，保存原内容,
            wjid: "",
            from: ""
        };
    },
    created() {
        this.wjid = this.$route.query.wjid
        this.from = this.$route.query.from
        this.getData();
    },
    methods: {
        transformHignlight(obj) {
            //转化文本为高亮
            if (Array.from(obj.children).length) {
                let test = Array.from(obj.children);
                for (let i = 0; i < test.length; i++) {
                    this.transformHignlight(test[i]);
                }
            } else {
                let text = obj.innerText;
                let temp = text.split(this.keyword);
                let temp_two = "";

                temp.forEach((ele, index) => {
                    if (index === temp.length - 1) {
                        temp_two += ele;
                    } else {
                        temp_two +=
                            ele +
                            `<span style="color: red;">${this.keyword}</span>`;
                    }
                });
                obj.innerHTML = temp_two;
                // console.log(text, temp, temp_two);
            }
        },
        searchKeyword() {
            //高亮字符匹配
            this.content = "";
            let temp = JSON.parse(JSON.stringify(this.content_copy));
            setTimeout(() => {
                this.content = JSON.parse(JSON.stringify(this.content_copy));
                if (this.keyword && temp.includes(this.keyword)) {
                    this.$nextTick(() => {
                        this.transformHignlight(this.$refs.pContent);
                    });
                } else {
                    this.$nextTick(() => {
                        this.content = JSON.parse(
                            JSON.stringify(this.content_copy)
                        );
                    });
                }
            }, 1);
        },
        getData() {
            //获取数据
            if (this.from === "one") {
                dsf.http.post(`fn/menhu/queryfjyl?fid=${this.wjid}`).then((res) => {
                        console.log(res);
                        // this.content = res.data.nrtext;
                        // this.content_copy = res.data.nrtext;
                        let loginToken = dsf.util.loadSessionStore("loginToken");
                        let url = dsf.url.getServerUrl(`fn/office/openMobileOffice?fileId=${res.data.data[0].pk}&x-auth-token=${loginToken}&moduleId=190427152140nmiGu76moaSpanLaHnY`)
                        
                        console.log("url"+url);
                        this.$router.replace({
                            name: 'dsfIframe',
                            params: {
                                url,
                            }
                        })
                    }
                );
            } else {
                dsf.http.post(`fn/flfgyd/querynrxqByid?wtid=${this.wjid}`).then(
                    (res) => {
                        console.log(res);
                        this.content = res.data.nrtext;
                        this.content_copy = res.data.nrtext;
                    }
                );
            }
        },
        allShare() {
            //全文分享
            alert("点击了全文分享");
            alert(JSON.stringify(dd));
            dd.biz.util.share({
                type: 0, //分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
                url: "https://www.baidu.com/",
                title: "测试分享",
                content: "分享内容内容",
                image: String,
                onSuccess: function () {
                    //onSuccess将在调起分享组件成功之后回调
                    /**/
                },
                onFail: function (err) { },
            });
        },
        collect() {
            //收藏文件
            dsf.http.post(`fn/mobileFocus/setFocus?infoId=${this.wjid}`).then(
                (res) => {
                    dsf.layer.toast(res.data.message)
                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.content_detail {
    .contents {
        height: calc(100% - var(--f7-navbar-height)) !important;
        margin-top: calc(var(--f7-navbar-height));
    }

    .search_body {
        height: 54px;
        padding: 10px;
        background-color: #349aff;
    }

    .content_part {
        background-color: #fff;
        height: calc(100% - 26vw);
        box-sizing: border-box;
        padding: 4% 5%;
        overflow: hidden auto;

        p {
            margin-top: 0;
        }

        .p_content {
            // height: 100%;
            padding: 10px 14px;
            box-sizing: border-box;
            background-color: #f3f3f3;
        }
    }

    .bottom_operate {
        background-color: #349aff;
        color: #fff;
        display: flex;
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 11vw;
        padding: 0 15px;
        justify-content: space-between;

        div {
            display: flex;
            align-items: center;

            span {
                padding-left: 3px;
                font-weight: 500;
            }
        }
    }
}

>>>.van-search {
    padding: 0;
}
</style>