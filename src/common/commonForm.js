import http from './http';
function getaa(){
    
}
 const nativeCommon = (method, data) => {
    return new Promise((resolve, reject) => {
      // try {
        window.JSBridge.requestHybrid({
          method:method,
          data:data,
          callback:function(res){
            if (res.code === 200) {
              resolve(res)
            } else {
              reject(res)
            }
          }
        })
      // } catch (error) {
      //   console.log(error,"24")
      // }
    })
  }
  export default{
    nativeCommon
  }