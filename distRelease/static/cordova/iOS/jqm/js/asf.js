/**
 * ASF for jQuery Mobile
 * @author zhangx 2014-07-15 , update at 2015-10-23
 */
var __ASF_DEBUG__ = true;

/*========================================*/
/**
 * ASF - Global Extention
 */
(function($){
	/**
	 * 对Date的扩展
	 * 		将 Date 转化为指定格式的String。   
	 * 		月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
	 * 		年(y)可以用 1-4 个占位符，毫秒(S)只能用1个占位符(是 1-3 位的数字)   
	 * e.g.：   
	 * 		(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
	 * 		(new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
	 */
	Date.prototype.format = function(fmt) {   
		var o = {
			"M+" : this.getUTCMonth() + 1, 							// 月份
			"d+" : this.getUTCDate(), 										// 日
			"h+" : this.getUTCHours(), 									// 小时
			"m+" : this.getUTCMinutes(), 								// 分
			"s+" : this.getUTCSeconds(), 									// 秒
			"q+" : Math.floor((this.getUTCMonth() + 3) / 3), 	// 季度
			"S" : this.getUTCMilliseconds()								// 毫秒
		};
		
		if (/(y+)/.test(fmt)){
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		
		for(var k in o){
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
						: (("00" + o[k]).substr(("" + o[k]).length)));
		}
		
		return fmt;
	};
})($);


/*========================================*/
/**
 * ASF - XForm
 */
