/*!
 * Name: @dsf/cli-core
 * Version: 5.17.0-alpha.5
 * Description: 核心模块
 * BuildTime: 2024/6/19 17:49:24
*/
(("undefined"!==typeof self?self:this)["webpackJsonpcore"]=("undefined"!==typeof self?self:this)["webpackJsonpcore"]||[]).push([[3],{293:function(e,t,i){"use strict";i.r(t);var n=[];function r(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];window.requestIdleCallback&&e?window.requestIdleCallback(a,{timeout:1e3}):a({didTimeout:!1,timeRemaining:function(){return 1}})}function s(e){n.push(e)}function a(e){while((e.timeRemaining()>0||e.didTimeout)&&n.length){var t=n.shift();o(t)}n.length&&r()}function o(e){try{var t=e.config,i=e.headers,n=e.status,r=dsf.url.parse(t.url),s=dsf.url.queryStringParse(t.data),a={interfaceAddr:r.pathname,createTime:t._currentTime2,responseTime:(new Date).getTime()-t._currentTime,cookie:t._cookie,requestHeader:JSON.stringify(t.headers),requestParams:JSON.stringify({urlParams:t.params,data:s}),responseHeader:JSON.stringify(i),responseCode:n,requestClient:t._requestClient},o=dsf.config.setting_public_interface_host||"";o&&o.endsWith("/")&&(o=o.substr(0,o.length-1));var u=[o,dsf.config.http.buriedPointApiUrl].join("");dsf.http.post(u,a)}catch(d){}}t["default"]={startBuriedPoint:r,pushBuriedPointInfos:s}}}]);
//# sourceMappingURL=../../../smap/core/dsf-core.core_adn_async.js.map