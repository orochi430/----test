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
            <template v-if="!tableHeader || tableHeader.length == 0">
                <van-row v-if="title" style="font-size: var(--font_size_2)">
                    <van-col span="24" :class="{highLight: tbHighLight}" :style="{color: tbHighLight ? '#fff' : '',padding: '0.2rem 0'}">{{title}}</van-col>
                </van-row>
                <van-row type="flex" justify="space-between">
                    <van-col v-for="column in columns" :key="column.showMetaColumn" class="flex jc ac" :class="{highLight: tbHighLight}" :style="{width: 100/columns.length + '%'}" @click="sort(column)">
                        <span :style="{color: tbHighLight ? '#fff' : '',verticalAlign: 'center'}">{{column.showName}}
                            <van-icon v-if="['defaultSort','canSort','showArrow'].indexOf(column.showCategory) > -1" name="sort" size="10px"/>
                        </span>

                    </van-col>
                </van-row>
            </template>
            <van-row type="flex" justify="space-between" v-else>
                <template v-for="(header,index) in tableHeader">
                    <van-col v-if="!header.children"
                        :key="index" class="flex jc ac"
                        :class="{highLight: tbHighLight}"
                        :style="{width: header.children ? `${100/headerLength *header.children.length}%` : `${100/headerLength}%`}"
                        @click="sort(columns.find(item => item.showName == header.showName))"
                    >
                        <span :style="{color: tbHighLight ? '#fff' : '',verticalAlign: 'center'}">{{header.showName}}
                            <van-icon v-if="['defaultSort','canSort','showArrow'].indexOf(columns.find(item => item.showName == header.showName).showCategory) > -1" name="sort" size="10px"/>
                        </span>
                    </van-col>
                    <van-col v-else :key="index"
                        :class="{highLight: tbHighLight}"
                        :style="{width: header.children ? `${100/headerLength *header.children.length}%` : `${100/headerLength}%`}"
                    >
                        <van-row type="flex" justify="center">
                            <span :style="{color: tbHighLight ? '#fff' : '',verticalAlign: 'center'}">{{header.showName}}</span>
                        </van-row>
                        <van-row type="flex" justify="space-between">
                            <van-col v-for="(column, idx) in header.children" :key="idx" class="flex jc ac" :class="{highLight: tbHighLight}" :style="{width: 100/header.children.length + '%'}" @click="sort(columns.find(item => item.showName == column.showName))">
                                <span :style="{color: tbHighLight ? '#fff' : '',verticalAlign: 'center'}">{{column.showName}}
                                    <van-icon v-if="columns.find(item => item.showName == column.showName) && ['defaultSort','canSort','showArrow'].indexOf(columns.find(item => item.showName == column.showName).showCategory) > -1" name="sort" size="10px"/>
                                </span>
                            </van-col>
                        </van-row>
                    </van-col>
                </template>

            </van-row>
            <van-row v-for="(item, index) in dataList" :key="index" type="flex" justify="space-between" :class="{highLight: item.dataValue.isHighLight}" :style="{backgroundColor: adjoinGrey && (index % 2 == 0) ? '#f1f1f1' : ''}">
                <van-col v-for="column in columns" :key="column.showMetaColumn" :style="{width: 100/columns.length + '%',textAlign: column.showCategory == 'showArrow' ? 'right' : ''}">
                    <span v-if="showOrder && column.showMetaColumn == 'col1' && index!==0">{{index}}</span>
                    <span>{{item.dataValue[column.showMetaColumn]}}</span>
                    <van-icon
                        v-if="column.showCategory == 'showArrow'"
                        name="down"
                        :color="item.dataValue[column.showMetaColumn] > 0 ? '#4daf7b' : '#e32416'"
                        :style="{transform: item.dataValue[column.showMetaColumn] > 0 ? 'rotate(180deg)' : ''}"
                    />
                </van-col>
            </van-row>
        </div>
        <!-- <div class="slider" v-if="isShow && showSlider">
            <van-slider v-model="slider" vertical @change="onChange" />
        </div> -->
    </div>
</div>
</template>

