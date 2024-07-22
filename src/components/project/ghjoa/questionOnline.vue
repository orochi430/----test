<template>
    <!-- 智能在线答题 -->
    <div class="question_online">
        <!-- 内容 -->
        <div class="contents" ref="contents" @click="notMatchShow()">
            <div class="scroller_box" ref="scrollerBox">
                <div class="question">
                    <div class="left">
                        <img src="static/images/ghjoa/qa.png" style="width: 50%" />
                        <span class="text_color" style="width: 20px; margin: 10px 0">猜你想问</span>
                        <img src="static/images/ghjoa/change.png" style="width: 30%"
                            @click="guess_page++; guessQuestionData()" />
                    </div>
                    <div class="right">
                        <p v-for="items in guess_question_list" :key="items.wtid" class="fs-14"
                            @click="raiseQuestion(items)">
                            {{ items.wtbt }}
                        </p>
                    </div>
                </div>
                <div class="catalog">
                    <div class="left">
                        <img src="static/images/ghjoa/classify.png" style="width: 50%" />
                        <span style="width: 20px; margin: 20px 0;">分类查询</span>
                    </div>
                    <div class="right">
                        <p>按效力级别：</p>
                        <span v-for="(items, index) in catalogue_list" :key="index" class="text_color2" @click="
                        skipToSearch(items.fjlxname,'',items.fjlxvalue) ">
                            {{ items.fjlxname }}</span>
                    </div>
                </div>
                <p class="feedback" v-if="feedback_num">
                    您有<span class="text_color">{{ count }}</span>条新反馈，请<span class="text_color"
                        @click="$router.push({path:'/feedback'})">点击查看</span>
                </p>

                <!-- 提出问题，获取答案 -->
                <div class="question_answer" v-for="(items, index) in question_answer" :key="index">
                    <!-- 提出的问题 -->
                    <p class="text-right" style="box-sizing: border-box">
                        <span class="question2">{{ items.question }}</span>
                    </p>
                    <p class="wait text-center" v-show="items.wait">
                        {{ items.wait }}
                    </p>
                    <div class="answer" v-if="items.nrbt">
                        <p style="margin: 0">{{ items.nrbt }}</p>
                        <p v-html="items.nrtext"></p>
                        <p style="color: #4da6ff; margin: 1em 0;" class="text-center fs-16"
                            @click="skipToDetail(items)">
                            点击进入查看详情
                        </p>
                        <p class="whether_use">
                            <span class="use_item" @click="useQuestion(true, items, index)">
                                <img :src="
                                    items.use_click
                                        ? 'static/images/ghjoa/check_good.png'
                                        : 'static/images/ghjoa/good.png'
                                " alt="" />
                                <span :style="{
                                    color: items.use_click ? 'red' : '',
                                }">有用</span>
                            </span>
                            <span @click="useQuestion(false, items, index)">
                                <img :src="
                                    items.notuse_click
                                        ? 'static/images/ghjoa/check_notgood.png'
                                        : 'static/images/ghjoa/not_good.png'
                                " alt="" />
                                <span :style="{
                                    color: items.notuse_click ? 'red' : '',
                                }">没用</span>
                            </span>
                        </p>
                    </div>
                    <!-- 相关推荐问题 -->
                    <div class="related_question" v-if="items.related_list && items.related_list.length">
                        <p style="margin-top: 0">
                            <img src="static/images/ghjoa/link.png" alt="" />
                            <span>相关推荐问题</span>
                        </p>
                        <div class="relateds">
                            <p v-for="item in items.related_list" :key="item.wtid" @click="raiseQuestion(item)">
                                <img src="static/images/ghjoa/tip.png" alt="" />
                                <span>{{ item.wtbt }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 搜索内容的匹配字符 -->
        <div class="match_keyword" v-show="match_show">
            <p v-for="(items, index) in match_quest" :key="index" v-html="items.new" @click="raiseQuestion(items)"></p>
        </div>
        <!-- 底部 -->
        <div class="bottom">
            <img src="static/images/ghjoa/shutu_icon.png" />
            <van-search v-model="keyword" left-icon="" placeholder="请输入搜索关键词" action-text="搜索" show-action
                @search="searchKeyword()" @cancel="searchKeyword()" />
        </div>
        <van-popup v-model="show" :round="true" position="bottom" :style="{ height: '30%' }">
            <van-nav-bar title="意见输入" left-text="返回" right-text="确定" @click-left="show = false"
                @click-right="sureSubmit()" />
            <textarea v-model="opinion_word" placeholder="为系统更完善，请填写建议，我们在收到建议后的一个工作日内回复，感谢！"></textarea>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: "questionOnline",
    data() {
        return {
            show: false,
            match_quest: [{ wtbt: '容积率1' }, { wtbt: '容积率2' }], //关键字检索的匹配列表
            keyword: "", //输入框的搜索关键字
            match_show: false, //匹配的内容显现与否

            question_answer: [],

            guess_page_size: 6, //猜你想问问题的每页数量
            guess_page: 1, //猜你想问的当前分页数
            guess_question_list: [], //猜你想问的列表数据

            catalogue_list: [], //目录分类

            count: 0, //反馈条数
            opinion_word: "", //意见文字

            wtid: "", //当前问题的id，用于没用统计时请求接口
            question_index: "", //问题的序列号，用于替换没用图片

            can_search: true, //是否可以搜索，用于节流
            feedback_num: '',   //反馈的总数
        };
    },
    watch: {
        keyword(newV, oldV) {
            //监听搜索关键字的改变
            if (newV) {
                if (!this.can_search) {
                    return;
                }
                this.can_search = false;
                setTimeout(() => {
                    this.searchKeyword();
                    // this.handleMatch();
                }, 300);
            }
        },
    },
    created() {
        this.getFeedBackNum();
        this.getCatalogue();
        this.guessQuestionData();
    },
    methods: {
        getFeedBackNum() {  //获取反馈问题总数，已判断反馈框显不显示
            dsf.http.post(`fn/flfgyd/conutfk?yhid=${dsf.util.loadSessionStore("user").user_id}`).then(
                (res) => {
                    this.feedback_num = res.data.data.length;
                }
            );
        },
        searchKeyword() {
            // 搜索关键字
            this.can_search = true;
            dsf.http.post(`fn/flfgyd/querygjzjs?gjzname=${this.keyword}`).then(
                (res) => {
                    if (!res.data.data.length) {
                        this.match_quest = [
                            {
                                wtbt: "暂无数据",
                                wtid: "-1",
                                new: "<span>暂无数据</span>",
                            },
                        ];
                        this.match_show = true;
                    } else {
                        this.match_quest = res.data.data;
                        this.handleMatch();
                    }
                    this.can_search = true;
                }
            );
        },
        guessQuestionData() {
            //获取猜你想问的数据
            dsf.http.post(`fn/flfgyd/queryznzxwdsy?limit=${this.guess_page_size}&page=${this.guess_page}&yhid=${dsf.util.loadSessionStore("user").user_id}`).then(
                (res) => {
                    this.guess_question_list = res.data.data;
                    this.count = res.count;
                    if (res.data.data.length < this.guess_page_size) {
                        this.guess_page = 0; //没有数据了，page从0开始，下次换一批时再加一
                    }
                }
            );
        },
        getCatalogue() {
            //获取目录分类
            dsf.http.post(`fn/flfgyd/flfgquerylmfl`).then((res) => {
                this.catalogue_list = Object.assign([], res.data.data);
            });
        },
        skipToSearch(value, keyword, type_id) {
            //跳转到搜索
            let obj = {
                type_value: value, //类型名
                wjjbvalue: type_id, //类型id
                gjzname: keyword, //查询项内容
            };
            this.$router.push({
                path: "/catalogSearch", query: {
                    index_obj: obj,
                },
            });
        },
        handleMatch() {
            //在弹出问题中匹配搜索字符
            this.match_quest.forEach((ele, index) => {
                if (ele["wtbt"].includes(this.keyword)) {
                    let title = ele["wtbt"].split(this.keyword);
                    // console.log(title);
                    let dom_obj = `<span>${title[0]}</span><span style="color: #ff7070;">${this.keyword}</span><span>${title[1]}</span>`;
                    // ele = dom_obj;
                    this.match_quest[index].new = dom_obj;
                    // console.log(sele);
                }
            });
            console.log(this.match_quest);
            this.match_show = true;
        },
        notMatchShow() {
            //输入框blur后 弹出问题消失
            setTimeout(() => {
                this.match_show = false;
            }, 200);
        },
        raiseQuestion(items) {
            //提出问题
            setTimeout(() => {
                this.match_show = false;
            }, 200);
            if (items.wtid === "-1") {
                return; //暂无数据不予点击反应
            }
            this.keyword = "";
            let obj = {};
            obj.question = items.wtbt;
            obj.wait = "获取问题答案中...";
            this.question_answer.push(obj);

            let promise2 = new Promise((resolve) => {
                dsf.http.post(`fn/flfgyd/queryxgtj?gjzname=${this.keyword}&wtid=${items.wtid}`).then(
                    (res) => {
                        resolve(res);
                    }
                );
            });
            let promise1 = new Promise((resolve) => {
                dsf.http.post(`fn/flfgyd/querynrByid?wtid=${items.wtid}`).then(
                    (res) => {
                        resolve(res);
                    }
                );
            })
                .then((res) => {
                    obj.nrbt = res.data.nrbt;
                    obj.nrtext = res.data.nrtext;
                    obj.wait = "";
                    obj.wtid = items.wtid; //保存wtid 供有用 没用使用
                    obj.use_check = false; //是否点击了有用没用按钮
                    obj.use_click = false; //点击了有用
                    obj.notuse_click = false; //点击了没用

                    // console.log(promise2);
                    return promise2;
                })
                .then((res) => {
                    // console.log(res);
                    obj.related_list = res.data.data;
                    this.question_answer.pop(); //先把当前元素出栈 再入栈
                    this.question_answer.push(obj);
                    console.log(this.question_answer);

                    this.$nextTick(() => {
                        let height = this.$refs.scrollerBox.offsetHeight;
                        this.$refs.contents.scrollTo(0, height, true); //将列表滚动到底部
                    });
                });

            // setTimeout(() => {
            //     obj.nrbt = "关于容积率计算规则";
            //     obj.nrtext = `容积率（PlotRatio/FloorAreaRatio/VolumeFraction）是指一个小区的地上总建筑面积与净用地面积的比率。又称建筑面积毛密度。`;
            //     obj.wait = "";
            //     obj.use_check = false; //是否点击了有用没用按钮
            //     obj.use_click = false; //点击了有用
            //     obj.notuse_click = false; //点击了没用
            //     this.question_answer.pop();
            //     this.question_answer.push(obj);
            //     console.log(this.question_answer);

            //     this.$nextTick(() => {
            //         let height = this.$refs.scrollerBox.offsetHeight;
            //         this.$refs.contents.scrollTo(0, height, true); //将列表滚动到底部
            //     });
            // }, 1500);
        },
        useQuestion(mes, items, index) {
            //问题有用或没用
            this.question_index = index; //问题序列

            if (items.use_check) return; //如果已经点击了有用或没用按钮，返回不重复请求接口
            if (mes) {
                //有用统计
                dsf.http.post(`fn/flfgyd/countyy?wjid=${items.wtid}`).then(
                    (res) => {
                        this.question_answer[
                            this.question_index
                        ].use_check = true;
                        this.question_answer[
                            this.question_index
                        ].use_click = true;
                    }
                );
            } else {
                //没用统计
                this.opinion_word = ""; //再一次弹出框时，文字清空
                this.show = true
                this.wtid = items.wtid;
            }
            let test = JSON.stringify(this.question_answer);
            this.question_answer = "";
            this.question_answer = JSON.parse(test);
            this.question_answer=Object.assign([],this.question_answer);
            console.log(this.question_answer);
        },
        sureSubmit() {
            //确认提交没用统计
            if (!this.opinion_word) {
                dsf.layer.toast("请填写意见")
                return;
            }
            let year = new Date().getFullYear();
            let month = new Date().getMonth() + 1;
            month = month > 9 ? month : "0" + month;
            let date = new Date().getDate();
            date = date > 9 ? date : "0" + date;
            dsf.http.post(`fn/flfgyd/countmy`, {
                wjid: this.wtid,
                fkr: dsf.util.loadSessionStore("user").name,
                fkrq: year + "-" + month + "-" + date,
                fknr: this.opinion_word,
                fkrid: dsf.util.loadSessionStore("user").user_id,
            }).then(
                (res) => {
                    console.log(res);
                    this.question_answer[this.question_index].use_check = true;
                    this.question_answer[
                        this.question_index
                    ].notuse_click = true;
                    this.show = false
                }
            );
            let test = JSON.stringify(this.question_answer);
            this.question_answer = "";
            this.question_answer = JSON.parse(test);
            this.question_answer=Object.assign([],this.question_answer);
        },
        skipToDetail(items) {   //跳转到内容详情
            console.log(items);
            this.$router.push({
                path: "/contentDetail", query: {
                    wjid: items.wtid,
                    title: items.nrbt,
                    from: 'other'
                },
            });
        }
    },
};
</script>
<style lang="scss" scoped>
textarea {
    width: 100%;
    height: 100%;
}