(function(window , $){
	"use strict";

    //init ASF Object
    window.ASF = window.ASF || {};

	var XForm = function($target , opts){
		this._options = {
			SEPARATOR : ","
		};
		this.$target = $target;

		if(opts){
			$.extend(this._options , opts);
		}
		if(!this.$target){
			throw new Error("No target specified.");
		}
		if(!this.$target.length){
			console.log("XForm target is empty");
		}
	};
	
	XForm.prototype = {
		/**
		 * 解析xElements , 用于保存。
		 * @returns {String} JSON String of xElement
		 */
		xform2json : function(){
			var me = this;
			var target , xElements;
			
			target =  this.$target;
			xElements = target.find("[x]");

			var columns = {};
			xElements.each(function(i){
				var $this = $(this);
				var xElementAttr = $this.attr("x");
				var x = ASF.Utils.parseJSON(xElementAttr);
				if( x ){
					columns[x["XPath"]] = getElementValue($this , x , me._options.SEPARATOR);					
				}
			});
			var json = {} , result = "";
			json["rows"] = [];
			json["rows"].push(columns);
			
			result = JSON.stringify(json);

			if(__ASF_DEBUG__){
				console.log(result);
			}
			return result;
		},
		getXFormJson : function(){
			return this.xform2json();
		},
		getXFormXml : function(){
			return this.xform2xml();
		},
		xform2xml : function(){
			var me = this;
			var target , 
				xElements , xAttr;
			
			target =  this.$target;
            xElements = target.find("[x]:not(.asf-subtable-control)").filter(function( index ) {
                var $childElem = $(this);
                var isNotSubtable = $childElem.parents(".asf-subtable-content-template-container").length <= 0;
                return isNotSubtable;
            });
			xAttr = target.attr("x");
			
			var rows = [];
			rows.push("<Rows>");
			rows.push("<Row TableName=\"G_INFOS\">");
			xElements.each(function(i){
				var $this = $(this);
				var nodeXml = node2xml($this , me._options.SEPARATOR);
				rows.push(nodeXml);
			});
			rows.push("</Row>");

			//subtable
            xElements = target.find(".asf-subtable-content");
            if(xElements.length > 0){
                xElements.each(function(j){
                    var $this = $(this);
                    var $subtableFields = $this.find("[x].asf-subtable-control");

                    if($subtableFields.length > 0){
                        //获取Subtable的TableName
                        var xAttr = $subtableFields.eq(0).attr("x");
                        var x = ASF.Utils.parseJSON(xAttr);
                        var subtableTableName = "";
                        if(x){
                            subtableTableName = x["TableName"] || "";
                        }
                        if(!subtableTableName){
                            subtableTableName = "SUBTABLE" + j;
                        }
                        rows.push("<Row TableName=\"" + subtableTableName + "\" >");
                        $subtableFields.each(function(i){
                            var $thisField = $(this);
                            var xAttr = $thisField.attr("x");
                            var x = ASF.Utils.parseJSON(xAttr);
                            var isSave = true;
                            if(x){
                                if('false' == x.saveAction){
                                    isSave = false;
                                }
                            }
                            var nodeXml = node2xml($thisField , me._options.SEPARATOR);
                            if(isSave){
                                 rows.push(nodeXml);
                            }
                        });
                        rows.push("</Row>");
                    }
                });
            }

			rows.push("</Rows>");
			
			var result = rows.join("");
			
			if(__ASF_DEBUG__){
				console.log("[ASF.XForm] __DATA=" + result);
			}
			return result;
		},
		valid : function (){
			var $target = this.$target;
			var xElements = $target.find("[x]").filter(function( index ) {
				var $childElem = $(this);
				var isNotSubtableTemplate = $childElem.parents(".asf-subtable-content-template-container").length <= 0;
				return isNotSubtableTemplate;
			});
			var result = true;
			
			xElements.each(function(i){
				var control = this;
				var $elem = $(this);
				var xElementAttr = $elem.attr("x");
				var x = ASF.Utils.parseJSON(xElementAttr);
				var isReadOnly = $elem.is(".asf-readonly");
				
				if( x && !isReadOnly){
					control.x = x;
					control.x.validator =  x.validator || "";
					try{
					 	var validator = new XBit.Validator(control);
					 	initControlValidator(control , validator);
						validator.init();
						var validResult = validator.valid(true);
						if(__ASF_DEBUG__){
							console.log(control);
							console.log("validResult:" + control.x.XPath + " : " + validResult);
						}
						if(validResult == -1){
							result = false;
						}
					}catch(e){
						if(__ASF_DEBUG__){
							console.log(e);
						}
						alert("错误代码(Error:0001)，请联系系统管理员。");
						result = false;
						return false;
					}
				}
			});
			
			var resultMsg = result ? "校验成功" : "校验失败";
			console.log("[ASF.XForm] " + resultMsg);
			return result;
		}
	};
	
	/*private functions*/
	/*********************************************************/
	/**
	 * @param $elem {Object} wrapper element object
	 * @param x {Object} element x attribute JSON Object
	 * @param separator {String} separator of show values.
	 */
	function getElementValue($elem , x , separator){
		var result = "";
		if(window.af){
			result = getAFElementValue($elem , x , separator);
		}else if(window.jQuery && window.jQuery.mobile){
			result = getJQMElementValue($elem , x , separator);
		}else if(window.Framework7){
			result = getFW7ElementValue($elem , x , separator);
		}
		return result;
	}
	
	/*f7*/
	function getFW7ElementValue($elem , x , separator){
		var result = {};
		var items , values=[] , texts=[];
		
		if($elem){
			switch(x.plugin){			
				case "select":
					items = $elem.find("option:selected");
					items.each(function(){
						var $this = $(this);
						values.push($this.val());
						texts.push($this.text());
					});					
					result = {
						value : values.join(separator),
						showValue : texts.join(separator)
					};
					break;
					case "radio":
					items = $elem.find("input[type='radio']:checked");
					result = {
						value : items.val(),
						showValue : items.siblings(".item-title").html()
					};
					break;
					case "date":
					var time = Date.parse($elem.val());
					var date = new Date(time);
					result = {
						value : date.format("yyyy-MM-dd")
					};
					break;
				case "datetime-local":
					var str = "" ;
					try{
						var val = $elem.val();
						if(val){
							var time = Date.parse($elem.val());
							var date = new Date(time);
							str = date.format("yyyy-MM-dd hh:mm:ss") ;
						}
					}catch(e){
					    console.error(e);
					}

					result = {
						value : str
					};
					break;
				case "checkbox":
					items = $elem.find("input[type='checkbox']:checked");
					items.each(function(){
						var $this = $(this);
						values.push($this.val());
						texts.push($this.siblings(".item-inner").find(".item-title").html());
					});
					result = {
						value : values.join(separator),
						showValue : texts.join(separator)
					};
					break;
					case "userSelect":
					items = $elem.find(".userSelect_showValue");
					texts = items.val();
					
					values = $elem.find(".userSelect_hidden").val();
					
					result = {
						value : values,
						showValue : texts
					};
					break;
					case "codeSelect":
					items = $elem.find(".codeSelect_showValue");
					texts = items.val();
					
					values = $elem.find(".codeSelect_hidden").val();
					
					result = {
						value : values,
						showValue : texts
					};
					break;
				case "toggle":
					var isChecked = false ;
					var input = $elem.find("input.asf-switch-input");
					if(input){
						isChecked = input.prop('checked');
					}
					result = {
						value : isChecked ? "1":"0"
					};
					break;
					default:
					var isNotEditable = $elem.is(".asf-not-editable");
					var tempValue = "";
					if(isNotEditable){
						tempValue = $elem.html();
					}else{
						tempValue = $elem.val();
					}
					result = {
							value : tempValue
					};
					break;
				
			    }
		}
		
		return result;
	}
	
	/**
	 * get jQuery Mobile element value
	 */
	function getJQMElementValue($elem , x , separator){
		var result = {};
		var items , values=[] , texts=[];
		
		if($elem){
			switch(x.plugin){
				case "radio":
					items = $elem.find("input[type='radio']:checked");
					result = {
						value : items.val(),
						showValue : items.siblings("label").html()
					};
					break;
				case "checkbox":
					items = $elem.find("input[type='checkbox']:checked");
					items.each(function(){
						var $this = $(this);
						values.push($this.val());
						texts.push($this.siblings("label").html());
					});
					result = {
						value : values.join(separator),
						showValue : texts.join(separator)
					};
					break;
				case "select":
					items = $elem.find("option:selected");
					items.each(function(){
						var $this = $(this);
						values.push($this.val());
						texts.push($this.text());
					});
					
					result = {
						value : values.join(separator),
						showValue : texts.join(separator)
					};
					break;
				case "toggle":
					items = $elem.find("option:selected");
					items.each(function(){
						var $this = $(this);
						values.push($this.val());
						texts.push($this.text());
					});
					
					result = {
						value : values.join(separator),
						showValue : texts.join(separator)
					};
					break;
				case "wh"://.NET文号:2015-04-21
					items = $elem.find("option:selected");
					items.each(function(){
						var $this = $(this);
						values.push($this.val());
						texts.push($this.text());
					});
					
					result = {
						value : texts.join("") + "," + values.join(""),
						showValue : texts.join("")
					};
					break;
				case "codeSelect":
					items = $elem.find("input.codeSelect_showValue");
					texts = items.val();
					
					items = $elem.find("input.codeSelect_hidden");
					values = items.val();
					result = {
						value : values,
						showValue : texts
					};
					break;
				case "userSelect":
					items = $elem.find("input.userSelect_showValue");
					texts = items.val();
					
					items = $elem.find("input.userSelect_hidden");
					values = items.val();
					result = {
						value : values,
						showValue : texts
					};
					break;
				default:
					var isNotEditable = $elem.is(".asf-not-editable");
					var tempValue = "";
					if(isNotEditable){
						tempValue = $elem.html();
					}else{
						tempValue = $elem.val();
					}
					result = {
							value : tempValue
					};
					break;
			}
		}
		
		return result;
	}
	
	/**
	 * get AppFramework Element value
	 * @deprecated 暂不使用AppFramework框架
	 */
	function getAFElementValue($elem , x , separator){
		var result = {};
		var items , values=[] , texts=[];
		
		if($elem){
			switch(x.plugin){
				case "radio":
					items = $elem.find("input[type='radio']:checked");
					result = {
						value : items.val(),
						showValue : items.siblings("label").html() //TO DO:find out show value
					};
					break;
				case "checkbox":
					items = $elem.find("input[type='checkbox']:checked");
					items.each(function(){
						var $this = $(this);
						values.push($this.val());
						texts.push($this.siblings("label").html());
					});
					result = {
						value : values.join(separator),
						showValue : items.html()
					};
					break;
				case "datetime":
					var time = Date.parse($elem.val());
					var date = new Date(time);
					result = {
						value : date.format("yyyy-MM-dd hh:mm:ss")
					};
					break;
				case "select":
					items = $elem.find("option:checked");
					items.each(function(){
						var $this = $(this);
						values.push($this.val());
						texts.push($this.text());
					});
					result = {
						value : values.join(separator),
						showValue : texts.join(separator)
					};
					break;
				case "toggle":
					items = $elem.find("input[type='checkbox'][class='toggle']");
					
					result = {
						value : items.is(":checked"),
						showValue : items.html()
					};
					break;
				default:
					result = {
						value : $elem.val()
					};
					break;
			}
		}
		return result;
	}
	
	/**
	 * 判断哪些控件可能需要保存显示
	 */
	function hasShowValue($elem){
		var xAttr = $elem.attr("x");
		var x = ASF.Utils.parseJSON(xAttr);
		var result = false;
		var plugins =["radio" , "checkbox" , "select" , "toggle" , "codeSelect" , "userSelect","toggle"];
		if(x){
			$.each(plugins , function(index , item){
				if(item == x.plugin){
					result = true;
					return false;//跳出循环
				} 
			});
		}

		return result;
	}
	
	function node2xml($elem , separator){
		var result = "";
		var xAttr = $elem.attr("x");
		var x = ASF.Utils.parseJSON(xAttr);
		if(x){
			var xpath = x["XPath"];
			var xpathShow = x["ShowName"];
			
			//保存VALUE
			result += node2xml_inner($elem , xpath ,  separator);
			
			//保存显示值
			if(xpathShow && xpath && hasShowValue($elem)){
				if(xpathShow != xpath){
					result += node2xml_inner($elem , xpathShow ,  separator , true);
				}
			}
		}
		return result;
	}
	
	/**
	 * .asf-readonly: 只读，不保存
	 * .asf-not-editable: 只读，保存
	 */
	function node2xml_inner($element , xpath , separator , isShowValue){
		var result = [];
		var xAttr = $element.attr("x");
		var x = ASF.Utils.parseJSON(xAttr);
		var isReadOnly = $element.is(".asf-readonly");
		var isNotEditable = $element.is(".asf-not-editable");

		if( x ){
		    var canSave = true;
		    var plugin = x.plugin;
		    if(plugin == "userSelect" || plugin == "codeSelect"){
		        if(isNotEditable){
                    canSave = false;
                }
		    }
		    if(xpath && !isReadOnly && canSave){
				result.push("<");
				result.push(xpath);
				
				var tableName = getNodeAttribute( "TableName" , x["TableName"], "");
				result.push(tableName);
				
				var dbType = "";

				if(isShowValue){
					dbType = getNodeAttribute("DbType" , "STRING", "STRING");
				}else{
					dbType = getNodeAttribute( "DbType" , x["dbType"] , "STRING");
				}
				result.push(dbType);
				
				if(x["PrimaryKey"]){
					var primaryKey = getNodeAttribute( "PrimaryKey" , x["PrimaryKey"] , "false");
					result.push(primaryKey);
				}
				
				//不保存
				if(x["action"] == "0"){
					var action = getNodeAttribute( "Action" , x["action"], "0" );
					result.push(action);
				}
				
				if(x["ProcessorExp"]){
					var ProcessorExp = getNodeAttribute( "ProcessorExp" , x["ProcessorExp"], "false" );
					result.push(ProcessorExp);
				}
				
				result.push(" Changed=\"true\" ");
				result.push("><![CDATA[");
				
				var elemResult = getElementValue($element , x  , separator);
				if(isShowValue){
					result.push(encodeXMLValue(elemResult.showValue));
				}else{
					result.push(encodeXMLValue(elemResult.value));
				}
				
				result.push("]]></");
				result.push(xpath);
				result.push(">");
			}
		}
		
		return result.join("");
	}
	
	function getNodeAttribute(attributeName, attributeValue, defaultValue) {
		var result = " ";
		defaultValue = defaultValue || "";
		attributeValue = attributeValue || defaultValue;
		
		if(attributeName == 'DbType' && (attributeValue == '93' || attributeValue == '91')){
			attributeValue = 'DATE';
		}
		
		if(attributeName){
			result += attributeName + "=\"" + attributeValue + "\""; 
		}
		
		
		return result;
	}
	
	function encodeXMLValue(value){
		if (value) {
			if (value.indexOf("<![CDATA[") >= 0) {
				value = value.replace("<![CDATA[", "<CDATA>");
			}
			if (value.indexOf("]]>") >= 0) {
				value = value.replace("]]>", "</CDATA>");
			}
		}
		return value;
	}
	
	//---------------------------------------------------------------
	/**针对XBit校验的辅助方法*/
	var ValidatorHelper = {};
	ValidatorHelper.getControlValue = function ( control ){
		if(!control)return "";
		var $elem = $(control);
		var separator = ",";
		var xAttr = $elem.attr("x");
		var x = ASF.Utils.parseJSON(xAttr);
		var elemResult = getElementValue($elem , x , separator);
		return elemResult.value;
	};
	//---------------------------------------------------------------

		//子表Begin---------------------------------------------------------------
        ASF.onOpenASFSubtable = function (){
            operateASFSubtablePopup("open");

            if(window.ASFActions){
                window.ASFActions.requestSubtableId();
            }else{
                //从服务器端获取子表ID
                getASFSubtableID(function(data){
                    fillASFSubtablePrimaryKey(data);
                });
            }
        }

        ASF.onSaveASFSubTableClick = function (controlId){
            operateASFSubtablePopup("close");

            var $subtableControl = $("#"+controlId);
            var $subtableItem = $(".asf-subtable-popup").find(".asf-subtable-content-template-container").clone();
            $subtableItem = $subtableItem.find(".asf-subtable-content-template").removeClass("asf-subtable-content-template").addClass("asf-subtable-content");
            $subtableItem.find("[x]").addClass("asf-subtable-control");
            $subtableItem.appendTo($subtableControl);
            ASF.initJQMForm();
        }
        
        ASF.onDelSubTable = function(e,controlId){
            $(e).closest("ul").remove();
            ASF.initSubTabIndex(controlId);
        }

		ASF.onAddASFSubtable = function (controlId){
            if(window.ASFActions){
                window.ASFActions.requestSubtableId(controlId);
            }else{
                //从服务器端获取子表ID
                getASFSubtableID(controlId,function(data){
                    fillASFSubtablePrimaryKey(data);
                });
            }
        }

        ASF.onAddASFSubtableLabel = function (controlId){
            var $subtableControl = $("#"+controlId);
            var $subtableItem = $("#"+controlId+"_template").find(".asf-subtable-content-template-container").clone();
            $subtableItem = $subtableItem.find(".asf-subtable-content-template").removeClass("asf-subtable-content-template").addClass("asf-subtable-content");
            $subtableItem.find("[x]").addClass("asf-subtable-control");
            $subtableItem.prepend("<li class='ui-field-contain ui-li-static ui-body-inherit ui-first-child'><label style='float:left;width:auto' class='asf-form-index'>行程明细</label><label style='float:right;width:auto'class='asf-form-label' onclick=ASF.onDelSubTable(this,'"+controlId+"')>删除</label></li>");
            var select = $subtableItem.find(".ui-select");
            select.removeClass();
            var div = select.find("div");
            div.removeClass();
            select.find("span").remove();
            $subtableItem.appendTo($subtableControl);

			ASF.onAddSubtableFinish($subtableItem,controlId);
        }

		//子表添加完成
		ASF.onAddSubtableFinish = function (item,controlId){
			//初始化添加的日期控件
			ASF.initJQMForm();
			//初始化添加的下拉框控件
			initSelect(item);
			//修改子表序号
			ASF.initSubTabIndex(controlId);
			
			if(typeof (onAddSubtableFinish) == "function"){
				onAddSubtableFinish(item);
			}
		}
        
		ASF.initSubTabIndex = function(controlId){
        	if(typeof (initSubTabIndex) == "function"){
        		initSubTabIndex(controlId);
        	}else{
        		$("#"+controlId).find(".asf-subtable-content").each(function(index  , item){
    				$(item).find(".asf-form-index").text("行程明细 "+(index + 1))
    			})
        	}
        	
		}

        function initSelect(e) {
            $(e).find("select").selectmenu();
        }

		ASF.onShowASFSubtable = function (e,controlId){
           var $subtableControl = $("#"+controlId);
           if($subtableControl.is(":hidden")){
                $subtableControl.show();
                $(e).text("收起");
           }else{
                $(e).text("展开");
                $subtableControl.hide();
           }
         }

        /**webview内部回调*/
        ASF.onFillASFSubtablePrimaryKey = function(data){
            if(__ASF_DEBUG__){
                console.log("[ASF.onFillASFSubtablePrimaryKey] data=" + data);
            }
            if(data){
                fillASFSubtablePrimaryKey(data);
            }else{
                console.log("[ASF.onFillASFSubtablePrimaryKey] do nothing");
                //do nothing
            }
        }

        function fillASFSubtablePrimaryKey(data){
        		data = ASF.Utils.parseJSON(data);
                var idSelector = "#"+(data.controlId)+"_template";
                var $jqmPopup = $(idSelector).filter("[data-role=popup]");
                var $primarykeyControl = $jqmPopup.find(".asf-subtable-primarykey");
                
                console.log("subtable primarykey control generate value=" + data.id);
                $primarykeyControl.val(data.id || "");

                var maintableInfoId = $("#TxtInfoId").val();
                var $infoIdControl = $jqmPopup.find(".asf-subtable-infoid");
                $infoIdControl.val(maintableInfoId);

                ASF.onAddASFSubtableLabel(data.controlId);
        }

        function operateASFSubtablePopup(action){
            var idSelector = ".asf-subtable-popup";
            var $jqmPopup = $(idSelector).filter("[data-role=popup]");
            if($jqmPopup.length > 0){
                if(action == 'open'){
                    try{
                        $jqmPopup.popup('open');
                    }catch(e){
                        alert("打开子表窗口出错");
                    }
                }else if(action == 'close'){
                    try{
                        $jqmPopup.popup('close');
                    }catch(e){
                        alert("关闭子表窗口出错");
                    }
                }
            }
        }


        function getASFSubtableID(controlId,callback){
            var url = 'action?getIDAction=1';
            var href = window.location.href;
            //debug: window.ASF_SERVER_BASE_URL = "http://192.168.1.187:8080/ezweb/";
            if(!href){
                alert("子表主键地址有误,错误代码:ST001");
                return;
            }

            if(href && (!(href.startsWith("http") ||  href.startsWith("HTTP")) )) {
                if(!window.ASF_SERVER_BASE_URL){
                    alert("子表主键地址有误,错误代码:ST002");
                    return;
                }
                url = window.ASF_SERVER_BASE_URL + url;
            }

            console.log("[getASFSubtableID] queryUrl=" + url + ", window.ASF_SERVER_BASE_URL" + window.ASF_SERVER_BASE_URL);
            $.ajax({
                type : 'GET',
                url : url,
                data : {},
                dataType: "text",
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                success : function (data, status) {
                    var dataObj = ASF.Utils.parseJSON(data);
                    if(dataObj && dataObj.id && !isNaN(dataObj.id)){//是数字
                    	dataObj.controlId = controlId;
                        console.log("子表ID=" + dataObj.id);
                        callback(JSON.stringify(dataObj));
                    }else{
                        alert("子表ID获取失败");
                        callback();
                    }
                },
                error: function(data , status){
                    console.log(data);
                    alert("子表ID获取失败");
                    callback();
                }
            });
        }
        //---------------------------------------------------------------

	//exports:
	window.ASF.XForm = window.ASF.XForm || XForm;
	window.ASF.ValidatorHelper = window.ASF.ValidatorHelper || ValidatorHelper;
	//alias
	window.$a = window.ASF;
})(window , $);

