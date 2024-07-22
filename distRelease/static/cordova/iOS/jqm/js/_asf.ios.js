/*if(xsfHttp){
	调用壳的保存
	$.ajax = xsfHttp.ajax;
}*/
/**
 * @author zhang 2015-01-29
 */
(function(window , $){
	"use strict";
	
	/**
	 * 从URL中取FormId
	 */
	function getFormId(){
		var url = location.href;
		var formId = "";
		if(url){
			var index = url.indexOf("?");
			var params = url.substring(index + 1);
			var queryString = ASF.Utils.getQueryString(params);
			if(queryString){
				formId = queryString.formNo;
			}
		}
		return formId;
	}

	/**
	 * 根据location.href判断是否是.NET表单
	 * @returns {Boolean}
	 */
	function isDotNet(){
		var url = location.href;
		var result = false;
		if(url){
			url = url.toUpperCase();
			var index = url.indexOf("FILEQUERY.ASPX");
			if(index > 0){
				result = true;
			}
		}
		return result;
	}
	
	function saveForm(isAutoSave , paramObj){
		var xform = new ASF.XForm($("body"));//$("#form")
		
		var validResult = xform.valid(); 
		if(validResult){
			var xml = xform.getXFormXml();
			var params = { "__DATA" : xml };
			var formId = getFormId();
			
			var url = "";
			if(isDotNet()){
				url = "FlowSave.aspx?";
			}else{
				url = "action?XForm=0&Action=save&";
			}
			url += "XNO=" + formId;
			console.log("[asf.ios.js-saveForm()] save url:" + url);
			console.log("[asf.ios.js-saveForm()] isDotNet():" + isDotNet());

			var logname = "";
			var password = "";
			if(paramObj){
				logname = paramObj.logname || "";
				password = paramObj.password || "";
			}
			
			if(isDotNet()){
				doXFormSave(url , params);
			}else{
				xformFakeLogin(logname , password , function(loginResult){
					if(loginResult){
						doXFormSave(url , params);
					}else{
						alert("保存失败:Fail to login.");
					}
				});
			}
		}else{
			alert("表单校验失败!");
		}
	}

	function doXFormSave(url , params){
		$.ajax({
			type : 'POST',
			url : url,
			data : params,
			dataType: "text",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success : function (data, status) {
				var json = ASF.Utils.parseJSON(data);
				var resultMsg = "";
				if(json){
					if(json.result){
						resultMsg = "保存成功";
					}else{
						if( json.message && ("null" != json.message) ){
							resultMsg = "保存失败:" + json.message;
						}else{
							resultMsg = "保存失败";
						}
					}
				}else{
					resultMsg = "保存出错";
				}
				alert(resultMsg);
		    },
		    error: function(data , status){
		    	alert("保存失败:请求出错。");
		    }
		});
	}

	function xformFakeLogin(logname , password , callback){
		var url = 'action?userLogin=1';
		var userInfo = {
				logname : logname,	
				password : password,
				device_id : ""
		};
		var params = {
			"__DATA" : JSON.stringify(userInfo)
		};

		$.ajax({
			type : 'POST',
			url : url,
			data : params,
			dataType: "text",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success : function (data, status) {
				var json = ASF.Utils.parseJSON(data);
				if(json && json.rcode == 1){
					callback(true);
				}else{
					callback(false);
				}
		    },
		    error: function(data , status){
		    	alert("保存失败:登录出错。");
		    }
		});
	}
	
	/**
	 * 处理window收到消息后
	 */
	function onReceiveWindowMessage(e) {
		if (e.source != window.parent) {
			return;
		}
		var dataString = e.data;
		console.log("[receive window message data] " + dataString);
		
		if(dataString){
			var json = ASF.Utils.parseJSON(dataString);
			if(json){
				var action = json["action"];
				var isAutoSave = json["isAutoSave"];
				var paramString = json["paramString"];
				var paramObject = ASF.Utils.parseJSON(paramString);
				if(action == "saveForm"){
					ASF.saveForm(isAutoSave , paramObject);
				}
			}
		}
		
	}
	
	function init(){
		window.addEventListener('message' , onReceiveWindowMessage , false);
		window.saveForm = saveForm;//自定义保存方法提供给ASF.saveForm()调用
	}
	
	init();
})(window , $);



