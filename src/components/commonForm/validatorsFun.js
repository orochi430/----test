/*========================================*/
/**
 * DSF - Validators
 */


/**身份证校验Begin*******************************************************/
/**
 * 身份证校验算法：来自CBM项目，由胡明路提供 
 * 2018-03-06
 */
/**
 * 身份证15位编码规则：dddddd yymmdd xx p dddddd：地区码 yymmdd: 出生年月日 xx: 顺序类编码，无法确定 p:
 * 性别，奇数为男，偶数为女
 * <p />
 * 身份证18位编码规则：dddddd yyyymmdd xxx y dddddd：地区码 yyyymmdd: 出生年月日
 * xxx:顺序类编码，无法确定，奇数为男，偶数为女 y: 校验码，该位数值可通过前17位计算获得
 * <p />
 * 18位号码加权因子为(从右到左) Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2,1 ]
 * 验证位 Y = [ 1, 0, X, 9, 8, 7, 6, 5, 4, 3, 2 ] 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
 * i为身份证号码从右往左数的 2...18 位; Y_P为脚丫校验码所在校验码数组位置
 * 
 */

var VERIFY_CODE_WEIGHT = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
var VERIFY_CODE = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']; // 身份证验证位值

/**
 * 缓存身份证是否有效，因为验证有效性使用频繁且计算复杂
 */
var cacheValidateResult;

var validityTempDate = null;
/**
 * @param cardNumber 15/18 位身份证号
 * @param birthDay [Optional] 出生日期
 */
function IdCardValidate(cardNumber, birthDay) {
  try {
    cardNumber = trim(cardNumber.replace(/ /g, "").replace("x", "X"));
    if (cardNumber.length == 15) {
      cardNumber = convertToNewCardNumber(cardNumber);
    }
    var result = true;
    // 身份证号不能为空
    result = result && (cardNumber && cardNumber != "");
    // 身份证号长度是18(新证)
    result = result && (18 == cardNumber.length);
    // 身份证号的前17位必须是阿拉伯数字
    var cardNumberArr = cardNumber.split(""); // 得到身份证数组
    for (var i = 0; result && i < 17; i++) {
      var ch = cardNumberArr[0];
      ch = parseInt(ch);
      result = result && ch >= 0 && ch <= 9;
    }

    // 身份证号的第18位校验正确
    result = result &&
      (calculateVerifyCode(cardNumber) == cardNumberArr[17]);

    // 出生日期不能晚于当前时间，并且不能早于1900年
    result = result && isValidityBrithBy18IdCard(cardNumber);
    // if (birthDay) {
    //   result = result && (validityTempDate == birthDay);
    // }
    return result;
  } catch (e) {
    return false;
  }
}
/**
 * 验证18位数身份证号码中的生日是否是有效生日
 * 
 * @param idCard
 *            18位书身份证字符串
 * @return
 */
function isValidityBrithBy18IdCard(cardNumber) {
  var year = cardNumber.substring(6, 10);
  var month = cardNumber.substring(10, 12);
  var day = cardNumber.substring(12, 14);
  var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
  // 出生日期不能大于当前日期
  validityTempDate = year + "-" + month + "-" + day;

  var m_strNow;
  if (typeof (m_strNow) == 'undefined') {
    var tempDate = new Date();
    var month1 = tempDate.getMonth() + 1;
    if (month1 < 10) {
      month1 = "0" + month1;
    }
    var formattedDate = tempDate.getDate();
    if (formattedDate < 10) {
      formattedDate = "0" + formattedDate;
    }
    tempDate = tempDate.getFullYear() + "-" + month1 + formattedDate;
    m_strNow = tempDate;
  }

  var validityNowDate = m_strNow.replace(/-/g, "");

  var validityTempStr = validityTempDate.replace(/-/g, "");

  if (validityTempStr != null && validityTempStr != "") {
    if (parseInt(validityTempStr) > parseInt(validityNowDate)) { // 出生日期大于当前日期
      return false;
    }
  }

  // 这里用getFullYear()获取年份，避免千年虫问题
  if (temp_date.getFullYear() != parseFloat(year) ||
    temp_date.getMonth() != parseFloat(month) - 1 ||
    temp_date.getDate() != parseFloat(day) ||
    temp_date.getFullYear() < 1900) {
    return false;
  } else {
    return true;
  }
}

function convertToNewCardNumber(cardNumber) {
  var buf = "";
  buf += cardNumber.substring(0, 6);
  buf += "19";
  buf += cardNumber.substring(6);
  buf += calculateVerifyCode(buf);
  return buf;
}

function calculateVerifyCode(cardNumber) {
  var a_idCard = cardNumber.split(""); // 得到身份证数组
  var sum = 0;
  for (var i = 0; i < 17; i++) {
    var ch = a_idCard[i];
    sum += (ch * VERIFY_CODE_WEIGHT[i]);
  }
  return VERIFY_CODE[sum % 11];
}