<script>
import { Slider } from 'vant';
export default {
    components: {[Slider.name]: Slider},
    props: {
        showOrder: {
            type: Boolean
        },
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
        },
        tableHeader: {
            type: Array
        }
    },
    data() {
        return {
            slider: 0,
            isShow: false,
            dataList: this.data.slice(),
            order: 'original',
            headerLength: 5,
            // "tableHeader": [
            //   {
            //     "showName": "地区",
            //   },
            //   {
            //     "showName": "当日销量",
            //   },
            //   {
            //     "showName": "总销量",
            //     "children" :[
            //       {
            //         "showName": "本期",
            //       },
            //       {
            //         "showName": "同期",
            //       },{
            //         "showName": "同比增幅(%)",
            //       }
            //     ]
            //   }
            // ]
        }
    },
    watch: {
        data(newVal) {
            this.dataList = newVal
        }
    },
    computed: {
        tableWidth() {
            return 100 + this.slider
        },
        tableSize() {
            return 0.28 + this.slider/1000
        }
    },
    mounted() {
        if(this.$refs.dsfTable) {
            this.$refs.dsfTable.addEventListener('touchend', () => {
                clearTimeout(this.timeout)
                this.isShow = true
                this.timeout = setTimeout(() => this.isShow = false, 2000)
            })
        }
    },
    methods: {
        onChange(val){
        },
        sort(column) {
            let self = this
            if(column.showCategory == 'defaultSort') {
              this.order = 'original'
              this.dataList = this.data
            }else if(column.showCategory == 'showArrow' || column.showCategory == 'canSort') {
                if(this.order == 'up'){
                    this.order = 'down'
                }else if (this.order == 'down') {
                    this.order = 'original'
                }else {
                    this.order = 'up'
                }
                //分治排序
                let arr = [145, 248, 31, 45, 9, 11, 145, 300];
                function merge(left, right) {
                    let result = [];
                    while(left.length > 0 && right.length > 0) {//如果两边数组都有值
                    // console.log(left[0][column.showMetaColumn], right[0][column.showMetaColumn])
                            if(Number(left[0].dataValue[column.showMetaColumn]) < Number(right[0].dataValue[column.showMetaColumn])) {//左边小于右边
                                self.order == 'up' ? result.push(left.shift()) : result.push(right.shift());//给result数组添加值，并在right删掉值
                            }
                            else {
                                self.order == 'up' ? result.push(right.shift()) : result.push(left.shift());//给result数组添加值，并在right删掉值
                            }
                    }
                    /* 当左右数组长度不等.将比较完后剩下的数组项链接起来即可 */
                    return [...result,...left,...right];//这里用es6的语法，只是一个简写，百度一眼就会。...left...right是因为万一长度不相等，会少数，所以会加这两个。
                }
                function mergeSort(arr){
                    if(arr.length==1){//如果数组长度为1则返回数组
                        return arr
                    };
                    let mid=Math.floor(arr.length/2);//分成两部分
                    let left_arr=arr.slice(0,mid);//数组分成两份后，塞进去。假如说数组有8个元素，分成两部分，左边(0,4)
                    let right_arr=arr.slice(mid);//右边(4到后面所有)
                    return merge(mergeSort(left_arr),mergeSort(right_arr));//递归
                }
                if (this.order == 'original') {
                    this.dataList = this.data
                } else {
                    let first = this.dataList[0]
                    let sortList = mergeSort(this.dataList.slice(1))
                    this.dataList = [first].concat(sortList)
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
    overflow:auto;
    background-color:#fff;
    .table{
        font-size: var(--font_size_3);
        padding: 10px;
        .van-row {
            border-top: 1px solid #ddd;
            &:last-of-type{
                border-bottom:  1px solid #ddd;
            }
        }
        .van-col {
            border-left: 1px solid #ddd;
            text-align: center;
            &:last-of-type{
                border-right:  1px solid #ddd;
            }
            span {
                line-height: 26px;
                word-wrap: break-word;
            }
        }
    }
}
.highLight {
    @include background-theme('normal','important');
}
.slider {
    height: 100px;
    position: fixed;
    bottom: 40px;
    right: 40px;
    .van-slider--vertical{
        width: 0.1rem;
        ::v-deep .van-slider__bar{
            @include background-theme('normal');
        }
    }
}
</style>
