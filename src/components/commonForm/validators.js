const validators= {
	"sampleFunctionValidator": {
        "function" : " return window.sampleFunctionValidator(value , item , $control); /*定义在validators.js*/",
        "message" : "示例校验失败提示"
    },
    "sampleRegexValidator": {
        "regex": "^.+$",
        "message": "必填项{title}不能为空"
    },
  
  
    "required": {
        "regex": "^.+$",
        "message": "{title}不能为空"
    },
    "integer": {
        "regex": "^(\\-?)(\\d+)$|^$",
        "message": "{title}只能填写整数"
    },
    "number": {
        "regex": "^(\\-?)(\\d+)$|^(\\-?)(\\d+)(.{1})(\\d+)$|^$",
        "message": "{title}只能填写数字"
    },
    "email": {
        "regex": "^([a-zA-Z0-9_\\.\\-])+\\@(([a-zA-Z0-9\\-])+\\.)+([a-zA-Z0-9]{2,4})+$|^$",
        "message": "{title}邮箱格式不正确"
    },
    "url": {
        "regex": "(^#)|(^http(s*):\\/\\/[^\\s]+\\.[^\\s]+)|^$",
        "message": "{title}链接格式不正确"
    },
    "date": {
        "regex": "^(\\d{4})[-\\/](\\d{1}|0\\d{1}|1[0-2])([-\\/](\\d{1}|0\\d{1}|[1-2][0-9]|3[0-1]))*$|^$",
        "message": "{title}日期格式不正确"
    },
    "datetime": {
        "regex": "^((((1[6-9]|[2-9]\\d)\\d{2})[-\\/]?(0?[13578]|1[02])[-\\/]?(0?[1-9]|[12]\\d|3[01]))|(((1[6-9]|[2-9]\\d)\\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|(((1[6-9]|[2-9]\\d)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-9]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))( (20|21|22|23|[0-1]?\\d):[0-5]?\\d(:[0-5]?\\d)?)?$|^$",
        "message": "{title}日期时间格式不正确"
    },
    "mobile":{
    	"regex" : "^[+]?(0|86|)?\\s?1[3456789]\\d{1}\\s?\\d{4}\\s?\\d{4}$|^$",
    	"message" : "{title}手机号码格式不正确"
    },
    "tel" : {
    	"regex" : "^((0\\d{2}\\s*(-?)\\s*)?(\\d{4}\\s*\\d{4}))$|^((0\\d{3}\\s*(-?)\\s*)?(\\d{3}\\s*\\d{4}|\\d{4}\\s*\\d{4}|\\d{4}\\s*\\d{3}))$|^$",
    	"message" : "{title}固话号码格式不正确"
    },
    "phone": {
        "regex": "^[+]?(0|86|)?\\s?1[3456789]\\d{1}\\s?\\d{4}\\s?\\d{4}$|^((0\\d{2}\\s*(-?)\\s*)?(\\d{4}\\s*\\d{4}))$|^((0\\d{3}\\s*(-?)\\s*)?(\\d{3}\\s*\\d{4}|\\d{4}\\s*\\d{4}|\\d{4}\\s*\\d{3}))$|^$",
        "message": "{title}号码格式不正确"
    },
    "lengthRange": {
        "regex": "^.{{begin},{end}}$",
        "message": "{title}长度范围{begin} ~ {end}"
    },
    "length" : {
    	"regex" : "^.{0,{maxLength}}$",
    	"message" : "{title}长度不能超过{maxLength}"
    },
    "postCode" : {
    	"regex" : "^[1-9][0-9]{5}$|^$",
    	"message" : "{title}不正确"
    },
    "userName" : {
    	"regex" : "^[a-zA-Z0-9_-]{2,16}$",
    	"message" : "{title}不正确"
    },
    "mac": {
        "regex": "^[A-F0-9]{2}(-[A-F0-9]{2}){5}$",
        "message": "{title}不正确"
    },
    "ip": {
        "regex": "^((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])\\.){3}(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]|[*])$",
        "message": "{title}不正确"
    },

    "identity": {
        "function" : "IdCardValidate",
        "message" : "身份证号码不正确"
    },
    "fileRequired": {
        "function" : " return DSF.Validators.fileRequired(value, item); ",
        "message" : "文件不能为空"
    },
    "fileMJ": {
        "function" : " return DSF.Validators.fileMJ(value, item); ",
        "message" : "文件密级不能为空"
    },
    "opinionContentRequired": {
        "function" : " return DSF.Validators.opinionContentRequired(value, item, $control,param); ",
        "message" : "意见内容不能为空"
    },
    "endTimeCheck": {
        "function" : "endTimeCheck",
        "message" : "{message}"
    },
    "fileRelationValidator": {
        "function" : " return DSF.Validators.fileRelationValidator(value, item, $control); ",
        "message" : "关联文件不能为空"
    },
    "attachmentUnique": {
        "function" : " return DSF.Validators.attachmentUnique(value, item, $control); ",
        "message" : "类型值不能为空"
    },
    "numberGreaterThan": {
        "function" : " return DSF.Validators.numberGreaterThan(value, item, $control,param); ",
        "message" : "请输入大于{num}的数值"
    }
}

export default validators;