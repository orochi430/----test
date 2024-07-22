import dsf from "../../../common";
// 【民政部信创项目】—移动端替换班开发
const exportObj = {};

let zbsdJson = { "工作日白班": 1, "工作日晚班": 2, "双休日白班": 3, "双休日晚班": 4, "节假日白班": 5, "节假日晚班": 6 };

exportObj.initHandle = function (formData, formStruct, vueData) {
    // 存放弹框数据
    let enumData = []
    // 替换班员的值班类型
    let rysd = {};
    // debugger
    let zbsd = vueData.$route.query.zbsd
    let zbrq = vueData.$route.query.zbrq
    // 值班时段
    if (zbsd) {
        vueData.$set(formData.main, '220111164849ge3jcIZw1C2z4FmIyrP', {
            value: zbsdJson[zbsd], text: zbsd
        })
    }
    // 值班日期
    if (zbrq) {
        vueData.$set(formData.main, '220111164039yu8dCZ7V6r37AhUUaMb', {
            value: zbrq
        })
    }
    vueData.$bus.on('selectDateTime', (res) => {
        console.log(res);
        // let date = res.value.replace(/-/g, "/")
        dsf.http.post("/fn/schedule/getDutyUserByDate", { date: res.value }).then((result) => {
            let data = result.data.data;
            if (result.data.code == "200") {
                if (data && data.length > 0) {
                    let zbsd = data[0].zbsd;
                    // let zbsdJson2 = zbsdJson[zbsd];
                    // 初始化
                    vueData.$set(formData.main, '22011116550939E4PUsPTHlmf7Nxba3', {
                        value: data[0].zbr, text: data[0].zbrText
                    })
                    vueData.$set(formData.main, '220111165857sPh7zMVsoLkrUmnON1a', {
                        value: zbsdJson[zbsd], text: zbsd
                    })
                    // 弹框选人数据
                    enumData = [];
                    rysd = {};
                    data.forEach(item => {
                        enumData.push({
                            remark: "",
                            id: item.zbr,
                            text: item.zbrText,
                            varClass: "layui-col-md3",
                            value: item.zbr
                        })
                        // 给替换班员-值班类型对象赋值
                        rysd[item.zbr] = item.zbsd
                    });
                }
            }
        })
    })
    // 监听替换班员控件
    vueData.$bus.on("showCheckBox", function (vueObj) {
        // debugger
        if (vueObj.metaData.metaId == "22011116550939E4PUsPTHlmf7Nxba3") {
            vueObj.controlData.columnsValue.columns = enumData;
            vueObj.currentColumns = enumData;
        }
    })
    vueData.$bus.on("checkVal", (obj) => {
        console.log(obj);
        // debugger
        // 如果是选择的替换班员
        if (obj.metaData.metaId == "22011116550939E4PUsPTHlmf7Nxba3") {
            let value = obj.value; // 用户id
            let zbsd = rysd[value]; // 值班时段
            // 值班类型
            vueData.$set(formData.main, '220111165857sPh7zMVsoLkrUmnON1a', {
                value: zbsdJson[zbsd], text: zbsd
            })
        }

    })


}
export default exportObj;