/*========================================*/
/**
 * ASF - Utils
 */
(function(window , $){
	"use strict";
	
	var Utils = {};
	/**
	 * 解析JSON。
	 * 在JSON.parse()基础上加上try catch。
	 */
	Utils.parseJSON = function(jsonString){
		var resultObj = null;
		try{
			resultObj = JSON.parse(jsonString);
		}catch(e){
			//alert(jsonString);
			console.error("Error parsing JSON:" + e);
		}
		return resultObj;
	};
	
	/**
	 * 将查询字符串转换为Object
	 * @param queryString "a1=v1&a2=&a3=a3";// test only
	 */
	Utils.getQueryString = function (queryString) { 
		var result = {};
		if(queryString){
			var pairs = queryString.split("&"); 
			for(var i = 0; pairs && i < pairs.length; i++) { 
				var pair = pairs[i];
				var pos = pair.indexOf('=');
				if (pos == -1) continue;
				var key = pair.substring(0,pos);
				var value = pair.substring(pos+1);
				value = decodeURIComponent(value); // 若需要，则解码
				result[key] = value; 
			} 
		}
		return result;
	}; 
	
	// exports:
	window.ASF = window.ASF || {};
	window.ASF.Utils = window.ASF.Utils || Utils;
	//alias
	window.$a = window.ASF;
})(window , $);

