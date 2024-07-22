<template>
<div class="comment">
    <div class="commlist" v-for="(item) in commens" :key="item.id">
        <van-image round src="./static/images/EnterpriseServices/zj_avatar.png"></van-image>
        <div class="commright">
            <div class="texts">
                <div class="username">
                    <p class="name">{{item.createUName}}</p>
                    <p class="icons">
                        <van-icon name="chat-o" @click="replyUser(item)" />
                        <van-icon name="delete-o" @click="deleteComment(item)" v-if="user.user_id == item.createUserId" />
                    </p>
                </div>
                <div class="commtext">
                    {{item.commentContent}}
                </div>
                <div class="timer">
                    {{item.createdate}}
                </div>
            </div>
            <!--这里是放回复信息的  等可以回复了再加上 页面内容在下面注释掉的那个地方-->
            <div class="subComm" v-if="item.children && item.children.length>0">
                <div class="commlist" v-for="(obj) in item.children" :key="obj.id">
                    <van-image round src="./static/images/EnterpriseServices/zj_avatar.png"></van-image>
                    <div class="commright">
                        <div class="texts">
                            <div class="username">
                                <p class="name">{{obj.createUName}}回复{{obj.replyToUserName}}</p>
                                <p class="icons">
                                    <van-icon name="chat-o" @click="replyUser(obj)" />
                                    <van-icon name="delete-o" @click="deleteComment(obj)" v-if="user.user_id == obj.createUserId" />
                                </p>
                            </div>
                            <div class="commtext">
                                {{obj.commentContent}}
                            </div>
                            <div class="timer">
                                {{obj.createdate}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="semdMsg">
        <div class="msgForm">
            <van-image round src="./static/images/EnterpriseServices/zj_avatar.png"></van-image>
            <van-field ref="msg" v-model.trim="message" rows="3" autosize border type="textarea" maxlength="250" :placeholder="placeholder" show-word-limit />
        </div>
        <van-button type="info" size="small" @click="submitComment" color="#1064CD">提交评论</van-button>
    </div>

</div>
</template>

<script>
export default {
    name: 'comment',
    components: {},
    props: {
        taskId: {
            type: String,
            default: ""
        },
        commentData: {
            type: Array,
            default: () => []
        },
        isApp: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            message: "",
            user: {},
            placeholder: "请输入评论",
            replyData: {},
            isReply: false
        };
    },
    computed: {
        commens() {
            this.commentData.forEach(item => {
                item.createdate = moment(new Date(item.createTime)).format("YYYY年MM月DD日 HH:mm")
            });
            let data = this.transData(this.commentData, "id", "replyFid", "children")
            return data
        }
    },
    watch: {

    },
    methods: {
        transData(a, idStr, pidStr, chindrenStr) {
            var r = [],
                hash = {},
                id = idStr,
                pid = pidStr,
                children = chindrenStr,
                i = 0,
                j = 0,
                len = a.length;
            for (; i < len; i++) {
                hash[a[i][id]] = a[i];
            }
            for (; j < len; j++) {
                var aVal = a[j],
                    hashVP = hash[aVal[pid]];
                if (hashVP) {
                    !hashVP[children] && (hashVP[children] = []);
                    hashVP[children].push(aVal);
                } else {
                    r.push(aVal);
                }
            }
            return r;
        },
        submitComment() {
            if (!this.message) {
                this.$toast.fail("请输入评论内容！")
                return
            }
            dsf.http.post(`/fn/taskman/comment/save?timer=` + new Date().getTime(), {
                taskId: this.taskId,
                comment: this.message,
                replyRecordId: this.isReply ? this.replyData.id : '',
                replyFid: this.isReply ? (this.replyData.replyFid || this.replyData.id) : ''
            }).then(res => {
                console.log(res)
                if (res.data.code == 200) {
                    this.message = ""
                    this.$toast("提交成功！")
                    this.placeholder = "请输入评论"
                    this.replyData = {}
                    this.isReply = false
                    this.$emit("saveComment")
                }
            })
        },
        deleteComment(item) {
            let that = this
            dsf.layer.confirm({
                message: '是否确认删除',
                confirmButtonText: '确认'
            }, () => {
                dsf.http.post(`/fn/taskman/comment/delete?timer=` + new Date().getTime(), {
                    commentId: item.id
                }).then(res => {
                    console.log(res)
                    if (res.data.code == 200) {
                        this.$toast("删除成功！")
                        this.$emit("saveComment")
                    }
                })
            })

        },
        replyUser(item) {
            console.log(item)
            this.placeholder = "回复" + item.createUName
            this.replyData = item
            this.isReply = true
            this.$refs.msg.focus();
        }
    },
    created() {
        this.user = dsf.util.loadSessionStore("user");
    },
    mounted() {
        console.log(this.commentData)

    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.comment {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 0 20px;

    .semdMsg {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-end;
        margin-top: 20px;

        .msgForm {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .van-image {
                width: 30px;
                height: 30px;
            }

            .van-field {
                flex: 1;
                margin-left: 15px;
                border: 1PX solid #ebebeb;
                font-size: var(--font_size_3);
            }
        }

        .van-button {
            margin-top: 20px;
        }
    }

    .commlist {
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1PX solid #ebebee;
        padding: 10px 0;

        &:last-child {
            border: none;
        }

        &>.van-image {
            width: 30px;
            height: 30px;
        }

        .commright {
            flex: 1;
            margin-left: 15px;

            .texts {
                display: flex;
                flex-direction: column;

                .username {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 24px;

                    .name {
                        font-size: var(--font_size_4);
                        color: #999999;
                    }

                    .icons {
                        display: flex;
                        align-items: center;

                        .van-icon {
                            font-size: var(--font_size_3);
                            color: #999999;
                            margin-left: 15px;
                            cursor: pointer;
                        }
                    }
                }

                .commtext {
                    font-size: var(--font_size_3);
                    color: #333333;
                    line-height: 24px;
                }

                .timer {
                    font-size: var(--font_size_4);
                    color: #999999;
                    line-height: 24px;
                }
            }
        }
    }
}
</style>
