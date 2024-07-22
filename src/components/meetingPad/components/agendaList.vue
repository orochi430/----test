<template>
<div class="container">
    <div v-for="(day,index) in schedules" :key="index" class="day-box">
        <div class="day">{{ day.date }}</div>
        <van-cell-group :border="false" inset>
            <van-cell v-for="(schedule, index) in day.agendas" :key="index" :title="schedule.title" to="" is-link />
        </van-cell-group>
    </div>
</div>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            schedules: [{
                date:"8月16日 (星期一)",
                agendas:[
                    {
                        id:"4b7c5093-b4dc-6b12-718b-87bdddc0ada5",
                        time:"上午09:00",
                        title:"各代表团活动"
                    },
                    {
                        id:"82a80603-a918-6df2-3220-ba66091a7c68",
                        time:"下午15:00",
                        title:"省会议中心大会堂举行预备会议"
                    }
                ]
            },
            {
                date:"8月17日 (星期二)",
                agendas:[
                    {
                        id:"8280215c-aeaf-df34-50b2-27d9611d6b28",
                        time:"上午09:00",
                        title:"各代表团活动"
                    },
                    {
                        id:"804fcd45-22d3-ce8e-f8f8-d240a71da4a1",
                        time:"下午15:00",
                        title:"省会议中心大会堂举行预备会议"
                    },{
                        id:"8280215c-aeaf-df34-50b2-27d9611d6b28",
                        time:"上午09:00",
                        title:"各代表团活动"
                    },
                    {
                        id:"804fcd45-22d3-ce8e-f8f8-d240a71da4a1",
                        time:"下午15:00",
                        title:"省会议中心大会堂举行预备会议"
                    }
                ]
            },
            {
                date:"8月17日 (星期二)",
                agendas:[
                    {
                        id:"8280215c-aeaf-df34-50b2-27d9611d6b28",
                        time:"上午09:00",
                        title:"各代表团活动"
                    },
                    {
                        id:"804fcd45-22d3-ce8e-f8f8-d240a71da4a1",
                        time:"下午15:00",
                        title:"省会议中心大会堂举行预备会议"
                    }
                ]
            },
            {
                date:"8月17日 (星期二)",
                agendas:[
                    {
                        id:"8280215c-aeaf-df34-50b2-27d9611d6b28",
                        time:"上午09:00",
                        title:"各代表团活动"
                    },
                    {
                        id:"804fcd45-22d3-ce8e-f8f8-d240a71da4a1",
                        time:"下午15:00",
                        title:"省会议中心大会堂举行预备会议"
                    }
                ]
            },
            {
                date:"8月17日 (星期二)",
                agendas:[
                    {
                        id:"8280215c-aeaf-df34-50b2-27d9611d6b28",
                        time:"上午09:00",
                        title:"各代表团活动"
                    },
                    {
                        id:"804fcd45-22d3-ce8e-f8f8-d240a71da4a1",
                        time:"下午15:00",
                        title:"省会议中心大会堂举行预备会议省会议中心大会堂举行预备会议省会议中心大会堂举行预备会议"
                    }
                ]
            },
            {
                date:"8月17日 (星期二)",
                agendas:[
                    {
                        id:"8280215c-aeaf-df34-50b2-27d9611d6b28",
                        time:"上午09:00",
                        title:"各代表团活动"
                    },
                    {
                        id:"804fcd45-22d3-ce8e-f8f8-d240a71da4a1",
                        time:"下午15:00",
                        title:"省会议中心大会堂举行预备会议"
                    }
                ]
            },
            {
                date:"8月17日 (星期二)",
                agendas:[
                    {
                        id:"8280215c-aeaf-df34-50b2-27d9611d6b28",
                        time:"上午09:00",
                        title:"各代表团活动"
                    },
                    {
                        id:"804fcd45-22d3-ce8e-f8f8-d240a71da4a1",
                        time:"下午15:00",
                        title:"省会议中心大会堂举行预备会议"
                    }
                ]
            }]
        };
    },
    created() {

    },
    mounted() {},
    methods: {
    },

};
</script>

<style lang="scss" scoped>
.container {
    height: 100%;
    overflow: auto;
    .day-box {
        .day {
            padding-left: 40px;
        }
        .van-cell {
            line-height: 60px;
            padding: 40px;
        }
    }
}
</style>
