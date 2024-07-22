<template>
<div class="memoEdit-container">
    <div class="top">
        <van-cell title="会议备忘录" icon="arrow-left" center @click="$router.back()">
            <template #default>
                <van-button type="primary" @click.stop="save()">保存</van-button>
            </template>
        </van-cell>
        <van-field v-model="title" name="标题" center placeholder="请输入标题"></van-field>
    </div>
    <div class="content">
        <van-field type="textarea" autosize rows="15" v-model="text" name="正文" border placeholder="请输入正文"></van-field>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.memoId,
            title: '',
            text: '',
            user: dsf.util.loadSessionStore("user")
        }
    },
    created() {
        let self = this;
        if (self.id) {
            self.getData();
        }
    },
    methods: {
        async save() {
            let self = this;
            if (!self.title) {
                dsf.layer.toast("标题不能为空！", false);
                return;
            }
            let isNew = false; // 是否新增
            if (!self.id) {
                isNew = true;
                self.id = dsf.util.guid(); // 生成guid
            }
            let sql = '';
            if (isNew) {
                sql = `insert into memo(id,fid,name,updatetime,content) values('${self.id}','${self.user.ID}','${self.title}','${dsf.date.format(new Date(), "yyyy-mm-dd hh:ii:ss")}','${self.text}')`;
            } else {
                sql = `update memo set name='${self.title}',content='${self.text}',updatetime='${dsf.date.format(new Date(), "yyyy-mm-dd hh:ii:ss")}' where id='${self.id}'`;
            }
            // console.log("sql =", sql);
            let res = await self.operateDB(sql);
            if (res == 1) {
                dsf.layer.toast("已保存！", true, () => {
                    // if (isNew) self.$router.replace(`memoEdit/${self.id}`)
                    self.$router.go(-1);
                });
            } else {
                dsf.layer.toast("系统错误，请稍后重试！", false);
            }
        },
        async del() {
            let self = this;
            let sql = `delete from memo where id='${self.id}'`;
            let res = await self.operateDB(sql);
            if (res == 1) {
                dsf.layer.toast("已删除！", true, () => self.$router.back());
            } else {
                dsf.layer.toast("系统错误，请稍后重试！", false);
            }
        },
        async getData() {
            let self = this;
            let sql = `select name,content from memo where id='${self.id}'`;
            let res = await self.queryDB(sql);
            console.log('res == ', res);
            if (res) {
                if (res.length > 0) {
                    self.title = res[0].NAME;
                    self.text = res[0].CONTENT;
                } else {
                    // dsf.layer.toast("暂无数据！", false);
                }
            } else {
                dsf.layer.toast("系统错误，请稍后重试！", false);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.memoEdit-container {
    height: 100%;
    display: flex;
    flex-direction: column;

    .top {
        .van-cell__title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 600 !important;

            span {
                font-size: 0.88rem;
                padding-left: 0.4rem;
            }
        }

        .van-cell__left-icon {
            font-size: 0.2rem;
        }
    }

    >.content {
        flex: 1;
        overflow: auto;
        border: 1px solid #ddd;
        // padding: 0 40px;
    }

    .van-field {
        padding: 0.8rem !important;
    }
}
</style>
