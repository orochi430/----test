<template>
  <div class="meetingRoomControlBox">
    <van-field
			class='meetingRoomControl'
			v-model="value.text"
			:disabled='controlData.disabled'
			:clickable='controlData.clickable'
			:placeholder="controlData.placeholder" 
			:readonly='true'
			:input-align='controlData.inputAlign'
			:left-icon="controlData.leftIcon"
			:right-icon="controlData.rightIcon"
			:border='false'
			:class='[controlData.error ? "errorInp" :""]'
			:rules="controlData.rules"
			@click='toClick("click",$event)'
			:name="metaData&&metaData.metaId?metaData.metaId:''"
    >
    </van-field>
    <van-popup v-model="showPopup"  position='bottom' :style="{ height: '100%' }" >
      <div class="popupBox">
        <div class="contentBox">
          <van-radio-group v-model="radioSec">
            <div v-for="item in meetingData" :key="item.id"
              class="_content">
              <van-radio :name="item.id">
                <div class="_item">
                  <div class="_left">
                    <div class="_title ds_font4">{{ item.name }}</div>
                    <div class="_shebei ds_font6">{{ item.configSetUp }}</div>
                    <div class="_num">
                      <i class="iconfont">&#xe614;</i>
                      <span class="ds_font6">{{ item.number }}</span>
                    </div>
                  </div>
                  <div class="_right">
                    <van-image :src="item.images | urlFilter" fit="cover" lazy-load>
                      <template v-slot:error>
                        <img src="../../../assets/imgs/meetingRoom.jpg">
                      </template>
                    </van-image>
                  </div>
                </div>
              </van-radio>
            </div>
          </van-radio-group>
        </div>
        <van-tabbar>
          <van-tabbar-item class="_btns">
            <van-button type="default" native-type='button' @click="cancelFn">取消</van-button>
            <van-button type="info" native-type='button' @click="confirmFn">确定</van-button>
          </van-tabbar-item>
        </van-tabbar>
      </div>
    </van-popup>
  </div>
</template>

<script>
import propMixin from "./mixin";

