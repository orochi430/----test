"use strict";(self.webpackChunkxianzhengding=self.webpackChunkxianzhengding||[]).push([[57981],{10383:function(o,e,n){n.r(e);var a=n(25108),n={createRow:function(o,e){e.checkType="radio",e.commonPopParam={listId:"210408101945iX1a8wn07BU7NnxhvwG",moduleId:"201204172016SOZR23CmNnExLAub9Qn"},e.commonPop=!0},choose:function(o,n){a.log("choose",o),n.commonPop=!1;o={convertId:"211105135216m7vMOAefbpUxYTGQotH",srcInfo:o[0].dataValue.A0001};dsf.http.post("/fn/convert/moduleRuleConvert",o).then(function(o){var e;200==o.data.code?(e={name:"commonForm",params:{pk:(e=o.data.data).pk,moduleId:e.moduleId}},n.$router.push(e)):dsf.layer.toast(o.data.message)}).error(function(o){dsf.layer.toast(o)})}};e.default=n}}]);