/*========================================*/
/**
 * ASF - maxlength
 */
(function(window , $){
	"use strict";
	
	var MaxLength = {};
	
	/**
	 * 实现textarea maxlength功能
	 * 依赖jquery.freeChars.js , $.fn.pasteEvents
	 * 
	 * 使用说明:
	 * 		自动:直接增加样式asf-maxlength
	 * 			<li class="ui-field-contain asf-maxlength" >{XXNR}</li>
	 * 
	 * 		手动:
	 *  	    1.增加id="info"
	 *  			<li class="ui-field-contain" id="info">{XXNR}</li>
	 *  
	 *  		2.
	 *  			$(function(
	 *  	   	    	var options = {
	 *						target : $("#info")
	 *		    		};
	 *		    		ASF.MaxLength.init(options); 
	 *  			));
	 *  
	 * @version 2015-10-22
	 */
	MaxLength.init = function (options){
		var defaults = {
				target : $(".asf-maxlength"),
				totalCount : 300,
				desc : "",
				separator : "/",
				location : "bottom", //bottom , top
				limit : false
		};
		var config;
		
		if(options){
			config = $.extend({}, defaults, options);
		}else{
			config = defaults;
		}
		
  		var $target = config.target;
  		
  		var maxLengthTitle = "<div class=\"asf-maxlength-header\">"
  			+ "<span class=\"asf-maxlength-desc\">"+config.desc+"</span>"
  			+ "<span class=\"asf-maxlength-available\">0</span>"
  			+ config.separator
  			+ "<span class=\"asf-maxlength-total\">"+config.totalCount+"</span>";
  			+ "</div>";
  		
  		var $targetText = $target.find("textarea");
  		if($targetText.length > 0){
  			if(config.location == "bottom"){
  				$target.append(maxLengthTitle);
  			}else{
  				$target.prepend(maxLengthTitle);
  			}
  			
  			var $availableCount = $target.find(".asf-maxlength-available");
			
			//限制长度
			if(config.limit){
				$targetText.prop('maxlength', config.totalCount);
			}
  			
  		    var freeChars = $targetText.freeChars({ 
  		    	update: $availableCount,
  		    	maxLength : config.totalCount,
				limit : config.limit
  		    });
  		}
  	}
	
	// exports:
	window.ASF = window.ASF || {};
	window.ASF.MaxLength = window.ASF.MaxLength || MaxLength;
	//alias
	window.$a = window.ASF;
	
	$(function(){
		ASF.MaxLength.init();
	});
})(window , $);

