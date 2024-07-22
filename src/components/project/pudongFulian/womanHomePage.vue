<template>
  <div>
    <div class="box" >
        <!-- 4个滑块 -->
        <div>
            <van-swipe class="swipe" :loop="false" :show-indicators="false" :width="118">
                <van-swipe-item>
                    <div class="swipeBox" @click="getData(1)"><img src="static\images\pudongFulian\fuwuzhongxin.png" alt=""></div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="swipeBox" @click="getData(3)"><img src="static\images\pudongFulian\jiatinglianjie.png" alt=""></div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="swipeBox" @click="getData(0)"><img src="static\images\pudongFulian\tongyuekongjian.png" alt=""></div>
                </van-swipe-item>
                <van-swipe-item>
                    <div class="swipeBox" @click="getData(2)"><img src="static\images\pudongFulian\youhaokongjian.png" alt=""></div>
                </van-swipe-item>
            
            </van-swipe>
        </div>
        <!-- 检索框 -->
        <div class="search_body">
            <van-search v-model="keyword" show-action action-text="搜索" right-icon="" left-icon="search" placeholder="请输入搜索关键词">
                <template #action>
                    <div class="boxRd">
                        <div @click="getSearch()" class="zise">搜索</div>
                        <div @click="btnCut()" class="wenziR">{{ wenZi }}</div>
                    </div>
                </template>
            </van-search>
        </div>
        <!-- 列表-->
        <div v-show="ListView">
            <!-- 家庭廉洁 -->
            <div class="boxWidth">
                <div class="boxChunk" v-for="(item,index) in listValue" :key="index"  @click="goForm(item)">
                    <div class="box-box">
                        <div class="boxZi"></div>
                        <div class="boxWen">{{ item.bt }}</div>
                    </div>
                    <div class="Weizhi">位置: {{ item.ddm }}</div>
                    <!-- <div class="Jiezhen">街镇: {{ item.jz }}</div> -->
                </div>
            </div>
            
        </div>
        <!-- 地图 -->
        <div class="ditu" v-show="mapView">
            <iframe
                ref="mapFrame"
                width="100%"
                height="800px"
                frameborder="0"
                src="about:blank"
                allowfullscreen
            ></iframe>
        </div>
        <!-- 悬浮按钮 -->
        <!-- <div class="xuanfu" @click="btnCut()">
            <img class="imgfu" src="static\images\pudongFulian\qiehuan.png" alt="">
        </div> -->
    </div>
  </div>
</template>

<script>

