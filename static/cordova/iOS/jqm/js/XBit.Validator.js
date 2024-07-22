var m_checkAction = 0;
var Checker = {
	noEmpty : function(str) {
		//return (str != null && (!str.trim || str.trim()) != "");
		return (str != null && str != "" && str != undefined);
	},isEmpty : function(str) {
		return (str == null || str == "" || str == undefined);
	},
	maxLength : function(str, length) {
		return (str.length <= length);
	},
	minLength : function(str, length) {
		return (str.length >= length);
	},
	isInteger : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^(\-?)(\d+)$/.test(str);
	},
	isDigit : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^\d+$/.test(str);
	},
	// 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
	isPhone : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(str);
	},
	// 校验手机号码：必须以数字开头，除数字外，可含有“-”
	isMobile : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(str);
	},
	isPostCode : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^[0-9 ]{6}$/.test(str);
	},
	isIP : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^[0-9.]{1,20}$/.test(str);
	},
	// 校验整型是否为非负数
	isNotNegativeInteger : function(str) {
		if (Checker.isEmpty(str))
			return true;
		if (Checker.isInteger(str) == true) {
			if (parseInt(str, 10) < 0)
				return false;
			else
				return true;
		} else
			return false;
	},
	// 校验字符串是否为浮点型
	isDouble : function(str) {
		if (Checker.isEmpty(str))
			return true;
		if (str.indexOf(".") == -1) {
			if (Checker.isInteger(str) == true) {
				return true;
			} else {
				return false;
			}
		} else {
			return /^(\-?)(\d+)(.{1})(\d+)$/g.test(str);
		}
	},
	// 校验浮点型是否为非负数
	isNotNegativeDouble : function(str) {
		if (Checker.isEmpty(str))
			return true;
		if (Checker.isDouble(str) == true) {
			return parseFloat(str) >= 0;
		} else
			return false;
	},
	isDate : function(str) {
		if (Checker.isEmpty(str))
			return true;
		// var pattern
		// =/^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/g;
		// var pattern =
		// /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))(
		// (20|21|22|23|[0-1]?\d)(:[0-5]?\d)?(:[0-5]?\d)?)?$/g;
		return /^((((1[6-9]|[2-9]\d)\d{2})[-\/]?(0?[13578]|1[02])[-\/]?(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-9]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))( (20|21|22|23|[0-1]?\d):[0-5]?\d(:[0-5]?\d)?)?$/g
				.test(str);
	},
	isYear : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^((1[6-9]|[2-9]\d)\d{2})?$/g.test(str);
	},
	isMonth : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^(0?[13456789]|1[012])?$/g.test(str);
	},
	isDay : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^(0?[1-9]|[12]\d|3[01])?$/g.test(str);
	},
	// 校验两个日期的先后
	dateCompare : function(startDate, endDate) {
		if (Checker.isDate(startDate) == false
				|| Checker.isDate(endDate) == false)
			return false;
		if ((Checker.isEmpty(startDate)) || (Checker.isEmpty(endDate)))
			return true;
		var s1 = startDate.indexOf("-") >= 0 ? "-" : "/";
		var s2 = endDate.indexOf("-") >= 0 ? "-" : "/";
		var arr1 = startDate.split(s1);
		var arr2 = endDate.split(s2);
		//var date1 = new Date(arr1[0],parseInt(arr1[1].replace(/^0/, ""), 10) - 1, arr1[2]);
		//var date2 = new Date(arr2[0],parseInt(arr2[1].replace(/^0/, ""), 10) - 1, arr2[2]);
		if (arr1[1].length == 1)
			arr1[1] = "0" + arr1[1];
		if (arr1[2].length == 1)
			arr1[2] = "0" + arr1[2];
		if (arr2[1].length == 1)
			arr2[1] = "0" + arr2[1];
		if (arr2[2].length == 1)
			arr2[2] = "0" + arr2[2];
		var d1 = arr1[0] + arr1[1] + arr1[2];
		var d2 = arr2[0] + arr2[1] + arr2[2];
		var v1 = parseInt(d1, 10);
		var v2 = parseInt(d2, 10);
		if (v1 > v2)
			return 1;
		else if (v1 == v2)
			return 0;
		else
			return -1;
	},
	isMail : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^\w+@\w+\.\w{2,3}/.test(str);
	},
	isURL : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i
				.test(str);
	},
	isChinese : function(str) {
		if (Checker.isEmpty(str))
			return true;
		return /^([\u4E00-\u9FA5]|[\uFE30-\uFFA0])*$/gi.test(str);
	}
};
//
var Validators = {
	email : {
		message : '[{0}]必须输入Mail地址正确格式!',
		validator : Checker.isMail
	},
	url : {
		message : '[{0}]必须输入Web地址正确格式!',
		validator : Checker.isURL
	},
	mobile : {
		message : '[{0}]必须输入正确手机号码!',
		validator : Checker.isMobile
	},
	required : {
		message : '[{0}]不能为空!',
		validator : Checker.noEmpty
	},
	equals : {
		message : '[{0},{1}]必须相等!',
		validator : function(value, o) {
			var v = o;
			if (o.indexOf("#") == 0) {
				o = $e(o.substring(1));
				v = $value(o);
			}
			return (value == v);
		}
	},
	maxlength : {
		message : '[{0}]最大长度不能超{1}!',
		validator : Checker.maxLength,
		mask : function(str, params, controls) {
			if (str.length > parseInt(params[0])) {
				return false;
			}
			return true;
		}
	},
	minlength : {
		message : '[{0}]最大长度不小于{1}!',
		validator : Checker.minLength,
		mask : function(str, params, controls) {
			if (str.length <= parseInt(params[0])) {
				return false;
			}
			return true;
		}
	},/*
		 * max : { message: '[{0}]大于{1}!', validator:
		 * function(str,params,controls){ // } }, min : { message:
		 * '[{0}]小于{1}!', validator: function(str,params,controls){ // } },
		 */
	isInteger : {
		message : '[{0}]必须是整数!',
		validator : Checker.isInteger
	},
	number : {
		message : '[{0}]必须是数值整数!',
		validator : Checker.isInteger,
		mask : Checker.isDigit
	},
	numeric : {
		message : '[{0}]必须是数值!',
		validator : Checker.isDouble
	},
	nonNegative : {
		message:'[{0}]请输入非负数!',
		validator : Checker.isNotNegativeDouble
	},
	date : {
		message : '[{0}]必须是有效的日期类型!',
		validator : function(value) {
			return Checker.isDate(value);
		}
	},
	year : {
		message : '[{0}]必须是有效的年类型!',
		validator : function(value) {
			return Checker.isYear(value);
		}
	},
	month : {
		message : '[{0}]必须是有效的月类型!',
		validator : function(value) {
			return Checker.isMonth(value);
		}
	},
	day : {
		message : '[{0}]必须是有效的日类型!',
		validator : function(value) {
			return Checker.isDay(value);
		}
	},
	xDateCompare : {
		message : '[{0}]时间比较!',
		validator : function(str, params, controls) {
			if (xform && controls && controls.length > 0 && params
					&& params.length == 2) {
				var xrow = controls[0].x.row;
				// alart(params[1]);
				// var control = xform.getXControl(xrow,params[1]);
				// var str2 = $(control).value();
				// debugger;
				var str2 = xform.getValue(xrow, params[1]);
				// alert(str + params[0] + str2);
				//
				var r = Checker.dateCompare(str, str2);
				if (params[0] == ">")
					return (r == 0);
				else if (params[0] == ">=")
					return (r >= 0);
				else if (params[0] == "==")
					return (r == 0);
				else if (params[0] == "<")
					return (r < 0);
				else if (params[0] == "<=")
					return (r <= 0);
				else
					alert("无法使用操作符" + params[0]);
			} else {
				alert("无法使用xDateCompare");
			}
		}
	},
	xEval : {
		message : '[{0}]表达式校验!',
		validator : function(str, params, controls) {
			if (xform && params && params.length > 0 && controls
					&& controls.length > 0 && controls[0].x.row.x.xmlNode) {
				var xmlNode = controls[0].x.row.x.xmlNode;
				// var strNullAble =
				// XmlDocument.getAttributeValue(controls[0],"X:NullAble")
				var expression = params;
				if ((str == null || str == "")
						&& expression.indexOf("this.value") > 0) {
					return true;
				}
				for ( var i = 0; i < xmlNode.childNodes.length; i++) {
					var nodeName = xmlNode.childNodes[i].nodeName;
					if (expression.indexOf("[" + nodeName + "]") >= 0) {
						var nodeValue = xmlNode.childNodes[i].text;
						if (nodeValue == null || nodeValue == "") {
							return true;
						}
						var _str = expression.replace("[" + nodeName + "]",
								nodeValue);
						while (_str != expression) {
							expression = _str;
							_str = expression.replace("[" + nodeName + "]",
									nodeValue);
						}
					}
				}
				expression = expression.replace("this.value", str);
				try {
					return eval(expression);
				} catch (e) {
					// alert("计算表达式" + strExpression + "错误!\r\n" +
					// e.description);
				}
			}
		}
	},
	test : {
		message : '[{0}]无效的格式!',
		validator : function(str, pattern) {
			var regex = new RegExp(pattern, "g");
			return regex.test(str);
		}
	},
	sunique : {
		message : '[{0}]服务端判断唯一性!',
		validator : function(value, params, controls) {
			if (controls != null && controls.length && controls.length > 0) {
				if (!params)
					params = "checkExits.jsp";
				var control = controls[0];
				var xrow = control.x.row;
				var keyValue = xform.getValue(xrow, "ID");
				var url = params + '?t=' + control.x.tableName + '&f='
						+ control.x.xpath + '&v=' + value + "&k=" + keyValue;
				var result = Server.get(url);
				// alert("[" + result + "]");
				if (result)
					result = result.trim();
				return result == '1';
			}
			return false;
		}
	},
	sc : {
		message : '[{0}]服务端判断!',
		validator : function(value, params, controls) {
			if (controls != null && controls.length && controls.length > 0) {
				var control = controls[0];
				var url = params + '?t=' + control.x.tableName + '&f='
						+ control.x.xpath + '&v=' + value;
				var result = Server.get(url);
				if (result)
					result = result.trim();
				return result == '1';
			}
			return false;
		}
	}
};
XBit.Validator = function(container, labMessages) {
	var m_items = new Array();
	var m_messages = "";
	var m_errorColor = "red";
	function getOuter(control) {
		var labMessage = null;
		_PT.begin("getOuter");
		if (control.x.outerElement) {
			labMessage = control.x.outerElement;
		} else if (control.x.outer) {
			labMessage = $next(control, "#" + control.x.outer);
			if (labMessage) {
				control.x.outerElement = labMessage;
			}
		}
		_PT.end("getOuter");
		return labMessage;
	}
	this.init = function() {
		_PT.begin("Validator.init()");
		if (container) {
			var controls = new Array();
			if ($.isArray(container)) { //zhangx: if (isArray(container)) {
				for ( var i = 0; i < container.length; i++) {
					if (isValidator(container[i])) {
						controls[controls.length] = container[i];
					}
				}
			} else {
				getVTypeControls(container, controls);
			}
			for ( var i = 0; i < controls.length; i++) {
				var control = controls[i];
				//zhangx begin
				var _validator = getValidator(control);
				//var _validator = XmlDocument.getAttributeValue(control,"X:Validator");
				//zhangx end
				
				//control.x.validators = _validator;
				//bug createControlValidator,createRowValidator
				//XmlDocument.removeAttribute(control,"X:Validator");
				if(_validator == null || _validator == ""){
					alert(_validator);
					continue;
				}
				var item = new Object();
				m_items[m_items.length] = item;
				item.validators = [];
				item.controls = [control];
				try {
					var validators = eval('({' + _validator + '})');
					for ( var validatorName in validators) {
						var validator;
						if (Validators[validatorName] != null) {
							validator = validators[validatorName];
							validator.name = validatorName;
							if (!validator.level
									&& Validators[validatorName].level)
								validator.level = Validators[validatorName].level;
							if (!validator.action
									&& Validators[validatorName].action)
								validator.action = Validators[validatorName].action;
							if (!validator.message
									&& Validators[validatorName].message)
								validator.message = Validators[validatorName].message;
							if (!validator.validator
									&& Validators[validatorName].validator)
								validator.validator = Validators[validatorName].validator;
							if (!validator.mask
									&& Validators[validatorName].mask)
								validator.mask = Validators[validatorName].mask;
							if (!validator.params
									&& Validators[validatorName].params)
								validator.params = Validators[validatorName].params;
						}else{
							validator = validators[validatorName];
						}
						validator.name = validatorName;
						if (validatorName == "required")
							control.style.backgroundColor = "#FFFFCC";
						item.validators[item.validators.length] = validator;
					}
				} catch (e) {
					m_messages = "校验出错,请联系管理员\r\nValidator:" + _validator
							+ "\r\n错误信息:" + e.message;
					alert(m_messages);
					return false;
				}
			}
		}
		_PT.begin("Validator.init()_setTip");
		for ( var i = 0; i < m_items.length; i++) {
			var item = m_items[i];
			if (item.controls) {
				for ( var ii = 0; ii < item.controls.length; ii++) {
					item.controls[ii].tip = "";
				}
			}
		}
		_PT.end("Validator.init()_setTip");
		_PT.begin("Validator.init()_control_init");
		
		for ( var i = 0; i < m_items.length; i++) {
			var item = m_items[i];
			if (item.controls) {
				for ( var ii = 0; ii < item.controls.length; ii++) {
					var control = item.controls[ii];
					if (control.validators == null) {
						control.validators = [];
						bindEvent(control);
					}
					var title = control.tip;
					for ( var iii = 0; iii < item.validators.length; iii++) {
						var validator = item.validators[iii];
						if (title != "")
							title += "\r\n";
						control.x.caption = control.x.caption || "校验失败";//zhangx added
						title += String.format(validator.message,control.x.caption);
						control.validators[control.validators.length] = validator;
					}
					control.tip = title;
					if ($.isFunction(control.validator)) {//zhangx: if (isFunction(control.validator)) {
						control.validator = function() {
							m_messages = "";
							for ( var i = 0; i < control.validators.length; i++) {
								if (!validControl(control.validators[i],
										[ control ], true)) {
									// try{control.focus();}catch(e){};
									showMessages();
									return false;
								}
							}
							return true;
						};
					}
				}
			}
		}
		_PT.end("Validator.init()_control_init");
		_PT.end("Validator.init()");
	};
	function bindEvent(control){
		_PT.begin("Validator.init()_bindEvent");
		if (control.type != "hidden") {
			$(control).bind('keypress',function() {
					var control = this;//zhangx: var control = this;
					if (control.className) {
						control.className = control.className.replace("_error","");
					} else {
						control.style.backgroundColor = "";
					}
					for ( var i = 0; i < control.validators.length; i++) {
						//zhangx change isFunction to $.isFunction
						if ($.isFunction(control.validators[i].mask)) {
							var value = $value(control)
									+ String.fromCharCode(window.event.keyCode);
							if (!control.validators[i]
									.mask(value,control.validators[i].params,
											item.controls)) {
								event.keyCode = 0;
								event.cancelBubble = true;
								event.returnValue = false;// 2010/06/25
							}
						}
					}
				});
		}
		$(control).bind('change',function() {
				//var control = $event();
				var control = this;
				if (control.className){
					control.className = control.className.replace("_error", "");
				}else{
					control.style.backgroundColor = "";
				}
			});
		_PT.end("Validator.init()_bindEvent");
	}
	function getVTypeControls(element, controls) {
		if (element) {
			if (element.childNodes.length) {
				for ( var i = 0; i < element.childNodes.length; i++) {
					getVTypeControls(element.childNodes[i], controls);
				}
			} else {
				if (isValidator(element)) {
					controls[controls.length] = element;
				}
			}
		}
	}
	;
	function isValidator(element) {
		//zhangx begin
		var validator = getValidator(element);
		if (validator != null && validator != "") {
			return true;
		}
		return false;
		//zhangx end
		
/*		var validator = XmlDocument.getAttributeValue(element, "X:Validator");
		if (validator != null && validator != "") {
			return true;
		}
		return false;*/
	}
	
	//zhangx begin
	function getValidator(element){
		var validator = null;
		if(element && element.x && element.x.validator){
			validator = element.x.validator;
		}
		return validator;
	}
	//zhangx end 
	
	function showMessages() {
		//zhangx change isFunction to $.isFunction
		if (typeof showErrorMessage != "undefined" && // 如果showErrorMessage没有声明时候isFunction(showErrorMessage)会报错
		$.isFunction(showErrorMessage)) {
			if (showErrorMessage(this, m_messages)) {
				return;
			}
		}
		if (!labMessages){
			labMessages = $e("labMessages");
		}if (labMessages) {
			labMessages.innerHTML = m_messages.replace("\r\n", "<br>");
		} else if (m_messages != "") {
			alert(m_messages);
		}
	}
	this.register = function(validators) {
		var item = new Object();
		if ($.isArray(validators)) {//zhangx: if (isArray(validators)) {
			item.validators = validators;
		} else {
			item.validators = new Array();
			for ( var i = 0; i < arguments.length; i++) {
				if (arguments[i]) {
					item.validators[item.validators.length] = arguments[i];
				}
			}
		}
		if (item.validators.length > 0) {
			m_items[m_items.length] = item;
		}
		item.bind = function() {
			if (arguments.length > 0) {
				item.controls = new Array();
				for ( var i = 0; i < arguments.length; i++) {
					if (item.validators.length > 0) {
						item.controls[item.controls.length] = arguments[i];
					}
				}
			}
			return item;
		};
		return item;
	};
	this.valid = function(isShowMessages) {
		_PT.begin("Validator.valid()");
		isShowMessages = (isShowMessages == null || isShowMessages);
		m_messages = "";
		var isSetFocus = false;
		var _result = 1;// -1 err,0 cancal,1 seccess
		if (isShowMessages) {
			clearErrorMessage();
		}
		for ( var i = 0; i < m_items.length; i++) {
			_PT.begin("Validator.valid()_" + i);
			var item = m_items[i];
			var result = item.validators.length > 0 ? false : true;
			for ( var ii = 0; ii < item.validators.length; ii++) {
				var validator = item.validators[ii];
				_PT.begin("Validator.valid()_" + i + "_" + ii);
				var eventHander = {
					cancel : false
				};
				//zhangx change isFunction to $.isFunction
				if ($.isFunction(this.onControlValiding)) {
					this.onControlValiding(validator, item.controls,
							eventHander);
				}
				if (eventHander.cancel) {
					if (_result > 0) {
						_result = 0;
					}
				} else {
					result = validControl(validator, item.controls,
							isShowMessages);
					var level = validator.level ? validator.level : -1;
					if (!result && level < 0)
						_result = -1;
				}
				_PT.end("Validator.valid()_" + i + "_" + ii);
			}
			_PT.end("Validator.valid()_" + i);
			/*
			 * focus if(item.controls){ for(var iii=0;iii<item.controls.length;iii++){
			 * var control = item.controls[iii]; if(!result && !isSetFocus &&
			 * isShowMessages){ try{control.focus();}catch(e){}; isSetFocus =
			 * true; } } }
			 */
		}
		if (isShowMessages)
			showMessages();
		_PT.end("Validator.valid()");
		return _result;
	};
	function clearErrorMessage() {
		_PT.begin("clearErrorMessage");
		for ( var i = 0; i < m_items.length; i++) {
			var item = m_items[i];
			var controls = item.controls;
			if (controls && controls.length > 0) {
				var labMessage = getOuter(controls[0]);
				if (labMessage) {
					labMessage.style.display = "none";
					if(labMessage.errorStyle == "title"){
						labMessage.title = "";
					}else{
						labMessage.innerHTML = "";
					}
				}
			}
		}
		_PT.end("clearErrorMessage");
	}
	function validControl(validator, controls, isShowMessages) {
		var debug_key = "Validator.validControl()";
		_PT.begin(debug_key);
		var message = "";
		var result = true;
		var captions = [];
		var params = validator.params;
		var level = validator.level ? validator.level : -1;
		var levelName = "";
		// var levelName = level<0?"警告":"提示" + ":";
		if (controls && controls.length > 0) {
			var control = controls[0];
			if(control.x.isValid){
				_PT.end(debug_key);
				return true;
			}else if (m_checkAction > 0 && validator.action > 0
					&& (validator.action & m_checkAction != validator.action)) {
				_PT.end(debug_key);
				return true;//不属于校验访问
			}else if (control.x.isHiddenNoValid && isHide(control)){
				_PT.end(debug_key);
				return true;
			}
			
			try {
				var debug_key_tag = validator.name || validator.message;
				_PT.begin(debug_key + "_call_valid_" + debug_key_tag);
				//debugger;
				result = validator.validator($value(control), params,
								controls);
				_PT.end(debug_key + "_call_valid_" + debug_key_tag);
			} catch (e) {
				alert1("校验失败:" + e.description);
				_PT.end(debug_key);
				return false;
			}
			if (!result && isShowMessages) {
				for ( var i = 0; i < controls.length; i++) {
					control = controls[i];
					if (control.className) {
						if (control.className.indexOf('_error') < 0)
							control.className = control.className + "_error";
					} else {
						// control.style.backgroundColor = m_strErrorColor;
					}
					captions[captions.length] = controls[i].x.caption;
				}
				message = String.format(validator.message, captions);
				//
				var labMessage = getOuter(controls[0]);
				if (labMessage) {
					var str = "";
					if(labMessage.errorStyle=="title"){
						str = labMessage.title;
						if(str && str != ""){
							str += "\r\n";
						}
						labMessage.title = (str += message);
					}else{
						str = labMessage.innerHTML;
						if (str && str != "")
							str += "<br />";
						str += "<div class='valid_warn_icon'></div><div class='valid_warn'>"
								+ message + "</div>";
						labMessage.innerHTML = str;
					}
					//
					labMessage.style.display = "";
					message = "";
				}
				//
			}
		} else {
			result = valid();// ?
		}
		if (message && message != "") {
			if (m_messages != "")
				m_messages += "\r\n";
			m_messages += levelName + message;
		}
		_PT.end(debug_key);
		return result;
	}
};