/*========================================*/
/**
 * ASF - WebView function calls
 */
(function(window , $){
	"use strict";
	window.ASF = window.ASF || {};
	
	/*form save action*/
	ASF.saveForm = function(isAutoSave , paramObject){
		if(typeof (beforeASFSaveForm) == "function"){
			console.log("[ASF.saveForm()] beforeASFSaveForm()");
			beforeASFSaveForm(function(result){
				if(result){
					ASF.saveFormInner(isAutoSave , paramObject);
				}
			});
		}else{
			ASF.saveFormInner(isAutoSave , paramObject);
		}
		
		
		if(typeof (afterASFSaveForm) == "function"){
			console.log("[ASF.saveForm()] afterASFSaveForm()");
			afterASFSaveForm();
		}
	};
	
	ASF.afterSaveForm = function(result){
		if(typeof (afterFinishASFSaveForm) == "function"){
			console.log("[ASF.saveForm()] afterFinishASFSaveForm()");
			afterFinishASFSaveForm(result);
		}
	}
	
	ASF.saveFormInner = function(isAutoSave , paramObject){
		if($.isFunction(window.saveForm)){//自定义保存
			if(__ASF_DEBUG__){
				try{
					console.log("[ASF.saveForm()] execute custom saveForm(isAutoSave , paramObject)");
					console.log("[ASF.saveForm()] isAutoSave: " + isAutoSave);
					console.log("[ASF.saveForm()] paramObject: " + JSON.stringify(paramObject));
				}catch(e){
					console.log(e);
				}
			}
			window.saveForm(isAutoSave , paramObject);
		}else{
			var xform = new ASF.XForm($("body"));//$("#form")
			
			var validResult = xform.valid(); 
			if(validResult){
				var xml = xform.getXFormXml();
				//调用Android WebView中绑定的自定义ASFActions对象
				if(window.ASFActions){
					var strParamObject = "";
					try{
						strParamObject = JSON.stringify(paramObject);
					}catch(e){
						strParamObject = "";
					}
					
					if(isAutoSave){
						ASFActions.save(xml , true, strParamObject);	//自动保存
					}else{
						ASFActions.save(xml , false, strParamObject);			//非自动保存
					}
				}else{
					console.log("[ASF.saveForm()] window.ASFActions is undefined");
				}
			}else{
				alert("表单校验失败!");
			}
		}
	}

	//表单加载完成
	ASF.onXFormLoaded = function (data){
		if(typeof (onXFormLoaded) == "function"){
			onXFormLoaded(data);
		}
	}
	
	/**用户选择回调方法*/
	ASF.afterIosUserSelect = function (data){
		var parameter = null;
		if(isIos()){
			parameter = data;
		}else{
			parameter = data.data;
		}
		if(parameter && parameter.type){
			if("departResult" == parameter.type){
				ASF.afterUserSelect(parameter.controlId , parameter.resultJson);
			}
		}
	}
	
	
	/**用户选择回调方法*/
	ASF.afterUserSelect = function(controlId , resultJson){
		console.log("controlId:" + controlId + " resultJson:" + resultJson);
		var userData = ASF.Utils.parseJSON(resultJson);
		var userJson;
		if(userData.type){
		   userJson = userData.data;
		}else{
		   userJson = userData;
		}
		var userNames = "";
		var userIds = "";
		if(userJson && userJson.length > 0){
			for(var i = 0; i < userJson.length; i++){
				if(i == 0){
					userNames += userJson[i].name || "";
					userIds += userJson[i].userId|| "";
				} else {
					userNames += ","+userJson[i].name|| "";
					userIds += ","+userJson[i].userId|| "";
				}
			}
		}
		$("#" + controlId).val(userNames);
		$("#" + controlId + "_Hidden").val(userIds);
		if(typeof (onAfterCustomUserSelct) == "function"){
    		onAfterCustomUserSelct(controlId , userData);
		}
	};
	
	//会议室预订回调
	ASF.afterMeetingQuery = function(controlId , resultJson){
		var data = ASF.Utils.parseJSON(resultJson);
		if(typeof (onAfterMeetingQuery) == "function"){
    		onAfterMeetingQuery(controlId , data);
		}
	}
	
	//会议室预订查询
	ASF.openMeetingQuery = function(controlId){
		var data = $("#" + controlId + "_Data");
		var xAttr = data.attr("x");
		var parameter = {"controlId":controlId};
		if(xAttr){
			var x = ASF.Utils.parseJSON(xAttr);
		}
		if(isIos()){
			window.location.href = encodeURI("objc://openMeetingQuery::/" + JSON.stringify(parameter));
		}else{
			if(window.ASFActions){
				ASFActions.openMeetingQuery(JSON.stringify(parameter));
			}
		}
	}
	
	
	/**
	 * 获取URL参数，返回结果是Object.
	 * 示例:
	 * 		ASF.getQueryString().info_id;
	 * 		ASF.getQueryString().WF_ID;
	 */
	ASF.getQueryString = function () { 
		var queryStr = "";
		if(window.ASFActions){
			queryStr = ASFActions.getUrlParams();
		} else {
			queryStr = window.location.search;
		}
		return ASF.Utils.getQueryString(queryStr);
	}; 
	
	/**
	 * 打开手写签批意见图片
	 */
	var SIGNTURE_TEMP = "update";
	ASF.setSignture = function(id){
		//调用Android
		if(window.ASFActions){
			ASFActions.setSignture(id);
		}else{
			var json = {
    		   "type":"signture",
    		   "id":id
	   		};

		   	console.log(json);
		   	window.parent.postMessage(json ,"*");
		}
	};
	function updateIosSignture(data){
		var parameter = data.data;
		if(parameter && parameter.type){
			if("signtureResult" == parameter.type){
				ASF.updateSignture(parameter.name,parameter.time,parameter.id);
			}
		}
	}
	ASF.updateSignture = function(name,time,id){
        var sTime = $("#singTime_"+id);
        var sName = $("#singName_"+id);
        if(sTime.size()>0 && sName.size()>0){
            $("#singTime_"+id+"").html(time);
            $("#singName_"+id+"").html(name);
        }else{
            var sinContent = "";
            if(name && time ){
                sinContent = name+" "+time;
            }
            $("#sing_"+id+"").val(sinContent)
        }
    };
	
	/**
	 * 设置签名
	 */
	ASF.openHandWriteImage = function(url){
		url = url || null;
		ASFActions.openHandWriteImage(url);
	};
	
	/**
	 * 老的调用参数顺序 ASF.openUserSelect(controlId, selectType, codeId)(靖江财政使用) 
	 * 
	 * 新调用传入 
	 * 1.ASF.openUserSelect(controlId) (selectType 不需要传)
	 * 2.ASF.openCodeSelect(controlId, codeId)
	 * @author chenb 2016-06-02 10:47:26
	 */
	ASF.openUserSelect = function(controlId, codeId, selectType){
		if('user' == codeId || 'code' == codeId){//此处兼容老的调用(靖江财政使用) 
			var temp = selectType;
			selectType = codeId;
			codeId = temp;
		}
	
		codeId = codeId || "";
		//var names = $("#" + controlId).val();
		var projectName = $("#" + controlId + "_Hidden_ProjectName").val();
		var ids = $("#" + controlId + "_Hidden").val();
		var data = $("#" + controlId + "_Data");
		var xAttr = data.attr("x");
		// isRadio 控制单复选，rootDepartId仅用于人员选择控件查询某个部门人员，可以为多个
		var isRadio;
		var rootDepartId;
		var isAssignDepart;
		if(xAttr){
			var x = ASF.Utils.parseJSON(xAttr);
			isRadio = x.isRadio;
			isAssignDepart = x.isAssignDepart;
			rootDepartId = x.rootID;			
			if(!isRadio){
				isRadio = "false";
			}
			
			
			if(!isAssignDepart){
				isAssignDepart = "false";
			}
			
			if(!rootDepartId){
				rootDepartId = '';
			}
		}
		
		var objs = [];
		if(ids){
			var idArray = ids.split(",");
			for (var int = 0; int < idArray.length; int++) {
				var id = idArray[int];
				var obj = {"id":id};
				objs.push(obj);
			}
		}

		var jsonObj = {"selected":objs,"isRadio":isRadio,"isAssignDepart":isAssignDepart};
		if(xAttr){
			var x = ASF.Utils.parseJSON(xAttr);
			jsonObj.xAttr = x;
		}
		var selectedUsers = JSON.stringify(jsonObj);
		if(selectType && 'code' == selectType){
			ASF.openCodeSelect(controlId, codeId);
		} else if (selectType && 'depart' == selectType){
			var id = $("#" + controlId + "_Hidden_Depart").val();
			jsonObj.projectName = projectName;
			if(window.ASFActions){
				jsonObj.rootId = id;
				selectedUsers = JSON.stringify(jsonObj);
			    ASFActions.openUserSelect(controlId, "depart", selectedUsers);
			}else{
				jsonObj.type = selectType;
				jsonObj.controlId = controlId;
				jsonObj.rootId = id;
	   			console.log(selectedUsers);
	   			if(isIos()){
	   				openUserIOS(jsonObj);
	   			}else{
	   				window.parent.postMessage(jsonObj ,"*");
	   			}
			}
		} else{
			jsonObj.rootId = rootDepartId;
			selectedUsers = JSON.stringify(jsonObj);
			if(window.ASFActions){
	   			ASFActions.openUserSelect(controlId, "user", selectedUsers);
			}else{
				jsonObj.type = "user";
				jsonObj.controlId = controlId;
	   			console.log(selectedUsers);
	   			if(isIos()){
	   				openUserIOS(jsonObj);
	   			}else{
	   				window.parent.postMessage(jsonObj ,"*");
	   			}
			}
		}
	}
	
	function openUserIOS(jsonObj){
		if(isIos()){
			var parameter = jsonObj;
			var baseURL = baseUrl();
			if(parameter && parameter.type){
				if("depart" == parameter.type){
					var url = baseURL + "?userContactActionAngular=1&action=getDepart&rootDeptId="+parameter.rootId;
//					var data = {
//							"type":parameter.type,
//							"controlId":parameter.controlId,
//							"url":url,
//							"isRadio":parameter.isRadio
//					};
//					parameter.url = url;
				}else if("user" == parameter.type){
					var url = baseURL + "?getPickBaseOU=1&userId="+user_id+"&pickType="+type+"&exclude=";
					if(parameter.rootId && parameter.rootId != ''){
						url = url + "&rootId="+parameter.rootId;
					}
//					var data = {
//							"type":parameter.type,
//							"controlId":parameter.controlId,
//							"url":url,
//							"isRadio":parameter.isRadio
//					};
//					parameter.url = url;
					
				}else if("code" == parameter.type){
					var url = baseURL + "?getCodeSelect=1&userId="+user_id+"&codeId="+parameter.codeId;
//					var data = {
//							"type":parameter.type,
//							"controlId":parameter.controlId,
//							"url":url,
//							"isRadio":parameter.isRadio
//					};
//					parameter.url = url;
			
				}
				parameter.selected = "";
				window.location.href = encodeURI("objc://xsfOrgPicker::/" + JSON.stringify(parameter));
			}
			
	    }
	}
	
	ASF.openCodeSelect = function(controlId, codeId){
		if('wechat' == window['runtime']){
			var json = {
					type : "openCodeSelect",
					result : false,
					controlId : controlId,
					codeId : codeId,
					resultMsg : ""
			};
			console.log(json);
			window.parent.postMessage(json ,"*");
		} else {
			codeId = codeId || "";
			var ids = $("#" + controlId + "_Hidden").val();
			var data = $("#" + controlId + "_Data");
            var xAttr = data.attr("x");
            var isRadio;
            if(xAttr){
                var x = ASF.Utils.parseJSON(xAttr);
                isRadio = x.isRadio;
                if(!isRadio){
                    isRadio = "false";
                }
            }
			var objs = [];
			if(ids){
				var idArray = ids.split(",");
				for (var k = 0; k < idArray.length; k++) {
					var id = idArray[k];
					var obj = {"id":id};
					objs.push(obj);
				}
			}
			var jsonObj = {"selected":objs,"isRadio":isRadio};
			if(xAttr){
				var x = ASF.Utils.parseJSON(xAttr);
				jsonObj.xAttr = x;
			}
			var selectedUsers = JSON.stringify(jsonObj);
			if(window.ASFActions){
				ASFActions.openCodeSelect(controlId, "code", selectedUsers, codeId);
			}else{
				jsonObj.type = "code";
				jsonObj.controlId = controlId;
				jsonObj.codeId = codeId;
				if(isIos()){
	   				openUserIOS(jsonObj);
	   			}else{
	   				window.parent.postMessage(jsonObj ,"*");
	   			}
			}
			
		}
	}
	
	
	/**
	 * 工信部统计查询用户信息选择
	 */
	ASF.openUserInfoSelect = function(jsonStr){
	 	if (isIos()) {
			window.location.href = encodeURI("objc://xsfOrgPicker::/"
					+ jsonStr);
			
		} else {
			if(window.WebViewActions){
				window.WebViewActions.openUserSelect(jsonStr);
			}
			
		}
	};
	
	/**
	 * 工信部统计查询查看详情
	 */
	ASF.openStatisticsInfo = function(jsonStr){
		if (isIos()) {
	   	 	window.location.href = encodeURI("objc://openStatisticsInfo::/"  + jsonStr);
	   	} else {
	   		if(window.WebViewActions){
	   			window.WebViewActions.openStatisticsInfo(jsonStr);
	   		}
	   	}
	};

	ASF.afterPickDate = function(controlId , datetime){
        $("#" + controlId).val(datetime);
	}
	
	
	
	
	/**
	 * 打开附件
	 * 打开意见附件调用示例
	 * ASF.openFile('{type:\'opinion_attach\',name:\'1.png\',id:\'1543\'}')
	 */
	ASF.openFile = function(jsonStr){
		jsonStr = jsonStr || "";
		ASFActions.openFile(jsonStr);
	};
	
	/***
	 * 工信部 - 演示2016 : 会议报名
	 */
	ASF.enroll = function(){
		if(isIos()){
			var parameter = {"type":"enroll"};
			window.location.href = encodeURI("objc://xsfOrgPicker::/" + JSON.stringify(parameter));
		}else{
			ASFActions.enroll();
		}
		
	};
	
	/**刷新表单*/
	ASF.refresh = function(){
		ASFActions.refresh();
	}
	
	/**
	 * Android从表单获取参数
	 */
	function syncXFormParams(){
		var wfId = $("#TxtWfID").val() || "";
		var infoId = $("#TxtInfoId").val() || "";
		var formExist = false;//表单是否存在。
		
		//如果找到主键中的TxtInfoId，表明这个表单是正常的。
		if($("#TxtInfoId").length > 0){
			formExist = true;
		}
		
		if(__ASF_DEBUG__){
			console.log("[syncXFormParams()] infoId=" + infoId + ", wfId=" + wfId + ", formExist=" + formExist);
		}
		
		var params = {
				WFID : wfId,
				INFO_ID : infoId,
				FORM_EXIST : formExist
		};
		var jsonStr = "";
		try{
			jsonStr = JSON.stringify(params);
		}catch(e){
			jsonStr = "";
			console.log(e);
		}
		if(isIos()){
			window.location.href = encodeURI("objc://syncXFormParams::/" + JSON.stringify(jsonStr));
	    }else{
	    	if(window.ASFActions){
				ASFActions.syncXFormParams( jsonStr );
			}
	    }
		
		var parent = window.parent;
		if(parent && typeof (parent.onFormLoad) == "function"){
			parent.onFormLoad(jsonStr);
		}
	}

	//修改摘要
    ASF.openSummary = function(infoId,actName){
       if(window.ASFActions){
          var infoId = infoId.toString();
          ASFActions.openSummary(infoId, actName);
       }
    }
	
	/**
	 * 根据location.href判断是否是.IOS请求表单
	 * @returns {Boolean}
	 */
	function isIos(){
		var url = location.href;
		var result = false;
		if(url){
			url = url.toUpperCase();
			var index = url.indexOf("PLATFORM=IOS");
			if(index > 0){
				result = true;
			}
		}
		return result;
	}
	
	/**
	 * 根据location.href
	 */
	function baseUrl(){
		var url = location.href;
		var result = "";
		if(url){
			var index = url.indexOf("?");
			if(index > 0){
				result = url.substring(0,index);
			}
		}
		return result;
	}
	
	/**
	 * 将ASF.getQueryString()获取到的URL参数赋给全局变量
	 * 包含:info_id,pid,pnid,WF_ID,moduleId,formId
	 */
	function initGlobalQueryString(){
		var queryStrObj = ASF.getQueryString();
		for(var obj in queryStrObj){
			window[obj] = queryStrObj[obj];//deprecated
			ASF[obj] = queryStrObj[obj];//Since2017-05-11
		}
	}

	function initPageParameters(){
	    var pageParams = "";
	    var pageBaseUrl = "";
	    if(window.ASFActions && window.ASFActions.getPageInitParameters){
	        pageParams = ASFActions.getPageInitParameters();
	        var paramsJSON = ASF.Utils.parseJSON(pageParams);
	        if(paramsJSON.serverBaseURL){
	            window.ASF_SERVER_BASE_URL = paramsJSON.serverBaseURL;
	        }
	    }else if(window.WebViewActions && window.WebViewActions.getPageInitParameters){
	    	pageParams = window.WebViewActions.getPageInitParameters();
	        var paramsJSON = ASF.Utils.parseJSON(pageParams);
	        if(paramsJSON.serverBaseURL){
	            window.ASF_SERVER_BASE_URL = paramsJSON.serverBaseURL;
	        }
	    }else{
            window.ASF_SERVER_BASE_URL = getWebRootPath();
	    }
	    console.log("[initPageParameters] window.ASF_SERVER_BASE_URL=" +window.ASF_SERVER_BASE_URL );
	}

	function getWebRootPath(){
	    var theWetRootPath = "";
	    try{
            var pathName = window.location.pathname.substring(1);
            var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
            theWetRootPath = window.location.protocol + '//' + window.location.host + '/' + webName + "/";
        }catch(e){
            console.error(e);
        }
        return theWetRootPath;
	}

	/**
	 * 处理window收到消息后
	 */
	function onAfterUserSelect(e) {
		console.log("[receive window message data] [asf.js onAfterUserSelect] " + e);
		if (e && e.data && e.data.action == 'afterUserSelect'){
			ASF.afterUserSelect(e.data.controlId, e.data.resultJson);
		}
	}
	
    /**
     * 给表单中的图片添加绝对路径 ，表单中添加如下JS：
        $(function(){
            var webRootPath = "http://192.168.1.187:8080";
            ASF.initImagePath(webRootPath);
         });
     */
    ASF.initImagePath = function(rootPath , pathPrefix){
        var $imgObjs;
        if(!rootPath){
            alert("rootPath is undefined");
        }

        if(pathPrefix){
            $imgObjs = $("img[src^='"+pathPrefix+"']");
        }else{
            $imgObjs = $("img");
        }

        $imgObjs.each(function(){
            var src = $(this).attr("src");
            var absolutePath = rootPath + src;
            console && console.log("absolute img Path:" + absolutePath);
            $(this).attr("src" , absolutePath);
        });
    }
	
	function init(){
		window.addEventListener('message' , onAfterUserSelect , false);
		window.openCodeSelect = ASF.openCodeSelect;
		
		window.afterIosUserSelect = ASF.afterIosUserSelect;
		window.addEventListener('message' , window.afterIosUserSelect , false);
		
		window.updateIosSignture = updateIosSignture;
		window.addEventListener('message' , window.updateIosSignture , false);
	}
	
	init();
	
	$(function(){
		syncXFormParams();
		initGlobalQueryString();
        initPageParameters();
	});
})(window , $);