/**
 * 通过身份证判断是男是女
 * 
 * @param idCard
 *            15/18位身份证号码
 * @return 'female'-女、'male'-男
 */
function maleOrFemalByIdCard(idCard) {
  var flag = IdCardValidate(idCard);
  if (flag && flag == true) {
    if (idCard.length == 15) {
      if (idCard.substring(14, 15) % 2 == 0) {
        return 'female';
      } else {
        return 'male';
      }
    } else if (idCard.length == 18) {
      if (idCard.substring(14, 17) % 2 == 0) {
        return 'female';
      } else {
        return 'male';
      }
    }
  }
  return null;
}

// 去掉字符串头尾空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**身份证校验End*******************************************************/

/** 文件上传必填项校验 START **/
function fileRequired(value, item, $control) {
  var size = $(item).find(".attachment-row[x-data-state!='Deleted']").size();

  if (size <= 0) {
    return false;
  } else {
    return true;
  }
}
/** 文件上传必填项校验 END **/

/** 文件上传必填项校验 START **/
function fileMJ(value, item, $control) {
  //主要靠后台校验
  return true;
}
/** 文件上传必填项校验 END **/


/** 文件上传必填项校验 START **/
function opinionContentRequired(value, item, $control, param) {
  $(item).parent().find(".layui-error-msg").remove();

  var opinionVal = $(item).find("textarea[name='opinionDesc']").val();
  //修复判空 去除首尾空格 by：三七 2020.8.14
  opinionVal = opinionVal.trim();
  if (param) {
    var isc = param.content.isContent;
    var isf = param.content.isFile;
    var iscmsg = param.content.isContentMsg;
    var isfmsg = param.content.isFileMsg;
    var opinionConfirm = param.content.opinionConfirm;

    if (opinionConfirm && opinionConfirm == 1) {
      return "";
    }

    if (isc && isc == 'true') {
      if (opinionVal == null || opinionVal == "") {
        return iscmsg;
      }
    }

    if (isf && isf == 'true') {
      var size = $(item).find(".attachment-row[x-data-state!='Deleted']").size();

      if (size <= 0) {
        return isfmsg;
      }
    }
  }

  return '';

}


/** 文件上传必填项校验 END **/


/** 结束日期大于开始日期校验 START **/
function endTimeCheck(value, begTimeControl, endTimeControl, param) {
  function findForm(evt) {
    if (evt.$el.tagName != "FORM") {
      return findForm(evt.$parent)
    } else {
      return evt.$parent
    }
  }

  function filterTime(time) {
    var str = time && time.replace(/-/g, "/")
    return str
  }
  let {
    begTime,
    endTime
  } = this.controlData.rules.filter(item => item.name == "endTimeCheck")[0]
  let form = findForm(this)
  // pc端datetime()代表当前时间，故此处与pc端保持一致 ———20220824 xiaochy
  let begVal;
  if (begTime == "datetime()") begVal = Date.parse(new Date());
  else begVal = Date.parse(filterTime(form.formData.main[begTime]?.value));
  let endVal;
  if (endTime == "datetime()") endVal = Date.parse(new Date());
  else endVal = Date.parse(filterTime(form.formData.main[endTime]?.value));
  let nowVal = Date.parse(filterTime(this.value.value));
  var res = true;
  if (endVal < begVal) {
    res = false;
  }
  //含时分秒的日期格式，须排除相等 2022年10月21日17:39:46 @xiaochy
  let reg = /^[1-9][0-9][0-9][0-9][-/][0-1]{0,1}[0-9][/-][0-3]{0,1}[0-9]\s[0-2]{0,1}[0-9]/;
  if (reg.test(form.formData.main[begTime]?.value)
    && reg.test(form.formData.main[endTime]?.value)
    && endVal <= begVal) {
    res = false;
  }
  // if(nowVal<=begVal||nowVal>=endVal){
  // 	res=false
  // }
  return res;
}

/** 文件上传必填项校验 END **/

/** 关联文件校验 START **/
function fileRelationValidator(value, item, $control) {
  var that = $(item);
  /*var div=that.find(".attachment-row:visible").length;*/
  var div = that.find(".attachment-row").length; //在双屏下该关联文件tab不可见导致length为0故删除visible属性
  if (div == 0) {
    return false;
  } else {
    return true;
  }
}
/** 关联文件必填项校验 END **/

/**
 * 数字大小判断
 */
function numberGreaterThan(value, item, $control, param) {
  if (isNaN(value)) {
    return false;
  }
  var num = param.content.num;
  if (value > num) {
    return true;
  } else {
    return false;
  }
}

export default {
  IdCardValidate: IdCardValidate,
  fileRequired: fileRequired,
  fileMJ: fileMJ,
  fileRelationValidator: fileRelationValidator,
  opinionContentRequired: opinionContentRequired,
  endTimeCheck: endTimeCheck,
  numberGreaterThan: numberGreaterThan,
};
