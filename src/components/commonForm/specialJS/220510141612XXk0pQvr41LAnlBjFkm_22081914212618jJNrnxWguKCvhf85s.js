import dsf from "../../../common";

// 【民政部信创项目】值班值守系统日志填报移动端开发 
const exportObj = {};
let exchange = {}
exportObj.initHandle = function (formData, formStruct, vueData) {
    // 值班工作日志默认值
    let val = {}
    formStruct.controls.forEach(item=>{
        if(item.metaId=="B0060"){
            val = item.defaultValue
        }
    })
    vueData.$set(formData.main,'B0060',{
        value: val.value 
    })


    // 值班员签字（交接班） 211206164956g445MRQe0i8EwKhSeLt，默认先隐藏
    formStruct.controls = formStruct.controls.filter((item) => {
        if (item.metaId == '211206164956g445MRQe0i8EwKhSeLt') {
            exchange = item
            return false
        } else {
            return true
        }
    })

    let nodeId = formStruct.parameters.nodeId;
    if (nodeId == '0' || nodeId == '-2') {
        let url = "ctrl/nwYjsj/getNowZbry";
        dsf.http.post(url, { "type": 1 }).then((result) => {
            if ("success" == result.data.type) {
                let data = result.data.data;
                let flag = data.flag;
                if (flag && nodeId == '0') {
                    // 带班领导
                    // DSF.setElementValueByKey("C-LEAVE-0025", { value: data.dbldText });
                    vueData.$set(formData.main,'C-LEAVE-0025',{
                        value: data.dbldText 
                    })
                    // 带班领导ID
                    // DSF.setElementValueByKey("2201181514103598mvWlcPzyJLnTwwi", { value: data.dbldId });
                    vueData.$set(formData.main,'2201181514103598mvWlcPzyJLnTwwi',{
                        value: data.dbldId 
                    })
                    // 值班人
                    // DSF.setElementValueByKey("B0009", { value: data.zbrText });
                    vueData.$set(formData.main,'B0009',{
                        value: data.zbrText 
                    })
                    // 交班人ID
                    // DSF.setElementValueByKey("220118151517T8rSQUrjkKFvweDQuz9", { value: data.jbr });
                    vueData.$set(formData.main,'220118151517T8rSQUrjkKFvweDQuz9',{
                        value: data.jbr 
                    })
                    // DSF.setElementValueByKey("220118153430L0FpvwILi0ur7yTqKIH", { value: data.jbrText });
                    vueData.$set(formData.main,'220118153430L0FpvwILi0ur7yTqKIH',{
                        value: data.jbrText 
                    })
                }
            }
        });
    }

    // 判断是否是节假日
    isHoliday();

    /**
     * 是否节假日
     */
    function isHoliday() {
        let url = "ctrl/inspection/isHoliday";
        let date = formData.main['B0013'].value;
        dsf.http.post(url, { "date": date }).then((result) => {
            if ("success" == result.data.type) {
                let res = result.data.data.result;
                // 是节假日
                if (res) {
                    // 值班员签字（交接班） 211206164956g445MRQe0i8EwKhSeLt， 只要节假日就显示
                    formStruct.controls.push(exchange)
                } else {

                }
            }
        });
    }
}
export default exportObj