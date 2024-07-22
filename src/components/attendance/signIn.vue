<template>
  <div class="signIn-page">
    <div class="info">
      <div class="info-avatar">
        <img :src="avatar" :onerror="default_avatar" />
        <!-- <van-image round :src="avatar" error-icon="../../../static/images/EnterpriseServices/default-avatar.png" /> -->
      </div>
      <div class="info-msg">
        <div class="name">{{ userName }}</div>
        <div class="group">
          {{ groupName
          }}<span class="rule" @click="$router.push('attndCheckRules')">(查看规则)</span>
        </div>
      </div>
      <div class="info-btn" @click="$router.push('attndApplications')" v-if="dsf.config.attendance.applications">
        <img src="static/images/attendance/qd-sq.png" /><span>申请</span>
      </div>
    </div>
    <div class="content">
      <div class="content-box">
        <div class="content-box-state">
          <div class="sign">{{ signInTitle }}</div>
          <div class="state">
            <van-icon name="checked" v-if="signInDesc != `未打卡` && signInDesc != `缺卡`" />
            {{ signInDesc }}
            <span v-if="signInDesc != `未打卡` &&
              signOutDesc == `未打卡` &&
              signInDesc != `缺卡` &&
              isSbGxdk
              " class="state-update" @click="updateSignIn(3)">更新打卡</span>
          </div>
        </div>
        <div class="content-box-state">
          <div class="sign">{{ signOutTitle }}</div>
          <div class="state">
            <van-icon name="checked" v-if="signOutDesc != `未打卡` && signOutDesc != `缺卡`" />
            {{ signOutDesc }}
            <span v-if="signOutDesc != `未打卡` && signOutDesc != `缺卡`" class="state-update"
              @click="updateSignIn(4)">更新打卡</span>
          </div>
        </div>
      </div>
      <div class="content-sign" :style="signStyleObject">
        <div class="content-sign-container">
          <div class="sign-btn" @click="signIn()">
            <div class="title">{{ btnDesc }}</div>
            <div class="time">{{ nowTime | dateFormat }}</div>
          </div>
          <div class="sign-pos" v-if="!notLocation">
            <div v-if="geoLocation">
              <van-icon name="location-o" />{{ address }}
              <div><button @click="updatePosition()">重新定位</button></div>
            </div>
            <van-loading v-else size="0.28rem">{{ address }}</van-loading>
          </div>
        </div>
      </div>
      <div class="content-desc" v-if="dsf.config.attendance.signInWithDesc?.enable">
        <van-field v-model="desc" rows="2" label="" type="textarea" :placeholder="dsf.config.attendance.signInWithDesc.placeholder || '请输入备注'
          " :maxlength="dsf.config.attendance.signInWithDesc.maxlength || 50" show-word-limit label-align="right" />
      </div>
      <div class="content-tips" v-if="dsf.config.attendance.signInTips">
        {{ dsf.config.attendance.signInTips }}
      </div>
    </div>
    <van-popup v-model="showPop" position="bottom" :style="{ height: '100%' }">
      <van-nav-bar title="人脸识别" @click-left="showPop = false">
        <template #left>
          <van-icon name="arrow-left" /><span>返回</span>
        </template>
      </van-nav-bar>
      <face-identify @closePop="closePop" @signIn="signIn"></face-identify>
    </van-popup>
  </div>
</template>

