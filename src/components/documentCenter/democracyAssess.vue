<template>
<!-- 杭州党校——民主测评 -->
<div class="democracy_assess" ref="democracyAssess">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.params.title" left-text="返回" left-arrow @click-left="$router.back()" />

    <!-- 标签页 -->
    <van-tabs animated v-model="type">
        <van-tab :title="items.name" :name="items.type" v-for="(items, index) in tab_list" :key="index">
            <!-- <div class="content_header border_bottom">部门排名详情</div>
                <draggable
                    v-model="content_list[items.type]"
                    group="people"
                    @start="drag = true"
                    @end="drag = false"
                    class="sortable_list"
                >
                    <van-cell
                        :value="items.deptText"
                        v-for="(items, index) in content_list[items.type]"
                        :key="index"
                        class="border_bottom"
                    />
                </draggable> -->

            <!-- 测试调整 -->
            <div class="main_content" :ref="'content' + items.type">
                <div class="content_header border_bottom">部门排名详情</div>
                <div class="sortable_list sortable sortable-enabled" :ref="'sortableList' + items.type" v-if="content_list[type] && content_list[type].length">
                    <ul style="
                                padding-left: 0;
                                margin: 0;
                                position: relative;
                            " ref="ulObj" v-if="content_list && Object.keys(content_list).length">
                        <li v-for="(item, i) in content_list[items.type]" :key="i" class="content_item" :id="item.id">
                            <span>{{item.point}}</span>
                            <span @touchstart.prevent.stop="
                                        handleTouchStart($event, items.type)
                                    " @touchmove.prevent.stop="
                                        handleTouchMove($event, items.type)
                                    " @touchend.prevent.stop="
                                        handleTouchEnd($event, items.type)
                                    ">{{ item.deptText }}</span>
                        </li>
                    </ul>
                </div>
                <commonempty v-else />
            </div>
        </van-tab>
    </van-tabs>
    <van-button round type="info" @click="submitSort" :disabled="!allow_submit[type] ">提交排序</van-button>
    <van-loading type="spinner" v-show="loading_use" />
</div>
</template>

