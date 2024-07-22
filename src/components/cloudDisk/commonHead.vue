<template>
<div class="commonHead">
    <van-search v-model="keyword" placeholder="在全部文件中搜索" left-icon="" readonly @click="showSearchBox" :clearable="false">
        <template #left-icon>
            <i class="iconfont iconsousuo i1" style="color: #989A9F;"></i>
        </template>
    </van-search>
    <div>
        <!-- <van-dropdown-menu active-color="#3296fa">
            <van-dropdown-item v-model="type" :options="option" @change="change" />
        </van-dropdown-menu> -->
        <van-tabs v-model="tabIndex" :ellipsis="false" @change="change">
            <van-tab v-for="(item,index) in option" :title="item.name" :key="index"></van-tab>
        </van-tabs>
    </div>
    

    <van-popup v-model="showSelect" position="bottom" round get-container="#app">
        <div class="select-contain">
            <div class="checkbox">多选</div>
            <div class="select-box" v-for="(item,index) in selectList" :key="index">
                <span>{{item.name}}</span>
                <div>
                    <p :class="{'active': selected == el.value}" v-for="(el,i) in item.term" :key="i" @click="changeSelect(el.value)">{{el.name}}</p>
                </div>
            </div>
            <div class="btn">
                <div :class="{'reset':selected != 2}" @click="resetSelect">重置</div>
                <div class="finish" @click="closeSelect">完成</div>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
export default {
    name: 'commonHead',
    components: {},
    props: {},
    data() {
        return {
            tabIndex: 0,
            type: 0,
            option: [],
            keyword: '',
            showDialog: false,
            showSelect: false,
            selected: 0,
            selectList: [{
                    name: '按名称',
                    term: [{
                            name: '从A到Z',
                            orderType: 1,
                            reversed: false,
                            value: 1
                        },
                        {
                            name: '从Z到A',
                            orderType: 1,
                            reversed: true,
                            value: 2
                        }
                    ]
                },
                {
                    name: '更新时间',
                    term: [{
                            name: '从近到远',
                            orderType: 3,
                            reversed: false,
                            value: 3
                        },
                        {
                            name: '从远到近',
                            orderType: 3,
                            reversed: true,
                            value: 4
                        }
                    ]
                },
                {
                    name: '创建时间',
                    term: [{
                            name: '从近到远',
                            orderType: 2,
                            reversed: false,
                            value: 5
                        },
                        {
                            name: '从远到近',
                            orderType: 2,
                            reversed: true,
                            value: 6
                        }
                    ]
                },
                {
                    name: '文件大小',
                    term: [{
                            name: '从小到大',
                            orderType: 4,
                            reversed: false,
                            value: 7
                        },
                        {
                            name: '从大到小',
                            orderType: 4,
                            reversed: true,
                            value: 8
                        }
                    ]
                }
            ],
        }
    },
    computed: {},
    watch: {},
    created() {

    },
    mounted() {
        this.getMenus()
    },
    methods: {
        showSearchBox() {
            // this.$bus.emit("showSearchBox")
            this.$router.push({
                name: "diskSearch"
            })
        },
        getMenus() {
            let that = this
            dsf.http
                .post("fn/cloud/file/getMenu", {}, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(({
                    status,
                    data
                }) => {
                    console.log(data, status)
                    if (status === 200) {
                        data.data.forEach(item => {
                            item.text = item.name
                            item.value = item.type
                        });

                        this.type = data.data[0].value
                        this.$store.commit("setMenuType", this.type)
                        this.option = data.data
                    }
                }).catch(({
                    message
                }) => {

                })
        },
        change(index) {
            // console.log(val)
            this.$store.commit("setMenuType", this.option[index].type)
        },
        closeSelect() {
            this.showSelect = false;
        },
        changeSelect(index) {
            this.selected = index;
        },
        resetSelect() {
            this.selected = 2;
        },
    }
}
</script>

<style lang="scss" scoped>
.commonHead {
    width: 100%;
    height: 94px;
    // padding: 14px;
    box-sizing: border-box;
    background: #fff;
    box-sizing: border-box;
    padding: 10px 14px;

    .capacity {
        font-size: 11px;
        color: #A2A3A4;
        margin: 12px 0;
        display: flex;
        align-items: center;

        img {
            width: 5px;
            height: 8px;
            margin-left: 2.5px;
        }
    }

    .van-search {
        height: 30px;
        padding: 0;
        border-radius: 3px;
        background: #E9EBEC;
        margin-top: 10px;

        .van-search__content {
            background-color: transparent;
            height: 100%;
            padding: 0 0 0 10px;

            ::v-deep input {
                color: #fff;

                &::placeholder {
                    color: #CCCCCC;
                }
            }
        }
    }
}

::v-deep .van-dropdown-menu__bar {
    box-shadow: none;
    height: 20px;

    .van-dropdown-menu__item {
        justify-content: flex-start;
    }

    .van-dropdown-menu__title {
        font-size: var(--font_size_4);
        color: #747577;
        font-weight: 500;
        padding: 0 5px 0 0;

        &::after {
            border-color: transparent transparent #747577 #747577;
        }
    }
}

.dialog-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0;

    span {
        font-size: 13px;
        color: #171A1D;
        letter-spacing: 1px;
        text-align: center;
        font-weight: 600;
        margin: 0 0 11px 0;
    }

    p {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font_size_4);
        color: #747577;
        letter-spacing: 1px;
        font-weight: 400;
        margin: 4px 0;

        label {
            font-size: var(--font_size_4);
            color: #171A1D;
            letter-spacing: 0;
            font-weight: 400;
            margin-left: 5px;
        }
    }
}
</style>
