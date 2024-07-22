<template>
    <div class="ds-announcement fc announcementbox">
        <div class="announcement-search">
            <form action="/">
                <van-search v-model="value" placeholder="搜索" @search="onSearch" @clear="onClear" />
            </form>
        </div>
        <div class="announcement-list flex1 verticalScroll" v-if="data.length">
            <div class="announcement-list-inner">
                <van-pull-refresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
                    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                        <div v-for="val in data" :key="val.id" class="announcement-list-content" @click="toDtail(val)">
                            <span v-if="val['status'] != '2'" class="isStatus"></span>
                            <div class="announcement-list-content-tit">
                                {{ val.itemsContent }}
                            </div>
                            <div class="announcement-list-time">
                                <div class="announcement-list-time-left " style="display:flex;">
                                    <i class="iconfont iconyonghu"></i>
                                    <span class="van-ellipsis">{{ val.createUname }}</span>
                                </div>
                                <div class="announcement-list-time-right">
                                    <i class="iconfont iconalarm"></i>
                                    <span>{{ val.time }}</span>
                                </div>
                            </div>
                        </div>
                    </van-list>
                </van-pull-refresh>
            </div>
        </div>
        <commonempty description="暂无数据" v-else />

    </div>
</template>

<script>
export default {
    name: 'announcement',
    data() {
        return {
            value: '',
            startindex: 0,
            start: 0,
            limit: 10,
            total: 0,
            data: [],
            obj_hei: {
                height: ''
            },
            loading: false,
            finished: false,
            refreshing: false
        }
    },
    computed: {
        contentHeight: function () {
            let contentHeight = document.body.clientHeight
            this.obj_hei.height = (contentHeight - 108) + 'px'
            return this.obj_hei
        }

    },
    activated() {
        this.getList()
    },
    created() { },
    methods: {
        getList() {
            let self = this
            let obj = {
                start: self.start,
                limit: self.limit,
                key: self.value
            }
            dsf.http.post("fn/mobileNotice/getList", Object.assign(obj, this.$route.query))
                .then(res => {
                    if (self.refreshing) {
                        self.refreshing = false;
                    }
                    self.loading = false;
                    if (res.data.rows.length == 0) {
                        self.finished = true;
                    }
                    if (res.status === 200) {
                        if (self.data.length > 0) {
                            self.data = [...self.data, ...res.data.rows]
                        } else {
                            self.data = res.data.rows
                        }
                    } else {
                        self.dsf.layer.toast(res.message);
                    }
                })
                .catch(res => {
                    self.dsf.layer.toast(res.message);
                })
                .finally(() => { });
        },
        onLoad() {
            this.startindex++
            this.start = this.startindex * this.limit
            this.getList()
        },
        initData() {
            this.finished = false;
            this.start = 0
            this.startindex = 0
            this.data = [];
            this.getList()
        },
        onRefresh() {
            this.initData()
        },
        onSearch(val) {
            this.initData()
        },
        onClear() {
            this.initData()
        },
        async toDtail(obj) {
            if (obj.status === "1") {
                await dsf.http.post("fn/mobileNotice/markRead", {
                    pks: obj.id
                }).then(res => {
                    console.log(res)
                    this.data.forEach(item => {
                        if (item.info_id == obj.info_id && item.status < 2) {
                            item.status = 2
                        }
                    })
                })
            }

            this.$router.push({
                path: `/commonForm/${obj.moduleId}/${obj.info_id}`
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.isStatus {
    position: absolute;
    left: 6px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background: #13C940;
    display: inline-block;
}

.announcementbox {
    width: 100%;
    height: 100%;
}

.fc {
    display: flex;
    flex-direction: column;
}

.flex1 {
    flex: 1;
}

.verticalScroll {
    overflow-y: scroll;
    overflow-x: hidden;
}
</style>
