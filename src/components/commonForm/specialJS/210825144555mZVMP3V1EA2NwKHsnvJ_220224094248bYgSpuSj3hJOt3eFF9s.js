import dsf from "../../../common";
//杭州校历征集汇总表单
const exportObj = {};
exportObj.handle = function (formData, formStruct) {

}

function formReady(formData, formStruct, vueData) {
  var id = vueData.$route.query.id;
  var bt = vueData.$route.query.bt;
  var startTime = vueData.$route.query.startTime;
  var endTime = vueData.$route.query.endTime;
  var summaryFlag = vueData.$route.query.summaryFlag || "";

  if (summaryFlag == "") {
    summaryFlag = formData.main["210826105254hfcZdPFcaWxfR2NOKMp"].value

    if (summaryFlag != "1") {
      //$("button[op='xform.send']").hide();
    }
  }

  var newFileFlag = formStruct.parameters.nodeId;

  if (newFileFlag == "0") {
    if (summaryFlag == "1") {
      dsf.http.post('fn/calendar/summary', {
        pk: id
      }).then((resultdata) => {
        let result = resultdata.data
        if (result.type == "success") {
          let data = result.data;

          vueData.$set(formData.main, "B0001", {
            value: data.bt
          })
          vueData.$set(formData.main, "2108251459387vNUE0iq4Tym0SjJWwc", {
            value: data.startTime
          })
          vueData.$set(formData.main, "210825150023tKbxRd5CQGv6ZhiEbK7", {
            value: data.endTime
          })
          vueData.$set(formData.main, "210825144714qgQ0FDr3kSP7ODMPPSj", {
            value: id
          })
          vueData.$set(formData.main, "210826105254hfcZdPFcaWxfR2NOKMp", {
            value: "1"
          })

          var subformData = [];
          var ab = data.startTime.split("-");
          var ae = data.endTime.split("-");
          var db = new Date();
          db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
          var de = new Date();
          de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
          var unixDb = db.getTime();
          var unixDe = de.getTime();
          for (var k = unixDb; k <= unixDe;) {
            let format = dsf.date.format(new Date(parseInt(k)), "yyyy-mm-dd");
            var morningF = format + "-1";
            var afterF = format + "-2";
            subformData.push({
              "220113100349CCIupBzLCyUrL7ThVth": { //时间日期
                "value": format,
              },
              "220119170906opp0e5Ay5guLf75MxbL": { //是否责任人
                "value": getWeekDate(new Date(parseInt(k)))
              },
              "220119171822oi03ifmcy6CJY4voNyw": {
                "value": data[morningF]
              },
              "220119171858nYMXQCHR4Ldg9TqkLsv": {
                "value": data[afterF]
              }
            });
            k = k + 24 * 60 * 60 * 1000;
          }

          vueData.$nextTick(async () => {
            vueData.$refs.formTab[0].$refs['220119163446PDNeICqWvRRV5HwYAJE'][0].$refs.subform.readonly = true
            for (let index = 0; index < subformData.length; index++) {
              const data = subformData[index];
              await vueData.$refs.formTab[0].$refs['220119163446PDNeICqWvRRV5HwYAJE'][0].$refs.subform.addCard(false)
              vueData.formData.multinfos['220119163446PDNeICqWvRRV5HwYAJE'].rows[index]['220113100349CCIupBzLCyUrL7ThVth'].value = data["220113100349CCIupBzLCyUrL7ThVth"].value
              vueData.formData.multinfos['220119163446PDNeICqWvRRV5HwYAJE'].rows[index]['220119170906opp0e5Ay5guLf75MxbL'].value = data["220119170906opp0e5Ay5guLf75MxbL"].value
              vueData.formData.multinfos['220119163446PDNeICqWvRRV5HwYAJE'].rows[index]['220119171822oi03ifmcy6CJY4voNyw'].value = data["220119171822oi03ifmcy6CJY4voNyw"].value
              vueData.formData.multinfos['220119163446PDNeICqWvRRV5HwYAJE'].rows[index]['220119171858nYMXQCHR4Ldg9TqkLsv'].value = data["220119171858nYMXQCHR4Ldg9TqkLsv"].value
            }
          })

        }
      }).catch(err => {});

    } else {
      let btns = formStruct.buttons.mainButtons.filter(item => item.action != "send")
      vueData.$set(formStruct.buttons, "mainButtons", btns)
      
      vueData.$set(formData.main, "B0001", {
        value: bt
      })
      vueData.$set(formData.main, "2108251459387vNUE0iq4Tym0SjJWwc", {
        value: startTime
      })
      vueData.$set(formData.main, "210825150023tKbxRd5CQGv6ZhiEbK7", {
        value: endTime
      })
      vueData.$set(formData.main, "210825144714qgQ0FDr3kSP7ODMPPSj", {
        value: id
      })

      var subformData = [];
      var ab = startTime.split("-");
      var ae = endTime.split("-");
      var db = new Date();
      db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = new Date();
      de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime();
      var unixDe = de.getTime();
      for (var k = unixDb; k <= unixDe;) {
        let format = dsf.date.format(new Date(parseInt(k)), "yyyy-mm-dd");
        subformData.push({
          "220113100349CCIupBzLCyUrL7ThVth": { //时间日期
            "value": format,
          },
          "220119170906opp0e5Ay5guLf75MxbL": { //是否责任人
            "value": getWeekDate(new Date(parseInt(k)))
          }
        });
        k = k + 24 * 60 * 60 * 1000;
      }
      vueData.$nextTick(async () => {
        vueData.$refs.formTab[0].$refs['220119163446PDNeICqWvRRV5HwYAJE'][0].$refs.subform.readonly = true
        for (let index = 0; index < subformData.length; index++) {
          const data = subformData[index];
          await vueData.$refs.formTab[0].$refs['220119163446PDNeICqWvRRV5HwYAJE'][0].$refs.subform.addCard(false)
          vueData.formData.multinfos['220119163446PDNeICqWvRRV5HwYAJE'].rows[index]['220113100349CCIupBzLCyUrL7ThVth'].value = data["220113100349CCIupBzLCyUrL7ThVth"].value
          vueData.formData.multinfos['220119163446PDNeICqWvRRV5HwYAJE'].rows[index]['220119170906opp0e5Ay5guLf75MxbL'].value = data["220119170906opp0e5Ay5guLf75MxbL"].value
        }
      })

    }
  }

}

function getWeekDate(date) {
  var day = date.getDay();
  var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  var week = weeks[day];
  return week;
}
exportObj.initHandle = function (formData, formStruct, vueData) {
  formReady(formData, formStruct, vueData)
}
export default exportObj;
