<template>
<div>
    <div>
        <van-cell :value="agendaInfo.title" />
        <van-cell>
            <template #default>
                <div style="color:#969799" v-html="agendaInfo.content"></div>
            </template>
        </van-cell>
    </div>
    <div style="margin-top: 0.2rem">
        <div v-for="(item, idx) in agendaInfo.meetings" :key="idx">
            <van-cell :value="`${dsf.date.format(item.startTime, 'm-d')} ${dsf.date.format(item.startTime, 'HH:ii')}-${dsf.date.format(item.endTime, 'HH:ii')}`" title="会场时间" />
            <van-cell :value="item.position" title="会场地址" />
            <van-cell :value="item.seat" title="会场座位">
                <template #right-icon>
                    <span class="tag">座位图</span>
                </template>
            </van-cell>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            agendaInfo: null,
            agendaId: this.$route.params.agendaId,
            loading: null
        }
    },
    created() {
        let self = this;
        self.getAgendaDetails();
    },
    methods: {
        getAgendaDetails() {
            let self = this;
            self.loading = dsf.layer.loading();
            dsf.http
                .post(`fn/peopleCongress/agendaDetails`, {
                    agendaId: self.agendaId
                })
                .done(result => {
                    if (result.code == 200 && result.data) {
                        self.agendaInfo = result.data;
                    }
                })
                .error(error => {})
                .always(() => {
                    dsf.layer.closeLoading(self.loading);
                });
        },
        getMeetingTime(startTime, endTime) {
            return `${dsf.date.format(startTime, 'm-d')} ${dsf.date.format(startTime, 'HH:ii')}-${dsf.date.format(endTime, 'HH:ii')}`;
        }
    }
}
</script>

<style lang="scss" scoped>
.van-cell {
    .van-cell__title {
        font-size: var(--font_size_2);
        flex: inherit;
        width: 30%;
    }

    .van-cell__value {
        font-size: var(--font_size_2);
        text-align: left;
    }

    &::after {
        border-bottom: 1px solid #ddd;
    }
}

.tag {
    display: inline-block;
    background-color: rgba(50, 136, 255, 0.12);
    color: #3288FF;
    border-radius: 3px;
    line-height: 21px;
    padding: 0 10px;
    font-size: var(--font_size_4);
}
</style>
