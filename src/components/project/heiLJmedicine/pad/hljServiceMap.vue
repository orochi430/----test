<template>
    <div id="service_map">
        <div id="container"></div>
    </div>
</template>

<script>
// import "https://map.qq.com/api/gljs?v=1.exp&key=VLCBZ-H7EKX-4EV4E-TXKZI-MVR2J-S5BRY";
export default {
    name: "service_map",
    data() {
        return {
            latitude: "", //纬度
            longitude: "", //经度
        };
    },
    created() {
        navigator.geolocation.getCurrentPosition(
            this.geoSuccess,
            this.geoError
        );
    },
    mounted() {
        this.$nextTick(() => {
            //
            var center = new TMap.LatLng(this.latitude||30.89112, this.longitude||121.923523);
            //定义map变量，调用 TMap.Map() 构造函数创建地图
            var map = new TMap.Map(document.getElementById("container"), {
                center: center, //设置地图中心点坐标
                zoom: 17.2, //设置地图缩放级别
                pitch: 43.5, //设置俯仰角
                rotation: 45, //设置地图旋转角度
            });
        });
    },
    methods: {
        geoError(error) {
            alert(JSON.stringify(error));
            console.log("Error code " + error.code + ". " + error.message);

            switch (error.code) {
                case error.PERMISSION_DENIED:
                    alert("定位失败,用户拒绝请求地理定位");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alert("定位失败,位置信息是不可用");
                    break;
                case error.TIMEOUT:
                    alert("定位失败,请求获取用户位置超时");
                    break;
                case error.UNKNOWN_ERROR:
                    alert("定位失败,定位系统失效");
                    break;
            }
        },
        geoSuccess(event) {
            console.log(
                `纬度:` +
                    event.coords.latitude +
                    ", " +
                    `经度:` +
                    event.coords.longitude
            );
            this.latitude = event.coords.latitude;
            this.longitude = event.coords.longitude;
        },
    },
};
</script>

<style lang="scss" scoped>
#container {
    /*地图(容器)显示大小*/
    width: 100%;
    height: calc(100vh - 46px);
}
</style>