<script>
// import draggable from "vuedraggable";
export default {
    name: "democracy_assess",
    components: {
      "draggable": () => import("vuedraggable"),
    },
    data() {
        return {
            tab_list: [], //tab栏列表
            content_list: {}, //内容列表
            content_list_copy: {}, //内容列表的副本，以防影响原数据
            drag: true, //拖拽标识符
            type: "", //请求具体列表时的type

            start: "", //开始时间戳
            end: "", //结束时间戳
            current: "", //当前时间戳

            allow_submit: {}, //是否允许提交排序，即按钮是否禁用

            loading_use: false, //是否转圈等待

            // 以下为拖拽排序相关变量
            isTouched: "",
            isMoved: "",
            touchStartY: "",
            touchesDiff: "",
            sortingEl: "",
            sortingItems: "",
            sortableContainer: "",
            sortingElHeight: "",
            minTop: "",
            maxTop: "",
            insertAfterEl: "",
            insertBeforeEl: "",
            indexFrom: "",
            pageEl: "",
            pageContentEl: "",
            pageHeight: "",
            pageOffset: "",
            sortingElOffsetLocal: "",
            sortingElOffsetTop: "",
            initialScrollTop: "",
        };
    },
    created() {
        this.start = new Date(this.$route.params.start).getTime(); //开始时间戳
        this.end = new Date(this.$route.params.end).getTime(); //结束时间戳
        this.current = new Date().getTime(); //当前时间戳
        this.getLimit();
    },
    methods: {
        //         判断权限   DepartmentType/IsReadOnly   参数userId，返回值JSONArray
        // 查询数据   DepartmentType/DepartmentListByType  参数userId,type,scoringId  返回值JSONArray
        // 保存数据   DepartmentType/UpdateDepartmentList  参数list  返回值MessageBean

        // 业务一类type是1，业务二类type是2，保障部门是3
        submitSort() {
            //提交排序
            this.loading_use = true;
            let list = "sortableList" + this.type;
            let itemsObj = this.$refs[list]; //获取外层div.sortable_list容器
            let items = itemsObj[0].getElementsByTagName("li");
            // console.log('提交排序',items,this.type,this.content_list[this.type]);

            let content_list = []; //内容数组

            for (let i = 0; i < items.length; i++) {
                let id = items[i].id;

                this.content_list_copy[this.type].find((val, key) => {
                    if (val.id === id) {
                        val.point = String(content_list.length + 1);
                        content_list.push(val);
                    }
                });
            }
            // console.log(content_list,items);
            dsf.http
                .post("fn/DepartmentType/UpdateDepartmentList", {
                    list: JSON.stringify(content_list),
                })
                .then((res) => {
                    this.loading_use = false;
                    dsf.layer.toast(res.data.message);
                    // Toast(res.data.message);
                    // console.log(res);
                    this.getData(this.type, "nosort");
                });
        },
        getLimit() {
            //获取权限
            let userid = dsf.util.loadLocalStore("user").user_id;
            dsf.http
                .post("fn/DepartmentType/IsReadOnly", {
                    userId: userid
                })
                .then((res) => {
                    // console.log(res);
                    let list = res.data;
                    // console.log(this.tab_list);
                    list.forEach((ele, i) => {
                        let obj = {};
                        obj.name = ele;
                        switch (ele) {
                            case "业务一类":
                                if (String(i) === "0") {
                                    this.type = "1"; //初始type值
                                }
                                obj.type = "1";
                                break;
                            case "业务二类":
                                if (String(i) === "0") {
                                    this.type = "2";
                                }
                                obj.type = "2";
                                break;
                            case "保障部门":
                                if (String(i) === "0") {
                                    this.type = "3";
                                }
                                obj.type = "3";
                                break;
                            default:
                                break;
                        }
                        this.tab_list.push(obj);
                        this.getData(obj.type); //获取数据（先行获取数据，以防切换时数据不出来）
                    });
                });
        },
        getData(type, mes) {
            //获取数据
            let userid = dsf.util.loadLocalStore("user").user_id;
            dsf.http
                .post("fn/DepartmentType/DepartmentListByType", {
                    userId: userid,
                    type: String(type),
                    scoringId: this.$route.params.scoringId,
                })
                .then((res) => {
                    if (this.start <= this.current && this.current <= this.end && res.data.length && !res.data[0].point) {
                        // 如果在评价期限内 且尚未评价则允许评价
                        this.allow_submit[type] = true;
                    } else {
                        // 否则不允许
                        this.allow_submit[type] = false;
                    }

                    if (!mes) {
                        res.data.sort((a, b) => {
                            return parseInt(a.point) - parseInt(b.point);
                        });
                    }
                    this.content_list[type] = res.data;

                    // let list=JSON.stringify(this.content_list);
                    // this.content_list='';
                    // this.content_list=JSON.parse(list);
                    this.content_list = Object.assign({}, this.content_list);

                    this.content_list_copy = JSON.parse(JSON.stringify(this.content_list)); //深层复制，以防影响原数据
                    // console.log(this.content_list, this.allow_submit);
                });
        },

        // 以下为测试
        handleTouchStart(e, type) {
            //touchstart事件
            if (!this.allow_submit[type]) {
                return; //已经排好序，不允许拖拽
            }

            this.isMoved = false;
            this.isTouched = true;
            this.touchStartY =
                e.type === "touchstart" ? e.targetTouches[0].pageY : e.pageY;

            this.sortingEl = e.target.parentElement; //获取当前拖动li元素
            // this.sortingEl = e.target; //获取当前拖动li元素
            this.indexFrom = this.index(this.sortingEl); //获取拖动li元素时，li的下标
            let list = "sortableList" + type;
            this.sortableContainer = this.$refs[list]; //获取外层div.sortable_list容器

            this.sortingItems = this.sortableContainer[0].getElementsByTagName(
                "li"
            ); //获取该div容器下所有的li元素
        },
        index(dom) {
            //获取li元素移动前下标
            let child = dom;
            let i;
            if (child) {
                i = 0;
                // eslint-disable-next-line
                while ((child = child.previousSibling) !== null) {
                    if (child.nodeType === 1) i += 1;
                }
                return i;
            }
            return undefined;
        },
        handleTouchMove(e, type) {
            //touchmove事件
            if (!this.allow_submit[type]) {
                return; //已经排好序，不允许拖拽
            }

            if (!this.isTouched || !this.sortingEl) return;
            const pageY =
                e.type === "touchmove" ? e.targetTouches[0].pageY : e.pageY;
            if (!this.isMoved) {
                this.pageEl = this.$refs.democracyAssess;

                let content = "content" + type;
                this.pageContentEl = this.$refs[content];
                const paddingTop = 0;
                const paddingBottom = 0;
                this.initialScrollTop = this.pageContentEl[0].scrollTop;

                this.pageOffset = this.offset(this.pageEl).top + paddingTop;

                this.pageHeight =
                    this.pageEl.offsetHeight - paddingTop - paddingBottom;

                if (!this.sortingEl.className.includes("sorting")) {
                    this.sortingEl.className = "content_item sorting";
                    // this.sortingEl.className += " sorting"; //移动时给当前li添加样式名
                }
                if (
                    !this.sortableContainer[0].className.includes(
                        "sortable-sorting"
                    )
                ) {
                    this.sortableContainer[0].className =
                        "sortable_list sortable-sorting sortable";
                    // this.sortableContainer[0].className += " sortable-sorting"; //移动时给当前li添加样式名
                }

                this.sortingElOffsetLocal = this.sortingEl.offsetTop; //取距offsetParent的顶部距离
                this.minTop = this.sortingEl.offsetTop;

                this.maxTop =
                    this.sortingEl.parentElement.offsetHeight -
                    this.sortingElOffsetLocal -
                    this.sortingEl.offsetHeight;

                this.sortingElHeight = this.sortingEl.offsetHeight;
                this.sortingElOffsetTop = this.offset(this.sortingEl).top;
            }

            this.isMoved = true;

            e.preventDefault();

            this.touchesDiff = pageY - this.touchStartY;
            const translateScrollOffset =
                this.pageContentEl[0].scrollTop - this.initialScrollTop;
            const translate = Math.min(
                Math.max(
                    this.touchesDiff + translateScrollOffset,
                    -this.minTop
                ),
                this.maxTop
            );
            this.transform(
                `translate3d(0,${translate}px,0)`,
                this.sortingEl,
                "single"
            );

            this.insertBeforeEl = undefined;
            this.insertAfterEl = undefined;

            for (let i = 0; i < this.sortingItems.length; i++) {
                const currentEl = this.sortingItems[i];
                if (currentEl === this.sortingEl) continue;
                const currentElOffset = currentEl.offsetTop;
                const currentElHeight = currentEl.offsetHeight;
                const sortingElOffset = this.sortingElOffsetLocal + translate;

                if (
                    sortingElOffset >= currentElOffset - currentElHeight / 2 &&
                    this.index(this.sortingEl) < this.index(currentEl)
                ) {
                    this.transform(
                        `translate3d(0, ${-this.sortingElHeight}px,0)`,
                        currentEl,
                        "single"
                    );
                    this.insertAfterEl = currentEl;
                    this.insertBeforeEl = undefined;
                } else if (
                    sortingElOffset <= currentElOffset + currentElHeight / 2 &&
                    this.index(this.sortingEl) > this.index(currentEl)
                ) {
                    this.transform(
                        `translate3d(0, ${this.sortingElHeight}px,0)`,
                        currentEl,
                        "single"
                    );
                    this.insertAfterEl = undefined;
                    if (!this.insertBeforeEl) this.insertBeforeEl = currentEl;
                } else {
                    this.transform("translate3d(0, 0%,0)", currentEl, "single");
                }
            }
        },
        handleTouchEnd(e, type) {
            if (!this.allow_submit[type]) {
                return; //已经排好序，不允许拖拽
            }

            if (!this.isTouched || !this.isMoved) {
                this.isTouched = false;
                this.isMoved = false;
                return;
            }

            this.transform("", this.sortingItems, "array");
            if (this.sortingEl.className.includes("sorting")) {
                this.sortingEl.className = "content_item";
            }
            if (
                this.sortableContainer[0].className.includes("sortable-sorting")
            ) {
                this.sortableContainer[0].className = "sortable_list";
            }
            let indexTo;
            if (this.insertAfterEl) indexTo = this.index(this.insertAfterEl);
            else if (this.insertBeforeEl)
                indexTo = this.index(this.insertBeforeEl);

            if (this.insertAfterEl) {
                this.insertAfter(this.sortingEl, this.insertAfterEl);
            }
            if (this.insertBeforeEl) {
                this.insertBefore(this.sortingEl, this.insertBeforeEl);
            }

            this.insertBeforeEl = undefined;
            this.insertAfterEl = undefined;
            this.isTouched = false;
            this.isMoved = false;
        },
        insertAfter(thisObj, selector) {
            const after = selector;
            after.parentNode.insertBefore(thisObj, after.nextSibling);
        },
        insertBefore(thisObj, selector) {
            const before = selector;
            before.parentNode.insertBefore(thisObj, before);
        },
        offset(obj) {
            if (obj) {
                const el = obj;
                const box = el.getBoundingClientRect();
                const body = document.body;
                const clientTop = el.clientTop || body.clientTop || 0;
                const clientLeft = el.clientLeft || body.clientLeft || 0;
                const scrollTop = el === window ? window.scrollY : el.scrollTop;
                const scrollLeft =
                    el === window ? window.scrollX : el.scrollLeft;
                return {
                    top: box.top + scrollTop - clientTop,
                    left: box.left + scrollLeft - clientLeft,
                };
            }

            return null;
        },
        transform(transform, obj, mes) {
            if (mes === "single") {
                const elStyle = obj.style;
                elStyle.webkitTransform = transform;
                elStyle.transform = transform;
                return obj;
            } else {
                for (let i = 0; i < obj.length; i += 1) {
                    const elStyle = obj[i].style;
                    elStyle.webkitTransform = transform;
                    elStyle.transform = transform;
                }
                return obj;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.democracy_assess {
    height: 100%;
    position: relative;
}

.content_header {
    text-align: center;
    padding: 5px 0;
    background-color: #fff;
    border-top: 1px solid #ccc;
}

.content_item {
    height: 44px;
    display: flex;
    padding-left: 4%;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    align-items: center;

    span:first-child {
        // width: 28px;
        // height: 36px;
        // margin-right: 8px;
        // background-color: orange;
        color: orange;
        font-weight: 700;
        font-size: 18px;
        margin-right: 5px;
    }

    span:last-child {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;

    }
}

.border_bottom {
    border-bottom: 1px solid #ccc;
}

>>>.van-nav-bar {
    border-top: 1px solid #ccc;
}

.sortable_list {
    height: 440px;
    overflow-y: auto;
    background-color: #fff;
}

.van-button {
    width: 86%;
    position: absolute;
    left: 7%;
    bottom: 30px;
}

// 以下为测试
/* === Sortable === */
.sortable .item-inner {
    transition-duration: 300ms;
}

.sortable li.sorting {
    z-index: 50;
    background: rgba(255, 255, 255, 0.8);
    transition-duration: 0ms;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.6);
}

.sortable li.sorting .item-inner:after {
    display: none !important;
}

.sortable-sorting li {
    transition-duration: 300ms;
}

.sortable-enabled .sortable-handler {
    pointer-events: auto;
    opacity: 1;
}

.sortable-enabled .item-link .item-inner,
.sortable-enabled .item-link .item-title-row {
    background-image: none !important;
}

.list.sortable-enabled .item-inner,
.list.sortable-enabled .item-link .item-inner,
.list.sortable-enabled .item-link.no-chevron .item-inner,
.list.sortable-enabled.no-chevron .item-link .item-inner,
.list.sortable-enabled .no-chevron .item-link .item-inner,
.no-chevron .list.sortable-enabled .item-link .item-inner {
    padding-right: calc(var(--f7-sortable-handler-width) + var(--f7-safe-area-right));
}
</style>
