<template>
<round-popup :show.sync="show" title="流转情况" style="height: 80vh">
    <template #container>
        <van-popover v-model="showPopover" trigger="click" :actions="actions" @select="onSelect" get-container="#app">
            <template #reference>
                <div class="popover-text">
                    <span>{{situationVal}}</span>
                    <i class="icon iconfont iconsanjiaoyou"></i>
                </div>
            </template>
        </van-popover>
        <moving-situation :form-data="{ info_id: infoId }" :parameters="metaData.parameters" v-if="infoId" ref="movingSituation" />
    </template>
</round-popup>
</template>

<script>
import roundPopup from "@/components/commonComponents/roundPopup.vue"
import movingSituation from "@/components/todoFile/movingSituation"
export default {
    name: "movingSituationDialog",
    props: {
        formData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        metaData: {
            type: Object,
            default: {}
        }
    },
    components: {
        roundPopup,
        movingSituation
    },
    data() {
        return {
            show: true,
            value: "",
            situationVal: "",
            showPopover: false,
            actions: [],
            infoId: "",
        }
    },
    computed: {},
    watch: {
        show(nv, ov) {
            if (!nv) {
                this.$nextTick(() => {
                    this.$emit("closeCallback", this.value)
                })
            }
        }
    },
    methods: {
        onSelect(val) {
            this.infoId = '';
            // console.log(val);
            this.situationVal = val.text;
            this.$nextTick(() => {
                this.infoId = val.infoId;
            })
        },
        getFlowList() {
            let that = this;
            let params = {
                infoId: that.metaData.parameters.pk,
                tableName: ""
            }
            if (that.metaData.parameters.moduleId == "230526200223gswVshIefURwZbXu8m6") {
                params.tableName = "fw"; //发文
            } else if (that.metaData.parameters.moduleId == "2305262001457EcjMOO9fUw7XxwWltG") {
                params.tableName = "lw"; //收文
            }
            dsf.http.post(`ctrl/czjcustom/getFlowList`, params).then(({
                data
            }) => {
                console.log(data);
                if (data.code == "200") {
                    that.actions = JSON.parse(JSON.stringify(data.data).replace(/deptName/g, "text"));
                    that.situationVal = that.actions[0].text;
                    that.infoId = that.actions[0].infoId;
                }
            });
        }
    },
    created() {
        this.getFlowList()
    },
    mounted() {},
    destroyed() {}
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/themes.scss";
@import "../../assets/styles/mixin.scss";

::v-deep.popover-text {
    min-width: 100px;
    height: 40px;
    border: 1px solid #e6e6e6;
    // box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 20px 0 10px;

    span {
        font-size: var(--font_size_2);
        color: #333;
    }

    .iconfont {
        font-size: var(--font_size_3);
        color: #333;
        position: absolute;
        right: 10px;
        transform: rotate(90deg);
    }
}
</style>
