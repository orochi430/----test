<template>
<div>
    <div class="info" :class="[isDaiBan && isRead(item.whetherRead) ? 'dot' : '']" v-for="item in list" :key="item.id" @click="link(item)">
        <div class="info_t" :class="[isDaiBan && isRead(item.whetherRead) ? 'blod' : 'normal']">
            <img v-if="isDaiBan && isUrgent(item.urgent)" class="img" src="static/images/project/fgwPad/ji.png" />
            <p v-if="isDaiBan" class="fawen">[{{ item.module_name }}]</p>
            <p class="content">{{ item.bt }}</p>
        </div>
        <div class="info_b">
            <div class="pishi">
                <img class="img" src="static/images/project/fgwPad/pishi.png" />
                <span>{{ item.userName }}</span>
            </div>
            <div class="time">
                <img class="img" src="static/images/project/fgwPad/timer.png" />
                <span>{{ item.time }}</span>
            </div>
        </div>
        <p class="line"></p>
    </div>
</div>
</template>

<script>
export default {
    name: "padList",
    props: {
        list: {
            type: Array,
        },
        isDaiBan: {
            type: Boolean,
        }
    },
    data() {
        return {};
    },
    methods: {
        link(data) {
            if (this.isDaiBan) {
                dsf.http.post(`fn//fgw/todo/setRead`, {
                        id: data.id
                    })
                    .done(res => {

                    }).error(err => {

                    }).finally(() => {
                        this.$router.push({
                            name: "dsfIframe",
                            query: {
                                url: data.url,
                                title: data.bt,
                            },
                        });
                    })
                return
            }
            this.$router.push({
                name: "dsfIframe",
                query: {
                    url: data.url,
                    title: data.bt,
                },
            });
        },
        isUrgent(type) {
            return type == 1;
        },
        isRead(type) {
            return type == 0;
        }
    },
};
</script>

<style lang="scss" scoped>
.van-list {
    .info {
        margin: 23px 42px;
        position: relative;

        .info_t {
            display: flex;
            font-size: 22px;
            color: #333333;
            line-height: 31px;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 10px;

            img {
                width: 29px;
                height: 29px;
                flex-shrink: 0;
                margin-right: 10px;
            }

            .fawen {
                // width: 59px;
                color: #0086d9;
                margin-right: 8px;
                flex-shrink: 0;
            }

            .content {
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                flex: 1;
            }
        }

        .blod {
            font-weight: 500;
        }

        .normal {
            font-weight: 400;
        }

        .info_b {
            display: flex;
            height: 23px;
            align-items: center;
            justify-content: space-between;

            .time,
            .pishi {
                display: flex;
                align-items: center;

                img {
                    width: 18px;
                    height: 18px;
                }

                span {
                    margin-left: 10px;
                    font-size: var(--font_size_2);
                    color: #666666;
                    line-height: 46px;
                    font-weight: 400;
                }
            }
        }

        .line {
            width: 100%;
            height: 1px;
            margin-top: 22px;
            background-color: #d8d8d8;
        }
    }

    .dot::before {
        content: "";
        width: 12px;
        height: 12px;
        background: #0086d9;
        position: absolute;
        border-radius: 50%;
        left: -22px;
        top: 6px;
    }
}
</style>
