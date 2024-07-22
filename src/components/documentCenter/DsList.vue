<template>
<div class="ds-list">
    <div v-for="(item, index) in data" :key="item.id || `item-${index}`" class="ds-item">
        <DsCard>
            <!-- 待阅未读表示 -->
            <span v-if="'isRead' in item.dataValue&&!item.dataValue.isRead" class="isStatus"></span>
            <!-- 待办未读表示 -->
            <span v-if="'readStatus' in item.dataValue&&item.dataValue.readStatus!='2'" class="isStatus"></span>

            <div slot="header" @click="link(item)" :class="{'ellipsis': dsf.config.commonList && dsf.config.commonList.titleEllipsis}" v-if="item['dataValue'][getTitle().showMetaColumn]">
                <span :style="{ color: getTitle().color || '','word-wrap': 'break-word','word-break':'break-all' }"
                    :class="{'col-title':('isRead' in item.dataValue&&!item.dataValue.isRead) || ('readStatus' in item.dataValue&&item.dataValue.readStatus!='2')}">
                {{ item['dataValue'][getTitle().showMetaColumn] }}</span>
            </div>
            <div slot="content" @click="link(item)" class="content">
                <slot :item="item" name="item-content">
                    <div class="flex1">
                        <div  v-if="aSubTitles.length > 0" class="aSubTitles">
                            <template v-for="(column, index) in aSubTitles">
                                <div v-if="isShowColumn(column, item)" :key="`aSubTitles-${index}`" class="subTitle">
                                    <Icon v-if="column.icon" :class="['iconfont', column.icon]" />
                                    <span :style="{ color: column.color }" class="label">{{ item['dataValue'][column.showMetaColumn] }}</span>
                                </div>
                            </template>
                        </div>
                        <div  v-if="bSubTitles.length > 0" class="bSubTitles">
                            <template v-for="(column, index) in bSubTitles">
                                <div v-if="isShowColumn(column, item)" :key="`bSubTitles-${index}`" class="subTitle">
                                    <Icon v-if="column.icon" :class="['iconfont', column.icon]" />
                                    <span :style="{ color: column.color }" :class="['label', `ds-elips-${column.showRows || 1}`]">{{ item['dataValue'][column.showMetaColumn] }}</span>
                                </div>
                            </template>
                        </div>
                        <div  v-if="needTitles.length > 0" class="needTitles">
                            <template v-for="(column, index) in needTitles">
                                <div v-if="isShowColumn(column, item)" :key="`needTitles-${index}`" class="subTitle">
                                    <span class="name label ellipsis">{{ column.showName }}</span>
                                    <span :style="{ color: column.color }" class="label val elips">{{ item['dataValue'][column.showMetaColumn] }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div v-if="titleIcon.length > 0">
                        <template v-for="(column, index) in titleIcon">
                            <div v-if="isShowColumn(column, item)" :key="`titleIcon-${index}`" class="moduleIcon" :style="titleIconColor(item, column)">
                                <span>{{ item['dataValue'][column.showMetaColumn].substr(0, 1) }}</span>
                            </div>
                        </template>
                    </div>
                </slot>
                <slot :item="item" name="item-extend"></slot>
            </div>
            <div slot="footer" v-if="isShowListBtn(item)">
                <slot :item="{}" name="item-footer">
                    <DsButtonToolbox :buttons="item.buttons || {}" :more="true" size="small" @commonClick="(action) => { handleCommonClick(action, item, index) }" @mainClick="(action) => { handleMainClick(action, item, index) }" />
                </slot>
            </div>
        </DsCard>
    </div>
    <commonempty v-if="!data.length && !$parent.loading" />
</div>
</template>

<script>
import DsCard from "./DsfCard";
import DsButtonGroup from "./DsfButtonGroup";
import DsButtonToolbox from "./DsfButtonToolbox";
import {
    Icon
} from "vant";
export default {
    components: {
        DsCard,
        DsButtonGroup,
        DsButtonToolbox,
        Icon
    },
    props: {
        tabObj: {
            type: Object
        },
        data: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        type: {
            type: String
        },
        keyColumn: {
            type: String
        },
        formMethod: {
            type: String
        },
        isHiddenBtn: {
            type: Boolean,
            default: () => undefined
        }
    },
    data() {
        return {
            //isShowListBtn:false
        };
    },
    created() {
        //console.log(this.tabObj);
        //this.isShowListBtn=this.isHiddenBtn==undefined ? true : false
    },
    computed: {
        aSubTitles() {
            console.log(this.columns.filter(it => /^subTitle\w?$/i.test(it.showCategory)))
            return this.columns.filter(it => /^subTitle\w?$/i.test(it.showCategory));
        },
        bSubTitles() {
            return this.columns.filter(it => /^content$/i.test(it.showCategory));
        },
        needTitles() {
            return this.columns.filter(it => /^needTitle\w?$/i.test(it.showCategory));
        },
        titleIcon() {
            return this.columns.filter(it => /^titleIcon\w?$/i.test(it.showCategory));
        }
    },
    mounted() {
        console.log(this.bSubTitles)
    },
    methods: {
        isShowColumn(column, item) {
            return (
                item["dataValue"][column.showMetaColumn] ||
                item["dataValue"][column.showMetaColumn] === 0
            );
        },
        isShowListBtn(item) {
            let itemShow = this.isHiddenBtn == undefined ? true : false;
            let buttonShow = false;
            if (item.buttons && ((item.buttons.commonButtons && item.buttons.commonButtons.length > 0) || (item.buttons.mainButtons && item.buttons.mainButtons.length > 0))) {
                buttonShow = true;
            } else
                buttonShow = false;
            return itemShow && buttonShow;
        },
        link(item) {
            if (item.dataValue.allowMobile && item.dataValue.allowMobile != 1) {
                dsf.layer.toast("该文件只能在电脑端处理")
                return
            }
            if ('isRead' in item.dataValue && !item.dataValue.isRead) {
                item.dataValue.isRead = true
            }

            // debugger
            let itemValue = item.dataValue;
            let pk = itemValue[this.keyColumn] || itemValue.info_id || itemValue.id || itemValue["A0001"] ||
                itemValue["fid"] || itemValue["SW_XZD.A0001"];

            let moduleKey = this.keyColumn ? (this.keyColumn.split(".")[0] + ".A0004") : ""
            let moduleId = itemValue.moduleId || itemValue["A0004"] || itemValue["SW_XZD.A0004"] || itemValue[moduleKey];
            if (this.type == "db") {
                moduleId = itemValue.masterModuleId || itemValue.moduleId || itemValue["A0004"]
            }
            let masterId = itemValue.masterId || "";
            let params = moduleId + "/" + pk;
            let query = {}
            if (this.type == "gw") {
                let isEnterTodo = 1;
                params += "/" + isEnterTodo;
                query.todoId = itemValue.todoId;
            }
            if (this.type) {
                params += `?type=${this.type}`;
            }
            if (this.$route.name == "SigninList") {
                //收文登记
                params += `?&listId=1903161124289nXBk8iVSmTMGYxn9bi&exchangeList=signedList`;
            }
            if (this.type == "db") {
                //首页tab督办
                if (masterId) {
                    params += `&masterId=${masterId}`;
                }
                console.log(this.formMethod)
                if (this.formMethod) {
                    params += `&formMethod=info` //督办管理列表不要formMethod=info
                }
            }
            if (this.type == "dy") {
                //首页tab待阅
                params += `&distribId=${itemValue.distribId}`;
                dsf.http.post('fn/mobileToRead/markRead', {
                        pks: itemValue.distribId
                    })
                    .then(res => {
                        console.log(res)
                    })
            }

            if (this.tabObj && this.tabObj.targetUrl) {
                let targetUrl = this.tabObj.targetUrl.replace("[pk]", pk);
                this.$router.push({
                    path: targetUrl
                });
            } else {
                this.$router.push({
                    path: "/commonForm/" + params,
                    query: query
                });
            }

        },
        getTitle() {
            const target = this.columns.find(it => it.showCategory === "mainTitle");
            return target || {};
        },
        handleCommonClick(action, item, index) {
            if (item.dataValue.allowMobile && item.dataValue.allowMobile != 1) {
                dsf.layer.toast("该文件只能在电脑端处理")
                return
            }
            this.$emit("commonClick", action, item, index);
        },
        handleMainClick(action, item, index) {
            if (item.dataValue.allowMobile && item.dataValue.allowMobile != 1) {
                dsf.layer.toast("该文件只能在电脑端处理")
                return
            }
            this.$emit("mainClick", action, item, index);
        },
        titleIconColor(item, column) {
            let start = item['dataValue'][column.showMetaColumn].substr(0, 1)
            if(dsf.config.listTitleIcon && Object.keys(dsf.config.listTitleIcon).indexOf(start) > -1) {
                let color = dsf.config.listTitleIcon[start]
                return {
                    backgroundColor: this.colorRgba(color, 0.12),
                    color: color,
                    borderColor: color,
                }
            }
            return ''
        },
        colorRgba: (sHex, alpha = 1) => {
            // 十六进制颜色值的正则表达式
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
            /* 16进制颜色转为RGB格式 */
            let sColor = sHex.toLowerCase()
            if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                var sColorNew = '#'
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                }
                sColor = sColorNew
            }
            //  处理六位的颜色值
            var sColorChange = []
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
            }
                return 'rgba(' + sColorChange.join(',') + ',' + alpha + ')'
            } else {
                return sColor
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

.col-title {
    font-weight: bold;
}

.item-bottom {
    display: flex;
    justify-content: space-between;
}

.bot-l,
.bot-r {
    width: 50%;
}

.bot-l {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: $fontColor_sub;
    @include font_4;
}

.col-3 {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .col-it {
        box-sizing: border-box;
        margin-bottom: 10px;
        padding-left: 0;

        i {
            position: relative;
            top: 0;
            left: 0;
        }

        span {
            margin-left: 5px;
        }
    }
}

.col-3+.col-1 {
    margin-top: -10px;
}

.col-m {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .col-it {
        box-sizing: border-box;
        padding-left: 0;
        flex-basis: calc(33.33% - 10px);

        i {
            position: relative;
            top: 0;
            left: 0;
        }

        span {
            margin-left: 5px;
        }

        &:nth-child(3n) {
            justify-content: flex-end;
        }

        &:nth-child(3n + 2) {
            justify-content: center;
        }

        &:nth-child(n + 4) {
            margin-top: 10px;
        }
    }
}

.col-2 {
    display: flex;
    justify-content: flex-start;

    .col-it {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .col-it+.col-it {
        margin-left: 15px;
    }
}

.col-3,
.col-2,
.col-1 {
    padding: 5px 0;
}

.col-1 {
    .col-it+.col-it {
        margin-top: 10px;
    }
}

.col-it {
    color: $fontColor_sub;
    position: relative;
    padding-left: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;

    i {
        position: absolute;
        left: 0;
        top: 2px;
    }

    .label {
        @include font_5;
    }
}

.ds-item+.ds-item {
    margin-top: 15px;
}

.ds-list {
    padding: 15px;
    box-sizing: border-box;
}

.isStatus {
    position: absolute;
    left: 6px;
    top: 6px;
    width: 10px;
    height: 10px;
    border-radius: 0.10rem;
    background: #13C940;
    display: inline-block;
}

@for $i from 1 through 5 {
    .ds-elips-#{$i} {
        overflow: hidden;
        text-overflow: ellipsis;
        display: flex;
        display: -webkit-box;
        -webkit-line-clamp: $i;
        /* autoprefixer: ignore next */
        -webkit-box-orient: vertical;
    }
}

.row-it {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    box-sizing: border-box;

    .name {
        display: inline-block;
        width: 40%;
    }

    .val {
        display: inline-block;
        width: 60%;
        text-align: right;
        color: $fontColor_sub;
    }

    .elips {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .label {
        @include font_5;
    }
}
.subTitle{
    padding: 4px 0;
    color: #666;
    font-size: var(--font_size_3);
}
.aSubTitles {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    .subTitle {
        padding-right: 6px;
        max-width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.bSubTitles {
    .subTitle {
        display: flex;
        // align-items: center;
        justify-content: flex-start;
        .label {
            flex: 1;
        }
    }
}
.needTitles {
    .subTitle {
        display: flex;
        justify-content: space-between;
        .name {
            flex-shrink: 0;
            max-width: 50%;
        }
        .val {
            text-align: right;
        }
    }
}
.content {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    overflow: hidden;

    .moduleIcon {
        font-size: var(--font_size_2);
        text-align: center;
        width: 0.52rem;
        height: 0.52rem;
        // padding-bottom: 100%;
        border: 1px solid;
        margin-left: 0.2rem;
        border-radius: 3px;
        @include border-color-theme('normal');
        @include font-theme('normal');
        @include opacity-background-theme('normal');

        span {
            vertical-align: baseline;
        }
    }
}
</style>
