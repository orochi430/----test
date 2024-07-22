<template>
<div class="teamRecord">
    <!-- <div class="selectorx">
        <p class="nums">
            <span>已选{{result.length}}人</span>
            <span>/共{{progressData.length}}人</span>
        </p>
        <p class="cuiban" @click="urgeNow">立即催办</p>
    </div> -->
    <div class="users">
        <van-checkbox-group v-model="result">
            <div class="users_list" v-for="(item,index) in progressData" :key="index">
                <!-- <van-checkbox :name="item.collaboratorId" shape="square" icon-size="14px" :disabled="item.progressState=='4'"></van-checkbox> -->
                <span class="name">{{index+1}}、{{item.collaboratorName}}</span>
                <van-progress stroke-width="8" :percentage="item.percentage" color="#1064CD" track-color="#F5F5F5" :show-pivot="false" />
                <span class="status">{{item.progressStateText || '进行中'}}</span>
                <span class="percent">{{item.percentage}}%</span>
            </div>
        </van-checkbox-group>
    </div>
</div>
</template>

<script>
import dsf from '../../common';
export default {
    name: 'teamRecord',
    components: {},
    props: {
        progressData: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            result: [],
            users: []
        };
    },
    computed: {},
    watch: {},
    methods: {
        urgeNow() {
            this.users = [];
            // console.log(this.result);
            this.progressData.forEach((item, i) => {
                if (this.result.includes(item.collaboratorId)) {
                    let obj = {
                        "userId": item.collaboratorId, //用户id
                        "userName": item.collaboratorName, //用户名称
                        "userAvatar": "", //用户头像
                    }
                    this.users.push(obj);
                }
            })
            console.log(this.users);
            if (this.users.length > 0) {
                let options = {
                    title: '新建催办', //可选
                    data: {
                        "users": this.users,
                    }
                }
                window.native && window.native.createRemind(options);
            } else {
                dsf.layer.toast('请选择催办人员！');
            }
        }
    },
    created() {},
    mounted() {
        this.result = this.progressData.map(item => {
            
            if (item.progressState != '4') {
                return item.collaboratorId
            }
        });

    },
    destroyed() {},
}
</script>

<style lang="scss" scoped>
.teamRecord {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding: 10px 20px;

    .selectorx {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .nums {
            &>span:first-child {
                font-size: var(--font_size_3);
                color: #0091FF;
            }

            &>span:last-child {
                font-size: var(--font_size_3);
                color: #999999;
            }
        }

        .cuiban {
            font-size: var(--font_size_3);
            color: #0091FF;
            cursor: pointer;
        }
    }

    .users {
        margin-top: 10px;
    }

    .users_list {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
            width: 80px;
            flex-shrink: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 10px;
        }

        .van-progress {
            flex: 1;
            margin-right: 10px;
        }

        .status {
            width: 48px;
            background: #F0F5FF;
            border: 1px solid rgba(222, 232, 251, 1);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: var(--font_size_4);
            color: #0091FF;

        }

        .percent {
            width: 40px;
            text-align: right;
            font-size: var(--font_size_4);
            color: #0091FF;
        }
    }
}
</style>
