<template>
<div class="mailListNew">
    <div class="loc">
        <span>当前位置：</span>
        <p @click="goFirst()">
            <span>中共吉林省委党校</span>
            <van-icon name="arrow" />
        </p>
        <p v-for="(item,index) in locs" :key="index">
            <span>{{item.name}}</span>
            <van-icon name="arrow" />
        </p>
    </div>
    <div class="mails" :class="{'noHeader': !$store.state.isShowAppHeader}">
        <div v-for="(item,index) in depts" :key="index" @click="goDept(item)">
            <van-icon name="play" />
            <span>{{item.name}}</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'mailListNew',
    components: {},
    data() {
        return {
            depts: [],
            locs: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        loadDeptments(level, id) {
            let that = this
            dsf.http.post("/fn/mailList/queryMailList", {
                level: level,
                fValue: level == 1 ? '' : id
            }).then(res => {
                console.log(res)
                if (res && res.status == 200) {
                    that.depts = res.data.rows
                }
            });
        },
        goDept(item) {
            if (item.level == '2') {
                this.locs = [item]
                this.loadDeptments(item.level, item.value)
            } else {
                this.$router.push({
                    name: "mailListUser",
                    params: {
                        level: item.level,
                        value: item.value
                    }
                })
            }
        },
        goFirst() {
            this.locs = []
            this.loadDeptments(1)
        }
    },
    created() {},
    mounted() {
        this.loadDeptments(1)
    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/themes.scss';
@import '../../assets/styles/mixin.scss';

.mailListNew {
    .loc {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 15px;
        overflow: hidden;
        background: #FFF;
        border-bottom: 1px solid #ebebeb;

        &>span:first-child {
            flex-shrink: 0;
            font-size: var(--font_size_4);
            @include font-theme('normal');
        }

        &>p {
            overflow: hidden;
            display: flex;
            align-items: center;
            margin: 0 5px;

            .van-icon {
                font-size: var(--font_size_4);
                color: #999999;
                flex-shrink: 0;
                margin-left: 5px;
            }

            &>span {
                width: 100%;
                display: block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: var(--font_size_4);
                color: #666666;
            }
        }
    }

    .mails {
        position: absolute;
        left: 0;
        right: 0;
        top: 76px;
        bottom: 0;
        background: #FFF;
        overflow-y: auto;

        &.noHeader {
            top: 30px !important;
        }

        &>div {
            width: 100%;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            padding: 0 15px;

            .van-icon {
                font-size: var(--font_size_3);
                color: #333;
                flex-shrink: 0;
            }

            span {
                flex: 1;
                height: 100%;
                display: flex;
                align-items: center;
                font-family: 'Alibaba-PuHuiTi-Regular';
                font-size: var(--font_size_2);
                border-bottom: 1px solid #ebebeb;
                margin-left: 10px;
            }
        }
    }
}
</style>
