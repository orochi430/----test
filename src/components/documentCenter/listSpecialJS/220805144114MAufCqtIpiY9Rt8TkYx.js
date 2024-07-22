// 【平台】我的消息
import dsf from "../../../common";
import { Dialog } from 'vant';

const exportObj = {};
exportObj.initHandle = function (vueData) {
    vueData.readStatusKey = 'HWXT_HYXX_USER.C-HWXT-HYXX-USER-0002.value'
    vueData.haveReadVal = 1
}
exportObj.link = function(listid, moduleId, pk, vueData, itemValue) {
    dsf.http.post('/fn/conferenceMessage/read', {
        pk: pk
    }).done(res => {
        if (res.type == "success") {
            vueData.$set(itemValue, "HWXT_HYXX_USER.C-HWXT-HYXX-USER-0002", '已读');
            vueData.$set(itemValue, "HWXT_HYXX_USER.C-HWXT-HYXX-USER-0002.value", '1');
            Dialog({ message: itemValue['HYXX.B0001.value'] });
            // let fid = vueData.$route.query.secQuery ? JSON.parse(vueData.$route.query.secQuery).fid : vueData.$route.query.fid;
            // vueData.$router.push({
            //     path: `/commonForm/${moduleId}/${pk}`,
            //     query: {
            //         listId: '210922111254Av7TxJdC6LSoVzPqPqY',
            //         fid: fid,
            //         method: 'view'
            //     }
            // });
        } else {
            dsf.layer.toast("操作失败！");
        }
    }).error(error => {
        console.log("messageRead-error", error)
        dsf.layer.toast("操作失败！");
    }).always(() => {})
}

exportObj.dataFilter = function (listData,vueData) {
    console.log(listData);
    listData.forEach( item => {
        vueData.$set(item.dataValue, "titleStyle" , { overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
        display: "inline-block"
    })
    })
}
export default exportObj;


// import { Dialog } from 'vant';
// const exportObj = {};
// exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
//   dsf.http.post("fn/remind/read?ids=" + itemValue.id).then(res => {
//     itemValue.readStatus = 1;
//     Dialog({ message: itemValue.content });
//   })

// }
// export default exportObj;