.question_online {
    padding: 15px 0 15px;
    background-color: #f7f7f7;
    overflow: hidden;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;

    // position: static;
    .text_color {
        color: #168bff;
    }

    .text_color2 {
        color: #6eb7ff;
    }

    .question,
    .catalog {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        padding: 15px 15px;
        border-radius: 8px;
    }

    .left {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .right {
        width: 70%;

        p:first-child {
            margin-top: 0;
        }

        p:last-child {
            margin-bottom: 0;
        }
    }

    .catalog {
        margin: 15px 0;
        padding-bottom: 0;

        .right span {
            display: inline-block;
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding-right: 5px;
        }
    }

    .feedback {
        background: #fff;
        padding: 10px 15px;
        border-radius: 8px;

        span:last-child {
            text-decoration: underline;
        }
    }

    .bottom {
        position: fixed;
        width: 100%;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        img {
            padding-left: 10px;
            width: 10%;
        }
    }

    .contents {
        left: 5%;
        width: 90%;
        overflow-y: auto;
        position: absolute;
        height: calc(100% - var(--f7-navbar-height) - 15px - 46px);
        box-sizing: border-box;
        padding-bottom: 20px;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        .scroller_box {
            margin-bottom: 54px;
        }
    }

    .match_keyword {
        position: fixed;
        width: 100%;
        bottom: 54px;
        padding: 10px;
        background-color: #eaf0f7;
        box-sizing: border-box;
        p {
            margin: 0;
            padding-left: 15px;
            padding: 0.8em 15px;
            border-bottom: 1px dashed #d1d6db;
        }
    }

    .question_answer {
        .question2 {
            padding: 15px 15px;
            border-radius: 8px;
            background-color: #349aff;
            color: #fff;
            display: inline-block;
        }

        .answer {
            background-color: #fff;
            padding: 12px 18px 0;
            border-radius: 8px;
        }

        .whether_use {
            margin-bottom: 0;
            border-top: 1px dashed #d0d0d0;

            img {
                width: 13%;
                margin-right: 3%;
                vertical-align: bottom;
            }

            >span {
                width: 49%;
                box-sizing: border-box;
                display: inline-block;
                padding: 10px 0;
            }

            .use_item {
                border-right: 1px dashed #d0d0d0;
            }
        }
    }

    .related_question {
        background-color: #fff;
        padding: 12px 18px;
        border-radius: 8px;
        margin: 1em 0 0;

        img {
            width: 8%;
            vertical-align: top;
        }

        .relateds {
            p {
                text-indent: 1em;
            }

            img {
                width: 6%;
                display: inline;
                float: left;
            }

            span {
                color: #4da6ff;
            }
        }
    }
}

>>>.van-search {
    width: 90%;
    .van-search__content {
        padding-left: 0;
        background-color: white;
    }
}
</style>