<script>
import exclusiveInvoke from "gdt-jsapi/exclusiveInvoke";
import faceIdentify from "../project/wanzhengtong/components/faceIdentify";
export default {
  components: {
    faceIdentify,
  },
  data() {
    return {
      notLocation: dsf.config.attendance.notLocation,
      signStyleObject: {
        height: this.getSignHeight(),
      },
      desc: "",
      isFirstLoad: false, // 是否初次加载
      showPop: false,
      default_avatar:
        'this.src="' +
        require("static/images/EnterpriseServices/default-avatar.png") +
        '"',
      avatar: dsf.url.getWebPath(
        `/fn/mobilePhoto/download?id=${dsf.util.loadSessionStore("user").user_id
        }&time=${new Date().getTime()}`
      ),
      nowDate: dsf.date.format(new Date(), "yyyy-mm-dd"),
      myTimer: null,
      nowTime: new Date(),
      address: "定位中...",
      userName: dsf.util.loadSessionStore("user").name,
      groupName: this.getMyGroup(),
      signInTitle: "上班",
      signInDesc: "未打卡",
      signOutTitle: "下班",
      signOutDesc: "未打卡",
      btnDesc: "上班打卡",
      geoLocation: null,
      iosPosition: false,
      isRemote: false, //人脸验证
      user: dsf.util.loadSessionStore("user"),
      isSbGxdk: true,
      isExclusiveInvoke: dsf.config.attendance.isExclusiveInvoke,
      retry: 0
    };
  },
  filters: {
    //时间格式化
    dateFormat: function (val) {
      if (!val) return "";
      return dsf.date.format(val, "hh:ii:ss");
    },
  },
  mounted() {
    let self = this;
    self.isFirstLoad = true;
    self.init();
    console.log("signIn.vue-mounted", "isFirstLoad ->", self.isFirstLoad);
  },
  methods: {
    getSignHeight() {
      let totalHeight = `100vh`, diff = 5.4;
      if (dsf.config.attendance.signInWithDesc?.enable) diff += 2;
      if (dsf.config.attendance.signInTips) diff += 0.4;
      return "calc(" + totalHeight + " - " + diff.toFixed(2) + "rem)";
    },
    closePop() {
      let self = this;
      self.showPop = false;
    },
    updatePosition() {
      let self = this;
      self.geoLocation = null;
      self.address = "定位中...";
      self.getPosition();
    },
    init() {
      let self = this;
      self.setTime();
      self.getMySignInfo();
      if (!self.notLocation) self.getPosition();
    },
    setTime() {
      let self = this;
      self.myTimer = setInterval(() => {
        self.nowTime = new Date();
      }, 1000);
    },
    getPosition() {
      let self = this;
      if (self.$route.query.demo == "1") {
        self.geoLocation = {
          status: "定位成功",
          LocationType: "5",
          Longitude: "121.92772",
          Latitude: "30.888838",
          Accuracy: "50.0米",
          Provider: "lbs",
          Speed: "0.0米\/秒",
          Bearing: "0.0",
          Satellites: "0",
          Country: "中国",
          Province: "上海市",
          City: "上海市",
          CityCode: "021",
          District: "浦东新区",
          Street: "水芸路",
          StreetNum: "55号",
          AdCode: "310115",
          Address: "上海市浦东新区水芸路55号靠近港城广场",
          PoiName: "港城广场",
          Altitude: "0.0",
          Time: "2022-06-06 16:39:51",
        };
        self.address = self.geoLocation.Address;
      } else {
        const reverseAddress = dsf.config.attendance.reverseAddress;
        if (dsf.util.getClientName() == "mpaas") { //皖政通
          croods.load(function () {
            croods.customPlugin({
              action: "ServicePermissionPlugin.getLocation",
              params: { coorType: "gcj02" },
              success: function (res) {
                self.geoLocation = res.data;
                self.address = self.geoLocation.Address;
                console.log("ServicePermissionPlugin.getLocation-res", res);
                if (res.flag == false) {
                  self.iosPosition = true;
                  self.address = res.data.message;
                }
                if (self.address !== "定位失败") {
                  self.iosPosition = false;
                }
              },
            });
          });
        } else if (dsf.util.getClientName() == "app") { //公司app（百度地图插件）
          $BaiduLocation.getLocation(
            {},
            function (res) {
              console.log("$BaiduLocation.getLocation-res", res);
              if (reverseAddress.enable && reverseAddress.appInsideEnable) {
                // 开启第三方逆地址定位，并开启在app中使用
                // 百度定位地址不准，腾讯逆地址比较精确（需要申请腾讯key）
                if (dsf.config.projectName == "dongyingshiwei") {
                  // 山东通 东营市委 特殊逻辑
                  self.dyswLocationPoint(JSON.parse(res))
                } else {
                  self[reverseAddress.platform](reverseAddress.key, JSON.parse(res))
                }
              } else {
                // 百度地址
                self.geoLocation = JSON.parse(res);
                self.address = self.geoLocation.address;
              }
            },
            function (err) {
              console.log("$BaiduLocation.getLocation-err", err);
            }
          );
        } else if (dsf.util.getClientName() == "govding" && !self.isExclusiveInvoke?.enable) { //政务钉（赣政通）自带定位插件
          console.log("getPosition", "govding");
          dsf.dd.getGeolocation({
            targetAccuracy: 100, //期望定位精度半径(单位米)，定位结果尽量满足该参数要求，但是不一定能保证小于该误差，开发者需要读取返回结果的 accuracy 字段校验坐标精度；建议按照业务需求设置定位精度，推荐采用200m，可获得较好的精度和较短的响应时长
            coordinate: 0, //1：获取高德坐标； 0：获取标准坐标；推荐使用高德坐标；标准坐标没有 address 字段
            withReGeocode: false, //是否需要带有逆地理编码信息；该功能需要网络请求，请根据自己的业务场景使用
            useCache: false, //默认是true，如果需要频繁获取地理位置，请设置false
          }).then(res => {
            console.log("dd.getGeolocation-res ->", res);
            if (res.errorCode == 0) {
              self.geoLocation = res;
              self.address = self.geoLocation.address;
            } else {
              // 错误码	描述	解决方案
              // 11	请确认定位相关权限已开启	提示用户打开定位权限
              // 12	网络异常，请稍后再试	提示用户检查当前网络
              // 13	定位失败，请稍后再试	
              // 14	业务定位超时	提示用户再次尝试
              const errMsg = {
                "11": "请打开定位权限",
                "12": "请检查当前网络",
                "13": "定位失败，请稍后再试",
                "14": "定位超时，请再次尝试",
              };
              dsf.layer.toast(res.errorMessage, false);
            }
          }).catch(err => {
            console.log("dd.getGeolocation-err ->", err);
            dsf.layer.toast(err.errorMessage || "发生错误，请稍后重试或联系管理员", false);
          })
        } else if (window.wx && wx.getLocation) { //政务微信
          wx.getLocation({
            isHighAccuracy: true,
            type: 'gcj02',
            success: function (res) {
              console.log("WXgetLocation", res);
              if (reverseAddress.enable) {
                // 开启第三方逆地址定位
                if (dsf.config.projectName == "dongyingshiwei") {
                  // 山东通 东营市委 特殊逻辑
                  self.dyswLocationPoint(res)
                } else {
                  self[reverseAddress.platform](reverseAddress.key, res)
                }
              } else {
                // 平台逆地址方法
                self.reverseAddressDreamWeb(res)
              }
            },
            fail: function (err) {
              self.address = "定位失败";
              dsf.layer.toast("请检查手机定位是否开启！")
              console.log("wxerr", err);
            }
          });
        } else { //政务钉第三方定位插件（裴鹤）
          window.dd?.ready(function () {
            exclusiveInvoke({
              api: "location.get",
            })
              .then(res => {
                console.log("location.get ->", res);
                if (res.platform?.toLowerCase().includes("ios")) {
                  console.log("platform", res.platform);
                  // res = JSON.parse(res.result);
                  console.log(res.result.split(","));
                  let pos = {};
                  res.result.split(",").forEach(item => {
                    pos[item.split("=")[0]] = item.split("=")[1];
                  });
                  console.log("getPosition-res", pos);
                  self.geoLocation = pos;
                  if (self.geoLocation.address == "(null)") {
                    console.log("定位失败", new Date().toString());
                    self.iosPosition = true;
                    if (self.isExclusiveInvoke?.enable && self.isExclusiveInvoke?.interval && self.isExclusiveInvoke?.retry) {
                      if (self.retry < self.isExclusiveInvoke.retry) {
                        setTimeout(() => {
                          self.retry++;
                          self.getPosition();
                        }, self.isExclusiveInvoke.interval);
                      } else {
                        self.address = "定位失败";
                      }
                    } else {
                      self.address = "定位失败";
                    }
                  } else {
                    self.retry = 0;
                    self.address = self.geoLocation.address;
                  }
                } else if (res.data) {
                  console.log("安卓sdk定位");
                  res = JSON.parse(res.data);
                  console.log("getPosition-res", res);
                  if (res.status == "success") {
                    self.geoLocation = res.data;
                    self.address = self.geoLocation.Address;
                  }
                }
                if (self.address !== "定位失败") {
                  self.iosPosition = false;
                }
              })
              .catch((err) => {
                console.log("getPosition-err", err);
              });
          })
        }
      }
    },
    signIn(attndType) {
      let self = this;
      // self.closePop();
      self.user = dsf.util.loadSessionStore("user");
      // self.showPop = false;
      if (
        !(
          self.signInDesc == "未打卡" ||
          self.signInDesc == "缺卡" ||
          self.signOutDesc == "未打卡" ||
          self.signOutDesc == "缺卡" ||
          [3, 4, 5, 6].includes(Number(attndType))
        )
      ) {
        dsf.layer.toast("已完成打卡", false);
        return;
      }
      if (self.notLocation || (self.geoLocation && self.address && self.address !== "定位失败" && self.address !== "定位中...")) {
        // 是否需要人脸识别验证
        if (self.isRemote && !self.user.attnd?.faceAuth) {
          // self.showPop = true;
          self.identify(attndType);
          return;
        }
        if (!attndType) {
          attndType = 1; // 考勤请求类型：1上班，2下班，3更新上班，4更新下班
          if (self.btnDesc == "下班打卡") attndType = 2;
        }
        let signInParmas = {
          type: attndType,
          bz: self.desc,
        }
        // 不定位时传固定参
        signInParmas.position = self.notLocation ? "30.889472,121.927437" : `${self.geoLocation.Longitude || self.geoLocation.longitude
          },${self.geoLocation.Latitude || self.geoLocation.latitude}`
        signInParmas.address = self.notLocation ? "" : self.address
        dsf.http
          .post(`fn/attnd/signIn`, signInParmas)
          .done((res) => {
            if (res.type == "success") {
              // 考勤验证类型：5异常上班打卡，6异常下班打卡
              if (res.data == 5 || res.data == 6) {
                dsf.layer.confirm(
                  {
                    message: res.message,
                    confirmButtonText: "确认",
                  },
                  () => {
                    self.signIn(res.data);
                  }
                );
              } else {
                self.$router.push({
                  path: `/attndSigned/${self.nowTime.getTime()}`,
                });
                self.desc = "";
              }
            } else {
              dsf.layer.toast(res.message, false);
            }
          });
      } else {
        dsf.layer.toast("未获取到位置信息", false);
      }
    },
    getMyGroup() {
      let self = this;
      dsf.http
        .get(`fn/attnd/getMyGroup`)
        .done((res) => {
          if (res.type == "success") {
            self.isRemote = res.data.isRemote == 1; //-1否，0无，1是
            self.isSbGxdk = res.data.isSbGxdk != "-1";
            self.groupName = res.data.groupName;
            let user = dsf.util.loadSessionStore("user");
            if (!user.attndGroupName) {
              user.attndGroupName = res.data.groupName;
              dsf.util.saveToSessionStore("user", user);
            }
          }
        })
        .error((error) => {
          console.log("getMyGroup-error", error);
        })
        .always(() => {
          // dsf.layer.closeLoading(self.loading);
        });
    },
    getMySignInfo() {
      let self = this;
      dsf.http.post(`fn/attnd/getMySignInfo`).done((res) => {
        if (res.type == "success") {
          let ts;
          // signInStatus ,signOutStatus  (-1,0,1)->(缺卡，未打卡，已打卡)
          if (res.data.signInStatus == 1 && res.data.signIn) {
            ts = dsf.date.format(res.data.signIn, "hh:ii");
            self.signInTitle = `上班${ts}`;
            self.signInDesc = `${ts}已打卡`;
            self.btnDesc = "下班打卡";
          } else if (res.data.signInStatus == -1) {
            self.signInDesc = `缺卡`;
            self.btnDesc = "下班打卡";
          }

          if (res.data.signOutStatus == 1 && res.data.signOut) {
            ts = dsf.date.format(res.data.signOut, "hh:ii");
            self.signOutTitle = `下班${ts}`;
            self.signOutDesc = `${ts}已打卡`;
            self.btnDesc = "上班打卡";
          } else if (res.data.signOutStatus == -1) {
            self.signOutDesc = `缺卡`;
            self.btnDesc = "上班打卡";
          }
        }
      });
    },
    updateSignIn(attndType) {
      let self = this;
      dsf.layer.confirm(
        {
          message: "是否更新打卡",
          confirmButtonText: "确认",
        },
        () => {
          self.signIn(attndType);
        }
      );
    },
    getToken() {
      return new Promise((resolve, reject) => {
        if (typeof croods == "undefined") {
          reject("请在皖政通中操作");
        } else {
          croods.load(function () {
            croods.customPlugin({
              action: "UserPlugin.login",
              params: {},
              success: function (res) {
                console.log("UserPlugin.login-res", res);
                resolve(res.token);
              },
              fail: function (msg) {
                console.log("UserPlugin.login-err", msg);
                reject(msg);
              },
            });
          });
        }
      });
    },
    startFace(fvtoken, key) {
      return new Promise((resolve, reject) => {
        if (typeof croods == "undefined") {
          reject("请在皖政通中操作");
        } else {
          croods.load(function () {
            let params = {
              fvtoken: fvtoken, //统一认证返回的令牌
              key: key, //密钥key
              appid: dsf.config.attendance.appId, //应用唯一id
            };
            console.log("FacePlugin.startFace-params", params);
            croods.customPlugin({
              action: "FacePlugin.startFace",
              params: params,
              success: function (res) {
                console.log("FacePlugin.startFace-res", res);
                resolve(res);
              },
              fail: function (msg) {
                console.log("FacePlugin.startFace-fail", msg);
                // reject(msg);
                reject(`人脸识别失败，请稍后重试或联系管理员！`);
              },
            });
          });
        }
      });
    },
    identify(attndType) {
      let self = this;
      self
        .getToken()
        .done((res) => {
          return dsf.http.get(`fn/wztFace/getFaceToken`, { wztToken: res });
        })
        .done((res) => {
          console.log("getFaceToken-res", res);
          if (res.type == "success") {
            return self.startFace(res.data.fvtoken, res.data.key);
          } else {
            // throw `getFaceToken-fail: ${res.message}`;
            throw `人脸识别失败，请稍后重试或联系管理员！`;
          }
        })
        .done((res) => {
          // 参数说明：
          // sid 认证流水号
          // accessToken 认证accessToken，通过该参数查询认证结果
          // facePhoto 活体检测过程中人脸图像 base64，如需要该内容需要服务申请备案
          // faceState: unavailable 人脸认证不可用时返回
          if (res.flag == "false") {
            throw `startFace-fail: 暂不认证`;
          } else if (res.accessToken) {
            return dsf.http.get(`fn/wztFace/accessCheck`, {
              accessToken: res.accessToken,
            });
          } else {
            // throw `startFace-fail: ${res.faceState}`;
            throw `人脸识别失败，请稍后重试或联系管理员！`;
          }
        })
        .done((res) => {
          console.log("accessCheck-res", res);
          if (res.type == "success") {
            if (res.data.flag) {
              console.log("人脸识别认证成功");
              if (self.user.attnd) {
                self.user.attnd.faceAuth = 1;
              } else {
                self.user.attnd = { faceAuth: 1 };
              }
              dsf.util.saveToSessionStore("user", self.user);
              self.signIn(attndType);
            } else {
              // throw `人脸识别认证失败：${res.subject}`;
              throw `人脸识别失败，请稍后重试或联系管理员！`;
            }
          } else {
            // throw `accessCheck-fail: ${res.message}`;
            throw `人脸识别失败，请稍后重试或联系管理员！`;
          }
        })
        .error((err) => {
          console.log("identify-err", err);
          if (!(typeof err == "string" && err.includes("暂不认证")))
            dsf.layer.toast(err.message || err, false);
        });
    },
    reverseAddressTencent(key, res) {
      console.log("Tencent");
      // 腾讯逆地址
      let self = this
      $.ajax({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
        type: 'GET',
        data: {
          key: key,
          location: `${res.latitude},${res.longitude}`,
          output: 'jsonp',
          get_poi: 1,
          poi_options: 'policy=5'
        },
        dataType: "jsonp",
        success: function (es) {
          console.log("v1", es);
          const poisAdd = es.result.pois[0].address + es.result.pois[0].title
          const standard = es.result.formatted_addresses["standard_address"]
          const recommend = es.result.formatted_addresses.recommend // 详细地址
          self.address = recommend || standard || poisAdd
          self.geoLocation = res;
        },
        error: function (e) {
          console.log("v1error", e)
          self.address = "定位失败";
        }
      })
    },
    reverseAddressBaidu(key) {
    },
    reverseAddressGaode(key) {
    },
    reverseAddressDreamWeb(res) {
      // 平台后端逆地址
      let self = this
      dsf.http.get("ctrl/attend/locationInverseCoding", { longitude: res.longitude, latitude: res.latitude }).then(({ data }) => {
        if (data.code) {
          self.geoLocation = res;
          self.address = data.message;
        } else {
          self.address = "定位失败";
        }
      })
    },
    dyswLocationPoint(res) {
      // 东营特殊逻辑
      const self = this
      dsf.http.post("ctrl/attnd/locationPoint", {
        location: `${res.longitude},${res.latitude}`,
        userId: dsf.util.loadSessionStore("user")["user_id"]
      }).then(({ data }) => {
        console.log("dysw", data);
        if (data.code == 200 && data.message) {
          self.geoLocation = res;
          self.address = data.message;
        } else {
          self.reverseAddressTencent(dsf.config.attendance.reverseAddress?.key, res)
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    // 清除定时器
    let self = this;
    if (self.myTimer) {
      clearInterval(self.myTimer);
    }
    next();
  },
  activated() {
    let self = this;
    console.log("signIn.vue-activated", "isFirstLoad ->", self.isFirstLoad);
    if (!self.isFirstLoad) self.init();
    self.isFirstLoad = false;
  },
  deactivated() {
    // 清除定时器
    let self = this;
    if (self.myTimer) {
      clearInterval(self.myTimer);
    }
  },
};
</script>

<style lang="scss" scoped>
.signIn-page {
  border: 1px solid transparent;

  .van-icon {
    vertical-align: middle;
    margin-right: 3px;
  }

  .info {
    // height: 100px;
    display: flex;
    justify-content: flex-start;

    &-avatar {
      width: 1rem;
      height: 1rem;

      &>img {
        border-radius: 50%;
      }
    }

    &-msg {
      width: calc(100vw - 3.8rem);
      margin: 0px 8px;

      .name {
        font-size: var(--font_size_0);
        font-weight: bold;
      }

      .rule {
        color: #4f99e4;
        margin-left: 8px;
      }
    }

    &-btn {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 1rem;
      text-align: center;
      margin: auto;

      img {
        width: 24px;
        height: 24px;
        margin: auto;
      }
    }
  }

  .info,
  .content {
    background-color: #fff;
    margin: 16px;
    padding: 16px;
    border-radius: 12px;
  }

  .content {
    &-box {
      display: flex;
      justify-content: space-between;

      &-state {
        background-color: #f5f5f5;
        padding: 8px 10px;
        border-radius: 8px;
        flex-grow: 1;

        &:first-child {
          margin-right: 16px;
        }

        .state {
          color: #999;

          .van-icon-checked {
            color: #00bd80;
          }
        }

        .state-update {
          margin-left: 6px;
          color: #4f99e4;
        }
      }
    }

    &-sign {
      min-height: 200px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;

      &-container {
        .sign-btn {
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: #fff;
          width: 2.5rem;
          height: 2.5rem;
          background-image: linear-gradient(180deg, #5cbbfd 0%, #3389e0 100%);
          box-shadow: 0px 4px 16px 0px rgba(130, 203, 255, 0.6);
          border-radius: 50%;
          margin: auto;

          .title {
            font-size: 0.35rem;
          }

          .time {
            margin-top: 8px;
          }
        }

        .sign-pos {
          margin-top: 16px;

          .van-loading {
            color: #000;

            .van-loading__text {
              color: inherit;
            }
          }

          button {
            background-color: #fff;
            color: #5cbbfd;
            letter-spacing: 2px;
            font-size: var(--font_size_4);
            margin-top: 8px;
          }
        }
      }
    }

    &-desc {
      /deep/ .van-field__control {
        border: 1px solid #ccc;
      }
    }

    &-tips {
      text-align: center;
      color: #999;
    }
  }
}
</style>
