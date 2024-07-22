import dsf from "../../../common";

const exportObj = {};
exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
    vueData.$router.push({
        path: `/commonForm/${itemValue.moduleId}/${itemValue.id}?listId=200519111812sRoXafW9AdtktNZumIC&method=view`
    })
}
export default exportObj;
