"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[99305],{22832:function(e,s,i){i.r(s);var t=i(8450),n=i.n(t),i={subtitleLinkTo:function(s,e,i){"dw"==e?dsf.http.post("/fn/sbgl/hasChildren",{dwid:s.dataValue.dwid}).then(function(e){200==e.data.code&&i.$router.push({path:"/commonList?fileType=JSYCsbrsgl&notLink=1",query:{secQuery:n()({dwid:s.dataValue.dwid,query_year:"",listType:"list"})}})}):"zs"!=e&&"sbs"!=e&&"wsbs"!=e||i.$router.push({path:"/commonList?fileType=JSYCsbrgl&notLink=1",query:{secQuery:n()({dwid:s.dataValue.dwid,flag:"zs"==e?"0":"sbs"==e?"1":"2",isUnit:s.dataValue.isUnit})}})}};s.default=i}}]);