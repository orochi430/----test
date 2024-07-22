<template>
    <div>
        <div class="top" v-if="showDefault.length > 0">
            <template v-for="(item,index) in showDefault">
                <div v-if="item.showName" :key="index">
                    <span v-if="item.showName">{{item.showName}}</span>
                    <span v-if="item.text">:{{item.text}}</span>
                </div>
            </template>
        </div>
        <div class="dsf-table" ref="dsfTable" v-if="columns.length">
            <div class="table" :style="{width: tableWidth + 'vw', fontSize: tableSize + 'rem'}">
                <van-row v-if="title" style="font-size: var(--font_size_2)">
                    <van-col span="24" :class="{highLight: tbHighLight}" :style="{color: tbHighLight ? '#fff' : '',padding: '0.2rem 0'}">{{title}}</van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                    <van-col v-for="column in columns" :key="column.showMetaColumn" class="flex jc ac" :class="{highLight: tbHighLight}" :style="{width: 100/columns.length + '%'}" @click="sort(column)">
                        <span :style="{color: tbHighLight ? '#fff' : '',verticalAlign: 'center'}">{{column.showName}}</span>
                    </van-col>
                </van-row>
                <van-row v-for="(item, index) in dataList" :key="index" type="flex" justify="space-between" :class="{highLight: item.dataValue.isHighLight}" :style="{backgroundColor: adjoinGrey && (index % 2 == 0) ? '#f1f1f1' : ''}">
                    <van-col v-for="column in columns" :key="column.showMetaColumn" :style="{width: 100/columns.length + '%',textAlign: column.showCategory == 'showArrow' ? 'right' : ''}">
                        <span>{{item.dataValue[column.showMetaColumn]}}</span>
                        <van-icon v-if="column.showCategory == 'showArrow'" name="down" :color="item.dataValue[column.showMetaColumn] > 0 ? '#4daf7b' : '#e32416'" :style="{transform: item.dataValue[column.showMetaColumn] > 0 ? 'rotate(180deg)' : ''}" />
                    </van-col>
                </van-row>
            </div>
            <div class="slider" v-if="isShow && showSlider">
                <van-slider v-model="slider" vertical @change="onChange" />
            </div>
        </div>
    </div>
</template>

<script>
import { Slider } from 'vant';
export default {
    components: { [Slider.name]: Slider },
    props: {
        data: {
            type: Array,
            default: () => []
        },
        showDefault: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        showSlider: {
            type: Boolean,
            default: false
        },
        adjoinGrey: {
            type: Boolean,
            default: false
        },
        tbHighLight: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            slider: 0,
            isShow: false,
            dataList: this.data.slice(),
            order: 'original'
        }
    },
    watch: {
        data (newVal) {
            this.dataList = newVal
        }
    },
    computed: {
        tableWidth () {
            return 100 + this.slider
        },
        tableSize () {
            return 0.28 + this.slider / 1000
        }
    },
    mounted () {
        if (this.$refs.dsfTable) {
            this.$refs.dsfTable.addEventListener('touchend', () => {
                clearTimeout(this.timeout)
                this.isShow = true
                this.timeout = setTimeout(() => this.isShow = false, 2000)
            })
        }
    },
    methods: {
        onChange (val) {
        },
        sort (column) {
            console.log('1111111111111111')
            let self = this
            if (column.showCategory == 'showArrow') {
                if (this.order == 'up') {
                    this.order = 'down'
                } else if (this.order == 'down') {
                    this.order = 'original'
                } else {
                    this.order = 'up'
                }
                //分治排序
                let arr = [145, 248, 31, 45, 9, 11, 145, 300];
                function merge (left, right) {
                    let result = [];
                    while (left.length > 0 && right.length > 0) {//如果两边数组都有值
                        // console.log(left[0][column.showMetaColumn], right[0][column.showMetaColumn])
                        if (Number(left[0].dataValue[column.showMetaColumn]) < Number(right[0].dataValue[column.showMetaColumn])) {//左边小于右边
                            self.order == 'up' ? result.push(left.shift()) : result.push(right.shift());//给result数组添加值，并在right删掉值
                        }
                        else {
                            self.order == 'up' ? result.push(right.shift()) : result.push(left.shift());//给result数组添加值，并在right删掉值
                        }
                    }
                    /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
                    return [...result, ...left, ...right];//这里用es6的语法，只是一个简写，百度一眼就会。...left...right是因为万一长度不相等，会少数，所以会加这两个。
                }
                function mergeSort (arr) {
                    if (arr.length == 1) {//如果数组长度为1则返回数组
                        return arr
                    };
                    let mid = Math.floor(arr.length / 2);//分成两部分
                    let left_arr = arr.slice(0, mid);//数组分成两份后，塞进去。假如说数组有8个元素，分成两部分，左边(0,4)
                    let right_arr = arr.slice(mid);//右边(4到后面所有)
                    return merge(mergeSort(left_arr), mergeSort(right_arr));//递归
                }
                if (this.order == 'original') {
                    this.dataList = this.data
                } else {
                    this.dataList = mergeSort(this.dataList)
                }
            }
        }
    }
}
</script>
<style lang='scss' scoped>
@import 'src/assets/styles/themes.scss';
@import 'src/assets/styles/mixin.scss';
.top {
    padding: 10px 10px 0;
    font-size: var(--font_size_3);
    display: flex;
    justify-content: space-between;
    background-color: #fff;
}
.dsf-table {
    overflow: auto;
    background-color: #fff;
    .table {
        box-sizing: border-box;
        font-size: var(--font_size_3);
        padding: 10px;
        .van-row {
            border-top: 1px solid #ddd;
            &:last-of-type {
                border-bottom: 1px solid #ddd;
            }
        }
        .van-col {
            border-left: 1px solid #ddd;
            text-align: center;
            &:last-of-type {
                border-right: 1px solid #ddd;
            }
            span {
                line-height: 26px;
                word-wrap: break-word;
            }
        }
    }
}
.highLight {
    @include background-theme('normal', 'important');
}
.slider {
    height: 100px;
    position: fixed;
    bottom: 40px;
    right: 40px;
    .van-slider--vertical {
        width: 0.1rem;
        ::v-deep .van-slider__bar {
            @include background-theme('normal');
        }
    }
}
</style>
