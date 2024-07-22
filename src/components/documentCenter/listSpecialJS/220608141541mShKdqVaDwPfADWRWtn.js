/**
 * 已审核值班要情
 *
 */
 import dsf from "../../../common";

 const exportObj = {};
 exportObj.initHandle = function (vueData) {
  }
 exportObj.link = function (listid, moduleId, pk, vueData, itemValue) {
     vueData.$router.push({
         //path: `/commonForm/${moduleId}/${pk}?formId=2203051314047kwYcLZMsXvrCW4KwB2&listId=220216130055y1ZVwKmTeaAyZyW7QeU&validateByList=1&method=saveAndView&title=值班要情`
         path: `/commonForm/220303113130omuV4PLAr9v5Th2d34D/${pk}?formId=220504183312NCH3GC9G1jWqPmlaTBf&listId=220216130055y1ZVwKmTeaAyZyW7QeU&validateByList=1&method=saveAndView`
     })
 }
 export default exportObj;