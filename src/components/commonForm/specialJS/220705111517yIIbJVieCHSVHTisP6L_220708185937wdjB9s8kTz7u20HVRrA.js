/*
复产复工 营商诉求 属性联动不支持联动附件，需要开发支持处理
*/
const exportObj = {};

exportObj.initHandle = function (formData, formStruct, vueData) {

    //获取到附件    
    let list = vueData.allFile;
    //初始化附件全部都不显示
    let init = function (list) {
        for (let item of list) {
            item.canShow = "0";
        }
    }

    //所属领域选择的内容的遍历然后进行显示操作
    let change = function (arr) {
        for (let item of arr) {
            for (let ls of list) {
                if (item == ls.showOrder) {
                    ls.canShow = '1'
                }
            }
        }
    }

    //控制评价不可见
    let find = function (id) {
        for (let item of formStruct.controls) {
            if (item.metaId == id) {
                item['show'] = 0;
            }
        }
    }

    //获取到用户的信息是什么角色
    if (dsf.util.loadSessionStore('user').privileges[0].name == "营商信息监控") {
        find('GIWAW4T4FVkmTuoX')
    } else if (dsf.util.loadSessionStore('user').privileges[0].name == "营商信息填报") {
        find('zYIGq6ottr3G50MB');
    }


    //进行附件初始化
    init(list)


    //获取到领域选择的内容并进行显示操作
    if (formStruct.parameters.nodeId != 0) {
        change(formData.main["C-DOING-BUSINESS-APPEAL-0001"].value.split(','))
    }

    vueData.$bus.on("checkVal", function (busObj) {
        if (busObj.metaData.metaId == "C-DOING-BUSINESS-APPEAL-0001") {
            //进行遍历把之前的显示的设置为空
            init(list);
            if (busObj.value.length) {//如果选择为空不让进入
                //获取到选择的附件
                change(busObj.value.split(","))
            }
        }

    });


}
export default exportObj;