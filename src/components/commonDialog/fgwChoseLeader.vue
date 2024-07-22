<template>
    <div class="testDialog1">
        <van-popup v-model="show" closeable :style="{ height: '100%' }" position="bottom" @close="close">
            <control-user-list :default-select-array="defaultSelectArray" :extra="extra" :selectType="selectType"
                :showHeader="true" @close="cancePerson" @getSelectUser="getSelectUser"></control-user-list>
        </van-popup>
    </div>
</template>

<script>
import controlUserList from "@/components/commonForm/controls/controlUserList";
export default {
    name: 'fgwChoseLeader',
    props: {
        formData: {
            type: Object,
            default: () => {
                return {};
            },
        },
        metaData: {
            type: Object,
            default: {}
        },
        formParams: {
            type: Object,
            default: {}
        }
    },
    components: {
        controlUserList
    },
    data() {
        return {
            show: true,
            selectType: 1, //选人控件传值
            extra: {
                expandAll: true, //是否默认展开所有节点		                multiple: false,
                tabs: [{
                    action: "fn/sdszf/pc/gwyz/getUserByRoleId?roleId=220125174443bO46dgLiivFKbR7bUPj",
                    name: "委领导",
                    subTabKey: "department"
                }]
            },
            defaultSelectArray: [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        close() {
            this.show = false
            this.$emit("closeCallback", {
                justClose: true
            })
        },
        cancePerson() {
            this.$emit("closeCallback", {
                justClose: true
            })
        },
        getSelectUser(arr) {
            console.log(arr)
            if (arr.length == 0) {
                dsf.layer.toast("请选择委领导！");
            } else {
                this.$emit("closeCallback", arr[0])
            }
        }
    },
    created() { },
    mounted() { },
    destroyed() { },
}
</script>
