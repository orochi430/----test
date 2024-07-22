const exportObj = {};
let enumData = []

function getAddress(params) {
  enumData = []
  return dsf.http.post('/ctrl/propertyJoint/getCodeItems',{
    codeFid: params,
    queryModuleId: '2206111015248zPjoAGO8jdei91mR3B',
    triggerCondition: '2206111112144ujEhZ2mPEg5uDmhjel'
  }).then(res => {
    console.log(res.data)
    if(res.data.code == 200) {
      enumData = res.data.data
    }
  })
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  let leverCtr, radioRnumData,  cateDescCtr,  ctr_6_2,  ctr_6_3,  ctr_2_1,  ctr_2_2,  
      ctr_2_3,  ctr_2_1_1,  ctr_2_1_2,  ctr_2_1_3,  ctr_2_1_4,  ctr_2_2_1,  ctr_2_2_2,  ctr_2_2_3, 
      ctr_2_2_4,  ctr_2_2_5,  ctr_2_2_6,  ctr_2_2_7,  ctr_2_3_1,  ctr_2_3_2,  ctr_2_3_3,  ctr_2_3_4,  
      ctr_2_3_5,  ctr_2_3_6,  ctr_2_3_7,  ctr_4_1,  ctr_4_2,  ctr_4_2_1,  ctr_4_2_2,  ctr_4_2_3,  ctr_4_2_4,  
      ctr_4_3,  ctr_4_3_1,  ctr_4_3_2,  ctr_4_3_3
  let showCtr = null, showCtr2 = null
  formStruct.controls.forEach(ctr => {
    switch (ctr.metaId) {
      case '220611105022hjmWcJLf10GRT6LV4Wq':
        leverCtr = ctr
        radioRnumData = leverCtr.enumData.slice(0)
        break;
      case '220611185829tdh1lpMMVj9hOFHVSHg':
        if(!formData.main['220611185829tdh1lpMMVj9hOFHVSHg'].value) ctr.propertyShow = 0
        cateDescCtr = ctr
        break;
      case '220611152633LylEDqyjzNMZyoWHnVW':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 6 && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_6_2 = ctr
        break;
      case '220611152834HOIzkHyJFcqT91Mr2ov':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 6 && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_6_3 = ctr
        break;
      case '2206111434151lH9Rs7DjDzq6wt6dvs':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 1){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_1 = ctr
        break;
      case '220611144152owciUX5mKJH6Xz9qyMW':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_2 = ctr
        break;
      case '220611144611QXdmeuuqMrMynWOpsu0':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_3 = ctr
        break;
      case '220611144924bUO4SAGoMsdz7fupN0h':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 1 
          && formData.main['2206111434151lH9Rs7DjDzq6wt6dvs'].value == 1){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_1_1 = ctr
        break;
      case '220611145233mYVzHx74h4zX18dCznu':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 1 
          && formData.main['2206111434151lH9Rs7DjDzq6wt6dvs'].value == 2){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_1_2 = ctr
        break;
      case '220611145355FYXde7pVGBvyNc7MyJX':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 1 
          && formData.main['2206111434151lH9Rs7DjDzq6wt6dvs'].value == 3){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_1_3 = ctr
        break;
      case '2206111455053Lr6cg1OEpSNFEGZaH7':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 1 
          && formData.main['2206111434151lH9Rs7DjDzq6wt6dvs'].value == 4){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_1_4 = ctr
        break;
      case '2206111456547aUks1yjVLbRUD1UICL':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611144152owciUX5mKJH6Xz9qyMW'].value == 1){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_2_1 = ctr
        break;
      case '220611145821RY9gcjBVmI1kNl6jWda':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611144152owciUX5mKJH6Xz9qyMW'].value == 2){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_2_2 = ctr
        break;
      case '220611145942phDpS7fNOHo2lKIvK9L':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611144152owciUX5mKJH6Xz9qyMW'].value == 3){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_2_3 = ctr
        break;
      case '220611150324uw8H03Nk5fYd1EUsMiw':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611144152owciUX5mKJH6Xz9qyMW'].value == 4){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_2_4 = ctr
        break;
      case '2206111504314OcFgkePltXOWrsHSgn':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611144152owciUX5mKJH6Xz9qyMW'].value == 5){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_2_5 = ctr
        break;
      case '2206111506344TUqAmk4xHrIz19Y2k9':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611144152owciUX5mKJH6Xz9qyMW'].value == 6){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_2_6 = ctr
        break;
      case '220611151130HwGo2Bqn0ggOSVBuFIh':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611144152owciUX5mKJH6Xz9qyMW'].value == 7){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_2_7 = ctr
        break;
      case '220611165314NimpLSCvzF9w5jeXRND':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611144611QXdmeuuqMrMynWOpsu0'].value == 1){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_3_1 = ctr
        break;
      case '220611165440SJDRCn1n6Fon7lYD7dz':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611144611QXdmeuuqMrMynWOpsu0'].value == 2){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_3_2 = ctr
        break;
      case '220611165539SBJf0o3TvTqYMNs6bC7':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611144611QXdmeuuqMrMynWOpsu0'].value == 3){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_3_3 = ctr
        break;
      case '220611165632HuaxRT6QbOQnIsgQyAH':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
        && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
        && formData.main['220611144611QXdmeuuqMrMynWOpsu0'].value == 4){
        ctr.propertyShow = 1
      } else {
        ctr.propertyShow = 0
      }
        ctr_2_3_4 = ctr
        break;
      case '220611165739243o5e23L2zqRhVbRq0':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611144611QXdmeuuqMrMynWOpsu0'].value == 5){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_3_5 = ctr
        break;
      case '220611165849RlyqONvuUiireBdIusF':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611144611QXdmeuuqMrMynWOpsu0'].value == 6){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_3_6 = ctr
        break;
      case '220611165943clrGlkXwBJUmqPlUPTJ':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611144611QXdmeuuqMrMynWOpsu0'].value == 7){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_2_3_7 = ctr
        break;
      case '220611153328tsVPKxjC7Nnbh6DcFGa':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 1){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_1 = ctr
        break;
      case '220611153824GQURtC9snG5q3K7yaHw':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_2 = ctr
        break;
      case '2206111542053SkJR9FKG6F3NIs0mTc':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611153328tsVPKxjC7Nnbh6DcFGa'].value == 1){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_2_1 = ctr
        break;
      case '220611160259LjPEs2Uf59LeYNBY5ia':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611153328tsVPKxjC7Nnbh6DcFGa'].value == 2){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_2_2 = ctr
        break;
      case '220611160422OamrAyeLd79T2nQQ1KP':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611153328tsVPKxjC7Nnbh6DcFGa'].value == 3){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_2_3 = ctr
        break;
      case '220611160528r3K2YMpTjyhpw7mYhKb':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 2 
          && formData.main['220611153328tsVPKxjC7Nnbh6DcFGa'].value == 4){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_2_4 = ctr
        break;
      case '220611153935pPfMnCO8VamDWmDHeOf':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_3 = ctr
        break;
      case '2206111607214kJLEDrBRdLuj84ovhS':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611153935pPfMnCO8VamDWmDHeOf'].value == 1){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_3_1 = ctr
        break;
      case '220611160847ihUrwBMyzFVs1vcaX2G':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611153935pPfMnCO8VamDWmDHeOf'].value == 2){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_3_2 = ctr
        break;
      case '220611161009RE9gp9L11F02PCw5yaH':
        if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4 
          && formData.main['220611105022hjmWcJLf10GRT6LV4Wq'].value == 3 
          && formData.main['220611153935pPfMnCO8VamDWmDHeOf'].value == 3){
          ctr.propertyShow = 1
        } else {
          ctr.propertyShow = 0
        }
        ctr_4_3_3 = ctr
        break;
      default:
        break;
    }
  });
  // 存入企业用户id
  if(!vueData.$route.params.pk) {
    vueData.$set(formData.main, '220611172205xsTK3z1uLWem4PbwQo2', {value: vueData.$route.query.enterpriseUserId})
  }
  // 申报说明
  vueData.$set(formStruct.controls.find(ctr => ctr.metaId == '220611182621faDGuS01WDQLHw27coR'), 'autosizeStyle', { maxHeight: '100px', minHeight: '50px', overflow: 'auto', padding: '5px !important', border: '1px solid #CFCFCF', borderRadius: '2px' })
  formData.main['220611182621faDGuS01WDQLHw27coR'].value = `申请河南省交通运输""白名单企业""的应满足以下遴选标准，且生产经营状态正常，符合疫情防控要求。
  1.高速公路运营企业及服务企业
  高速公路运营企业及主要数据服务企业纳入省级“白名单”企业。
  2.道路运输企业
  (1)省级“白名单”遴选标准
  ①道路货运企业为 AAAA 级及以上物流企业，或上年度主营道路货物运输营业收入5000万元(含)以上，或网络货运企业上年度运费1000万元以上，或服务“四条丝路”的主要道路货运企业。
  ②道路客运企业市级许可；营运客车80辆以上，以经营省际、市际线路为主的综合性运输企业；郑州市包车(旅游)客车80辆以上，其他省辖市包车(旅游)客车数量辖区内最多，且不低于20辆的包车(旅游)客运企业。
  ③机动车维修企业等级为一类，服务于公交、客货运等重点企业，按要求向汽车维修电子健康档案系统上传车辆维修数据。
  ④机动车驾驶员培训机构等级为二级及以上，上年度培训5000人以上，按要求向驾培监管平台上传学时信息。
  (2)市级“白名单”遴选标准
  ①道路货运企业 AA 级及以上物流企业，或上年度主营道路货物运输营业收入2000万元(含)以上或自有货运车辆50辆以上；或服务国家物流枢纽运营的主要货运企业(不超过10家)，或服务区域物流枢纽运营的主要货运企业(不超过5家)；或网络货运企业上年度运费100万元以上。
  ②道路客运企业市级许可；车辆数50辆以上。
  ③机动车维修企业等级为二类及以上，按要求向汽车维修电子健康档案系统上传车辆维修数据。
  ④机动车驾驶员培训机构等级为二级及以上，上年度培训2000人以上，按要求向驾培监管平台上传学时信息
  ⑤机动车检验检测机构在市级注册登记，认定、联网等符合标准。
  ⑥道路运输第三方监控企业在市级备案，且监控车辆数50辆以上或服务人员5人以上。
  ⑦道路运输动态监控卫星定位服务商在省级备案，且服务车辆数500辆以上或服务企业数10家以上。
  (3)县级“白名单”遴选标准
  ①道路货运企业上年度主营道路货物运输营业收入1000万元(含)以上或自有货运车辆7辆以上。
  ②道路客运企业县级许可；车辆数50辆以上。
  ③机动车维修企业等级为三类及以上，按要求向汽车维修电子健康档案系统上传车辆维修数据。
  ④机动车驾驶员培训机构等级为三级及以上，上年度培训1000人以上，按要求向驾培监管平台上传学时信息。
  ⑤机动车检验检测机构在县级注册登记，认定、联网等符合标准。
  ⑥道路运输第三方监控企业在市级备案，且监控车辆数30辆以上或服务人员3人以上。
  ⑦道路运输动态监控卫星定位服务商由省级备案，且服务车辆数50辆以上或服务企业数1家以上。
  3.物流枢纽运营企业
  国家物流枢纽、区域物流枢纽运营企业列入省级 “白名单”。
  4.城市交通企业
  (1)省级“白名单”遴选标准
  城市公交企业己纳入企业名录；在省辖市运营，且自有城市公交车辆数在300辆以上；年运营里程达到 500 万公里及以上。
  (2)市级“白名单”遴选标准
  ①城市公交企业已纳入企业名录；自有城市公交车辆数在100辆以上；年运营里程达到 300 万公里及以上。
  ②城市轨道交通企业正常开通运营线路1条（含）以上;上年日均客运量 10万以上。
  ③出租汽车企业 AAA 级及以上；自有出租汽车 300 辆（含）以上。
  ④小微型客车租赁企业上年度企业营业收入 50%以上来自跨市经营；自有租赁车辆 2000 辆（含）以上。
  (3) 县级“白名单”遴选标准
  ①城市公交企业己纳入企业名录；白有城市公交车辆数在 50辆以上；年运营里程达到 100万公里及以上。
  ②出租汽车企业 A 级及以上；自有出租汽车 100 辆(含）以上。
  ③小微型客车租赁企业上年度企业营业收入 50%以上来自跨市经营；自有租赁车辆50辆（含）以上。
  5.铁路运输企业
  在我省运营的所有铁路运输企业及主要关联企业纳入省级“白名单”企业。
  6.水路运输企业
  (1)市级“白名单”遴选标准
  省际水路货运企业自有运力超过 5000 吨;或市级审批的港口经营人及其主要关联企业。
  (2)县级“白名单”遴选标准
  省内水路客运企业自有运力超过100客位；或县级审批的港口经营人及其主要关联企业。
  7.航空运输企业机场运普企业及主要关联企业纳入省级“白名单”企业。
  8.多式联远企业
  我省国家级、省级多式联运示范工程车头企业纳入省级“白名单”企业。
  9.邮政快递企业
  邮政快递企业均纳入省级“白名单”，其所属品牌市、县企业纳入“白名单”。`
  function hideShowCtr(showCtr) {
    if(showCtr) {
      showCtr.propertyShow = 0
      vueData.$set(vueData.formData.main, showCtr.metaId, {value: '',text: ''})
    }
  }
  vueData.$bus.on("checkVal", async function (busObj) {
    console.log(busObj)
    if (busObj.metaData.metaId == "2206111110457h7fqDzMJlYjSpK9GDp") { // 市县联动
      vueData.$set(vueData.formData.main, "2206111112144ujEhZ2mPEg5uDmhjel", {
        value: "",
        text: ""
      })
      let dataValueId = busObj.metaData.enumData.find(item => item.value == busObj.value).id
      let county = formStruct.controls.find(ctr => ctr.metaId == '2206111112144ujEhZ2mPEg5uDmhjel')
      await getAddress(dataValueId)
      county.enumData = enumData
    } else if (busObj.metaData.metaId == "2206111214403ReuhgYa9PMB0IjYKXL") { // 市县联动
      vueData.$set(vueData.formData.main, "220611122303fSAXDtNAnFRYwc3ZDl3", {
        value: "",
        text: ""
      })
      let dataValueId = busObj.metaData.enumData.find(item => item.value == busObj.value).id
      let county = formStruct.controls.find(ctr => ctr.metaId == '220611122303fSAXDtNAnFRYwc3ZDl3')
      await getAddress(dataValueId)
      county.enumData = enumData
    } else if (busObj.metaData.metaId == "220611141102PXQWsfUGJWW3Pw6Bab8") { // 交通运输企业分类 控制 省市区和说明
      hideShowCtr(showCtr)
      hideShowCtr(showCtr2)
      if (busObj.value == 1) {
        leverCtr.enumData = radioRnumData.slice(0,1)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 1, text: '省'})
        cateDescCtr.propertyShow = 1
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '高速公路运营企业及主要数据服务企业纳入省级“白名单”企业。'})
      } else if (busObj.value == 3) {
        leverCtr.enumData = radioRnumData.slice(0,1)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 1, text: '省'})
        cateDescCtr.propertyShow = 1
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '国家物流枢纽、区域物流枢纽运营企业列入省级“白名单”。'})
      } else if (busObj.value == 5) {
        leverCtr.enumData = radioRnumData.slice(0,1)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 1, text: '省'})
        cateDescCtr.propertyShow = 1
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '在我省运营的所有铁路运输企业及主要关联企业纳入省级“白名单”企业。'})
      } else if (busObj.value == 7) {
        leverCtr.enumData = radioRnumData.slice(0,1)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 1, text: '省'})
        cateDescCtr.propertyShow = 1
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '机场运营企业及主要关联企业纳入省级“白名单”企业。'})
      } else if (busObj.value == 8) {
        leverCtr.enumData = radioRnumData.slice(0,1)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 1, text: '省'})
        cateDescCtr.propertyShow = 1
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '我省国家级、省级多式联运示范工程牵头企业纳入省级“白名单”企业。'})
      } else if (busObj.value == 9) {
        leverCtr.enumData = radioRnumData.slice(0)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 1, text: '省'})
        cateDescCtr.propertyShow = 1
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '邮政快递企业所属品牌市企业纳入省级“白名单”'})
      } else if (busObj.value == 6) {
        leverCtr.enumData = radioRnumData.slice(1,3)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 2, text: '市'})
        cateDescCtr.propertyShow = 0
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: ''})
        ctr_6_2.propertyShow = 1
        showCtr = ctr_6_2
      } else if (busObj.value == 2) {
        leverCtr.enumData = radioRnumData.slice(0)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 1, text: '省'})
        cateDescCtr.propertyShow = 0
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: ''})
        ctr_2_1.propertyShow = 1
        showCtr = ctr_2_1
      } else if (busObj.value == 4) {
        leverCtr.enumData = radioRnumData.slice(0)
        vueData.$set(vueData.formData.main, "220611105022hjmWcJLf10GRT6LV4Wq", {value: 1, text: '省'})
        cateDescCtr.propertyShow = 0
        vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: ''})
        ctr_4_1.propertyShow = 1
        showCtr = ctr_4_1
      }
    } else if (busObj.metaData.metaId == "2206111434151lH9Rs7DjDzq6wt6dvs") { // 道路运输省
      hideShowCtr(showCtr2)
      if (busObj.value == 1) {
        ctr_2_1_1.propertyShow = 1
        showCtr2 = ctr_2_1_1
      } else if (busObj.value == 2) {
        ctr_2_1_2.propertyShow = 1
        showCtr2 = ctr_2_1_2
      } else if (busObj.value == 3) {
        ctr_2_1_3.propertyShow = 1
        showCtr2 = ctr_2_1_3
      } else if (busObj.value == 4) {
        ctr_2_1_4.propertyShow = 1
        showCtr2 = ctr_2_1_4
      }
    } else if (busObj.metaData.metaId == "220611144152owciUX5mKJH6Xz9qyMW") { // 道路运输市
      hideShowCtr(showCtr2)
      if (busObj.value == 1) {
        ctr_2_2_1.propertyShow = 1
        showCtr2 = ctr_2_2_1
      } else if (busObj.value == 2) {
        ctr_2_2_2.propertyShow = 1
        showCtr2 = ctr_2_2_2
      } else if (busObj.value == 3) {
        ctr_2_2_3.propertyShow = 1
        showCtr2 = ctr_2_2_3
      } else if (busObj.value == 4) {
        ctr_2_2_4.propertyShow = 1
        showCtr2 = ctr_2_2_4
      } else if (busObj.value == 5) {
        ctr_2_2_5.propertyShow = 1
        showCtr2 = ctr_2_2_5
      } else if (busObj.value == 6) {
        ctr_2_2_6.propertyShow = 1
        showCtr2 = ctr_2_2_6
      } else if (busObj.value == 7) {
        ctr_2_2_7.propertyShow = 1
        showCtr2 = ctr_2_2_7
      }
    } else if (busObj.metaData.metaId == "220611144611QXdmeuuqMrMynWOpsu0") { // 道路运输县
      hideShowCtr(showCtr2)
      if (busObj.value == 1) {
        ctr_2_3_1.propertyShow = 1
        showCtr2 = ctr_2_3_1
      } else if (busObj.value == 2) {
        ctr_2_3_2.propertyShow = 1
        showCtr2 = ctr_2_3_2
      } else if (busObj.value == 3) {
        ctr_2_3_3.propertyShow = 1
        showCtr2 = ctr_2_3_3
      } else if (busObj.value == 4) {
        ctr_2_3_4.propertyShow = 1
        showCtr2 = ctr_2_3_4
      } else if (busObj.value == 5) {
        ctr_2_3_5.propertyShow = 1
        showCtr2 = ctr_2_3_5
      } else if (busObj.value == 6) {
        ctr_2_3_6.propertyShow = 1
        showCtr2 = ctr_2_3_6
      } else if (busObj.value == 7) {
        ctr_2_3_7.propertyShow = 1
        showCtr2 = ctr_2_3_7
      }
    } else if (busObj.metaData.metaId == "220611153824GQURtC9snG5q3K7yaHw") { // 城市运输市
      hideShowCtr(showCtr2)
      if (busObj.value == 1) {
        ctr_4_2_1.propertyShow = 1
        showCtr2 = ctr_4_2_1
      } else if (busObj.value == 2) {
        ctr_4_2_2.propertyShow = 1
        showCtr2 = ctr_4_2_2
      } else if (busObj.value == 3) {
        ctr_4_2_3.propertyShow = 1
        showCtr2 = ctr_4_2_3
      } else if (busObj.value == 4) {
        ctr_4_2_4.propertyShow = 1
        showCtr2 = ctr_4_2_4
      }
    } else if (busObj.metaData.metaId == "220611153935pPfMnCO8VamDWmDHeOf") { // 城市运输县
      hideShowCtr(showCtr2)
      if (busObj.value == 1) {
        ctr_4_3_1.propertyShow = 1
        showCtr2 = ctr_4_3_1
      } else if (busObj.value == 2) {
        ctr_4_3_2.propertyShow = 1
        showCtr2 = ctr_4_3_2
      } else if (busObj.value == 3) {
        ctr_4_3_3.propertyShow = 1
        showCtr2 = ctr_4_3_3
      } else if (busObj.value == 4) {
        ctr_4_3_4.propertyShow = 1
        showCtr2 = ctr_4_3_4
      }
    }
  })
  vueData.$bus.on("inputRadio", function(busObj){ 
    //自定义类型
    if(busObj.metaData.metaId==="220611105022hjmWcJLf10GRT6LV4Wq"){ // 层级
      if(formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 9) {
        hideShowCtr(showCtr)
        hideShowCtr(showCtr2)
        if(busObj.value == 1) {
          vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '邮政快递企业所属品牌市企业纳入省级“白名单”'})
        } else if(busObj.value == 2) {
          vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '邮政快递企业所属品牌市企业纳入市级“白名单”'})
        } else if(busObj.value == 3) {
          vueData.$set(vueData.formData.main, "220611185829tdh1lpMMVj9hOFHVSHg", {value: '邮政快递企业所属品牌市企业纳入县级“白名单”'})
        }
      } else if (formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 6) {
        hideShowCtr(showCtr)
        hideShowCtr(showCtr2)
        if(busObj.value == 2) {
          ctr_6_2.propertyShow = 1
          showCtr = ctr_6_2
        } else if(busObj.value == 3) {
          ctr_6_3.propertyShow = 1
          showCtr = ctr_6_3
        }
      } else if (formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 4) {
        hideShowCtr(showCtr)
        hideShowCtr(showCtr2)
        if(busObj.value == 1) {
          ctr_4_1.propertyShow = 1
          showCtr = ctr_4_1
        } else if(busObj.value == 2) {
          ctr_4_2.propertyShow = 1
          showCtr = ctr_4_2
        } else if(busObj.value == 3) {
          ctr_4_3.propertyShow = 1
          showCtr = ctr_4_3
        }
      } else if (formData.main['220611141102PXQWsfUGJWW3Pw6Bab8'].value == 2) {
        hideShowCtr(showCtr)
        hideShowCtr(showCtr2)
        if(busObj.value == 1) {
          ctr_2_1.propertyShow = 1
          showCtr = ctr_2_1
        } else if(busObj.value == 2) {
          ctr_2_2.propertyShow = 1
          showCtr = ctr_2_2
        } else if(busObj.value == 3) {
          ctr_2_3.propertyShow = 1
          showCtr = ctr_2_3
        }
      }
    }
});

}
export default exportObj;