export default {
  name:'meetingRoomControl',
  mixins: [propMixin],
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    let now = new Date();
    return {
      showPopup:false,
      controlData:{
				inputAlign:'right',
        rules:[],
        placeholder:this.metaData.placeholder,
				leftIcon:'',//左icon
				rightIcon:'',//右icon
				disabled:false,
				closeable:true,
				round:true,
				lockScroll:true,
				overlay:true,
				duration:'0.3',
				columnsValue:{//对象数组，配置每一组显示的数据
					columns:[],
				},
      },
      meetingData:[
        {
            "configSetUp":"无投影设备,移动话筒",
            "number":"20",
            "name":"行政大楼2号楼",
            "id":"200528154121AgvU0dOlpEGz83U61BD",
            "occupydate":[
            ]
        },
        {
            "configSetUp":"固定投影,话筒,移动话筒",
            "number":"5",
            "images":"ctrl/file/downloadImage?fileName=200515092017XZrIiVl1h6kbgRBpMru.jpg",
            "name":"多媒体会议室",
            "id":"200116153258XxH4GUh0bS2x7R14ze8",
            "occupydate":[
            ]
        },
        {
            "configSetUp":"固定投影,无投影设备,话筒,无线话筒",
            "number":"20",
            "images":"ctrl/file/downloadImage?fileName=200515092005bTfiJ7EpCpbbAx0CyPg.jpg",
            "name":"综合楼102",
            "id":"20011616090768IgVSAOqOLji6l5i1E",
            "occupydate":[
            ]
        },
        {
            "configSetUp":"固定投影,话筒,移动话筒,无线话筒,有投影幕布,移动投影",
            "number":"6",
            "images":"ctrl/file/downloadImage?fileName=200515092100zYb6FbG4tzEtwNcUY1R.jpg",
            "name":"综合楼701",
            "id":"200118112502bg9iz8ps6UiNBrvFIWZ",
            "occupydate":[
            ]
        },
        {
            "configSetUp":"固定投影,无投影设备,话筒,移动话筒",
            "number":"20",
            "images":"ctrl/file/downloadImage?fileName=200515092131Hpo5RWtYgtVEApt21Im.jpg",
            "name":"大礼堂",
            "id":"200211213526uTT4yiPqRqV4k1mY7Wv",
            "occupydate":[
            ]
        },
        {
            "configSetUp":"无投影设备,移动话筒,有投影幕布",
            "number":"",
            "images":"ctrl/file/downloadImage?fileName=200515092320jgKpQh0zvuwPfjYLcuj.jpeg",
            "name":"行政楼601",
            "id":"2003251823494ZtNDJJJcoLvV9j9Q8G",
            "occupydate":[
            ]
        },
        {
            "configSetUp":"无投影设备,移动话筒",
            "number":"12",
            "images":"ctrl/file/downloadImage?fileName=200515092348PRT1md1vWO7v3ssG0au.jpg",
            "name":"行政楼多媒体会议室",
            "id":"200325182331qwr5yocW0e3V9fIZM1m",
            "occupydate":[
            ]
        }
      ],
      radioSec:null,
      readonly:false,
      statusConfig: {
        0: '未审核通过/审核中',
        1: '审核通过',
        2: '被占用',
        3: '被锁定',
        4: '本人预定'
      },
      type: this.$route.query.type || 0,
      expire: null,
      date: dsf.date.format(now, 'yyyy-mm-dd'),
      dateStr: dsf.date.format(now, 'mm月dd日 DD'),
    };
  },
  mounted(){
    this.init();
  },
  filters:{
    urlFilter(str) {
      return dsf.config.assetsRoot + str;
    }
  },
  computed:{
		bindValue(){
			return this.value.text
		}
	},
  methods: {
    setExpire () {
      let now = new Date();
      let starttime = dsf.date.format(now, 'yyyy-mm-dd 07:00');
      if (starttime.indexOf(this.date) === -1) {
        this.expire = null;
      } else {
        this.expire = this.progressBar({
          starttime,
          endtime: dsf.date.format(now, 'yyyy-mm-dd hh:ii')
        });
      }
    },
    progressBar({endtime, starttime}) {
      let e = dsf.date.parse(endtime, 'yyyy-mm-dd hh:ii');
      let s = dsf.date.parse(starttime, 'yyyy-mm-dd hh:ii');
      let m = dsf.date.parse(starttime.split(' ')[0] + ' 07:00', 'yyyy-mm-dd hh:ii');
      let width = ((e - s) * 100 / 57600000).toFixed(2) + '%';
      let left = ((s - m) * 100 / 57600000).toFixed(2)  + '%';
      return {left, width};
    },
    init() {
      this.postData();
    },
    postData () {
      let _loading = dsf.layer.loading();
      this.setExpire();
      dsf.http.post('fn/meeting/meetingRoomJson', {
        date: this.date
      }).done(res => {
        if (res.code + '' === '200') {
          this.postDataSuccess(res.data);
        }
      }).error(() => {
        dsf.layer.toast('请求异常');
      }).always(() => {
        dsf.layer.closeLoading(_loading);
      });
    },
    postDataSuccess (list) {
      this.meetingData = list;
    },
    toClick(){
      if(this.readonly) return
			this.showPopup=!this.showPopup
    },
    cancelFn(){
      this.showPopup=!this.showPopup
    },
    confirmFn(){
      console.log(this.radioSec)
      let secobj=this.meetingData.filter(item=>item.id==this.radioSec)[0]
      console.log(secobj)
      let obj=this.value
      obj.value=secobj.id
      obj.text=secobj.name
      this.showPopup=!this.showPopup
      this.$emit('input',obj)
    }
  },
  created() {
    console.log(this.value)
  },

}
</script>
<style lang='scss' scoped>
.meetingRoomControlBox{
  width:100%;
  .popupBox{
    width:100%;
    height:100%;
    box-sizing: border-box;
    .contentBox{
      margin-bottom:60px;
    }
    ._content {
      box-sizing: border-box;
      min-height: 103px;
      margin-top: 15px;
      padding: 15px 15px 12px;
      display: flex;
      flex-flow: column;
      // @include background-theme("button_auxiliary_bgcolor");
      ._item {
        display: flex;
        justify-content: space-between;
        ._left {
          ._title {
          }
          ._shebei {
            margin: 10px 0;
            color: #666666;
          }
          ._num {
            display: flex;
            align-items: center;
            margin-bottom: 19px;
            span {
              color: #666666;
              margin-left: 5px;
            }
          }
        }
        ._right {
          flex: none;
          width: 100px;
          height: 75px;
          margin-left: 10px;
          .van-image {
            border-radius: 5px;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
        }
      }
    }
    ._btns {
      padding: 0 10px;
    }
    button {
      height: 0.8rem;
      padding: 0;
      flex: 1;
      margin: 0 10px;
    }
    .van-tabbar--fixed {
      height: 1.2rem;
    }
  }
}
</style><style lang="scss">
  .meetingRoomControlBox .van-field__error-message{
		text-align: right;
	}
  .meetingRoomControlBox{
    .van-tabbar-item__text {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .van-radio__label{
      flex:1;
    }
  }
  
</style>