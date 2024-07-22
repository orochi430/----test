<template>
  <div class="ds-meeting-manage ds-meeting-center">
    <van-pull-refresh v-model="loading" success-text="刷新成功" @refresh="onRefresh(false)">
      <div v-if="firstLoading" class="center-loading">
        <van-loading />
      </div>
      <!-- <commonempty v-else-if="!list.length && !loading" description="无数据" /> -->
      <van-list
        :finished="finished"
        :finished-text="finishedTips"
        v-model="loading"
        :offset="10"
        :immediate-check="false"
        @load="onLoad"
      >
      <ds-list :data="list" :columns="columns" type="hy" @mainClick="handleActionClick" @commonClick="handleActionClick"/>
      </van-list>
<!--      <div class="list-box">-->
<!--        <dsf-card v-for="(item, index) in list" :key="item.id">-->
<!--          <div slot="header" class="_header" @click="toDetail(item)">-->
<!--            <span>{{ item.bt }}</span>-->
<!--          </div>-->
<!--          <div slot="content" @click="toDetail(item)">-->
<!--            <div v-if="item.shenhe === '1'" class="col-3">-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconwenjianleixing"/>-->
<!--                <span class="label">{{ item.wjzl }}</span>-->
<!--              </div>-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconzhuangtai"/>-->
<!--                <span class="label" style="color: #67C23B;">{{ item.meetingStatusText }}</span>-->
<!--              </div>-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconrili"/>-->
<!--                <span class="label" style="color: #F66C6C;">{{ item.day }}天</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-else-if="item.meetingStatus === '0'" class="col-3">-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconweidu"/>-->
<!--                <span class="label">未读 {{ item.unread }}</span>-->
<!--              </div>-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconziyuan"/>-->
<!--                <span class="label">报名 {{ item.baomin }}</span>-->
<!--              </div>-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconqingjia"/>-->
<!--                <span class="label">请假 {{ item.qinjia }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div v-else class="col-3">-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconchengyuan"/>-->
<!--                <span class="label">应到 {{ item.yingdao }}</span>-->
<!--              </div>-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconyidao"/>-->
<!--                <span class="label">已到 {{ item.yidao }}</span>-->
<!--              </div>-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconweidao"/>-->
<!--                <span class="label">未到 {{ item.weidao }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="col-1">-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont iconshijian" />-->
<!--                <span>{{ item.hykssj }} 到 {{ item.hyjssj }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="col-1">-->
<!--              <div class="col-it">-->
<!--                <i class="iconfont icondidian" />-->
<!--                <span>{{ item.hydd }}</span>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div slot="footer" class="footer">-->
<!--            <DsButtonToolbox-->
<!--              :buttons="item.buttons || {}"-->
<!--              :more="true"-->
<!--              size="small"-->
<!--              @commonClick="(action) => { handleCommonClick(action, item, index) }"-->
<!--              @mainClick="(action) => { handleMainClick(action, item, index) }"-->
<!--            />-->
<!--            <div class="footer-left">-->
<!--              <div class="footer-left-bt" @click="followMeeting(item, index, 'list')">-->
<!--                <i :class="[item.isFavorite === 1 ? 'iconguanzhu2' : 'iconguanzhu']" class="iconfont" />-->
<!--                <div>{{ item.isFavorite === 1 ? '已关注' : '关注' }}</div>-->
<!--              </div>-->
<!--              <div class="footer-left-bt" @click="setUpMeeting(item, index, 'list')">-->
<!--                <i :class="[item.isTop === 1 ? 'iconzhiding2' : 'iconzhiding']" class="iconfont" />-->
<!--                <div>{{ item.isTop === 1 ? '已置顶' : '置顶' }}</div>-->
<!--              </div>-->
<!--              <div v-if="item.meetingStatus === '0'" class="footer-left-bt" @click="video(item)">-->
<!--                <i class="iconfont icongengduo1" />-->
<!--                <div>更多</div>-->
<!--                <van-popup :style="{ height: '30%' }" :get-container="getContainer" :lock-scroll="true" v-model="show" close-icon-position="top-right" position="bottom">-->
<!--                  <div class="popup-btn">-->
<!--                    <Grid :column-num="3" clickable>-->
<!--                      <GridItem v-for="el in moreData" :key="el.action" @click="handleButtonClick(el.action)">-->
<!--                        <Icon slot="icon" :size="iconSize" :class="['iconfont', el.icon]" />-->
<!--                        <span slot="text" class="grid-text">{{ el.name }}</span>-->
<!--                      </GridItem>-->
<!--                    </Grid>-->
<!--                  </div>-->
<!--                </van-popup>-->
<!--              </div>-->
<!--              <div class="footer-left-bt" @click="changeMeeting(item, index)">-->
<!--                <i class="iconfont iconshouxieqianpi" />-->
<!--                <div>变更</div>-->
<!--              </div>-->
<!--              <div v-else class="footer-left-bt" @click="video(item)">-->
<!--                <i class="iconfont iconshipin" />-->
<!--                <div>视频</div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="footer-right">-->
<!--              <van-button @click="signUpDetail(item)">报名情况</van-button>-->
<!--              <van-button v-if="item.meetingStatus === '0'" @click="cancelMeeting(item, index)">取消</van-button>-->
<!--                              <van-button v-if="item.meetingStatus === '0'" @click="changeMeeting(item, index)">变更</van-button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </dsf-card>-->
<!--      </div>-->
    </van-pull-refresh>
  </div>
</template>

<script>
// import DsfCard from '../documentCenter/DsfCard';
// import DsfButtonToolbox from '../documentCenter/DsfButtonToolbox';
// import DsfButtonGroup from '../documentCenter/DsfButtonGroup';
import DsList from "@/components/documentCenter/DsList";
import ButtonActions from "@/components/todoCenter/TodoCenter.mixin";

export default {
  name: 'MeetingManage',
  components: {
    // DsfCard,
    // DsfButtonToolbox,
    // DsfButtonGroup,
    DsList
  },
  mixins: [ButtonActions],
  data() {
    return {
      tab:"hy",
      firstLoading: true,
      loading: true,
      list: [],
      columns: [
        {
          color: null,
          format: null,
          icon: "",
          showCategory: "mainTitle",
          showMetaColumn: "bt",
          showName: "标题",
          showRows: null
        },
        {
          color: null,
          format: null,
          icon: "iconwenjianleixing",
          showCategory: "subTitle",
          showMetaColumn: "wjzl",
          showName: "文件类型",
          showRows: null,
        },

        {
          color: null,
          format: null,
          icon: "iconshijian",
          showCategory: "Content",
          showMetaColumn: "time",
          showName: "会议时间",
          showRows: null
        },
        {
          color: null,
          format: null,
          icon: "icondidian",
          showCategory: "Content",
          showMetaColumn: "hydd",
          showName: "会议地点",
          showRows: null
        }
      ],
      pageIndex:1,
      pagelimit:60,
      finished:false,
      finishedTips:"",
      allCount:null,
      url:dsf.config.meetingConfig.meetingManageUrl
    }
  },
  created() {
    this.init();
  },
  methods: {
    handleActionClick() {
      this.tab='hy'
      const action = arguments[0];
      const fn = this[`action-${action}`] || function () { };
      fn(...Array.prototype.slice.call(arguments, 1));
    },
    post (url, params, callback, loading = true) {
      let _loading = loading ? dsf.layer.loading() : null;
      params['x-auth-token'] = dsf.util.loadSessionStore("loginToken");
      dsf.http.post(url, params)
        .done(callback)
        .error(() => {
          dsf.layer.toast('请求异常');
        })
        .always(() => {
          _loading && dsf.layer.closeLoading(_loading);
        });
    },
    /*************请求****************/
    init() {
      // this.onRefresh(false);
      this.onLoad()
    },
    onRefresh () {
      this.post(this.url,{
        type: 'join',
        page:1,
        limit:this.pagelimit,
      }, res => {
        this.pageIndex=2,
        this.finished=false,
        this.finishedTips="",
        this.allCount=res.count
        if(Math.ceil(this.allCount/this.pagelimit)<this.pageIndex){
          this.finishedTips="暂无更多数据"
          this.finished=true
        }
        this.list=[]
        this.list=this.postSuccess(res.rows)
        if(this.list.length==0){
          this.finishedTips="";
        }
      });
    },
    onLoad(){
      let that=this
      dsf.http.post(this.url,{
        type: 'join',
        page:that.pageIndex,
        limit:that.pagelimit,
      }).then( ({data}) => {
        that.allCount=data.count
        let listdata=data.rows
        that.list=[...that.list,...that.postSuccess(listdata)]
        that.pageIndex++
        if(Math.ceil(that.allCount/that.pagelimit)<that.pageIndex){
          that.finishedTips="暂无更多数据"
          that.finished=true
        }
        if(that.list.length==0){
          that.finishedTips="";
        }
        return
      })
    },
    postSuccess (list) {
      let filterdata = list.map(v => {
        let {isFavorite, isTop, meetingStatus, shenhe} = v;
        let commonButton = [];
        if(dsf.config.setting['SYS-MOBILE-LIST-0004'] > 0) {
          commonButton.push(
            {
              action: isFavorite === 1 ? 'quXiaoGuanZhu' : 'guanZhu',
              icon: isFavorite === 1 ? 'iconai-mark' : 'iconshoucang',
              name: isFavorite === 1 ? '已关注' : '关注'
            },
          )
        }
        if(dsf.config.setting['SYS-MOBILE-LIST-0002'] > 0) {
          commonButton.push(
            {
              action: 'huiYiShiPin',
              icon: 'iconshipin',
              name: '视频'
            }
          )
        }
        let mainButtons = [{
          action: 'baoMingQingKuang',
          icon: '',
          name: '报名情况'
        }];
        if (meetingStatus === '0') {
          /* commonButton.push({
            action: 'huiYiBianGeng',
            icon: 'iconshouxieqianpi',
            name: '变更'
          }); */
          // mainButtons.push({
          //   action: 'quXiao',
          //   icon: '',
          //   name: '取消',
          //   showIndex: '1'
          // });
        }
        mainButtons = mainButtons.map((v, i) => {
          v.showIndex = i + '';
          return v;
        });
        mainButtons = mainButtons.map((v, i) => {
          v.showIndex = i + '';
          return v;
        });
        let dataValue = {
          id: v.id,
          moduleId: v.moduleId,
          todoId: v.todoId||v.id,
          bt: v.bt,
          hydd: v.hydd,
          hyjssj: v.hyjssj,
          hykssj: v.hykssj,
          isFavorite: v.isFavorite,
          isTop: v.isTop,
          meetingStatus: v.meetingStatus,
          time: v.hykssj + ' 到 ' + v.hyjssj,
          qianDaoStatus: v.qianDaoStatus,
          shenhe: v.shenhe,
          ngbm: v.ngbm,
          status: v.status,
          zcr: v.zcr
        };
        if (shenhe === '1') {
          dataValue.wjzl = v.wjzl;
          dataValue.meetingStatusText = v.meetingStatusText;
          dataValue.day = v.day;
        } else if (meetingStatus === '0') {
          dataValue.unread = v.unread;
          dataValue.baomin = v.baomin;
          dataValue.qinjia = v.qinjia;
        } else {
          dataValue.yingdao = v.yingdao;
          dataValue.yidao = v.yidao;
          dataValue.weidao = v.weidao;
        }
        return {
          buttons: {
            commonButton,
            mainButtons
          },
          dataValue
        };
      });
      this.firstLoading = false;
      this.loading = false;
      return filterdata
    },
    /*************按钮事件***************/
    // 关注
    // followMeeting (item, index, name) {
    //   let url = item.isFavorite === 1 ? 'deleteFocus' : 'setFocus';
    //   let msg = item.isFavorite === 1 ? '取消关注成功' : '关注成功';
    //   this.post('/fn/mobileFocus/' + url,{
    //     fid: item.id,
    //     infoId: item.id
    //   }, ({result, message}) => {
    //     if (result) {
    //       dsf.layer.toast(msg, true);
    //       this.$set(this[name][index], 'isFavorite', item.isFavorite === 1 ? 0 : 1);
    //     } else {
    //       dsf.layer.toast(message);
    //     }
    //   });
    // },
    // 签到
    // signInMeeting (item, index) {
    //   this.post('fn/meeting/signMeeting',{
    //     pk: item.id,
    //     deviceId: '',
    //     userId: dsf.util.loadSessionStore("user").user_id
    //   }, ({code, message}) => {
    //     if (code === '200') {
    //       dsf.layer.toast('签到成功', true);
    //       this.$set(this.joinList[index], 'qianDaoStatus', 1);
    //     } else {
    //       dsf.layer.toast(message);
    //     }
    //   });
    // }
  }
}
</script>

<style lang="scss" scoped>
.ds-meeting-manage{
  padding-top: 0;
}
</style>