export default {
    name:"womanHomePage",
    data(){
        return{
            keyword:"",//搜索框关键词
            active:1,//选中
            listValue:[],
            ListView:true,
            mapView:false,
            wenZi:"切换地图"
        }
    },
    created(){
        let self = this
        window.zoomOnClick111=function (index,listValue){
            let pars = self.listValue[index]
            pars.active = self.active
            self.$router.push({
                name: `partiCulars`,
                params: pars,
                
            });
        }
        this.getData()
    },
    mounted(){},
    methods:{
        //搜索
        getSearch(){
            console.log('我点击了');
            let params={
                type:this.active,
                bt:this.keyword,
                ddm:this.keyword,
            }
            let self = this
            dsf.http.post("fn/kjdd/data",params).then((res)=>{
                if(res.data.code == "200"){
                    self.listValue = res.data.data
                    self.loadMap()
                }
            })
        },
        //列表数据请求
        getData(value){
            let self = this
            if(value!= undefined){
                self.active = value
            }
            let params={
                type:self.active
            }
            dsf.http.post("fn/kjdd/data",params).then((res)=>{
                console.log(res);
                if(res.data.code == "200"){
                    self.listValue = res.data.data
                    this.loadMap()
                }
            })
        },
        //列表详情
        goForm(item){
            let pars = item
            pars.active = this.active
            this.$router.push({
                name: `partiCulars`,
                params: pars
            });
        },
        //地图切换
        btnCut(){
            if(this.ListView == true){
                this.ListView = false
                this.mapView = true
                this.wenZi = "切换列表"
            }else{
                this.ListView = true
                this.mapView = false
                this.wenZi ="切换地图"
            }
        },
        loadMap() {
            const doc = this.$refs.mapFrame.contentWindow.document;
            const script = doc.createElement("script");
            script.type = 'text/javascript'
            script.src = 'http://map.qq.com/api/js?v=2.exp&key=YOUR_KEY&libraries=geometry';
            script.onload = () => {
                this.initMap();
            };
            doc.body.appendChild(script);
        },
        initMap() {
            console.log(this.$refs.mapFrame.contentWindow.document.getElementById);
            const center = new qq.maps.LatLng(31.279, 121.579023);
            const map =  new qq.maps.Map(this.$refs.mapFrame.contentWindow.document.body, {
                // 进行地图初始化配置
                center: center,
                zoom: 12,
                draggable: true,
                scrollwheel: true,
                markers: data,
            });
            let self = this
            
            var data = self.listValue.map( item =>{
                if (item.zb) {
                    return item.zb.split(',').map(coord => parseFloat(coord));
                }
            }) 
            var latlngs = self.listValue.map(item => {
                let [lat, lng] = item.zb.split(',').map(coord => parseFloat(coord))
                return { lat, lng }
            });
           
            function createCluster() {
                var markers = [];
                    for (var i = 0; i < data.length; i++) {
                        var latLng = new qq.maps.LatLng(data[i][0], data[i][1]);
                        var marker = new qq.maps.Marker({
                            position: latLng,
                            map: map
                        });
                        markers.push(marker);
                    }
                    var markerClusterer = new qq.maps.MarkerCluster({
                        map: map,
                        minimumClusterSize: 999, //默认2
                        markers: markers,
                        zoomOnClick: true, //默认为true
                        gridSize: 30, //默认60
                        averageCenter: true, //默认false
                        maxZoom: 18 //默认18
                    });
                    var infoWin = new qq.maps.InfoWindow({ map: map});
                    for(var i = 0;i < latlngs.length; i++) {
                        (function(n){
                            let titleValue = self.listValue[n].bt
                            let locationValue =self.listValue[n].ddm
                            let marker = new qq.maps.Marker({
                                position: new qq.maps.LatLng(latlngs[n].lat, latlngs[n].lng),
                                map: map
                            });
                            qq.maps.event.addListener(marker, 'click', function() {
                                let contentHtml  =  '<div onClick="window.parent.zoomOnClick111('+n+')"  id="btn' + n + '"   style="text-align:center;white-space:nowrap;margin:10px;">'+ titleValue + '</div>' +
        '<div onClick="window.parent.zoomOnClick111('+n+')" style="text-align:center;margin:10px;width:200px">位置:' + locationValue + '</div>'
                                infoWin.open();
                                infoWin.setContent(contentHtml)
                                infoWin.setPosition(new qq.maps.LatLng(latlngs[n].lat, latlngs[n].lng));
                              }); 
                            })(i);
                    }
            };
            createCluster()
        }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/themes.scss";
@import "@/assets/styles/mixin.scss";
.box{
    * { touch-action: pan-y; } 
}
.swipeBox{
    width: 108px;
    height: 79px;
    margin-left: 10px;
}
::v-deep .van-swipe {
    background: white; 
}
::v-deep .van-swipe__track{
    margin: 10px 0;
}
.boxWidth{
    height: 100%;
    .boxChunk{
        width: 340px;
        height: 130px;
        background: #FFFFFF;
        box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.09);
        margin: 12px auto;
        .box-box{
            display: flex;
            align-items: center;
            padding: 10px  20px;
            .boxZi{
                width: 4px;
                height: 13px;
                background: #5C0D9B;
               
            }
            .boxWen{
                font-family: PingFangSC-Medium;
                font-size: 18px;
                color: #111111;
                line-height: 22px;
                font-weight: 700;
                margin: 0 10px;
            }
        }
        .Weizhi{
            height: 25px;
            
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #333333;
            font-weight: 400;
            padding: 0px 20px;
            margin: 5px 0;
        }
        .Jiezhen{
            height: 20px;
            font-family: PingFangSC-Regular;
            font-size: 17px;
            color: #333333;
            font-weight: 400;
            padding: 20px 20px;
        }
    }
}
.boxRd{
    display: flex;
    font-size: 16px;
    .zise{
        color: #5C0D9B;
        font-weight: 600;
    }
    .wenziR{
        margin-left: 8px;
    }
}
.xuanfu{
    width: 42px;
    height: 42px;
    background-color: var(--normal);
    position: fixed;
    right: 10%;
    bottom: 23%;
    border-radius:50%;
    .imgfu{
        width: 27px;
        height: 27px;
        position: absolute;
        top: 18%;
        left: 18%; 
    }
}

</style>