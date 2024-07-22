<template>
<div id="myUUID">
    <div class="content">
        <!-- 输入任意文本 -->
        <van-field v-model="myUUID" label="myUUID" />
        <van-field v-model="myUUNAME" label="myUUNAME" />
    </div>
</div>
</template>

<script>
export default {
    name: "myUUID",
    data() {
        return {
            userInfo: null,
            myUUID: "",
            myUUNAME:""
        }
    },
    computed: {

    },
    created() {
        let _self = this;
        this.userInfo = dsf.util.loadSessionStore('user');

        xsfCommon.SystemTools(["DeviceId"],
            function (result) {
                _self.myUUID = result;
                alert(result);
            },
            function (error) {
                alert("open failed: " + error);
            }
        );
        xsfCommon.SystemTools(["DeviceName"],
            function (result) {
                _self.myUUNAME = result;
                alert(result);
            },
            function (error) {
                alert("open failed: " + error);
            }
        );
    },
    mounted() {},
    methods: {

    }
};
</script>
