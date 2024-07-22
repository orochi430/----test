<template>
    <div class="sdtChangeUser">
        <van-row v-for="(item, index) in userList" :key="index">
            <van-cell :title="item.uname">
                <template #right-icon>
                    <van-button type="primary" size="small" @click="change(item)">切换</van-button>
                </template>
            </van-cell>
        </van-row>
    </div>
</template>

<script>
export default {
    name: 'sdtChangeUser',
    components: {},
    data() {
        return {
            userList: []
        };
    },
    methods: {
        loadData() {
            let self = this
            this.data = []
            this.$toast.loading("加载中");
            dsf.http.post("/ctrl/userRelation/getRelationUserData").then(res => {
                console.log(res)
                self.userList = res.data.data
            });
        },
        change(item) {
            let self=this
            let loadingIndx = dsf.layer.loading("切换中...")
            dsf.http.post("/ctrl/mobileAuthNew/changeLoginUser", { "__DATA": JSON.stringify(item), "token": item.token }).then(res => {
                dsf.util.removeSessionStore('user');
                dsf.util.removeSessionStore('loginToken');
                dsf.util.removeToLocalStore('user');
                dsf.util.removeToLocalStore('loginToken');

                let dateUserTemp = res.data.data
                dsf.util.saveToSessionStore("user", dateUserTemp);
                dsf.util.saveToSessionStore("loginToken", dateUserTemp.auth.token);
                dsf.util.saveToLocalStore("loginToken", dateUserTemp.auth.token);
                dsf.util.saveToLocalStore("user", dateUserTemp);
                self.$router.push({
                    path: `/index`
                })
            }).always(() => {
                dsf.layer.closeLoading(loadingIndx)
            });
        }
    },
    mounted() {
        this.loadData()
    }
}
</script>

<style lang="scss" scoped>
.sdtChangeUser {
    height: 100%;
    width: 100%;

    ::v-deep .van-cell {
        font-size: var(--font_size_2) !important;
    }

    ::v-deep div,
    p,
    span {
        line-height: 36px !important;
    }
}
</style>