/*========================================*/
/**
 * ASF - jQuery Mobile Specific
 * ref: http://docs.mobiscroll.com/2-15-1/mobiscroll-core
 */
(function(window , $){
	function initMobiscroll(){
		var opt_data = {
		        preset:'date', //日期
		        //theme:'jqm', //皮肤样式
		        display:'bubble', //显示方式'bubble'
		        //mode:'clickpick', //日期选择模式
		        dateFormat: 'yy-mm-dd', // 日期格式
		        setText:'确定', //确认按钮名称
		        cancelText:'取消',//取消按钮名籍我
		        dateOrder: 'yymmdd', //面板中日期排列格式
		        yearText: '年', monthText: '月',  dayText: '日',  //面板中年月日文字
		        endYear:2050, //结束年份
		        showNow:true,
		        nowText:'今天',
		        // hourText:'小时',
		        //minuteText:'分'
				//当时间选择的内容发生变化触发的事件
                onSelect : function (valueText,inst){
					try{
						$(this).trigger('input');
					}catch(e){
					}
                }
		};
		
		var opt_data_datetime = {
		        preset:'datetime', //日期
		        //theme:'jqm', //皮肤样式
		        display:'bubble', //显示方式
		        //mode:'clickpick', //日期选择模式
		        dateFormat: 'yy-mm-dd', // 日期格式
		        setText:'确定', //确认按钮名称
		        cancelText:'取消',//取消按钮名籍我
		        dateOrder: 'yymmdd', //面板中日期排列格式
		        yearText: '年', monthText: '月',  dayText: '日',  //面板中年月日文字
		        endYear:2050, //结束年份
		        showNow:true,
		        nowText:'今天',
		        hourText:'时',
		        minuteText:'分',
				timeWheels: 'HHii',  
				timeFormat: 'HH:ii',
				//当时间选择的内容发生变化触发的事件
                onSelect : function (valueText,inst){
					try{
						$(this).trigger('input');
					}catch(e){
					}
                }
		};
		try{
			$(".asf-date").mobiscroll(opt_data);
			$(".asf-datetime").mobiscroll(opt_data_datetime);
		}catch(e){
			//console.error(e);
		}
	}
	
	function initNumber(){
		var id = '';
		var num = '';
		var cno = '';
		var wh = '';
		try{
			$(".asf-number").on("change" , function(){
				var parent  = $(this).parents(".asf-number-container");
				items = $(this).find("option:selected");
				items.each(function(){
					var $this = $(this);
					var values = $this.val();
					var txt = $this.text();
					if(values){
						var data = values.split(",");
						parent.find(".asf-number-wh").val(txt)
						parent.find(".asf-number-wh-cno").val(data[0]);
						parent.find(".asf-number-wh-id").val(data[1]);
						parent.find(".asf-number-wh-num").val(data[2]);
					}
				})
				
				
			});
		}catch(e){
			console.error(e);
		}
	}

	function refreshNav() {
		var activePage = $("body").pagecontainer("getActivePage");
		var tab = activePage.attr("id");
		
		var header = $("[data-role='header']");
		var activeNav = header.find(".soa-nav a[href='#" + tab + "']");
		var deactiveNav = header.find(".soa-nav a[href!='#" + tab + "']");
		deactiveNav.removeClass("ui-btn-active").removeClass("soa-nav-active");
		activeNav.addClass("ui-btn-active").addClass("ui-state-persist")
				.addClass("soa-nav-active");
	}
	
	function initJQMForm() {
/*		refreshNav();//refresh at first load
		$("body").on("pagebeforeshow", function(event) {
			refreshNav();
		});*/
		initMobiscroll();
		initNumber();
	}
	
	$(function(){
		initJQMForm();
	});

	window.ASF = window.ASF || {};
	window.ASF.initJQMForm = initJQMForm;

})(window , $);

