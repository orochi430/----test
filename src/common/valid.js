
/**
 * 
 * @param {需要校验的数据} value 
 * @param {校验类型 tel,idCard,email} type 
 */
const validFn=(value,type)=>{
  const reg={
    tel: /^[1][3,4,5,6,7,8,9][0-9]{9}$/, //手机号码格式
    idCard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/, //身份证号码格式
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/ //邮箱格式
  }
  return value && reg[type].test(value)
} 
export default {
  validFn
}