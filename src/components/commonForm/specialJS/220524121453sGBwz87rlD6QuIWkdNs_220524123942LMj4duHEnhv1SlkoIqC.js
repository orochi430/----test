/**
 * 房源确认发布模块 特殊表单JS
 */
const exportObj = {};
exportObj.initHandle = function (formData, formStruct, vueData) {
  let subFormIndex = ''
  vueData.$bus.on("checkVal",function (busObj){
    subFormIndex = busObj.subFormIndex
    if(busObj.metaData.metaId == 'C-JYTA-GT-SUB-0009' && formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0009'].text != '商业'){
      let arr = vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0010'].value
      const pams ={
        spaceIds:vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0010'].value,
        purpose1:vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0009'].value,
        purpose2:'',
        type :1
      }
      dsf.http.post("fn/enclosure/getFyPrice",pams).then(({data})=>{
        if(data.code == '200'){
          let jt = data.data.jtpgzdj
          dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
            if(data.code == '200'){
              if(data.data.zdj == false){
                vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows.forEach(item =>{
                  item['C-JYTA-GT-SUB-0008'].value = '*'
                  item['C-JYTA-GT-SUB-0011'].value = jt
                })
              }else{
                vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0008'].value =jt
              }
            }
          })
         
          if(data.data.ysqyzjj[subFormIndex][arr] != -1){
            vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0007'].value = data.data.ysqyzjj[subFormIndex][arr]
          }
        }else{
          dsf.layer.toast(data.message)
        }
      })
      }else if(busObj.metaData.metaId == 'C-JYTA-GT-SUB-0009' && formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0009'].text == '商业'){
      const pams ={
        spaceIds:vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0010'].value,
        purpose1:vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0009'].value,
        purpose2:1,
        type :1
      }
      dsf.http.post("fn/enclosure/getFyPrice",pams).then(({data})=>{
        if(data.code == '200'){
          let jt = data.data.jtpgzdj
          dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
            if(data.code == '200'){
              if(data.data.zdj == false){
                vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows.forEach(item =>{
                  item['C-JYTA-GT-SUB-0008'].value = '*'
                  item['C-JYTA-GT-SUB-0011'].value = jt
                })
              }else{
                vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0008'].value =jt
              }
            }
          })
          if(data.data.ysqyzjj[subFormIndex][arr] != -1){
            vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows[subFormIndex]['C-JYTA-GT-SUB-0007'].value = data.data.ysqyzjj[subFormIndex][arr]
          }
        }else{
          dsf.layer.toast(data.message)
        }
      })
    }
  })
  
  dsf.http.post("fn/coreBusinessContract/isCxPrice").then(({data})=>{
    if(data.code == '200'){
      if(data.data.zdj == false){
        vueData.formData.multinfos['220524123934lCi7tYJzXhfA3EY7a45'].rows.forEach(item =>{
          item['C-JYTA-GT-SUB-0008'].value = '*'
        })
      }
    }
  })


}

exportObj.saveFilter = function (formData, formStruct, vueData, action) {

  return new Promise(function (resolve, reject) {
    let rows1 = formData.multinfos["220524123934lCi7tYJzXhfA3EY7a45"].rows
    let isGo = true
    for (let index = 0; index < rows1.length; index++) {
      let element = rows1[index];
      if (element["B0056"].value == "3" && !element["C-JYTA-GT-SUB-0006"].value.length) {
        isGo = false
        break
      }
    }
    if (isGo) {
      resolve()
    } else {
      reject("请填写拟不发布的备注")
    }
  })
}
export default exportObj;