/*========================================*/
/**
 * ASF - XBit.Validator.js
 * ASF针对XBit.Validator.js的辅助方法
 */
//---------------------------------------------------------------
/**
 * override of XBit functions for ASF:
 */
var alert1 = window.alert;
var $value = function(control){
	return ASF.ValidatorHelper.getControlValue(control);
}; 
var isHide = function(control){
	if(!control)return false;
	return $(control).is(":hidden");
};
var showErrorMessage = function(that , messages){
	//默认不弹出错误提示
	return true;
};
//TODO:String.fromCharCode
//---------------------------------------------------------------
/**
 * Error fix
 */
var _PT = { begin : function(){} , end : function(){} };
var XBit = {};
//---------------------------------------------------------------
/**
 * Nearly Unchanged copy from XBit.js to adapt XBit.Validator.js
 */
var m_checkAction = 0;
function $next(e, expr) {
	var p = $(e);
	while (p && p.length > 0) {
		var es = p.find(expr);
		if (es.length > 0) {
			return es[0];
		} else {
			p = p.parent();
		}
	}
};

function initControlValidator(control, validator) {
	var hasValid = false;
	//没有配置isNullAble则默认可为空
	if (control.x.isNullAble != undefined && !control.x.isNullAble) {//zhangx: if (!control.x.isNullAble) {
		validator.register(Validators.required).bind(control);
		hasValid = true;
	}
	var dataType = control.x.dbType;
	if (dataType == "Integer" || dataType == "Int16" || dataType == "Int32"
			|| dataType == "Int64") {
		validator.register(Validators.number).bind(control);
		hasValid = true;
	} else if (dataType == "Single" || dataType == "Double"
			|| dataType == "Decimal" || dataType == "NUMERIC") {
		validator.register(Validators.numeric).bind(control);
		hasValid = true;
	} else if (dataType == "DateTime" || dataType == "Time"
			|| dataType == "Date") {
		validator.register(Validators.date).bind(control);
		hasValid = true;
	}
	return hasValid;
}

String.format = function() {
	if (arguments.length <= 0 || arguments[0] == null)
		return null;
	var str = arguments[0];
	var index = 0;
	for ( var i = 1; i < arguments.length; i++) {
		if (arguments[i] != null) {
			//zhangx change isArray to $.isArray
			if ($.isArray(arguments[i])) {
				for ( var ii = 0; ii < arguments[i].length; ii++) {
					var re = new RegExp('\\{' + index + '\\}', 'gm');
					str = str.replace(re, arguments[i][ii]);
					index++;
				}
			} else {
				var re = new RegExp('\\{' + index + '\\}', 'gm');
				str = str.replace(re, arguments[i]);
				index++;
			}
		}
	}
	return str;
};

function $e(id) {
	return document.getElementById(id);
};
/*========================================*/