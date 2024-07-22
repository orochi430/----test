<template>
  <van-popup
    v-model="commentDialog"
    get-container="#app"
    lock-scroll
    style="height: 100vh"
    position="bottom"
    closeable
    @close="$emit('closeCallback')"
  >
    <div class="gray title">评论</div>
    <div class="commentDialog">
      <div class="commentList" v-if="comments.length != 0">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="数据已全部加载"
          @load="onLoad"
          offset="80"
        >
          <template v-for="item in comments">
            <div class="box"  :key="item.id" v-if="item.enableState == 1 && item.shieldState == 1">
              <div class="firstFloor">
                <img :src="item.imgPath" alt="" />
                <div class="header_right">
                  <div class="name gray">{{ item.createUname }}</div>
                  <div class="content">{{ item.commentsContent }}</div>
                  <div class="timer flex jb ac">
                    <div class="timer_left gray">
                      {{ item.createTime }}
                      <span class="normal" @click="reply(item)"
                        >&nbsp;&nbsp;回复</span
                      >
                    </div>

                    <div
                      :class="item.open ? 'normal' : 'gray'"
                      v-if="item.total != 0"
                      @click="clickToReply(item)"
                    >
                      <van-icon name="chat-o" :badge="item.total" size="28" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="chidrenComment" v-if="item.showInput">
                <van-field
                  v-model="childrenContent"
                  :ref="item.id"
                  center
                  :placeholder="placeholder"
                >
                  <template #button>
                    <van-button
                      size="small"
                      type="primary"
                      v-handleSend="[send, 800, true, item]"
                      >发送</van-button
                    >
                  </template>
                </van-field>
              </div>
              <div v-if="item.open" class="layer">
                <van-list
                  v-model="chidrenLoading"
                  :finished="chidrenFinished"
                  finished-text="数据已全部加载"
                  @load="chidrenOnLoad(item)"
                >
                  <template v-for="it in item.replys">
                    <div
                      class="list_item"
                      :key="it.id"
                      v-if="it.enableState == 1 && it.shieldState == 1"
                    >
                      <img :src="it.imgPath" alt="" />
                      <div class="list_right">
                        <div class="name gray">{{ it.createUname }}</div>
                        <div class="reply">
                          <span>回复</span>
                          <span class="normal">{{ it.reply }}:</span>
                          <span class="replyContent">{{ it.content }}</span>
                        </div>
                        <div>
                          <span class="gray">{{ it.createTime }}</span>
                          <span class="normal" @click="reply(it)"
                            >&nbsp;&nbsp;回复</span
                          >
                        </div>
                        <div class="chidrenComment" v-if="it.showInput">
                          <van-field
                            v-model="childrenContent"
                            :ref="it.id"
                            center
                            :placeholder="placeholder"
                          >
                            <template #button>
                              <van-button
                                size="small"
                                type="primary"
                                v-handleSend="[send, 800, true, item]"
                                >发送</van-button
                              >
                            </template>
                          </van-field>
                        </div>
                      </div>
                    </div>
                  </template>
                </van-list>
              </div>
            </div>
          </template>
        </van-list>
        <!-- <p
          class="fetch-more-comment grey"
          v-if="comments.length > 6 && more"
          @click="more = !more"
        >
          查看全部 {{ total }} 条回复
          <i class="iconfont iconxialajiantou"></i>
        </p> -->
      </div>
      <commonempty description="暂无评论数据" v-else></commonempty>
      <div class="comment">
        <van-field v-model="content" ref="input" center placeholder="写评论">
          <template #button>
            <van-button
              size="small"
              type="primary"
              v-handleSend="[send, 800, false]"
              >发送</van-button
            >
          </template>
        </van-field>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: "commentDialog",

  props: {
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    metaData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  directives: {
    handleSend: {
      inserted: function (el, binding) {
        // console.log("binding",binding,el);
        // console.time("ddd");
        let [fun, time, ...args] = binding.value;
        let debounceFn = Throttle(fun, time, args);
        function Throttle(func, delay = 800, args) {
          let timeout;
          return function () {
            const context = this;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
              func.apply(context, args);
            }, delay);
          };
        }
        el.addEventListener("click", debounceFn);
      },
      unbind: function (el) {
        // 移除事件监听器
        el.removeEventListener("click", () => {});
      },
    },
  },
  components: {},

  data() {
    return {
      loading: false,
      finished: false,
      content: "",
      chidrenLoading: false,
      chidrenFinished: false,
      childrenContent: "",
      headDate: {},
      start: 0,
      // pageSize:5,
      total: 0,
      more: true,
      comments: [],

      commentDialog: true,
      params: {
        content: "",
        typeId: "",
        subTypeId: "",
        contentId: this.formParams.pk,
        orgCommentId: "",
        fid: "",
      },
      childrenParams: {
        content: "",
        typeId: "",
        subTypeId: "",
        contentId: "",
        orgCommentId: "",
        fid: "",
      },
      placeholder: "写评论",
    };
  },

  created() {
    this.fetchData();
  },

  mounted() {},

  activated() {},

  computed: {},

  watch: {},

  methods: {
    // 触底加载更多数据
    onLoad() {
      // 异步更新数据
      // if (!this.more) {
      //   this.fetchData();
      // } else {
      //   // this.loading = true;
      //   this.loading = false;
      // }
      this.fetchData();
      // this.loading = false;
    },
    chidrenOnLoad(item) {
      this.initData(item);
    },
    // 加载数据
    fetchData() {
      let params = {
        contentId: this.formParams.pk,
        pageSize: 5,
        start: this.start,
        shieldState:1,
        enableState:1
      };
      dsf.http
        .post("/ctrl/partyComment/commentList", params)
        .then((res) => {
          console.log("res", res.data);
          if (res.data.code == 200) {
            this.loading = false;
            this.start += 5;
            // this.pageSize += 5;
            let temp = [];
            // this.total=res.data.data.total;
            this.total = res.data.data.total;
            res.data.data.list.forEach(async (item) => {
              let obj = {
                createUname: item.createUname,
                id: item.id,
                commentsContent: item.commentsContent,
                contentId: item.contentId,
                createTime: item.createTime,
                imgPath: item.imgPath,
                open: false,
                total: item.total,
                showInput: false,
                chidrenStart: 0,
                enableState: item.enableState,
                shieldState: item.shieldState,
                replys: [],
              };
              temp.push(obj);
            });
            this.comments = [...this.comments, ...temp];
            if (
              res.data.data.list.length == 0 ||
              res.data.data.list.length < 5 ||
              this.total == this.comments.length
            ) {
              // 加载结束
              this.finished = true;
            }
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.finished = true;
          console.log(err);
        });
    },
    async initData(data) {
      let params = {
        commentId: data.id,
        pageSize: 5,
        start: data.chidrenStart,
        shieldState:1,
        enableState:1
      };
      return new Promise((resolve, reject) => {
        dsf.http
          .get("/ctrl/partyComment/commentDetail", params)
          .then((res) => {
            console.log("res", res.data);

            if (res.data.code == 200) {
              let temp = [];
              this.chidrenLoading = false;
              data.chidrenStart += 5;
              res.data.data.list.forEach(async (item) => {
                temp.push({
                  createUname: item.createUName,
                  id: item.id,
                  content: item.content,
                  contentId: item.contentId,
                  createTime: item.createTime,
                  imgPath: item.imgPath,
                  fid: item.fid,
                  reply: item.reply,
                  showInput: false,
                  orgCommentId: item.orgCommentId,
                  enableState: item.enableState,
                  shieldState: item.shieldState,
                });
              });
              data.replys = [...data.replys, ...temp];
              if (
                res.data.data.list.length == 0 ||
                res.data.data.list.length < 5
              ) {
                // 加载结束
                this.chidrenFinished = true;
              }
              resolve();
            } else {
              console.log(res.data.message);
              this.chidrenLoading = false;
              this.chidrenFinished = true;
              resolve();
            }
          })
          .catch((err) => {
            console.log(err);
            resolve();
          });
      });
    },
    reply(data) {
      this.comments.forEach((item) => {
        // if (data.reply) {
        item.replys.forEach((it) => {
          if (it.id == data.id) {
            this.childrenContent = "";
            it.showInput = !it.showInput;
          } else {
            it.showInput = false;
          }
        });
        // } else {
        if (item.id == data.id) {
          this.childrenContent = "";
          item.showInput = !item.showInput;
        } else {
          item.showInput = false;
        }
        // }

        // else {
        //   item.open = false;
        // }
      });
      this.$nextTick(() => {
        this.$refs[data.id][0].focus();
        this.placeholder = "回复@" + data.createUname;
        this.childrenParams = {
          content: "",
          typeId: "",
          subTypeId: "",
          contentId: data.contentId || this.formParams.pk,
          orgCommentId: data.orgCommentId || data.id || "",
          fid: data.id || "",
        };
      });
    },
    send(flag = false, item) {
      let obj;
      if (flag) {
        obj = this.childrenParams;
        obj.content = this.childrenContent;
        if (this.childrenContent == "") {
          dsf.layer.toast("回复不能为空");
          return;
        }
      } else {
        obj = this.params;
        obj.content = this.content;
        if (this.content == "") {
          dsf.layer.toast("回复不能为空");
          return;
        }
      }
      dsf.http
        .post("/ctrl/partyComment/comment", obj, {
          headers: { "Content-Type": "application/json;charset=UTF-8" },
        })
        .then((res) => {
          console.log("res", res.data);
          if (res.data.code == 200) {
            if (flag) {
              this.initData(item);
              this.start = 0;
              // this.pageSize=5;
              this.comments = [];
              this.finished = false;
              this.loading = true;
              this.fetchData();
              this.childrenContent = "";
            } else {
              this.start = 0;
              // this.pageSize=5;
              this.finished = false;
              this.loading = true;
              this.comments = [];
              this.fetchData();
              this.content = "";
              // this.$refs.input.setAttribute("placeholder", "");
            }
          } else {
            console.log(res.data.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.finished = true;
          console.log(err);
        });
    },
    async clickToReply(data) {
      if (!data.open && data.replys.length == 0) {
        await this.initData(data);
      }
      this.comments.forEach((item) => {
        if (item.id == data.id) {
          item.open = !item.open;
          // item.showInput=true;
          // return;
        }
        // else {
        //   item.open = false;
        // }
      });
    },
  },
};
</script>

<style scoped lang='scss'>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";
.commentDialog {
  height: calc(100vh - 52px);
  padding: 10px;
  background: #f9f9f9;
  .commentList {
    padding-bottom: 70px;
    .box {
      background-color: #fff;
      box-shadow: 1px 1px 10px 4px #ebebeb;
      border-radius: 4;
      margin-bottom: 12px;
      padding: 20px;
      .firstFloor {
        display: flex;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .header_right {
          margin-left: 10px;
          flex: 1;
          .name,
          .reply {
            margin-bottom: 4px;
          }
        }
      }
      .layer {
        margin-top: 15px;
        .list_item {
          display: flex;
          padding: 20px;
          // background-color: #eee;
          // box-shadow: 1px 1px 10px 4px #ebebeb;
          border-radius: 4;
          margin-bottom: 3px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
          .list_right {
            margin-left: 10px;
            flex: 1;
            min-width: 0;
            .name,
            .reply {
              margin-bottom: 2px;
              word-wrap: break-word;
            }
          }
        }
      }
      // display: flex;
      // padding: calc(16px * var(--i-comment-detail-scale));

      // padding: 20px;
    }
  }
  .chidrenComment {
    // background: #fff;
    width: 100%;
    border: 1px solid #eee;
    margin-top: 15px;
    ::v-deep .van-field__control {
      border: 1px solid #f2f2f2;
      background: #f2f2f2;
      border-radius: 0 4px 4px 0;
      padding: 6px 12px;
    }
  }
  .comment {
    position: fixed;
    bottom: 0;
    height: 1.2rem;
    left: 0;
    width: 100%;
    z-index: 9999;
    background: #fff;
    ::v-deep .van-field__control {
      border: 1px solid #f2f2f2;
      background: #f2f2f2;
      border-radius: 0 4px 4px 0;
      padding: 6px 12px;
    }
  }
  ::v-deep .van-list__finished-text {
    background: #fff;
  }
  .normal {
    color: var(--normal);
  }
  .replyContent {
    letter-spacing: 0.01rem;
  }
  .gray {
    color: #929292;
  }
}
.title {
  height: 52px;
  text-align: center;
  line-height: 52px;
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 99999;
}
::v-deep .van-icon-cross {
  position: fixed !important;
  z-index: 99999;
}
.fetch-more-comment {
  background: #f3f3f3;
  margin-top: 20px;
  padding: 10px 0;
  text-align: center;
  border-radius: 5px;
}
</style>