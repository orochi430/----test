import "./dsf.js"
import config from "./config.js"
import loadingImage from "./createLoadingImage.js"
import url from "./url"
import base64 from "./base64"
import md5 from "./md5"
import date from "./date"
import layer from "./layer"
import loadJs from "./loadJs"
import loadCss from "./loadCss"
import queue from "./queue"
import valid from "./valid"
import http from "./http"
import util from "./util"
import dd from "./ddAction"
import video from "./videoConference"
import flow from "./flow"
import dataapi from "./dataapi"
import changeUser from "./changeUser"
import commonForm from "./commonForm"
import shuke from "./shuke"
import middleground from "./middleground"
import dsfMobile from "./dsfMobile"
dsf.mix(dsf, {
  http: http,
  url: url,
  queue: queue,
  config: config,
  base64: base64,
  md5: md5,
  layer: layer,
  date: date,
  valid,
  util,
  dd,
  video,
  flow,
  dataapi,
  changeUser,
  commonForm,
  loadingImage,
  loadJs,
  loadCss,
  shuke,
  middleground,
  dsfMobile
})

export default dsf;
