/*!
 * Name: @dsf/cli-core
 * Version: 5.17.0-alpha.5
 * Description: 核心模块
 * BuildTime: 2024/6/19 17:49:24
*/
(("undefined"!==typeof self?self:this)["webpackJsonpcore"]=("undefined"!==typeof self?self:this)["webpackJsonpcore"]||[]).push([[9],{292:function(e,r,a){"use strict";a.r(r);var l=a(301),n=a.n(l);r["default"]=t;var i={red:0,orange:60,yellow:120,green:180,blue:240,purple:300};function t(e){var r,a,l=[],t=1;if("number"===typeof e)return{space:"rgb",values:[e>>>16,(65280&e)>>>8,255&e],alpha:1};if("number"===typeof e)return{space:"rgb",values:[e>>>16,(65280&e)>>>8,255&e],alpha:1};if(e=String(e).toLowerCase(),n.a[e])l=n.a[e].slice(),a="rgb";else if("transparent"===e)t=0,a="rgb",l=[0,0,0];else if("#"===e[0]){var o=e.slice(1),s=o.length,u=s<=4;t=1,u?(l=[parseInt(o[0]+o[0],16),parseInt(o[1]+o[1],16),parseInt(o[2]+o[2],16)],4===s&&(t=parseInt(o[3]+o[3],16)/255)):(l=[parseInt(o[0]+o[1],16),parseInt(o[2]+o[3],16),parseInt(o[4]+o[5],16)],8===s&&(t=parseInt(o[6]+o[7],16)/255)),l[0]||(l[0]=0),l[1]||(l[1]=0),l[2]||(l[2]=0),a="rgb"}else if(r=/^((?:rgba?|hs[lvb]a?|hwba?|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms|oklch|oklab|color))\s*\(([^\)]*)\)/.exec(e)){var d=r[1];a=d.replace(/a$/,"");var g="cmyk"===a?4:"gray"===a?1:3;l=r[2].trim().split(/\s*[,\/]\s*|\s+/),"color"===a&&(a=l.shift()),l=l.map((function(e,r){if("%"===e[e.length-1])return e=parseFloat(e)/100,3===r?e:"rgb"===a?255*e:"h"===a[0]?100*e:"l"!==a[0]||r?"lab"===a?125*e:"lch"===a?r<2?150*e:360*e:"o"!==a[0]||r?"oklab"===a?.4*e:"oklch"===a?r<2?.4*e:360*e:e:e:100*e;if("h"===a[r]||2===r&&"h"===a[a.length-1]){if(void 0!==i[e])return i[e];if(e.endsWith("deg"))return parseFloat(e);if(e.endsWith("turn"))return 360*parseFloat(e);if(e.endsWith("grad"))return 360*parseFloat(e)/400;if(e.endsWith("rad"))return 180*parseFloat(e)/Math.PI}return"none"===e?0:parseFloat(e)})),t=l.length>g?l.pop():1}else if(/[0-9](?:\s|\/|,)/.test(e)){var h;l=e.match(/([0-9]+)/g).map((function(e){return parseFloat(e)})),a=(null===(h=e.match(/([a-z])/gi))||void 0===h||null===(h=h.join(""))||void 0===h?void 0:h.toLowerCase())||"rgb"}return{space:a,values:l,alpha:t}}},301:function(e,r,a){"use strict";e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}}]);
//# sourceMappingURL=../../../smap/core/dsf-core.core_theme_async.js.map