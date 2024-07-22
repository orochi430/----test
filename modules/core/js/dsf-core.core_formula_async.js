/*!
 * Name: @dsf/cli-core
 * Version: 5.17.0-alpha.5
 * Description: 核心模块
 * BuildTime: 2024/6/19 17:49:24
*/
(("undefined"!==typeof self?self:this)["webpackJsonpcore"]=("undefined"!==typeof self?self:this)["webpackJsonpcore"]||[]).push([[7],{300:function(r,t,n){var e=n(145),u=n(147),i=n(105),a=n(146);function o(r){return e(r)||u(r)||i(r)||a()}r.exports=o,r.exports.__esModule=!0,r.exports["default"]=r.exports},307:function(r,t,n){"use strict";n.r(t);var e=n(1),u=n.n(e),i=n(300),a=n.n(i),o={MONTH:function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"1";r=+r;var n=+this.$viewData[this.$tableName+".stat_tab_month"];return!_.isNaN(r)&&!_.isNaN(n)&&(0==t?1<=r&&r<=n:2==t?n<=r<=12:1<=r&&r<=12)},YEAR:function(r){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"1";r=+r;var n=+this.$viewData[this.$tableName+".stat_tab_year"];return!_.isNaN(r)&&!_.isNaN(n)&&(0==t?1800<=r&&r<=n:2==t?n<=r:1800<=r)},CASE:function(){var r=Array.from(arguments),t=0;while(t<r.length){var n=r[t],e=r[t+1];if(!e)return n();if(n())return e();t+=2}},IFTHEN:function(r,t){return r&&t?t():r},IF:function(r){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return r?t:n},INLIST:function(){for(var r=Array.from(arguments),t=a()(r),n=t[0],e=t.slice(1),u=0;u<e.length;u++)if(e[u]==n)return!0;return!1},ISCH:function(r){return/^[\u4e00-\u9fa5]+$/.test(r)},ISEN:function(r){return/^[a-zA-Z]+$/.test(r)},ISLOWER:function(r){return!/[A-Z]/g.test(r)},ISNULL:function(r){return""==r||void 0==r||null==r},ISUPPER:function(r){return/^[A-Z]+$/.test(r)},LEFT:function(r,t){return t=+t,Number.isNaN(t)?"":r.substring(0,t)},LEN:function(r){var t;return null!==(t=null===r||void 0===r?void 0:r.length)&&void 0!==t?t:0},LOOKAT:function(r,t){var n=new RegExp(r).exec(t);return n?n.index:-1},LOWER:function(r){var t;return null!==(t=null===r||void 0===r?void 0:r.toLocaleLowerCase())&&void 0!==t?t:""},MATCH:function(r,t){var n,e;return null!==(n=null===(e=new RegExp(r))||void 0===e?void 0:e.test(t))&&void 0!==n&&n},MAX:function(){return Math.max.apply(Math,u()(this.array_develop(Array.from(arguments))))},MID:function(r,t,n){var e;return t=+t,n=+n,_.isNaN(t)?"":(t-=1,t<=0&&(t=1),_.isNaN(n)?n=void 0:n+=t,null!==(e=null===r||void 0===r?void 0:r.substring(t,n))&&void 0!==e?e:"")},MIN:function(){return Math.min.apply(Math,u()(this.array_develop(Array.from(arguments))))},NOT:function(r){return!r},NOTNULL:function(r){return!(""===r)},OR:function(){for(var r=Array.from(arguments),t=0;t<r.length;t++)if(0==!r[t])return!0;return!1},REPLACEALL:function(r,t,n,e){var u;return null!==(u=null===r||void 0===r?void 0:r.replace(new RegExp(t,null!==e&&void 0!==e?e:""),n))&&void 0!==u?u:""},RIGHT:function(r,t){var n;return null!==(n=null===r||void 0===r?void 0:r.substring(t))&&void 0!==n?n:""},ROUND:function(r){return Math.round(r)},SUM:function(){var r;return(r=dsf.math).sum.apply(r,u()(this.array_develop(Array.from(arguments))))},TRIM:function(r){var t,n;return null!==(t=null===r||void 0===r||null===(n=r.trim())||void 0===n?void 0:n.replace(/\s{2,}/g,""))&&void 0!==t?t:""},TRUNC:function(r){return Math.trunc(r)},UPPER:function(r){var t;return null!==(t=r.toLocaleUpperCase())&&void 0!==t?t:""},VERIFYCODE:function(r){if(""==r)return!1;if(10!=r.length)return!1;var t=/[0-9A-HJ-NPQRTUWXY]{8}-[0-9A-HJ-NPQRTUWXY]/;if(0==t.test(r))return!1;var n=/^[0-9X]+$/,e=r.substring(9,10);if(0==n.test(e))return!1;for(var u,i,a=r,o=r,f=a.substring(0,8)+o.substring(9,10),s=0,c=[3,7,9,10,5,8,4,2],l="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",v=0;v<f.length-1;v++)u=f.substring(v,v+1),i=l.indexOf(u),s+=i*c[v];var E=11-s%11;return 10==E&&(E="X"),11==E&&(E="0"),e==E},VERIFYCREDITCODE:function(r){return(new s).verify(r)},INDEX_OF:function(r,t){var n;return null!==(n=r.includes(t))&&void 0!==n&&n},ADD:function(r,t){return r+t},SUB:function(r,t){return dsf.math.sub(r,t)},MUL:function(r,t){return dsf.math.mul(r,t)},DIV:function(r,t){return dsf.math.div(r,t)},MOD:function(r,t){return r%t},NOTEQUAL:function(r,t){return r!=t},LESSTHAN:function(r,t){return r<t},LESSTHANEQUALS:function(r,t){return r<=t},GREATERTHAN:function(r,t){return r>t},GREATERTHANEQUALS:function(r,t){return r>=t},AVG:function(){var r,t=this.array_develop(Array.from(arguments));return(r=dsf.math).sum.apply(r,u()(t))/t.length},ISNUM:function(r){return dsf.isNumber(r)},VERIFYIDCARD:function(r){return dsf.idCard(r).type},MAXINDEX:function(){return nums.indexOf(this.MAX.apply(this,u()(Array.from(arguments))))},MININDEX:function(){return nums.indexOf(this.MIN.apply(this,u()(Array.from(arguments))))},MAXVALUE:function(){return this.MAX.apply(this,u()(this.array_develop(Array.from(arguments))))},MINVALUE:function(){return this.MIN.apply(this,u()(Array.from(arguments)))},SUBSTR:function(r,t,n){var e;return null!==(e=null===r||void 0===r?void 0:r.substring(t,t+n))&&void 0!==e?e:""},AGE:function(r,t,n,e){if(!r||!t)return 0;var u=new Date(r,t-1),i=new Date((new Date).getFullYear(),(new Date).getMonth());return n&&e&&(i=new Date(n,e-1)),Math.floor((u-i)/1e3/60/60/24/365)},TOLONG:function(r){return parseInt(r)},TODOUBLE:function(r){return parseFloat(r)},TOBOOLEAN:function(r){return!!r},TONUMBER:function(r){return r=Number(r),_.isNaN(r)?0:r},CONCAT:function(){for(var r=Array.from(arguments),t={},n=0;n<r.length;n++)t[dsf.type(r[n])]=dsf.type(r[n]);if(Object.keys(t).length>1)return null;if(t["array"]){var e=[];return r.forEach((function(r){return e.concat(r)})),e}if(t["string"]){var u="";return r.forEach((function(r){return u+=r})),u}return null},REPEAT:function(){for(var r=Array.from(arguments),t=new Set,n=0;n<r.length;n++){if(t.has(r[n]))return!0;t.add(r[n])}return!1},SQRT:function(r){return dsf.math.sqrt(r,2,0)},CBRT:function(r){return dsf.math.sqrt(r,3,0)},GEOMETRICMEAN:function(){var r=Array.from(arguments);return this.SUM(r)/r.length},POWER:function(r,t){return Math.pow(r,t)},EQUALS:function(r,t){return r===t},AND:function(){for(var r=Array.prototype.slice.call(arguments),t=0;t<r.length;t++)if(!r[t])return!1;return!0},CEIL:function(r){return r=MathMath.ceil(r),Number.isNaN(r)?"":r},VERIFYCH:function(r,t,n,e){if(!r)return!1;var u=!0,i=!0,a=!0;if(t>0){for(var o=0,f=0;f<r.length;f++)/^[\u4e00-\u9fa5]$/.test(r.charAt(f))&&o++;u=o>=t}return n&&(a=r.includes(n)),1==e&&(i=/^[\u4e00-\u9fa5]+$/.test(r)),u&&i&&a},ABS:function(r){return r=Math.abs(r),Number.isNaN(r)?"":r},CURRENTTIME:function(r){return r=r.replace(/mm/g,"ii").replace(/MM/g,"mm").replace(/HH/g,"hh"),dsf.date.format(new Date,r)},FIND:function(r,t,n){if(n=+n,!r||!t||Number.isNaN(n))return!1;var e=new RegExp(r),u=e.exec(t);return!!u&&u.index>=n}},f={get_main:function(r,t){var n;return null===this||void 0===this||null===(n=this.$viewData)||void 0===n?void 0:n["".concat(r,".").concat(t)]},get_row:function(r,t){var n;return null===this||void 0===this||null===(n=this.$row)||void 0===n?void 0:n["".concat(r,".").concat(t)]},get_sub_table:function(r){var t;return(null===this||void 0===this||null===(t=this.$viewData)||void 0===t?void 0:t[r])||[]},get_sub_table_field:function(r){var t=this,n=r.tableName,e=r.code,u=r.type,i=r.expand,a=["".concat(n,".").concat(e)],o=this.get_sub_table(n).map((function(r){var n=r[a];return i&&(n=r[a][i]),"number"==u?t.TONUMBER(n):n}));return{value:o,tableName:n,code:e}},get_sub_table_catalog_code_row:function(r,t){var n=r.tableName,e=(r.code,"".concat(n,".stats_meta_code")),u=this.get_sub_table(n);return u.filter((function(r){return r[e]&&t.includes(r[e])}))},array_develop:function(r){var t=[],n=dsf.isArray(r)?u()(r):[];while(null!==n&&void 0!==n&&n.length){var e=n.shift();Array.isArray(e)?n.unshift.apply(n,u()(e)):t.push(e)}return t}};function s(){this.firstarray=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],this.firstkeys=[3,7,9,10,5,8,4,2],this.secondarray=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","J","K","L","M","N","P","Q","R","T","U","W","X","Y"],this.secondkeys=[1,3,9,27,19,26,16,17,20,29,25,13,8,24,10,30,28],this.verify=function(r){var t=r.toUpperCase();if(18!=t.length)return!1;var n=/^\w\w\d{6}\w{9}\w$/;if(!n.test(t))return!1;if(n=/^[1,5,9,Y]\w\d{6}\w{9}\w$/,!n.test(t))return!1;if(n=/^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/,!n.test(t))return!1;if(n=/^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/,!n.test(t))return!1;var e,u=this.calc(t.substr(8),this.firstarray,this.firstkeys,11);if(u<10&&(e=u),10==u?e="X":11==u&&(e="0"),e!=t.substr(16,1))return!1;var i=this.calc(t,this.secondarray,this.secondkeys,31),a=this.secondarray[i];if(!a||a!=t.substr(17,1))return!1;var o=t.substr(0,16)+e+a;return t==o},this.calc=function(r,t,n,e){for(var u=0,i=0;i<n.length;i++){var a=r[i];u+=n[i]*t.indexOf(a)}return e-u%e}}var c=[["IF","判断"],["INLIST","存在集合中"],["ISCH","中文判断"],["ISEN","英文判断"],["ISLOWER","小写判断"],["ISNULL","空值判断"],["ISUPPER","大写判断"],["LEFT","截取"],["LEN","长度"],["LOOKAT","匹配位置"],["LOWER","转小写"],["MATCH","匹配"],["MAX","最大值"],["MID","字符串截取"],["MIN","最小值"],["NOT","求反"],["NOTNULL","非空"],["OR","或者"],["REPLACEALL","全部替换"],["RIGHT","右边提取"],["ROUND","四舍五入取整"],["SUM","求和"],["TRIM","去空格"],["TRUNC","向下取整"],["UPPER","转大写"],["VERIFYCODE","组织机构代码编码验证"],["VERIFYCREDITCODE","统一社会信用代码校验"],["INDEX_OF","是否存在位置"],["ADD","加法"],["SUB","减法"],["MUL","乘法"],["DIV","除法"],["MOD","求模操作"],["NOTEQUAL","不等"],["LESSTHAN","小于"],["LESSTHANEQUALS","小于等于"],["GREATERTHAN","大于"],["GREATERTHANEQUALS","大于等于"],["AVG","平均"],["ISNUM","数值判断"],["VERIFYIDCARD","身份证验证"],["MAXINDEX","最大索引"],["MININDEX","最小索引"],["MAXVALUE","获取最大值"],["MINVALUE","获取最小值"],["SUBSTR","字符串截取"],["AGE","年龄"],["TOLONG","转长整型"],["TODOUBLE","转双精度浮点"],["TOBOOLEAN","转布尔"],["TONUMBER","转数值"],["CONCAT","拼接"],["SQRT","平方根"],["CBRT","立方根"],["GEOMETRICMEAN","几何平均数"],["POWER","幂函数"],["EQUALS","等于"],["AND","并且"],["CEIL","向上取整"],["ABS","绝对值"],["CURRENTTIME","获取当前时间"],["FIND","查找"],["CURRENTROWCATALOGCOD","获取带目录子表当前行code"],["IFTHEN","判断执行"],["SUMIFAND","满足条件执行求和"],["CASE","条件过滤"],["VERIFYCH","中文验证"],["REPEAT","重复校验"]];t["default"]={customFuctionMap:o,privateFuctionMap:f,customFuctionList:c}}}]);
//# sourceMappingURL=../../../smap/core/dsf-core.core_formula_async.js.map