// Platform: ios
// 2fd4bcb84048415922d13d80d35b8d1668e8e150
/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */
;(function() {
  var PLATFORM_VERSION_BUILD_LABEL = '4.2.0';
  // file: src/scripts/require.js
  
/*jshint -W079 */
/*jshint -W020 */
  
  var require,
  define;
  
  (function () {
   var modules = {},
   // Stack of moduleIds currently being built.
   requireStack = [],
   // Map of module ID -> index into requireStack of modules currently being built.
   inProgressModules = {},
   SEPARATOR = ".";
   
   
   
   function build(module) {
   var factory = module.factory,
   localRequire = function (id) {
   var resultantId = id;
   //Its a relative path, so lop off the last portion and add the id (minus "./")
   if (id.charAt(0) === ".") {
   resultantId = module.id.slice(0, module.id.lastIndexOf(SEPARATOR)) + SEPARATOR + id.slice(2);
   }
   return require(resultantId);
   };
   module.exports = {};
   delete module.factory;
   factory(localRequire, module.exports, module);
   return module.exports;
   }
   
   require = function (id) {
   if (!modules[id]) {
   throw "module " + id + " not found";
   } else if (id in inProgressModules) {
   var cycle = requireStack.slice(inProgressModules[id]).join('->') + '->' + id;
   throw "Cycle in require graph: " + cycle;
   }
   if (modules[id].factory) {
   try {
   inProgressModules[id] = requireStack.length;
   requireStack.push(id);
   return build(modules[id]);
   } finally {
   delete inProgressModules[id];
   requireStack.pop();
   }
   }
   return modules[id].exports;
   };
   
   define = function (id, factory) {
   if (modules[id]) {
   throw "module " + id + " already defined";
   }
   
   modules[id] = {
   id: id,
   factory: factory
   };
   };
   
   define.remove = function (id) {
   delete modules[id];
   };
   
   define.moduleMap = modules;
   // file: src/common/pluginloader.js
   define("cordova/pluginloader", function (require, exports, module) {
          
          var modulemapper = require('cordova/modulemapper');
          var urlutil = require('cordova/urlutil');
          
          // Helper function to inject a <script> tag.
          // Exported for testing.
          exports.injectScript = function (url, onload, onerror) {
          var script = document.createElement("script");
          // onload fires even when script fails loads with an error.
          script.onload = onload;
          // onerror fires for malformed URLs.
          script.onerror = onerror;
          script.src = url;
          document.head.appendChild(script);
          };
          
          function injectIfNecessary(id, url, onload, onerror) {
          onerror = onerror || onload;
          if (id in define.moduleMap) {
          onload();
          } else {
          exports.injectScript(url, function () {
                               if (id in define.moduleMap) {
                               onload();
                               } else {
                               onerror();
                               }
                               }, onerror);
          }
          }
          
          function onScriptLoadingComplete(moduleList, finishPluginLoading) {
          // Loop through all the plugins and then through their clobbers and merges.
          for (var i = 0, module; module = moduleList[i]; i++) {
          if (module.clobbers && module.clobbers.length) {
          for (var j = 0; j < module.clobbers.length; j++) {
          modulemapper.clobbers(module.id, module.clobbers[j]);
          }
          }
          
          if (module.merges && module.merges.length) {
          for (var k = 0; k < module.merges.length; k++) {
          modulemapper.merges(module.id, module.merges[k]);
          }
          }
          
          // Finally, if runs is truthy we want to simply require() the module.
          if (module.runs) {
          modulemapper.runs(module.id);
          }
          }
          
          finishPluginLoading();
          }
          
          // Handler for the plugins.js content.
          // See plugman's plugin_loader.js for the details of this object.
          // This function is only called if the really is a plugins array that isn't empty.
          // Otherwise the onerror response handler will just call finishPluginLoading().
          function handlePluginsObject(path, moduleList, finishPluginLoading) {
          // Now inject the scripts.
          var scriptCounter = moduleList.length;
          
          if (!scriptCounter) {
          finishPluginLoading();
          return;
          }
          function scriptLoadedCallback() {
          if (!--scriptCounter) {
          onScriptLoadingComplete(moduleList, finishPluginLoading);
          }
          }
          
          for (var i = 0; i < moduleList.length; i++) {
          injectIfNecessary(moduleList[i].id, path + moduleList[i].file, scriptLoadedCallback);
          }
          }
          
          function findCordovaPath() {
          var path = null;
          var scripts = document.getElementsByTagName('script');
          var term = '/merge.js';
          for (var n = scripts.length - 1; n > -1; n--) {
          var src = scripts[n].src.replace(/\?.*$/, ''); // Strip any query param (CB-6007).
          if (src.indexOf(term) == (src.length - term.length)) {
          path = src.substring(0, src.length - term.length) + '/';
          break;
          }
          }
          return path;
          }
          
          // Tries to load all plugins' js-modules.
          // This is an async process, but onDeviceReady is blocked on onPluginsReady.
          // onPluginsReady is fired when there are no plugins to load, or they are all done.
          exports.load = function(callback) {
          var pathPrefix = findCordovaPath();
          if (pathPrefix === null) {
          console.log('Could not find cordova.js script tag. Plugin loading may fail.');
          pathPrefix = '';
          }
          injectIfNecessary('cordova/plugin_list', pathPrefix + 'plugins.js', function () {
                            var moduleList = require("cordova/plugin_list");
                            handlePluginsObject(pathPrefix, moduleList, callback);
                            }, callback);
          };
          
          
          });
   })();
  
  //Export for use in node
  if (typeof module === "object" && typeof require === "function") {
  module.exports.require = require;
  module.exports.define = define;
  }
  
  // file: src/cordova.js
  define("cordova", function(require, exports, module) {
         
         // Workaround for Windows 10 in hosted environment case
         // http://www.w3.org/html/wg/drafts/html/master/browsers.html#named-access-on-the-window-object
         if (window.cordova && !(window.cordova instanceof HTMLElement)) {
         throw new Error("cordova already defined");
         }
         
         
         var channel = require('cordova/channel');
         var platform = require('cordova/platform');
         
         
/**
 * Intercept calls to addEventListener + removeEventListener and handle deviceready,
 * resume, and pause events.
 */
         var m_document_addEventListener = document.addEventListener;
         var m_document_removeEventListener = document.removeEventListener;
         var m_window_addEventListener = window.addEventListener;
         var m_window_removeEventListener = window.removeEventListener;
         
/**
 * Houses custom event handlers to intercept on document + window event listeners.
 */
         var documentEventHandlers = {},
         windowEventHandlers = {};
         
         document.addEventListener = function(evt, handler, capture) {
         var e = evt.toLowerCase();
         if (typeof documentEventHandlers[e] != 'undefined') {
         documentEventHandlers[e].subscribe(handler);
         } else {
         m_document_addEventListener.call(document, evt, handler, capture);
         }
         };
         
         window.addEventListener = function(evt, handler, capture) {
         var e = evt.toLowerCase();
         if (typeof windowEventHandlers[e] != 'undefined') {
         windowEventHandlers[e].subscribe(handler);
         } else {
         m_window_addEventListener.call(window, evt, handler, capture);
         }
         };
         
         document.removeEventListener = function(evt, handler, capture) {
         var e = evt.toLowerCase();
         // If unsubscribing from an event that is handled by a plugin
         if (typeof documentEventHandlers[e] != "undefined") {
         documentEventHandlers[e].unsubscribe(handler);
         } else {
         m_document_removeEventListener.call(document, evt, handler, capture);
         }
         };
         
         window.removeEventListener = function(evt, handler, capture) {
         var e = evt.toLowerCase();
         // If unsubscribing from an event that is handled by a plugin
         if (typeof windowEventHandlers[e] != "undefined") {
         windowEventHandlers[e].unsubscribe(handler);
         } else {
         m_window_removeEventListener.call(window, evt, handler, capture);
         }
         };
         
         function createEvent(type, data) {
         var event = document.createEvent('Events');
         event.initEvent(type, false, false);
         if (data) {
         for (var i in data) {
         if (data.hasOwnProperty(i)) {
         event[i] = data[i];
         }
         }
         }
         return event;
         }
         
         
         var cordova = {
         define:define,
         require:require,
         version:PLATFORM_VERSION_BUILD_LABEL,
         platformVersion:PLATFORM_VERSION_BUILD_LABEL,
         platformId:platform.id,
         /**
          * Methods to add/remove your own addEventListener hijacking on document + window.
          */
         addWindowEventHandler:function(event) {
         return (windowEventHandlers[event] = channel.create(event));
         },
         addStickyDocumentEventHandler:function(event) {
         return (documentEventHandlers[event] = channel.createSticky(event));
         },
         addDocumentEventHandler:function(event) {
         return (documentEventHandlers[event] = channel.create(event));
         },
         removeWindowEventHandler:function(event) {
         delete windowEventHandlers[event];
         },
         removeDocumentEventHandler:function(event) {
         delete documentEventHandlers[event];
         },
         /**
          * Retrieve original event handlers that were replaced by Cordova
          *
          * @return object
          */
         getOriginalHandlers: function() {
         return {'document': {'addEventListener': m_document_addEventListener, 'removeEventListener': m_document_removeEventListener},
         'window': {'addEventListener': m_window_addEventListener, 'removeEventListener': m_window_removeEventListener}};
         },
         /**
          * Method to fire event from native code
          * bNoDetach is required for events which cause an exception which needs to be caught in native code
          */
         fireDocumentEvent: function(type, data, bNoDetach) {
         var evt = createEvent(type, data);
         if (typeof documentEventHandlers[type] != 'undefined') {
         if( bNoDetach ) {
         documentEventHandlers[type].fire(evt);
         }
         else {
         setTimeout(function() {
                    // Fire deviceready on listeners that were registered before cordova.js was loaded.
                    if (type == 'deviceready') {
                    document.dispatchEvent(evt);
                    }
                    documentEventHandlers[type].fire(evt);
                    }, 0);
         }
         } else {
         document.dispatchEvent(evt);
         }
         },
         fireWindowEvent: function(type, data) {
         var evt = createEvent(type,data);
         if (typeof windowEventHandlers[type] != 'undefined') {
         setTimeout(function() {
                    windowEventHandlers[type].fire(evt);
                    }, 0);
         } else {
         window.dispatchEvent(evt);
         }
         },
         
         /**
          * Plugin callback mechanism.
          */
         // Randomize the starting callbackId to avoid collisions after refreshing or navigating.
         // This way, it's very unlikely that any new callback would get the same callbackId as an old callback.
         callbackId: Math.floor(Math.random() * 2000000000),
         callbacks:  {},
         callbackStatus: {
         NO_RESULT: 0,
         OK: 1,
         CLASS_NOT_FOUND_EXCEPTION: 2,
         ILLEGAL_ACCESS_EXCEPTION: 3,
         INSTANTIATION_EXCEPTION: 4,
         MALFORMED_URL_EXCEPTION: 5,
         IO_EXCEPTION: 6,
         INVALID_ACTION: 7,
         JSON_EXCEPTION: 8,
         ERROR: 9
         },
         
         /**
          * Called by native code when returning successful result from an action.
          */
         callbackSuccess: function(callbackId, args) {
         cordova.callbackFromNative(callbackId, true, args.status, [args.message], args.keepCallback);
         },
         
         /**
          * Called by native code when returning error result from an action.
          */
         callbackError: function(callbackId, args) {
         // TODO: Deprecate callbackSuccess and callbackError in favour of callbackFromNative.
         // Derive success from status.
         cordova.callbackFromNative(callbackId, false, args.status, [args.message], args.keepCallback);
         },
         
         /**
          * Called by native code when returning the result from an action.
          */
         callbackFromNative: function(callbackId, isSuccess, status, args, keepCallback) {
         try {
         var callback = cordova.callbacks[callbackId];
         if (callback) {
         if (isSuccess && status == cordova.callbackStatus.OK) {
         callback.success && callback.success.apply(null, args);
         } else if (!isSuccess) {
         callback.fail && callback.fail.apply(null, args);
         }
         /*
          else
          Note, this case is intentionally not caught.
          this can happen if isSuccess is true, but callbackStatus is NO_RESULT
          which is used to remove a callback from the list without calling the callbacks
          typically keepCallback is false in this case
          */
         // Clear callback if not expecting any more results
         if (!keepCallback) {
         delete cordova.callbacks[callbackId];
         }
         }
         }
         catch (err) {
         var msg = "Error in " + (isSuccess ? "Success" : "Error") + " callbackId: " + callbackId + " : " + err;
         console && console.log && console.log(msg);
         cordova.fireWindowEvent("cordovacallbackerror", { 'message': msg });
         throw err;
         }
         },
         addConstructor: function(func) {
         channel.onCordovaReady.subscribe(function() {
                                          try {
                                          func();
                                          } catch(e) {
                                          console.log("Failed to run constructor: " + e);
                                          }
                                          });
         }
         };
         
         
         module.exports = cordova;
         
         });
  
  // file: src/common/argscheck.js
  define("cordova/argscheck", function(require, exports, module) {
         
         var utils = require('cordova/utils');
         
         var moduleExports = module.exports;
         
         var typeMap = {
         'A': 'Array',
         'D': 'Date',
         'N': 'Number',
         'S': 'String',
         'F': 'Function',
         'O': 'Object'
         };
         
         function extractParamName(callee, argIndex) {
         return (/.*?\((.*?)\)/).exec(callee)[1].split(', ')[argIndex];
         }
         
         function checkArgs(spec, functionName, args, opt_callee) {
         if (!moduleExports.enableChecks) {
         return;
         }
         var errMsg = null;
         var typeName;
         for (var i = 0; i < spec.length; ++i) {
         var c = spec.charAt(i),
         cUpper = c.toUpperCase(),
         arg = args[i];
         // Asterix means allow anything.
         if (c == '*') {
         continue;
         }
         typeName = utils.typeName(arg);
         if ((arg === null || arg === undefined) && c == cUpper) {
         continue;
         }
         if (typeName != typeMap[cUpper]) {
         errMsg = 'Expected ' + typeMap[cUpper];
         break;
         }
         }
         if (errMsg) {
         errMsg += ', but got ' + typeName + '.';
         errMsg = 'Wrong type for parameter "' + extractParamName(opt_callee || args.callee, i) + '" of ' + functionName + ': ' + errMsg;
         // Don't log when running unit tests.
         if (typeof jasmine == 'undefined') {
         console.error(errMsg);
         }
         throw TypeError(errMsg);
         }
         }
         
         function getValue(value, defaultValue) {
         return value === undefined ? defaultValue : value;
         }
         
         moduleExports.checkArgs = checkArgs;
         moduleExports.getValue = getValue;
         moduleExports.enableChecks = true;
         
         
         });
  
  // file: src/common/base64.js
  define("cordova/base64", function(require, exports, module) {
         
         var base64 = exports;
         
         base64.fromArrayBuffer = function(arrayBuffer) {
         var array = new Uint8Array(arrayBuffer);
         return uint8ToBase64(array);
         };
         
         base64.toArrayBuffer = function(str) {
         var decodedStr = typeof atob != 'undefined' ? atob(str) : new Buffer(str,'base64').toString('binary');
         var arrayBuffer = new ArrayBuffer(decodedStr.length);
         var array = new Uint8Array(arrayBuffer);
         for (var i=0, len=decodedStr.length; i < len; i++) {
         array[i] = decodedStr.charCodeAt(i);
         }
         return arrayBuffer;
         };
         
         //------------------------------------------------------------------------------
         
/* This code is based on the performance tests at http://jsperf.com/b64tests
 * This 12-bit-at-a-time algorithm was the best performing version on all
 * platforms tested.
 */
         
         var b64_6bit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
         var b64_12bit;
         
         var b64_12bitTable = function() {
         b64_12bit = [];
         for (var i=0; i<64; i++) {
         for (var j=0; j<64; j++) {
         b64_12bit[i*64+j] = b64_6bit[i] + b64_6bit[j];
         }
         }
         b64_12bitTable = function() { return b64_12bit; };
         return b64_12bit;
         };
         
         function uint8ToBase64(rawData) {
         var numBytes = rawData.byteLength;
         var output="";
         var segment;
         var table = b64_12bitTable();
         for (var i=0;i<numBytes-2;i+=3) {
         segment = (rawData[i] << 16) + (rawData[i+1] << 8) + rawData[i+2];
         output += table[segment >> 12];
         output += table[segment & 0xfff];
         }
         if (numBytes - i == 2) {
         segment = (rawData[i] << 16) + (rawData[i+1] << 8);
         output += table[segment >> 12];
         output += b64_6bit[(segment & 0xfff) >> 6];
         output += '=';
         } else if (numBytes - i == 1) {
         segment = (rawData[i] << 16);
         output += table[segment >> 12];
         output += '==';
         }
         return output;
         }
         
         });
  
  // file: src/common/builder.js
  define("cordova/builder", function(require, exports, module) {
         
         var utils = require('cordova/utils');
         
         function each(objects, func, context) {
         for (var prop in objects) {
         if (objects.hasOwnProperty(prop)) {
         func.apply(context, [objects[prop], prop]);
         }
         }
         }
         
         function clobber(obj, key, value) {
         exports.replaceHookForTesting(obj, key);
         var needsProperty = false;
         try {
         obj[key] = value;
         } catch (e) {
         needsProperty = true;
         }
         // Getters can only be overridden by getters.
         if (needsProperty || obj[key] !== value) {
         utils.defineGetter(obj, key, function() {
                            return value;
                            });
         }
         }
         
         function assignOrWrapInDeprecateGetter(obj, key, value, message) {
         if (message) {
         utils.defineGetter(obj, key, function() {
                            console.log(message);
                            delete obj[key];
                            clobber(obj, key, value);
                            return value;
                            });
         } else {
         clobber(obj, key, value);
         }
         }
         
         function include(parent, objects, clobber, merge) {
         each(objects, function (obj, key) {
              try {
              var result = obj.path ? require(obj.path) : {};
              
              if (clobber) {
              // Clobber if it doesn't exist.
              if (typeof parent[key] === 'undefined') {
              assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
              } else if (typeof obj.path !== 'undefined') {
              // If merging, merge properties onto parent, otherwise, clobber.
              if (merge) {
              recursiveMerge(parent[key], result);
              } else {
              assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
              }
              }
              result = parent[key];
              } else {
              // Overwrite if not currently defined.
              if (typeof parent[key] == 'undefined') {
              assignOrWrapInDeprecateGetter(parent, key, result, obj.deprecated);
              } else {
              // Set result to what already exists, so we can build children into it if they exist.
              result = parent[key];
              }
              }
              
              if (obj.children) {
              include(result, obj.children, clobber, merge);
              }
              } catch(e) {
              utils.alert('Exception building Cordova JS globals: ' + e + ' for key "' + key + '"');
              }
              });
         }
         
/**
 * Merge properties from one object onto another recursively.  Properties from
 * the src object will overwrite existing target property.
 *
 * @param target Object to merge properties into.
 * @param src Object to merge properties from.
 */
         function recursiveMerge(target, src) {
         for (var prop in src) {
         if (src.hasOwnProperty(prop)) {
         if (target.prototype && target.prototype.constructor === target) {
         // If the target object is a constructor override off prototype.
         clobber(target.prototype, prop, src[prop]);
         } else {
         if (typeof src[prop] === 'object' && typeof target[prop] === 'object') {
         recursiveMerge(target[prop], src[prop]);
         } else {
         clobber(target, prop, src[prop]);
         }
         }
         }
         }
         }
         
         exports.buildIntoButDoNotClobber = function(objects, target) {
         include(target, objects, false, false);
         };
         exports.buildIntoAndClobber = function(objects, target) {
         include(target, objects, true, false);
         };
         exports.buildIntoAndMerge = function(objects, target) {
         include(target, objects, true, true);
         };
         exports.recursiveMerge = recursiveMerge;
         exports.assignOrWrapInDeprecateGetter = assignOrWrapInDeprecateGetter;
         exports.replaceHookForTesting = function() {};
         
         });
  
  // file: src/common/channel.js
  define("cordova/channel", function(require, exports, module) {
         
         var utils = require('cordova/utils'),
         nextGuid = 1;
         
/**
 * Custom pub-sub "channel" that can have functions subscribed to it
 * This object is used to define and control firing of events for
 * cordova initialization, as well as for custom events thereafter.
 *
 * The order of events during page load and Cordova startup is as follows:
 *
 * onDOMContentLoaded*         Internal event that is received when the web page is loaded and parsed.
 * onNativeReady*              Internal event that indicates the Cordova native side is ready.
 * onCordovaReady*             Internal event fired when all Cordova JavaScript objects have been created.
 * onDeviceReady*              User event fired to indicate that Cordova is ready
 * onResume                    User event fired to indicate a start/resume lifecycle event
 * onPause                     User event fired to indicate a pause lifecycle event
 *
 * The events marked with an * are sticky. Once they have fired, they will stay in the fired state.
 * All listeners that subscribe after the event is fired will be executed right away.
 *
 * The only Cordova events that user code should register for are:
 *      deviceready           Cordova native code is initialized and Cordova APIs can be called from JavaScript
 *      pause                 App has moved to background
 *      resume                App has returned to foreground
 *
 * Listeners can be registered as:
 *      document.addEventListener("deviceready", myDeviceReadyListener, false);
 *      document.addEventListener("resume", myResumeListener, false);
 *      document.addEventListener("pause", myPauseListener, false);
 *
 * The DOM lifecycle events should be used for saving and restoring state
 *      window.onload
 *      window.onunload
 *
 */
         
/**
 * Channel
 * @constructor
 * @param type  String the channel name
 */
         var Channel = function(type, sticky) {
         this.type = type;
         // Map of guid -> function.
         this.handlers = {};
         // 0 = Non-sticky, 1 = Sticky non-fired, 2 = Sticky fired.
         this.state = sticky ? 1 : 0;
         // Used in sticky mode to remember args passed to fire().
         this.fireArgs = null;
         // Used by onHasSubscribersChange to know if there are any listeners.
         this.numHandlers = 0;
         // Function that is called when the first listener is subscribed, or when
         // the last listener is unsubscribed.
         this.onHasSubscribersChange = null;
         },
         channel = {
         /**
          * Calls the provided function only after all of the channels specified
          * have been fired. All channels must be sticky channels.
          */
         join: function(h, c) {
         var len = c.length,
         i = len,
         f = function() {
         if (!(--i)) h();
         };
         for (var j=0; j<len; j++) {
         if (c[j].state === 0) {
         throw Error('Can only use join with sticky channels.');
         }
         c[j].subscribe(f);
         }
         if (!len) h();
         },
         create: function(type) {
         return channel[type] = new Channel(type, false);
         },
         createSticky: function(type) {
         return channel[type] = new Channel(type, true);
         },
         
         /**
          * cordova Channels that must fire before "deviceready" is fired.
          */
         deviceReadyChannelsArray: [],
         deviceReadyChannelsMap: {},
         
         /**
          * Indicate that a feature needs to be initialized before it is ready to be used.
          * This holds up Cordova's "deviceready" event until the feature has been initialized
          * and Cordova.initComplete(feature) is called.
          *
          * @param feature {String}     The unique feature name
          */
         waitForInitialization: function(feature) {
         if (feature) {
         var c = channel[feature] || this.createSticky(feature);
         this.deviceReadyChannelsMap[feature] = c;
         this.deviceReadyChannelsArray.push(c);
         }
         },
         
         /**
          * Indicate that initialization code has completed and the feature is ready to be used.
          *
          * @param feature {String}     The unique feature name
          */
         initializationComplete: function(feature) {
         var c = this.deviceReadyChannelsMap[feature];
         if (c) {
         c.fire();
         }
         }
         };
         
         function forceFunction(f) {
         if (typeof f != 'function') throw "Function required as first argument!";
         }
         
/**
 * Subscribes the given function to the channel. Any time that
 * Channel.fire is called so too will the function.
 * Optionally specify an execution context for the function
 * and a guid that can be used to stop subscribing to the channel.
 * Returns the guid.
 */
         Channel.prototype.subscribe = function(f, c) {
         // need a function to call
         forceFunction(f);
         if (this.state == 2) {
         f.apply(c || this, this.fireArgs);
         return;
         }
         
         var func = f,
         guid = f.observer_guid;
         if (typeof c == "object") { func = utils.close(c, f); }
         
         if (!guid) {
         // first time any channel has seen this subscriber
         guid = '' + nextGuid++;
         }
         func.observer_guid = guid;
         f.observer_guid = guid;
         
         // Don't add the same handler more than once.
         if (!this.handlers[guid]) {
         this.handlers[guid] = func;
         this.numHandlers++;
         if (this.numHandlers == 1) {
         this.onHasSubscribersChange && this.onHasSubscribersChange();
         }
         }
         };
         
/**
 * Unsubscribes the function with the given guid from the channel.
 */
         Channel.prototype.unsubscribe = function(f) {
         // need a function to unsubscribe
         forceFunction(f);
         
         var guid = f.observer_guid,
         handler = this.handlers[guid];
         if (handler) {
         delete this.handlers[guid];
         this.numHandlers--;
         if (this.numHandlers === 0) {
         this.onHasSubscribersChange && this.onHasSubscribersChange();
         }
         }
         };
         
/**
 * Calls all functions subscribed to this channel.
 */
         Channel.prototype.fire = function(e) {
         var fail = false,
         fireArgs = Array.prototype.slice.call(arguments);
         // Apply stickiness.
         if (this.state == 1) {
         this.state = 2;
         this.fireArgs = fireArgs;
         }
         if (this.numHandlers) {
         // Copy the values first so that it is safe to modify it from within
         // callbacks.
         var toCall = [];
         for (var item in this.handlers) {
         toCall.push(this.handlers[item]);
         }
         for (var i = 0; i < toCall.length; ++i) {
         toCall[i].apply(this, fireArgs);
         }
         if (this.state == 2 && this.numHandlers) {
         this.numHandlers = 0;
         this.handlers = {};
         this.onHasSubscribersChange && this.onHasSubscribersChange();
         }
         }
         };
         
         
         // defining them here so they are ready super fast!
         // DOM event that is received when the web page is loaded and parsed.
         channel.createSticky('onDOMContentLoaded');
         
         // Event to indicate the Cordova native side is ready.
         channel.createSticky('onNativeReady');
         
         // Event to indicate that all Cordova JavaScript objects have been created
         // and it's time to run plugin constructors.
         channel.createSticky('onCordovaReady');
         
         // Event to indicate that all automatically loaded JS plugins are loaded and ready.
         // FIXME remove this
         channel.createSticky('onPluginsReady');
         
         // Event to indicate that Cordova is ready
         channel.createSticky('onDeviceReady');
         
         // Event to indicate a resume lifecycle event
         channel.create('onResume');
         
         // Event to indicate a pause lifecycle event
         channel.create('onPause');
         
         // Channels that must fire before "deviceready" is fired.
         channel.waitForInitialization('onCordovaReady');
         channel.waitForInitialization('onDOMContentLoaded');
         
         module.exports = channel;
         
         });
  
  // file: /Users/steveng/repo/cordova/cordova-ios/cordova-js-src/exec.js
  define("cordova/exec", function(require, exports, module) {
         
/*global require, module, atob, document */
         
/**
 * Creates a gap bridge iframe used to notify the native code about queued
 * commands.
 */
         var cordova = require('cordova'),
         utils = require('cordova/utils'),
         base64 = require('cordova/base64'),
         execIframe,
         commandQueue = [], // Contains pending JS->Native messages.
         isInContextOfEvalJs = 0,
         failSafeTimerId = 0;
         
         function massageArgsJsToNative(args) {
         if (!args || utils.typeName(args) != 'Array') {
         return args;
         }
         var ret = [];
         args.forEach(function(arg, i) {
                      if (utils.typeName(arg) == 'ArrayBuffer') {
                      ret.push({
                               'CDVType': 'ArrayBuffer',
                               'data': base64.fromArrayBuffer(arg)
                               });
                      } else {
                      ret.push(arg);
                      }
                      });
         return ret;
         }
         
         function massageMessageNativeToJs(message) {
         if (message.CDVType == 'ArrayBuffer') {
         var stringToArrayBuffer = function(str) {
         var ret = new Uint8Array(str.length);
         for (var i = 0; i < str.length; i++) {
         ret[i] = str.charCodeAt(i);
         }
         return ret.buffer;
         };
         var base64ToArrayBuffer = function(b64) {
         return stringToArrayBuffer(atob(b64));
         };
         message = base64ToArrayBuffer(message.data);
         }
         return message;
         }
         
         function convertMessageToArgsNativeToJs(message) {
         var args = [];
         if (!message || !message.hasOwnProperty('CDVType')) {
         args.push(message);
         } else if (message.CDVType == 'MultiPart') {
         message.messages.forEach(function(e) {
                                  args.push(massageMessageNativeToJs(e));
                                  });
         } else {
         args.push(massageMessageNativeToJs(message));
         }
         return args;
         }
         
         function iOSExec() {
         
         var successCallback, failCallback, service, action, actionArgs;
         var callbackId = null;
         if (typeof arguments[0] !== 'string') {
         // FORMAT ONE
         successCallback = arguments[0];
         failCallback = arguments[1];
         service = arguments[2];
         action = arguments[3];
         actionArgs = arguments[4];
         
         // Since we need to maintain backwards compatibility, we have to pass
         // an invalid callbackId even if no callback was provided since plugins
         // will be expecting it. The Cordova.exec() implementation allocates
         // an invalid callbackId and passes it even if no callbacks were given.
         callbackId = 'INVALID';
         } else {
         throw new Error('The old format of this exec call has been removed (deprecated since 2.1). Change to: ' +
                         'cordova.exec(null, null, \'Service\', \'action\', [ arg1, arg2 ]);'
                         );
         }
         
         // If actionArgs is not provided, default to an empty array
         actionArgs = actionArgs || [];
         
         // Register the callbacks and add the callbackId to the positional
         // arguments if given.
         if (successCallback || failCallback) {
         callbackId = service + cordova.callbackId++;
         cordova.callbacks[callbackId] =
         {success:successCallback, fail:failCallback};
         }
         
         actionArgs = massageArgsJsToNative(actionArgs);
         
         var command = [callbackId, service, action, actionArgs];
         
         // Stringify and queue the command. We stringify to command now to
         // effectively clone the command arguments in case they are mutated before
         // the command is executed.
         commandQueue.push(JSON.stringify(command));
         
         // If we're in the context of a stringByEvaluatingJavaScriptFromString call,
         // then the queue will be flushed when it returns; no need for a poke.
         // Also, if there is already a command in the queue, then we've already
         // poked the native side, so there is no reason to do so again.
         if (!isInContextOfEvalJs && commandQueue.length == 1) {
         pokeNative();
         }
         }
         
         // CB-10530
         function proxyChanged() {
         var cexec = cordovaExec();
         
         return (execProxy !== cexec && // proxy objects are different
                 iOSExec !== cexec      // proxy object is not the current iOSExec
                 );
         }
         
         // CB-10106
         function handleBridgeChange() {
         if (proxyChanged()) {
         var commandString = commandQueue.shift();
         while(commandString) {
         var command = JSON.parse(commandString);
         var callbackId = command[0];
         var service = command[1];
         var action = command[2];
         var actionArgs = command[3];
         var callbacks = cordova.callbacks[callbackId] || {};
         
         execProxy(callbacks.success, callbacks.fail, service, action, actionArgs);
         
         commandString = commandQueue.shift();
         };
         return true;
         }
         
         return false;
         }
         
         function pokeNative() {
         // CB-5488 - Don't attempt to create iframe before document.body is available.
         if (!document.body) {
         setTimeout(pokeNative);
         return;
         }
         
         // Check if they've removed it from the DOM, and put it back if so.
         if (execIframe && execIframe.contentWindow) {
         execIframe.contentWindow.location = 'gap://ready';
         } else {
         execIframe = document.createElement('iframe');
         execIframe.style.display = 'none';
         execIframe.src = 'gap://ready';
         document.body.appendChild(execIframe);
         }
         // Use a timer to protect against iframe being unloaded during the poke (CB-7735).
         // This makes the bridge ~ 7% slower, but works around the poke getting lost
         // when the iframe is removed from the DOM.
         // An onunload listener could be used in the case where the iframe has just been
         // created, but since unload events fire only once, it doesn't work in the normal
         // case of iframe reuse (where unload will have already fired due to the attempted
         // navigation of the page).
         failSafeTimerId = setTimeout(function() {
                                      if (commandQueue.length) {
                                      // CB-10106 - flush the queue on bridge change
                                      if (!handleBridgeChange()) {
                                      pokeNative();
                                      }
                                      }
                                      }, 50); // Making this > 0 improves performance (marginally) in the normal case (where it doesn't fire).
         }
         
         iOSExec.nativeFetchMessages = function() {
         // Stop listing for window detatch once native side confirms poke.
         if (failSafeTimerId) {
         clearTimeout(failSafeTimerId);
         failSafeTimerId = 0;
         }
         // Each entry in commandQueue is a JSON string already.
         if (!commandQueue.length) {
         return '';
         }
         var json = '[' + commandQueue.join(',') + ']';
         commandQueue.length = 0;
         return json;
         };
         
         iOSExec.nativeCallback = function(callbackId, status, message, keepCallback, debug) {
         return iOSExec.nativeEvalAndFetch(function() {
                                           var success = status === 0 || status === 1;
                                           var args = convertMessageToArgsNativeToJs(message);
                                           function nc2() {
                                           cordova.callbackFromNative(callbackId, success, status, args, keepCallback);
                                           }
                                           setTimeout(nc2, 0);
                                           });
         };
         
         iOSExec.nativeEvalAndFetch = function(func) {
         // This shouldn't be nested, but better to be safe.
         isInContextOfEvalJs++;
         try {
         func();
         return iOSExec.nativeFetchMessages();
         } finally {
         isInContextOfEvalJs--;
         }
         };
         
         // Proxy the exec for bridge changes. See CB-10106
         
         function cordovaExec() {
         var cexec = require('cordova/exec');
         var cexec_valid = (typeof cexec.nativeFetchMessages === 'function') && (typeof cexec.nativeEvalAndFetch === 'function') && (typeof cexec.nativeCallback === 'function');
         return (cexec_valid && execProxy !== cexec)? cexec : iOSExec;
         }
         
         function execProxy() {
         cordovaExec().apply(null, arguments);
         };
         
         execProxy.nativeFetchMessages = function() {
         return cordovaExec().nativeFetchMessages.apply(null, arguments);
         };
         
         execProxy.nativeEvalAndFetch = function() {
         return cordovaExec().nativeEvalAndFetch.apply(null, arguments);
         };
         
         execProxy.nativeCallback = function() {
         return cordovaExec().nativeCallback.apply(null, arguments);
         };
         
         module.exports = execProxy;
         
         });
  
  // file: src/common/exec/proxy.js
  define("cordova/exec/proxy", function(require, exports, module) {
         
         
         // internal map of proxy function
         var CommandProxyMap = {};
         
         module.exports = {
         
         // example: cordova.commandProxy.add("Accelerometer",{getCurrentAcceleration: function(successCallback, errorCallback, options) {...},...);
         add:function(id,proxyObj) {
         console.log("adding proxy for " + id);
         CommandProxyMap[id] = proxyObj;
         return proxyObj;
         },
         
         // cordova.commandProxy.remove("Accelerometer");
         remove:function(id) {
         var proxy = CommandProxyMap[id];
         delete CommandProxyMap[id];
         CommandProxyMap[id] = null;
         return proxy;
         },
         
         get:function(service,action) {
         return ( CommandProxyMap[service] ? CommandProxyMap[service][action] : null );
         }
         };
         });
  
  // file: src/common/init.js
  define("cordova/init", function(require, exports, module) {
         
         var channel = require('cordova/channel');
         var cordova = require('cordova');
         var modulemapper = require('cordova/modulemapper');
         var platform = require('cordova/platform');
         var pluginloader = require('cordova/pluginloader');
         var utils = require('cordova/utils');
         
         var platformInitChannelsArray = [channel.onNativeReady, channel.onPluginsReady];
         
         function logUnfiredChannels(arr) {
         for (var i = 0; i < arr.length; ++i) {
         if (arr[i].state != 2) {
         console.log('Channel not fired: ' + arr[i].type);
         }
         }
         }
         
         window.setTimeout(function() {
                           if (channel.onDeviceReady.state != 2) {
                           console.log('deviceready has not fired after 5 seconds.');
                           logUnfiredChannels(platformInitChannelsArray);
                           logUnfiredChannels(channel.deviceReadyChannelsArray);
                           }
                           }, 5000);
         
         // Replace navigator before any modules are required(), to ensure it happens as soon as possible.
         // We replace it so that properties that can't be clobbered can instead be overridden.
         function replaceNavigator(origNavigator) {
         var CordovaNavigator = function() {};
         CordovaNavigator.prototype = origNavigator;
         var newNavigator = new CordovaNavigator();
         // This work-around really only applies to new APIs that are newer than Function.bind.
         // Without it, APIs such as getGamepads() break.
         if (CordovaNavigator.bind) {
         for (var key in origNavigator) {
         if (typeof origNavigator[key] == 'function') {
         newNavigator[key] = origNavigator[key].bind(origNavigator);
         }
         else {
         (function(k) {
          utils.defineGetterSetter(newNavigator,key,function() {
                                   return origNavigator[k];
                                   });
          })(key);
         }
         }
         }
         return newNavigator;
         }
         
         if (window.navigator) {
         window.navigator = replaceNavigator(window.navigator);
         }
         
         if (!window.console) {
         window.console = {
         log: function(){}
         };
         }
         if (!window.console.warn) {
         window.console.warn = function(msg) {
         this.log("warn: " + msg);
         };
         }
         
         // Register pause, resume and deviceready channels as events on document.
         channel.onPause = cordova.addDocumentEventHandler('pause');
         channel.onResume = cordova.addDocumentEventHandler('resume');
         channel.onActivated = cordova.addDocumentEventHandler('activated');
         channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');
         
         // Listen for DOMContentLoaded and notify our channel subscribers.
         if (document.readyState == 'complete' || document.readyState == 'interactive') {
         channel.onDOMContentLoaded.fire();
         } else {
         document.addEventListener('DOMContentLoaded', function() {
                                   channel.onDOMContentLoaded.fire();
                                   }, false);
         }
         
         // _nativeReady is global variable that the native side can set
         // to signify that the native code is ready. It is a global since
         // it may be called before any cordova JS is ready.
         if (window._nativeReady) {
         channel.onNativeReady.fire();
         }
         
         modulemapper.clobbers('cordova', 'cordova');
         modulemapper.clobbers('cordova/exec', 'cordova.exec');
         modulemapper.clobbers('cordova/exec', 'Cordova.exec');
         
         // Call the platform-specific initialization.
         platform.bootstrap && platform.bootstrap();
         
         // Wrap in a setTimeout to support the use-case of having plugin JS appended to cordova.js.
         // The delay allows the attached modules to be defined before the plugin loader looks for them.
         setTimeout(function() {
                    pluginloader.load(function() {
                                      channel.onPluginsReady.fire();
                                      });
                    }, 0);
         
/**
 * Create all cordova objects once native side is ready.
 */
         channel.join(function() {
                      modulemapper.mapModules(window);
                      
                      platform.initialize && platform.initialize();
                      
                      // Fire event to notify that all objects are created
                      channel.onCordovaReady.fire();
                      
                      // Fire onDeviceReady event once page has fully loaded, all
                      // constructors have run and cordova info has been received from native
                      // side.
                      channel.join(function() {
                                   require('cordova').fireDocumentEvent('deviceready');
                                   }, channel.deviceReadyChannelsArray);
                      
                      }, platformInitChannelsArray);
         
         
         });
  
  // file: src/common/init_b.js
  define("cordova/init_b", function(require, exports, module) {
         
         var channel = require('cordova/channel');
         var cordova = require('cordova');
         var modulemapper = require('cordova/modulemapper');
         var platform = require('cordova/platform');
         var pluginloader = require('cordova/pluginloader');
         var utils = require('cordova/utils');
         
         var platformInitChannelsArray = [channel.onDOMContentLoaded, channel.onNativeReady, channel.onPluginsReady];
         
         // setting exec
         cordova.exec = require('cordova/exec');
         
         function logUnfiredChannels(arr) {
         for (var i = 0; i < arr.length; ++i) {
         if (arr[i].state != 2) {
         console.log('Channel not fired: ' + arr[i].type);
         }
         }
         }
         
         window.setTimeout(function() {
                           if (channel.onDeviceReady.state != 2) {
                           console.log('deviceready has not fired after 5 seconds.');
                           logUnfiredChannels(platformInitChannelsArray);
                           logUnfiredChannels(channel.deviceReadyChannelsArray);
                           }
                           }, 5000);
         
         // Replace navigator before any modules are required(), to ensure it happens as soon as possible.
         // We replace it so that properties that can't be clobbered can instead be overridden.
         function replaceNavigator(origNavigator) {
         var CordovaNavigator = function() {};
         CordovaNavigator.prototype = origNavigator;
         var newNavigator = new CordovaNavigator();
         // This work-around really only applies to new APIs that are newer than Function.bind.
         // Without it, APIs such as getGamepads() break.
         if (CordovaNavigator.bind) {
         for (var key in origNavigator) {
         if (typeof origNavigator[key] == 'function') {
         newNavigator[key] = origNavigator[key].bind(origNavigator);
         }
         else {
         (function(k) {
          utils.defineGetterSetter(newNavigator,key,function() {
                                   return origNavigator[k];
                                   });
          })(key);
         }
         }
         }
         return newNavigator;
         }
         if (window.navigator) {
         window.navigator = replaceNavigator(window.navigator);
         }
         
         if (!window.console) {
         window.console = {
         log: function(){}
         };
         }
         if (!window.console.warn) {
         window.console.warn = function(msg) {
         this.log("warn: " + msg);
         };
         }
         
         // Register pause, resume and deviceready channels as events on document.
         channel.onPause = cordova.addDocumentEventHandler('pause');
         channel.onResume = cordova.addDocumentEventHandler('resume');
         channel.onActivated = cordova.addDocumentEventHandler('activated');
         channel.onDeviceReady = cordova.addStickyDocumentEventHandler('deviceready');
         
         // Listen for DOMContentLoaded and notify our channel subscribers.
         if (document.readyState == 'complete' || document.readyState == 'interactive') {
         channel.onDOMContentLoaded.fire();
         } else {
         document.addEventListener('DOMContentLoaded', function() {
                                   channel.onDOMContentLoaded.fire();
                                   }, false);
         }
         
         // _nativeReady is global variable that the native side can set
         // to signify that the native code is ready. It is a global since
         // it may be called before any cordova JS is ready.
         if (window._nativeReady) {
         channel.onNativeReady.fire();
         }
         
         // Call the platform-specific initialization.
         platform.bootstrap && platform.bootstrap();
         
         // Wrap in a setTimeout to support the use-case of having plugin JS appended to cordova.js.
         // The delay allows the attached modules to be defined before the plugin loader looks for them.
         setTimeout(function() {
                    pluginloader.load(function() {
                                      channel.onPluginsReady.fire();
                                      });
                    }, 0);
         
/**
 * Create all cordova objects once native side is ready.
 */
         channel.join(function() {
                      modulemapper.mapModules(window);
                      
                      platform.initialize && platform.initialize();
                      
                      // Fire event to notify that all objects are created
                      channel.onCordovaReady.fire();
                      
                      // Fire onDeviceReady event once page has fully loaded, all
                      // constructors have run and cordova info has been received from native
                      // side.
                      channel.join(function() {
                                   require('cordova').fireDocumentEvent('deviceready');
                                   }, channel.deviceReadyChannelsArray);
                      
                      }, platformInitChannelsArray);
         
         });
  
  // file: src/common/modulemapper.js
  define("cordova/modulemapper", function(require, exports, module) {
         
         var builder = require('cordova/builder'),
         moduleMap = define.moduleMap,
         symbolList,
         deprecationMap;
         
         exports.reset = function() {
         symbolList = [];
         deprecationMap = {};
         };
         
         function addEntry(strategy, moduleName, symbolPath, opt_deprecationMessage) {
         if (!(moduleName in moduleMap)) {
         throw new Error('Module ' + moduleName + ' does not exist.');
         }
         symbolList.push(strategy, moduleName, symbolPath);
         if (opt_deprecationMessage) {
         deprecationMap[symbolPath] = opt_deprecationMessage;
         }
         }
         
         // Note: Android 2.3 does have Function.bind().
         exports.clobbers = function(moduleName, symbolPath, opt_deprecationMessage) {
         addEntry('c', moduleName, symbolPath, opt_deprecationMessage);
         };
         
         exports.merges = function(moduleName, symbolPath, opt_deprecationMessage) {
         addEntry('m', moduleName, symbolPath, opt_deprecationMessage);
         };
         
         exports.defaults = function(moduleName, symbolPath, opt_deprecationMessage) {
         addEntry('d', moduleName, symbolPath, opt_deprecationMessage);
         };
         
         exports.runs = function(moduleName) {
         addEntry('r', moduleName, null);
         };
         
         function prepareNamespace(symbolPath, context) {
         if (!symbolPath) {
         return context;
         }
         var parts = symbolPath.split('.');
         var cur = context;
         for (var i = 0, part; part = parts[i]; ++i) {
         cur = cur[part] = cur[part] || {};
         }
         return cur;
         }
         
         exports.mapModules = function(context) {
         var origSymbols = {};
         context.CDV_origSymbols = origSymbols;
         for (var i = 0, len = symbolList.length; i < len; i += 3) {
         var strategy = symbolList[i];
         var moduleName = symbolList[i + 1];
         var module = require(moduleName);
         // <runs/>
         if (strategy == 'r') {
         continue;
         }
         var symbolPath = symbolList[i + 2];
         var lastDot = symbolPath.lastIndexOf('.');
         var namespace = symbolPath.substr(0, lastDot);
         var lastName = symbolPath.substr(lastDot + 1);
         
         var deprecationMsg = symbolPath in deprecationMap ? 'Access made to deprecated symbol: ' + symbolPath + '. ' + deprecationMsg : null;
         var parentObj = prepareNamespace(namespace, context);
         var target = parentObj[lastName];
         
         if (strategy == 'm' && target) {
         builder.recursiveMerge(target, module);
         } else if ((strategy == 'd' && !target) || (strategy != 'd')) {
         if (!(symbolPath in origSymbols)) {
         origSymbols[symbolPath] = target;
         }
         builder.assignOrWrapInDeprecateGetter(parentObj, lastName, module, deprecationMsg);
         }
         }
         };
         
         exports.getOriginalSymbol = function(context, symbolPath) {
         var origSymbols = context.CDV_origSymbols;
         if (origSymbols && (symbolPath in origSymbols)) {
         return origSymbols[symbolPath];
         }
         var parts = symbolPath.split('.');
         var obj = context;
         for (var i = 0; i < parts.length; ++i) {
         obj = obj && obj[parts[i]];
         }
         return obj;
         };
         
         exports.reset();
         
         
         });
  
  // file: src/common/modulemapper_b.js
  define("cordova/modulemapper_b", function(require, exports, module) {
         
         var builder = require('cordova/builder'),
         symbolList = [],
         deprecationMap;
         
         exports.reset = function() {
         symbolList = [];
         deprecationMap = {};
         };
         
         function addEntry(strategy, moduleName, symbolPath, opt_deprecationMessage) {
         symbolList.push(strategy, moduleName, symbolPath);
         if (opt_deprecationMessage) {
         deprecationMap[symbolPath] = opt_deprecationMessage;
         }
         }
         
         // Note: Android 2.3 does have Function.bind().
         exports.clobbers = function(moduleName, symbolPath, opt_deprecationMessage) {
         addEntry('c', moduleName, symbolPath, opt_deprecationMessage);
         };
         
         exports.merges = function(moduleName, symbolPath, opt_deprecationMessage) {
         addEntry('m', moduleName, symbolPath, opt_deprecationMessage);
         };
         
         exports.defaults = function(moduleName, symbolPath, opt_deprecationMessage) {
         addEntry('d', moduleName, symbolPath, opt_deprecationMessage);
         };
         
         exports.runs = function(moduleName) {
         addEntry('r', moduleName, null);
         };
         
         function prepareNamespace(symbolPath, context) {
         if (!symbolPath) {
         return context;
         }
         var parts = symbolPath.split('.');
         var cur = context;
         for (var i = 0, part; part = parts[i]; ++i) {
         cur = cur[part] = cur[part] || {};
         }
         return cur;
         }
         
         exports.mapModules = function(context) {
         var origSymbols = {};
         context.CDV_origSymbols = origSymbols;
         for (var i = 0, len = symbolList.length; i < len; i += 3) {
         var strategy = symbolList[i];
         var moduleName = symbolList[i + 1];
         var module = require(moduleName);
         // <runs/>
         if (strategy == 'r') {
         continue;
         }
         var symbolPath = symbolList[i + 2];
         var lastDot = symbolPath.lastIndexOf('.');
         var namespace = symbolPath.substr(0, lastDot);
         var lastName = symbolPath.substr(lastDot + 1);
         
         var deprecationMsg = symbolPath in deprecationMap ? 'Access made to deprecated symbol: ' + symbolPath + '. ' + deprecationMsg : null;
         var parentObj = prepareNamespace(namespace, context);
         var target = parentObj[lastName];
         
         if (strategy == 'm' && target) {
         builder.recursiveMerge(target, module);
         } else if ((strategy == 'd' && !target) || (strategy != 'd')) {
         if (!(symbolPath in origSymbols)) {
         origSymbols[symbolPath] = target;
         }
         builder.assignOrWrapInDeprecateGetter(parentObj, lastName, module, deprecationMsg);
         }
         }
         };
         
         exports.getOriginalSymbol = function(context, symbolPath) {
         var origSymbols = context.CDV_origSymbols;
         if (origSymbols && (symbolPath in origSymbols)) {
         return origSymbols[symbolPath];
         }
         var parts = symbolPath.split('.');
         var obj = context;
         for (var i = 0; i < parts.length; ++i) {
         obj = obj && obj[parts[i]];
         }
         return obj;
         };
         
         exports.reset();
         
         
         });
  
  // file: /Users/steveng/repo/cordova/cordova-ios/cordova-js-src/platform.js
  define("cordova/platform", function(require, exports, module) {
         
         module.exports = {
         id: 'ios',
         bootstrap: function() {
         require('cordova/channel').onNativeReady.fire();
         }
         };
         
         
         });
  
  
  
  // file: src/common/pluginloader_b.js
  define("cordova/pluginloader_b", function(require, exports, module) {
         
         var modulemapper = require('cordova/modulemapper');
         
         // Handler for the plugins.js content.
         // See plugman's plugin_loader.js for the details of this object.
         function handlePluginsObject(moduleList) {
         // if moduleList is not defined or empty, we've nothing to do
         if (!moduleList || !moduleList.length) {
         return;
         }
         
         // Loop through all the modules and then through their clobbers and merges.
         for (var i = 0, module; module = moduleList[i]; i++) {
         if (module.clobbers && module.clobbers.length) {
         for (var j = 0; j < module.clobbers.length; j++) {
         modulemapper.clobbers(module.id, module.clobbers[j]);
         }
         }
         
         if (module.merges && module.merges.length) {
         for (var k = 0; k < module.merges.length; k++) {
         modulemapper.merges(module.id, module.merges[k]);
         }
         }
         
         // Finally, if runs is truthy we want to simply require() the module.
         if (module.runs) {
         modulemapper.runs(module.id);
         }
         }
         }
         
         // Loads all plugins' js-modules. Plugin loading is syncronous in browserified bundle
         // but the method accepts callback to be compatible with non-browserify flow.
         // onDeviceReady is blocked on onPluginsReady. onPluginsReady is fired when there are
         // no plugins to load, or they are all done.
         exports.load = function(callback) {
         var moduleList = require("cordova/plugin_list");
         handlePluginsObject(moduleList);
         
         callback();
         };
         
         
         });
  
  // file: src/common/urlutil.js
  define("cordova/urlutil", function(require, exports, module) {
         
         
/**
 * For already absolute URLs, returns what is passed in.
 * For relative URLs, converts them to absolute ones.
 */
         exports.makeAbsolute = function makeAbsolute(url) {
         var anchorEl = document.createElement('a');
         anchorEl.href = url;
         return anchorEl.href;
         };
         
         
         });
  
  // file: src/common/utils.js
  define("cordova/utils", function(require, exports, module) {
         
         var utils = exports;
         
/**
 * Defines a property getter / setter for obj[key].
 */
         utils.defineGetterSetter = function(obj, key, getFunc, opt_setFunc) {
         if (Object.defineProperty) {
         var desc = {
         get: getFunc,
         configurable: true
         };
         if (opt_setFunc) {
         desc.set = opt_setFunc;
         }
         Object.defineProperty(obj, key, desc);
         } else {
         obj.__defineGetter__(key, getFunc);
         if (opt_setFunc) {
         obj.__defineSetter__(key, opt_setFunc);
         }
         }
         };
         
/**
 * Defines a property getter for obj[key].
 */
         utils.defineGetter = utils.defineGetterSetter;
         
         utils.arrayIndexOf = function(a, item) {
         if (a.indexOf) {
         return a.indexOf(item);
         }
         var len = a.length;
         for (var i = 0; i < len; ++i) {
         if (a[i] == item) {
         return i;
         }
         }
         return -1;
         };
         
/**
 * Returns whether the item was found in the array.
 */
         utils.arrayRemove = function(a, item) {
         var index = utils.arrayIndexOf(a, item);
         if (index != -1) {
         a.splice(index, 1);
         }
         return index != -1;
         };
         
         utils.typeName = function(val) {
         return Object.prototype.toString.call(val).slice(8, -1);
         };
         
/**
 * Returns an indication of whether the argument is an array or not
 */
         utils.isArray = Array.isArray ||
         function(a) {return utils.typeName(a) == 'Array';};
         
/**
 * Returns an indication of whether the argument is a Date or not
 */
         utils.isDate = function(d) {
         return (d instanceof Date);
         };
         
/**
 * Does a deep clone of the object.
 */
         utils.clone = function(obj) {
         if(!obj || typeof obj == 'function' || utils.isDate(obj) || typeof obj != 'object') {
         return obj;
         }
         
         var retVal, i;
         
         if(utils.isArray(obj)){
         retVal = [];
         for(i = 0; i < obj.length; ++i){
         retVal.push(utils.clone(obj[i]));
         }
         return retVal;
         }
         
         retVal = {};
         for(i in obj){
         if(!(i in retVal) || retVal[i] != obj[i]) {
         retVal[i] = utils.clone(obj[i]);
         }
         }
         return retVal;
         };
         
/**
 * Returns a wrapped version of the function
 */
         utils.close = function(context, func, params) {
         return function() {
         var args = params || arguments;
         return func.apply(context, args);
         };
         };
         
         //------------------------------------------------------------------------------
         function UUIDcreatePart(length) {
         var uuidpart = "";
         for (var i=0; i<length; i++) {
         var uuidchar = parseInt((Math.random() * 256), 10).toString(16);
         if (uuidchar.length == 1) {
         uuidchar = "0" + uuidchar;
         }
         uuidpart += uuidchar;
         }
         return uuidpart;
         }
         
/**
 * Create a UUID
 */
         utils.createUUID = function() {
         return UUIDcreatePart(4) + '-' +
         UUIDcreatePart(2) + '-' +
         UUIDcreatePart(2) + '-' +
         UUIDcreatePart(2) + '-' +
         UUIDcreatePart(6);
         };
         
         
/**
 * Extends a child object from a parent object using classical inheritance
 * pattern.
 */
         utils.extend = (function() {
                         // proxy used to establish prototype chain
                         var F = function() {};
                         // extend Child from Parent
                         return function(Child, Parent) {
                         
                         F.prototype = Parent.prototype;
                         Child.prototype = new F();
                         Child.__super__ = Parent.prototype;
                         Child.prototype.constructor = Child;
                         };
                         }());
         
/**
 * Alerts a message in any available way: alert or console.log.
 */
         utils.alert = function(msg) {
         if (window.alert) {
         window.alert(msg);
         } else if (console && console.log) {
         console.log(msg);
         }
         };
         
         
         
         
         
         });
  
  window.cordova = require('cordova');
  // file: src/scripts/bootstrap.js
  
  require('cordova/init');
  
  })();

/** plugins/xsf/www/xsf.js */
cordova.define("xsf", function(require, exports, module) {
               function onSucceed(args){
               //alert("succeed:" + args);
               }
               function onError(err){
               //alert("error:" + err);
               }
               function call(callee,args,callback){
               callback = callback || onSucceed;
               exec(callback,onError, "XSFPlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               getDeviceId : function(callback){
               call('getDeviceId',[],callback);
               },getDeviceInfo : function(callback){
               call('getDeviceInfo',[],callback);
               },set : function(key,value){
               call('set',[key,value]);
               },get : function(key,defaultValue,callback){
               call('get', [key, defaultValue], callback);
               },openApp : function(packageName,className,params){
               call('openApp',[packageName,className,params||{}]);
               },startService : function(ation,params){
               call('startService',[ation,params||{}]);
               },playVideo : function(url){
               call('playVideo',[url]);
               },telto : function(phoneNum){
               call('telto',[phoneNum]);
               },smsto : function(phoneNum){
               call('smsto',[phoneNum]);
               },openUrl : function(url){
               call('openUrl',[path]);
               },open:function(path){
               xsfFileOpener.open(path);
               },goHome:function(){
               call('goHome',[]);
               },login:function(){
               call('login',[]);
               },logout:function(){
               call('logout',[]);
               },getVPN:function(callback){
               call('getVPN',[],callback);
               },openMeetingQuery:function(callback){
               call('openMeetingQuery',[],callback);
               }
               };
               //
               
               });

/** plugins/cordova-plugin-device/www/device.js */

cordova.define("cordova-plugin-device.device", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    cordova = require('cordova');

channel.createSticky('onCordovaInfoReady');
// Tell cordova channel to wait on the CordovaInfoReady event
channel.waitForInitialization('onCordovaInfoReady');

/**
 * This represents the mobile device, and provides properties for inspecting the model, version, UUID of the
 * phone, etc.
 * @constructor
 */
function Device() {
    this.available = false;
    this.platform = null;
    this.version = null;
    this.uuid = null;
    this.cordova = null;
    this.model = null;
    this.manufacturer = null;
    this.isVirtual = null;
    this.serial = null;

    var me = this;

    channel.onCordovaReady.subscribe(function() {
        me.getInfo(function(info) {
            //ignoring info.cordova returning from native, we should use value from cordova.version defined in cordova.js
            //TODO: CB-5105 native implementations should not return info.cordova
            var buildLabel = cordova.version;
            me.available = true;
            me.platform = info.platform;
            me.version = info.version;
            me.uuid = info.uuid;
            me.cordova = buildLabel;
            me.model = info.model;
            me.isVirtual = info.isVirtual;
            me.manufacturer = info.manufacturer || 'unknown';
            me.serial = info.serial || 'unknown';
            channel.onCordovaInfoReady.fire();
        },function(e) {
            me.available = false;
            utils.alert("[ERROR] Error initializing Cordova: " + e);
        });
    });
}

/**
 * Get device info
 *
 * @param {Function} successCallback The function to call when the heading data is available
 * @param {Function} errorCallback The function to call when there is an error getting the heading data. (OPTIONAL)
 */
Device.prototype.getInfo = function(successCallback, errorCallback) {
    argscheck.checkArgs('fF', 'Device.getInfo', arguments);
    exec(successCallback, errorCallback, "Device", "getDeviceInfo", []);
};

module.exports = new Device();

});

/** plugins/cordova-plugin-network-information/www/Connection.js */

cordova.define("cordova-plugin-network-information.Connection", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Network status
 */
module.exports = {
        UNKNOWN: "unknown",
        ETHERNET: "ethernet",
        WIFI: "wifi",
        CELL_2G: "2g",
        CELL_3G: "3g",
        CELL_4G: "4g",
        CELL:"cellular",
        NONE: "none"
};

});

/** plugins/cordova-plugin-network-information/www/network.js */

cordova.define("cordova-plugin-network-information.network", function(require, exports, module) {
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    cordova = require('cordova'),
    channel = require('cordova/channel'),
    utils = require('cordova/utils');

// Link the onLine property with the Cordova-supplied network info.
// This works because we clobber the navigator object with our own
// object in bootstrap.js.
// Browser platform do not need to define this property, because
// it is already supported by modern browsers
if (cordova.platformId !== 'browser' && typeof navigator != 'undefined') {
    utils.defineGetter(navigator, 'onLine', function() {
        return this.connection.type != 'none';
    });
}

function NetworkConnection() {
    this.type = 'unknown';
}

/**
 * Get connection info
 *
 * @param {Function} successCallback The function to call when the Connection data is available
 * @param {Function} errorCallback The function to call when there is an error getting the Connection data. (OPTIONAL)
 */
NetworkConnection.prototype.getInfo = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "NetworkStatus", "getConnectionInfo", []);
};

var me = new NetworkConnection();
var timerId = null;
var timeout = 500;

channel.createSticky('onCordovaConnectionReady');
channel.waitForInitialization('onCordovaConnectionReady');

channel.onCordovaReady.subscribe(function() {
    me.getInfo(function(info) {
        me.type = info;
        if (info === "none") {
            // set a timer if still offline at the end of timer send the offline event
            timerId = setTimeout(function(){
                cordova.fireDocumentEvent("offline");
                timerId = null;
            }, timeout);
        } else {
            // If there is a current offline event pending clear it
            if (timerId !== null) {
                clearTimeout(timerId);
                timerId = null;
            }
            cordova.fireDocumentEvent("online");
        }

        // should only fire this once
        if (channel.onCordovaConnectionReady.state !== 2) {
            channel.onCordovaConnectionReady.fire();
        }
    },
    function (e) {
        // If we can't get the network info we should still tell Cordova
        // to fire the deviceready event.
        if (channel.onCordovaConnectionReady.state !== 2) {
            channel.onCordovaConnectionReady.fire();
        }
        console.log("Error initializing Network Connection: " + e);
    });
});

module.exports = me;

});

/** plugins/cordova-plugin-battery-status/www/battery.js */

cordova.define("cordova-plugin-battery-status.battery", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * This class contains information about the current battery status.
 * @constructor
 */
var cordova = require('cordova'),
    exec = require('cordova/exec');

var STATUS_CRITICAL = 5;
var STATUS_LOW = 20;

var Battery = function() {
    this._level = null;
    this._isPlugged = null;
    // Create new event handlers on the window (returns a channel instance)
    this.channels = {
      batterystatus:cordova.addWindowEventHandler("batterystatus"),
      batterylow:cordova.addWindowEventHandler("batterylow"),
      batterycritical:cordova.addWindowEventHandler("batterycritical")
    };
    for (var key in this.channels) {
        this.channels[key].onHasSubscribersChange = Battery.onHasSubscribersChange;
    }
};

function handlers() {
    return battery.channels.batterystatus.numHandlers +
        battery.channels.batterylow.numHandlers +
        battery.channels.batterycritical.numHandlers;
}

/**
 * Event handlers for when callbacks get registered for the battery.
 * Keep track of how many handlers we have so we can start and stop the native battery listener
 * appropriately (and hopefully save on battery life!).
 */
Battery.onHasSubscribersChange = function() {
  // If we just registered the first handler, make sure native listener is started.
  if (this.numHandlers === 1 && handlers() === 1) {
      exec(battery._status, battery._error, "Battery", "start", []);
  } else if (handlers() === 0) {
      exec(null, null, "Battery", "stop", []);
  }
};

/**
 * Callback for battery status
 *
 * @param {Object} info            keys: level, isPlugged
 */
Battery.prototype._status = function (info) {
    if (info) {
        if (battery._level !== info.level || battery._isPlugged !== info.isPlugged) {
            
            if(info.level === null && battery._level !== null) {
                return; // special case where callback is called because we stopped listening to the native side.
            }
            
            // Something changed. Fire batterystatus event
            cordova.fireWindowEvent("batterystatus", info);

            if (!info.isPlugged) { // do not fire low/critical if we are charging. issue: CB-4520
                // note the following are NOT exact checks, as we want to catch a transition from 
                // above the threshold to below. issue: CB-4519
                if (battery._level > STATUS_CRITICAL && info.level <= STATUS_CRITICAL) { 
                    // Fire critical battery event
                    cordova.fireWindowEvent("batterycritical", info);
                }
                else if (battery._level > STATUS_LOW && info.level <= STATUS_LOW) {
                    // Fire low battery event
                    cordova.fireWindowEvent("batterylow", info);
                }
            }
            battery._level = info.level;
            battery._isPlugged = info.isPlugged;
        }
    }
};
/**
 * Error callback for battery start
 */
Battery.prototype._error = function(e) {
    console.log("Error initializing Battery: " + e);
};

var battery = new Battery(); // jshint ignore:line

module.exports = battery;

});

/** plugins/cordova-plugin-camera/www/Camera.js */

cordova.define("cordova-plugin-camera.camera", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    Camera = require('./Camera');
    // XXX: commented out
    //CameraPopoverHandle = require('./CameraPopoverHandle');

/**
 * @namespace navigator
 */

/**
 * @exports camera
 */
var cameraExport = {};

// Tack on the Camera Constants to the base camera plugin.
for (var key in Camera) {
    cameraExport[key] = Camera[key];
}

/**
 * Callback function that provides an error message.
 * @callback module:camera.onError
 * @param {string} message - The message is provided by the device's native code.
 */

/**
 * Callback function that provides the image data.
 * @callback module:camera.onSuccess
 * @param {string} imageData - Base64 encoding of the image data, _or_ the image file URI, depending on [`cameraOptions`]{@link module:camera.CameraOptions} in effect.
 * @example
 * // Show image
 * //
 * function cameraCallback(imageData) {
 *    var image = document.getElementById('myImage');
 *    image.src = "data:image/jpeg;base64," + imageData;
 * }
 */

/**
 * Optional parameters to customize the camera settings.
 * * [Quirks](#CameraOptions-quirks)
 * @typedef module:camera.CameraOptions
 * @type {Object}
 * @property {number} [quality=50] - Quality of the saved image, expressed as a range of 0-100, where 100 is typically full resolution with no loss from file compression. (Note that information about the camera's resolution is unavailable.)
 * @property {module:Camera.DestinationType} [destinationType=FILE_URI] - Choose the format of the return value.
 * @property {module:Camera.PictureSourceType} [sourceType=CAMERA] - Set the source of the picture.
 * @property {Boolean} [allowEdit=true] - Allow simple editing of image before selection.
 * @property {module:Camera.EncodingType} [encodingType=JPEG] - Choose the  returned image file's encoding.
 * @property {number} [targetWidth] - Width in pixels to scale image. Must be used with `targetHeight`. Aspect ratio remains constant.
 * @property {number} [targetHeight] - Height in pixels to scale image. Must be used with `targetWidth`. Aspect ratio remains constant.
 * @property {module:Camera.MediaType} [mediaType=PICTURE] - Set the type of media to select from.  Only works when `PictureSourceType` is `PHOTOLIBRARY` or `SAVEDPHOTOALBUM`.
 * @property {Boolean} [correctOrientation] - Rotate the image to correct for the orientation of the device during capture.
 * @property {Boolean} [saveToPhotoAlbum] - Save the image to the photo album on the device after capture.
 * @property {module:CameraPopoverOptions} [popoverOptions] - iOS-only options that specify popover location in iPad.
 * @property {module:Camera.Direction} [cameraDirection=BACK] - Choose the camera to use (front- or back-facing).
 */

/**
 * @description Takes a photo using the camera, or retrieves a photo from the device's
 * image gallery.  The image is passed to the success callback as a
 * Base64-encoded `String`, or as the URI for the image file.
 *
 * The `camera.getPicture` function opens the device's default camera
 * application that allows users to snap pictures by default - this behavior occurs,
 * when `Camera.sourceType` equals [`Camera.PictureSourceType.CAMERA`]{@link module:Camera.PictureSourceType}.
 * Once the user snaps the photo, the camera application closes and the application is restored.
 *
 * If `Camera.sourceType` is `Camera.PictureSourceType.PHOTOLIBRARY` or
 * `Camera.PictureSourceType.SAVEDPHOTOALBUM`, then a dialog displays
 * that allows users to select an existing image.  The
 * `camera.getPicture` function returns a [`CameraPopoverHandle`]{@link module:CameraPopoverHandle} object,
 * which can be used to reposition the image selection dialog, for
 * example, when the device orientation changes.
 *
 * The return value is sent to the [`cameraSuccess`]{@link module:camera.onSuccess} callback function, in
 * one of the following formats, depending on the specified
 * `cameraOptions`:
 *
 * - A `String` containing the Base64-encoded photo image.
 *
 * - A `String` representing the image file location on local storage (default).
 *
 * You can do whatever you want with the encoded image or URI, for
 * example:
 *
 * - Render the image in an `<img>` tag, as in the example below
 *
 * - Save the data locally (`LocalStorage`, [Lawnchair](http://brianleroux.github.com/lawnchair/), etc.)
 *
 * - Post the data to a remote server
 *
 * __NOTE__: Photo resolution on newer devices is quite good. Photos
 * selected from the device's gallery are not downscaled to a lower
 * quality, even if a `quality` parameter is specified.  To avoid common
 * memory problems, set `Camera.destinationType` to `FILE_URI` rather
 * than `DATA_URL`.
 *
 * __Supported Platforms__
 *
 * - Android
 * - BlackBerry
 * - Browser
 * - Firefox
 * - FireOS
 * - iOS
 * - Windows
 * - WP8
 * - Ubuntu
 *
 * More examples [here](#camera-getPicture-examples). Quirks [here](#camera-getPicture-quirks).
 *
 * @example
 * navigator.camera.getPicture(cameraSuccess, cameraError, cameraOptions);
 * @param {module:camera.onSuccess} successCallback
 * @param {module:camera.onError} errorCallback
 * @param {module:camera.CameraOptions} options CameraOptions
 */
cameraExport.getPicture = function(successCallback, errorCallback, options) {
    argscheck.checkArgs('fFO', 'Camera.getPicture', arguments);
    options = options || {};
    var getValue = argscheck.getValue;

    var quality = getValue(options.quality, 50);
    var destinationType = getValue(options.destinationType, Camera.DestinationType.FILE_URI);
    var sourceType = getValue(options.sourceType, Camera.PictureSourceType.CAMERA);
    var targetWidth = getValue(options.targetWidth, -1);
    var targetHeight = getValue(options.targetHeight, -1);
    var encodingType = getValue(options.encodingType, Camera.EncodingType.JPEG);
    var mediaType = getValue(options.mediaType, Camera.MediaType.PICTURE);
    var allowEdit = !!options.allowEdit;
    var correctOrientation = !!options.correctOrientation;
    var saveToPhotoAlbum = !!options.saveToPhotoAlbum;
    var popoverOptions = getValue(options.popoverOptions, null);
    var cameraDirection = getValue(options.cameraDirection, Camera.Direction.BACK);

    var args = [quality, destinationType, sourceType, targetWidth, targetHeight, encodingType,
                mediaType, allowEdit, correctOrientation, saveToPhotoAlbum, popoverOptions, cameraDirection];

    exec(successCallback, errorCallback, "Camera", "takePicture", args);
    // XXX: commented out
    //return new CameraPopoverHandle();
};

/**
 * Removes intermediate image files that are kept in temporary storage
 * after calling [`camera.getPicture`]{@link module:camera.getPicture}. Applies only when the value of
 * `Camera.sourceType` equals `Camera.PictureSourceType.CAMERA` and the
 * `Camera.destinationType` equals `Camera.DestinationType.FILE_URI`.
 *
 * __Supported Platforms__
 *
 * - iOS
 *
 * @example
 * navigator.camera.cleanup(onSuccess, onFail);
 *
 * function onSuccess() {
 *     console.log("Camera cleanup success.")
 * }
 *
 * function onFail(message) {
 *     alert('Failed because: ' + message);
 * }
 */
cameraExport.cleanup = function(successCallback, errorCallback) {
    exec(successCallback, errorCallback, "Camera", "cleanup", []);
};

module.exports = cameraExport;

});

/** plugins/cordova-plugin-camera/www/CameraConstants.js */

cordova.define("cordova-plugin-camera.Camera", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * @module Camera
 */
module.exports = {
  /**
   * @enum {number}
   */
  DestinationType:{
    /** Return base64 encoded string. DATA_URL can be very memory intensive and cause app crashes or out of memory errors. Use FILE_URI or NATIVE_URI if possible */
    DATA_URL: 0,
    /** Return file uri (content://media/external/images/media/2 for Android) */
    FILE_URI: 1,
    /** Return native uri (eg. asset-library://... for iOS) */
    NATIVE_URI: 2
  },
  /**
   * @enum {number}
   */
  EncodingType:{
    /** Return JPEG encoded image */
    JPEG: 0,
    /** Return PNG encoded image */
    PNG: 1
  },
  /**
   * @enum {number}
   */
  MediaType:{
    /** Allow selection of still pictures only. DEFAULT. Will return format specified via DestinationType */
    PICTURE: 0,
    /** Allow selection of video only, ONLY RETURNS URL */
    VIDEO: 1,
    /** Allow selection from all media types */
    ALLMEDIA : 2
  },
  /**
   * @enum {number}
   */
  PictureSourceType:{
    /** Choose image from picture library (same as SAVEDPHOTOALBUM for Android) */
    PHOTOLIBRARY : 0,
    /** Take picture from camera */
    CAMERA : 1,
    /** Choose image from picture library (same as PHOTOLIBRARY for Android) */
    SAVEDPHOTOALBUM : 2
  },
  /**
   * Matches iOS UIPopoverArrowDirection constants to specify arrow location on popover.
   * @enum {number}
   */
  PopoverArrowDirection:{
      ARROW_UP : 1,
      ARROW_DOWN : 2,
      ARROW_LEFT : 4,
      ARROW_RIGHT : 8,
      ARROW_ANY : 15
  },
  /**
   * @enum {number}
   */
  Direction:{
      /** Use the back-facing camera */
      BACK: 0,
      /** Use the front-facing camera */
      FRONT: 1
  }
};

});

/** plugins/cordova-plugin-camera/www/CameraPopoverOptions.js */

cordova.define("cordova-plugin-camera.CameraPopoverOptions", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var Camera = require('./Camera');

/** 
 * @namespace navigator
 */

/**
 * iOS-only parameters that specify the anchor element location and arrow
 * direction of the popover when selecting images from an iPad's library
 * or album.
 * Note that the size of the popover may change to adjust to the
 * direction of the arrow and orientation of the screen.  Make sure to
 * account for orientation changes when specifying the anchor element
 * location.
 * @module CameraPopoverOptions
 * @param {Number} [x=0] - x pixel coordinate of screen element onto which to anchor the popover.
 * @param {Number} [y=32] - y pixel coordinate of screen element onto which to anchor the popover.
 * @param {Number} [width=320] - width, in pixels, of the screen element onto which to anchor the popover.
 * @param {Number} [height=480] - height, in pixels, of the screen element onto which to anchor the popover.
 * @param {module:Camera.PopoverArrowDirection} [arrowDir=ARROW_ANY] - Direction the arrow on the popover should point.
 */
var CameraPopoverOptions = function (x, y, width, height, arrowDir) {
    // information of rectangle that popover should be anchored to
    this.x = x || 0;
    this.y = y || 32;
    this.width = width || 320;
    this.height = height || 480;
    this.arrowDir = arrowDir || Camera.PopoverArrowDirection.ARROW_ANY;
};

module.exports = CameraPopoverOptions;

});

/** plugins/cordova-plugin-camera/www/ios/CameraPopoverHandle.js */

cordova.define("cordova-plugin-camera.CameraPopoverHandle", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');

/**
 * @namespace navigator
 */

/**
 * A handle to an image picker popover.
 *
 * __Supported Platforms__
 *
 * - iOS
 *
 * @example
 * var cameraPopoverHandle = navigator.camera.getPicture(onSuccess, onFail,
 * {
 *     destinationType: Camera.DestinationType.FILE_URI,
 *     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
 *     popoverOptions: new CameraPopoverOptions(300, 300, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY)
 * });
 *
 * // Reposition the popover if the orientation changes.
 * window.onorientationchange = function() {
 *     var cameraPopoverOptions = new CameraPopoverOptions(0, 0, 100, 100, Camera.PopoverArrowDirection.ARROW_ANY);
 *     cameraPopoverHandle.setPosition(cameraPopoverOptions);
 * }
 * @module CameraPopoverHandle
 */
var CameraPopoverHandle = function() {
    /** Set the position of the popover.
     * @param {module:CameraPopoverOptions} popoverOptions
     */
    this.setPosition = function(popoverOptions) {
        var args = [ popoverOptions ];
        exec(null, null, "Camera", "repositionPopover", args);
    };
};

module.exports = CameraPopoverHandle;

});

/** plugins/cordova-plugin-contacts/www/Contact.js */

cordova.define("cordova-plugin-contacts.Contact", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    ContactError = require('./ContactError'),
    utils = require('cordova/utils'),
    convertUtils = require('./convertUtils');

/**
* Contains information about a single contact.
* @constructor
* @param {DOMString} id unique identifier
* @param {DOMString} displayName
* @param {ContactName} name
* @param {DOMString} nickname
* @param {Array.<ContactField>} phoneNumbers array of phone numbers
* @param {Array.<ContactField>} emails array of email addresses
* @param {Array.<ContactAddress>} addresses array of addresses
* @param {Array.<ContactField>} ims instant messaging user ids
* @param {Array.<ContactOrganization>} organizations
* @param {DOMString} birthday contact's birthday
* @param {DOMString} note user notes about contact
* @param {Array.<ContactField>} photos
* @param {Array.<ContactField>} categories
* @param {Array.<ContactField>} urls contact's web sites
*/
var Contact = function (id, displayName, name, nickname, phoneNumbers, emails, addresses,
    ims, organizations, birthday, note, photos, categories, urls) {
    this.id = id || null;
    this.rawId = null;
    this.displayName = displayName || null;
    this.name = name || null; // ContactName
    this.nickname = nickname || null;
    this.phoneNumbers = phoneNumbers || null; // ContactField[]
    this.emails = emails || null; // ContactField[]
    this.addresses = addresses || null; // ContactAddress[]
    this.ims = ims || null; // ContactField[]
    this.organizations = organizations || null; // ContactOrganization[]
    this.birthday = birthday || null;
    this.note = note || null;
    this.photos = photos || null; // ContactField[]
    this.categories = categories || null; // ContactField[]
    this.urls = urls || null; // ContactField[]
};

/**
* Removes contact from device storage.
* @param successCB success callback
* @param errorCB error callback
*/
Contact.prototype.remove = function(successCB, errorCB) {
    argscheck.checkArgs('FF', 'Contact.remove', arguments);
    var fail = errorCB && function(code) {
        errorCB(new ContactError(code));
    };
    if (this.id === null) {
        fail(ContactError.UNKNOWN_ERROR);
    }
    else {
        exec(successCB, fail, "Contacts", "remove", [this.id]);
    }
};

/**
* Creates a deep copy of this Contact.
* With the contact ID set to null.
* @return copy of this Contact
*/
Contact.prototype.clone = function() {
    var clonedContact = utils.clone(this);
    clonedContact.id = null;
    clonedContact.rawId = null;

    function nullIds(arr) {
        if (arr) {
            for (var i = 0; i < arr.length; ++i) {
                arr[i].id = null;
            }
        }
    }

    // Loop through and clear out any id's in phones, emails, etc.
    nullIds(clonedContact.phoneNumbers);
    nullIds(clonedContact.emails);
    nullIds(clonedContact.addresses);
    nullIds(clonedContact.ims);
    nullIds(clonedContact.organizations);
    nullIds(clonedContact.categories);
    nullIds(clonedContact.photos);
    nullIds(clonedContact.urls);
    return clonedContact;
};

/**
* Persists contact to device storage.
* @param successCB success callback
* @param errorCB error callback
*/
Contact.prototype.save = function(successCB, errorCB) {
    argscheck.checkArgs('FFO', 'Contact.save', arguments);
    var fail = errorCB && function(code) {
        errorCB(new ContactError(code));
    };
    var success = function(result) {
        if (result) {
            if (successCB) {
                var fullContact = require('./contacts').create(result);
                successCB(convertUtils.toCordovaFormat(fullContact));
            }
        }
        else {
            // no Entry object returned
            fail(ContactError.UNKNOWN_ERROR);
        }
    };
    var dupContact = convertUtils.toNativeFormat(utils.clone(this));
    exec(success, fail, "Contacts", "save", [dupContact]);
};


module.exports = Contact;

});

/** plugins/cordova-plugin-contacts/www/ContactAddress.js */

cordova.define("cordova-plugin-contacts.ContactAddress", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* Contact address.
* @constructor
* @param {DOMString} id unique identifier, should only be set by native code
* @param formatted // NOTE: not a W3C standard
* @param streetAddress
* @param locality
* @param region
* @param postalCode
* @param country
*/

var ContactAddress = function(pref, type, formatted, streetAddress, locality, region, postalCode, country) {
    this.id = null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
    this.type = type || null;
    this.formatted = formatted || null;
    this.streetAddress = streetAddress || null;
    this.locality = locality || null;
    this.region = region || null;
    this.postalCode = postalCode || null;
    this.country = country || null;
};

module.exports = ContactAddress;

});

/** plugins/cordova-plugin-contacts/www/ContactError.js */

cordova.define("cordova-plugin-contacts.ContactError", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 *  ContactError.
 *  An error code assigned by an implementation when an error has occurred
 * @constructor
 */
var ContactError = function(err) {
    this.code = (typeof err != 'undefined' ? err : null);
};

/**
 * Error codes
 */
ContactError.UNKNOWN_ERROR = 0;
ContactError.INVALID_ARGUMENT_ERROR = 1;
ContactError.TIMEOUT_ERROR = 2;
ContactError.PENDING_OPERATION_ERROR = 3;
ContactError.IO_ERROR = 4;
ContactError.NOT_SUPPORTED_ERROR = 5;
ContactError.OPERATION_CANCELLED_ERROR = 6;
ContactError.PERMISSION_DENIED_ERROR = 20;

module.exports = ContactError;

});

/** plugins/cordova-plugin-contacts/www/ContactField.js */

cordova.define("cordova-plugin-contacts.ContactField", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* Generic contact field.
* @constructor
* @param {DOMString} id unique identifier, should only be set by native code // NOTE: not a W3C standard
* @param type
* @param value
* @param pref
*/
var ContactField = function(type, value, pref) {
    this.id = null;
    this.type = (type && type.toString()) || null;
    this.value = (value && value.toString()) || null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
};

module.exports = ContactField;

});

/** plugins/cordova-plugin-contacts/www/ContactFieldType.js */

cordova.define("cordova-plugin-contacts.ContactFieldType", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

    // Possible field names for various platforms.
    // Some field names are platform specific

    var fieldType = {
        addresses:      "addresses",
        birthday:       "birthday",
        categories:     "categories",
        country:        "country",
        department:     "department",
        displayName:    "displayName",
        emails:         "emails",
        familyName:     "familyName",
        formatted:      "formatted",
        givenName:      "givenName",
        honorificPrefix: "honorificPrefix",
        honorificSuffix: "honorificSuffix",
        id:             "id",
        ims:            "ims",
        locality:       "locality",
        middleName:     "middleName",
        name:           "name",
        nickname:       "nickname",
        note:           "note",
        organizations:  "organizations",
        phoneNumbers:   "phoneNumbers",
        photos:         "photos",
        postalCode:     "postalCode",
        region:         "region",
        streetAddress:  "streetAddress",
        title:          "title",
        urls:           "urls"
    };

    module.exports = fieldType;

});

/** plugins/cordova-plugin-contacts/www/ContactFindOptions.js */

cordova.define("cordova-plugin-contacts.ContactFindOptions", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * ContactFindOptions.
 * @constructor
 * @param filter used to match contacts against
 * @param multiple boolean used to determine if more than one contact should be returned
 * @param desiredFields 
 * @param hasPhoneNumber boolean used to filter the search and only return contacts that have a phone number informed
 */

var ContactFindOptions = function(filter, multiple, desiredFields, hasPhoneNumber) {
    this.filter = filter || '';
    this.multiple = (typeof multiple != 'undefined' ? multiple : false);
    this.desiredFields = typeof desiredFields != 'undefined' ? desiredFields : [];
    this.hasPhoneNumber = typeof hasPhoneNumber != 'undefined' ? hasPhoneNumber : false;
};

module.exports = ContactFindOptions;

});

/** plugins/cordova-plugin-contacts/www/ContactName.js */

cordova.define("cordova-plugin-contacts.ContactName", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* Contact name.
* @constructor
* @param formatted // NOTE: not part of W3C standard
* @param familyName
* @param givenName
* @param middle
* @param prefix
* @param suffix
*/
var ContactName = function(formatted, familyName, givenName, middle, prefix, suffix) {
    this.formatted = formatted || null;
    this.familyName = familyName || null;
    this.givenName = givenName || null;
    this.middleName = middle || null;
    this.honorificPrefix = prefix || null;
    this.honorificSuffix = suffix || null;
};

module.exports = ContactName;

});

/** plugins/cordova-plugin-contacts/www/ContactOrganization.js */

cordova.define("cordova-plugin-contacts.ContactOrganization", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
* Contact organization.
* @constructor
* @param pref
* @param type
* @param name
* @param dept
* @param title
*/

var ContactOrganization = function(pref, type, name, dept, title) {
    this.id = null;
    this.pref = (typeof pref != 'undefined' ? pref : false);
    this.type = type || null;
    this.name = name || null;
    this.department = dept || null;
    this.title = title || null;
};

module.exports = ContactOrganization;

});

/** plugins/cordova-plugin-contacts/www/contacts.js */

cordova.define("cordova-plugin-contacts.contacts", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    ContactError = require('./ContactError'),
    Contact = require('./Contact'),
    fieldType = require('./ContactFieldType'),
    convertUtils = require('./convertUtils');

/**
* Represents a group of Contacts.
* @constructor
*/
var contacts = {
    fieldType: fieldType,
    /**
     * Returns an array of Contacts matching the search criteria.
     * @param fields that should be searched
     * @param successCB success callback
     * @param errorCB error callback
     * @param {ContactFindOptions} options that can be applied to contact searching
     * @return array of Contacts matching search criteria
     */
    find: function(fields, successCB, errorCB, options) {
        argscheck.checkArgs('afFO', 'contacts.find', arguments);
        if (!fields.length) {
            if (errorCB) {
                errorCB(new ContactError(ContactError.INVALID_ARGUMENT_ERROR));
            }
        } else {
            // missing 'options' param means return all contacts
            options = options || { filter: '', multiple: true };
            var win = function(result) {
                var cs = [];
                for (var i = 0, l = result.length; i < l; i++) {
                    cs.push(convertUtils.toCordovaFormat(contacts.create(result[i])));
                }
                successCB(cs);
            };
            exec(win, errorCB, "Contacts", "search", [fields, options]);
        }
    },
    
    /**
     * This function picks contact from phone using contact picker UI
     * @returns new Contact object
     */
    pickContact: function (successCB, errorCB) {

        argscheck.checkArgs('fF', 'contacts.pick', arguments);

        var win = function (result) {
            // if Contacts.pickContact return instance of Contact object
            // don't create new Contact object, use current
            var contact = result instanceof Contact ? result : contacts.create(result);
            successCB(convertUtils.toCordovaFormat(contact));
        };
        exec(win, errorCB, "Contacts", "pickContact", []);
    },

    /**
     * This function creates a new contact, but it does not persist the contact
     * to device storage. To persist the contact to device storage, invoke
     * contact.save().
     * @param properties an object whose properties will be examined to create a new Contact
     * @returns new Contact object
     */
    create: function(properties) {
        argscheck.checkArgs('O', 'contacts.create', arguments);
        var contact = new Contact();
        for (var i in properties) {
            if (typeof contact[i] !== 'undefined' && properties.hasOwnProperty(i)) {
                contact[i] = properties[i];
            }
        }
        return contact;
    }
};

module.exports = contacts;

});

/** plugins/cordova-plugin-contacts/www/convertUtils.js */

cordova.define("cordova-plugin-contacts.convertUtils", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = require('cordova/utils');

module.exports = {
    /**
    * Converts primitives into Complex Object
    * Currently only used for Date fields
    */
    toCordovaFormat: function (contact) {
        var value = contact.birthday;
        try {
          contact.birthday = new Date(parseFloat(value));
        } catch (exception){
          console.log("Cordova Contact toCordovaFormat error: exception creating date.");
        }
        return contact;
    },

    /**
    * Converts Complex objects into primitives
    * Only conversion at present is for Dates.
    **/
    toNativeFormat: function (contact) {
        var value = contact.birthday;
        if (value !== null) {
            // try to make it a Date object if it is not already
            if (!utils.isDate(value)){
                try {
                    value = new Date(value);
                } catch(exception){
                    value = null;
                }
            }
            if (utils.isDate(value)){
                value = value.valueOf(); // convert to milliseconds
            }
            contact.birthday = value;
        }
        return contact;
    }
};

});

/** plugins/cordova-plugin-contacts/www/ios/Contact.js */

cordova.define("cordova-plugin-contacts.Contact-iOS", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    ContactError = require('./ContactError');

/**
 * Provides iOS Contact.display API.
 */
module.exports = {
    display : function(errorCB, options) {
        /*
         *    Display a contact using the iOS Contact Picker UI
         *    NOT part of W3C spec so no official documentation
         *
         *    @param errorCB error callback
         *    @param options object
         *    allowsEditing: boolean AS STRING
         *        "true" to allow editing the contact
         *        "false" (default) display contact
         */

        if (this.id === null) {
            if (typeof errorCB === "function") {
                var errorObj = new ContactError(ContactError.UNKNOWN_ERROR);
                errorCB(errorObj);
            }
        }
        else {
            exec(null, errorCB, "Contacts","displayContact", [this.id, options]);
        }
    }
};

});

/** plugins/cordova-plugin-contacts/www/ios/contacts.js */

cordova.define("cordova-plugin-contacts.contacts-ios", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');

/**
 * Provides iOS enhanced contacts API.
 */
module.exports = {
    newContactUI : function(successCallback) {
        /*
         *    Create a contact using the iOS Contact Picker UI
         *    NOT part of W3C spec so no official documentation
         *
         * returns:  the id of the created contact as param to successCallback
         */
        exec(successCallback, null, "Contacts","newContact", []);
    },
    chooseContact : function(successCallback, options) {
        /*
         *    Select a contact using the iOS Contact Picker UI
         *    NOT part of W3C spec so no official documentation
         *
         *    @param errorCB error callback
         *    @param options object
         *    allowsEditing: boolean AS STRING
         *        "true" to allow editing the contact
         *        "false" (default) display contact
         *      fields: array of fields to return in contact object (see ContactOptions.fields)
         *
         *    @returns
         *        id of contact selected
         *        ContactObject
         *            if no fields provided contact contains just id information
         *            if fields provided contact object contains information for the specified fields
         *
         */
         var win = function(result) {
             var fullContact = require('./contacts').create(result);
            successCallback(fullContact.id, fullContact);
       };
        exec(win, null, "Contacts","chooseContact", [options]);
    }
};

});

/** plugins/cordova-plugin-dialogs/www/notification.js */

cordova.define("cordova-plugin-dialogs.notification", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');
var platform = require('cordova/platform');

/**
 * Provides access to notifications on the device.
 */

module.exports = {

    /**
     * Open a native alert dialog, with a customizable title and button text.
     *
     * @param {String} message              Message to print in the body of the alert
     * @param {Function} completeCallback   The callback that is called when user clicks on a button.
     * @param {String} title                Title of the alert dialog (default: Alert)
     * @param {String} buttonLabel          Label of the close button (default: OK)
     */
    alert: function(message, completeCallback, title, buttonLabel) {
        var _title = (typeof title === "string" ? title : "Alert");
        var _buttonLabel = (buttonLabel || "OK");
        exec(completeCallback, null, "Notification", "alert", [message, _title, _buttonLabel]);
    },

    /**
     * Open a native confirm dialog, with a customizable title and button text.
     * The result that the user selects is returned to the result callback.
     *
     * @param {String} message              Message to print in the body of the alert
     * @param {Function} resultCallback     The callback that is called when user clicks on a button.
     * @param {String} title                Title of the alert dialog (default: Confirm)
     * @param {Array} buttonLabels          Array of the labels of the buttons (default: ['OK', 'Cancel'])
     */
    confirm: function(message, resultCallback, title, buttonLabels) {
        var _title = (typeof title === "string" ? title : "Confirm");
        var _buttonLabels = (buttonLabels || ["OK", "Cancel"]);

        // Strings are deprecated!
        if (typeof _buttonLabels === 'string') {
            console.log("Notification.confirm(string, function, string, string) is deprecated.  Use Notification.confirm(string, function, string, array).");
        }

        // Some platforms take an array of button label names.
        // Other platforms take a comma separated list.
        // For compatibility, we convert to the desired type based on the platform.
        if (platform.id == "amazon-fireos" || platform.id == "android" || platform.id == "ios" ||
            platform.id == "windowsphone" || platform.id == "firefoxos" || platform.id == "ubuntu" ||
            platform.id == "windows8" || platform.id == "windows") {

            if (typeof _buttonLabels === 'string') {
                _buttonLabels = _buttonLabels.split(","); // not crazy about changing the var type here
            }
        } else {
            if (Array.isArray(_buttonLabels)) {
                var buttonLabelArray = _buttonLabels;
                _buttonLabels = buttonLabelArray.toString();
            }
        }
        exec(resultCallback, null, "Notification", "confirm", [message, _title, _buttonLabels]);
    },

    /**
     * Open a native prompt dialog, with a customizable title and button text.
     * The following results are returned to the result callback:
     *  buttonIndex     Index number of the button selected.
     *  input1          The text entered in the prompt dialog box.
     *
     * @param {String} message              Dialog message to display (default: "Prompt message")
     * @param {Function} resultCallback     The callback that is called when user clicks on a button.
     * @param {String} title                Title of the dialog (default: "Prompt")
     * @param {Array} buttonLabels          Array of strings for the button labels (default: ["OK","Cancel"])
     * @param {String} defaultText          Textbox input value (default: empty string)
     */
    prompt: function(message, resultCallback, title, buttonLabels, defaultText) {
        var _message = (typeof message === "string" ? message : "Prompt message");
        var _title = (typeof title === "string" ? title : "Prompt");
        var _buttonLabels = (buttonLabels || ["OK","Cancel"]);
        var _defaultText = (defaultText || "");
        exec(resultCallback, null, "Notification", "prompt", [_message, _title, _buttonLabels, _defaultText]);
    },

    /**
     * Causes the device to beep.
     * On Android, the default notification ringtone is played "count" times.
     *
     * @param {Integer} count       The number of beeps.
     */
    beep: function(count) {
        var defaultedCount = count || 1;
        exec(null, null, "Notification", "beep", [ defaultedCount ]);
    }
};

});

/** plugins/cordova-plugin-file/www/browser/isChrome.js */

cordova.define("cordova-plugin-file.isChrome", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

module.exports = function () {
    // window.webkitRequestFileSystem and window.webkitResolveLocalFileSystemURL are available only in Chrome and
    // possibly a good flag to indicate that we're running in Chrome
    return window.webkitRequestFileSystem && window.webkitResolveLocalFileSystemURL;
};

});

/** plugins/cordova-plugin-file/www/DirectoryEntry.js */

cordova.define("cordova-plugin-file.DirectoryEntry", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    Entry = require('./Entry'),
    FileError = require('./FileError'),
    DirectoryReader = require('./DirectoryReader');

/**
 * An interface representing a directory on the file system.
 *
 * {boolean} isFile always false (readonly)
 * {boolean} isDirectory always true (readonly)
 * {DOMString} name of the directory, excluding the path leading to it (readonly)
 * {DOMString} fullPath the absolute full path to the directory (readonly)
 * {FileSystem} filesystem on which the directory resides (readonly)
 */
var DirectoryEntry = function(name, fullPath, fileSystem, nativeURL) {

    // add trailing slash if it is missing
    if ((fullPath) && !/\/$/.test(fullPath)) {
        fullPath += "/";
    }
    // add trailing slash if it is missing
    if (nativeURL && !/\/$/.test(nativeURL)) {
        nativeURL += "/";
    }
    DirectoryEntry.__super__.constructor.call(this, false, true, name, fullPath, fileSystem, nativeURL);
};

utils.extend(DirectoryEntry, Entry);

/**
 * Creates a new DirectoryReader to read entries from this directory
 */
DirectoryEntry.prototype.createReader = function() {
    return new DirectoryReader(this.toInternalURL());
};

/**
 * Creates or looks up a directory
 *
 * @param {DOMString} path either a relative or absolute path from this directory in which to look up or create a directory
 * @param {Flags} options to create or exclusively create the directory
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.getDirectory = function(path, options, successCallback, errorCallback) {
    argscheck.checkArgs('sOFF', 'DirectoryEntry.getDirectory', arguments);
    var fs = this.filesystem;
    var win = successCallback && function(result) {
        var entry = new DirectoryEntry(result.name, result.fullPath, fs, result.nativeURL);
        successCallback(entry);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "getDirectory", [this.toInternalURL(), path, options]);
};

/**
 * Deletes a directory and all of it's contents
 *
 * @param {Function} successCallback is called with no parameters
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.removeRecursively = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'DirectoryEntry.removeRecursively', arguments);
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(successCallback, fail, "File", "removeRecursively", [this.toInternalURL()]);
};

/**
 * Creates or looks up a file
 *
 * @param {DOMString} path either a relative or absolute path from this directory in which to look up or create a file
 * @param {Flags} options to create or exclusively create the file
 * @param {Function} successCallback is called with the new entry
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryEntry.prototype.getFile = function(path, options, successCallback, errorCallback) {
    argscheck.checkArgs('sOFF', 'DirectoryEntry.getFile', arguments);
    var fs = this.filesystem;
    var win = successCallback && function(result) {
        var FileEntry = require('./FileEntry');
        var entry = new FileEntry(result.name, result.fullPath, fs, result.nativeURL);
        successCallback(entry);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "getFile", [this.toInternalURL(), path, options]);
};

module.exports = DirectoryEntry;

});

/** plugins/cordova-plugin-file/www/DirectoryReader.js */

cordova.define("cordova-plugin-file.DirectoryReader", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    FileError = require('./FileError') ;

/**
 * An interface that lists the files and directories in a directory.
 */
function DirectoryReader(localURL) {
    this.localURL = localURL || null;
    this.hasReadEntries = false;
}

/**
 * Returns a list of entries from a directory.
 *
 * @param {Function} successCallback is called with a list of entries
 * @param {Function} errorCallback is called with a FileError
 */
DirectoryReader.prototype.readEntries = function(successCallback, errorCallback) {
    // If we've already read and passed on this directory's entries, return an empty list.
    if (this.hasReadEntries) {
        successCallback([]);
        return;
    }
    var reader = this;
    var win = typeof successCallback !== 'function' ? null : function(result) {
        var retVal = [];
        for (var i=0; i<result.length; i++) {
            var entry = null;
            if (result[i].isDirectory) {
                entry = new (require('./DirectoryEntry'))();
            }
            else if (result[i].isFile) {
                entry = new (require('./FileEntry'))();
            }
            entry.isDirectory = result[i].isDirectory;
            entry.isFile = result[i].isFile;
            entry.name = result[i].name;
            entry.fullPath = result[i].fullPath;
            entry.filesystem = new (require('./FileSystem'))(result[i].filesystemName);
            entry.nativeURL = result[i].nativeURL;
            retVal.push(entry);
        }
        reader.hasReadEntries = true;
        successCallback(retVal);
    };
    var fail = typeof errorCallback !== 'function' ? null : function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "readEntries", [this.localURL]);
};

module.exports = DirectoryReader;

});

/** plugins/cordova-plugin-file/www/Entry.js */

cordova.define("cordova-plugin-file.Entry", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    FileError = require('./FileError'),
    Metadata = require('./Metadata');

/**
 * Represents a file or directory on the local file system.
 *
 * @param isFile
 *            {boolean} true if Entry is a file (readonly)
 * @param isDirectory
 *            {boolean} true if Entry is a directory (readonly)
 * @param name
 *            {DOMString} name of the file or directory, excluding the path
 *            leading to it (readonly)
 * @param fullPath
 *            {DOMString} the absolute full path to the file or directory
 *            (readonly)
 * @param fileSystem
 *            {FileSystem} the filesystem on which this entry resides
 *            (readonly)
 * @param nativeURL
 *            {DOMString} an alternate URL which can be used by native
 *            webview controls, for example media players.
 *            (optional, readonly)
 */
function Entry(isFile, isDirectory, name, fullPath, fileSystem, nativeURL) {
    this.isFile = !!isFile;
    this.isDirectory = !!isDirectory;
    this.name = name || '';
    this.fullPath = fullPath || '';
    this.filesystem = fileSystem || null;
    this.nativeURL = nativeURL || null;
}

/**
 * Look up the metadata of the entry.
 *
 * @param successCallback
 *            {Function} is called with a Metadata object
 * @param errorCallback
 *            {Function} is called with a FileError
 */
Entry.prototype.getMetadata = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'Entry.getMetadata', arguments);
    var success = successCallback && function(entryMetadata) {
        var metadata = new Metadata({
            size: entryMetadata.size,
            modificationTime: entryMetadata.lastModifiedDate
        });
        successCallback(metadata);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(success, fail, "File", "getFileMetadata", [this.toInternalURL()]);
};

/**
 * Set the metadata of the entry.
 *
 * @param successCallback
 *            {Function} is called with a Metadata object
 * @param errorCallback
 *            {Function} is called with a FileError
 * @param metadataObject
 *            {Object} keys and values to set
 */
Entry.prototype.setMetadata = function(successCallback, errorCallback, metadataObject) {
    argscheck.checkArgs('FFO', 'Entry.setMetadata', arguments);
    exec(successCallback, errorCallback, "File", "setMetadata", [this.toInternalURL(), metadataObject]);
};

/**
 * Move a file or directory to a new location.
 *
 * @param parent
 *            {DirectoryEntry} the directory to which to move this entry
 * @param newName
 *            {DOMString} new name of the entry, defaults to the current name
 * @param successCallback
 *            {Function} called with the new DirectoryEntry object
 * @param errorCallback
 *            {Function} called with a FileError
 */
Entry.prototype.moveTo = function(parent, newName, successCallback, errorCallback) {
    argscheck.checkArgs('oSFF', 'Entry.moveTo', arguments);
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    var srcURL = this.toInternalURL(),
        // entry name
        name = newName || this.name,
        success = function(entry) {
            if (entry) {
                if (successCallback) {
                    // create appropriate Entry object
                    var newFSName = entry.filesystemName || (entry.filesystem && entry.filesystem.name);
                    var fs = newFSName ? new FileSystem(newFSName, { name: "", fullPath: "/" }) : new FileSystem(parent.filesystem.name, { name: "", fullPath: "/" });
                    var result = (entry.isDirectory) ? new (require('./DirectoryEntry'))(entry.name, entry.fullPath, fs, entry.nativeURL) : new (require('cordova-plugin-file.FileEntry'))(entry.name, entry.fullPath, fs, entry.nativeURL);
                    successCallback(result);
                }
            }
            else {
                // no Entry object returned
                if (fail) {
                    fail(FileError.NOT_FOUND_ERR);
                }
            }
        };

    // copy
    exec(success, fail, "File", "moveTo", [srcURL, parent.toInternalURL(), name]);
};

/**
 * Copy a directory to a different location.
 *
 * @param parent
 *            {DirectoryEntry} the directory to which to copy the entry
 * @param newName
 *            {DOMString} new name of the entry, defaults to the current name
 * @param successCallback
 *            {Function} called with the new Entry object
 * @param errorCallback
 *            {Function} called with a FileError
 */
Entry.prototype.copyTo = function(parent, newName, successCallback, errorCallback) {
    argscheck.checkArgs('oSFF', 'Entry.copyTo', arguments);
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    var srcURL = this.toInternalURL(),
        // entry name
        name = newName || this.name,
        // success callback
        success = function(entry) {
            if (entry) {
                if (successCallback) {
                    // create appropriate Entry object
                    var newFSName = entry.filesystemName || (entry.filesystem && entry.filesystem.name);
                    var fs = newFSName ? new FileSystem(newFSName, { name: "", fullPath: "/" }) : new FileSystem(parent.filesystem.name, { name: "", fullPath: "/" });
                    var result = (entry.isDirectory) ? new (require('./DirectoryEntry'))(entry.name, entry.fullPath, fs, entry.nativeURL) : new (require('cordova-plugin-file.FileEntry'))(entry.name, entry.fullPath, fs, entry.nativeURL);
                    successCallback(result);
                }
            }
            else {
                // no Entry object returned
                if (fail) {
                    fail(FileError.NOT_FOUND_ERR);
                }
            }
        };

    // copy
    exec(success, fail, "File", "copyTo", [srcURL, parent.toInternalURL(), name]);
};

/**
 * Return a URL that can be passed across the bridge to identify this entry.
 */
Entry.prototype.toInternalURL = function() {
    if (this.filesystem && this.filesystem.__format__) {
      return this.filesystem.__format__(this.fullPath, this.nativeURL);
    }
};

/**
 * Return a URL that can be used to identify this entry.
 * Use a URL that can be used to as the src attribute of a <video> or
 * <audio> tag. If that is not possible, construct a cdvfile:// URL.
 */
Entry.prototype.toURL = function() {
    if (this.nativeURL) {
      return this.nativeURL;
    }
    // fullPath attribute may contain the full URL in the case that
    // toInternalURL fails.
    return this.toInternalURL() || "file://localhost" + this.fullPath;
};

/**
 * Backwards-compatibility: In v1.0.0 - 1.0.2, .toURL would only return a
 * cdvfile:// URL, and this method was necessary to obtain URLs usable by the
 * webview.
 * See CB-6051, CB-6106, CB-6117, CB-6152, CB-6199, CB-6201, CB-6243, CB-6249,
 * and CB-6300.
 */
Entry.prototype.toNativeURL = function() {
    console.log("DEPRECATED: Update your code to use 'toURL'");
    return this.toURL();
};

/**
 * Returns a URI that can be used to identify this entry.
 *
 * @param {DOMString} mimeType for a FileEntry, the mime type to be used to interpret the file, when loaded through this URI.
 * @return uri
 */
Entry.prototype.toURI = function(mimeType) {
    console.log("DEPRECATED: Update your code to use 'toURL'");
    return this.toURL();
};

/**
 * Remove a file or directory. It is an error to attempt to delete a
 * directory that is not empty. It is an error to attempt to delete a
 * root directory of a file system.
 *
 * @param successCallback {Function} called with no parameters
 * @param errorCallback {Function} called with a FileError
 */
Entry.prototype.remove = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'Entry.remove', arguments);
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(successCallback, fail, "File", "remove", [this.toInternalURL()]);
};

/**
 * Look up the parent DirectoryEntry of this entry.
 *
 * @param successCallback {Function} called with the parent DirectoryEntry object
 * @param errorCallback {Function} called with a FileError
 */
Entry.prototype.getParent = function(successCallback, errorCallback) {
    argscheck.checkArgs('FF', 'Entry.getParent', arguments);
    var fs = this.filesystem;
    var win = successCallback && function(result) {
        var DirectoryEntry = require('./DirectoryEntry');
        var entry = new DirectoryEntry(result.name, result.fullPath, fs, result.nativeURL);
        successCallback(entry);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "getParent", [this.toInternalURL()]);
};

module.exports = Entry;

});

/** plugins/cordova-plugin-file/www/File.js */

cordova.define("cordova-plugin-file.File", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Constructor.
 * name {DOMString} name of the file, without path information
 * fullPath {DOMString} the full path of the file, including the name
 * type {DOMString} mime type
 * lastModifiedDate {Date} last modified date
 * size {Number} size of the file in bytes
 */

var File = function(name, localURL, type, lastModifiedDate, size){
    this.name = name || '';
    this.localURL = localURL || null;
    this.type = type || null;
    this.lastModified = lastModifiedDate || null;
    // For backwards compatibility, store the timestamp in lastModifiedDate as well
    this.lastModifiedDate = lastModifiedDate || null;
    this.size = size || 0;

    // These store the absolute start and end for slicing the file.
    this.start = 0;
    this.end = this.size;
};

/**
 * Returns a "slice" of the file. Since Cordova Files don't contain the actual
 * content, this really returns a File with adjusted start and end.
 * Slices of slices are supported.
 * start {Number} The index at which to start the slice (inclusive).
 * end {Number} The index at which to end the slice (exclusive).
 */
File.prototype.slice = function(start, end) {
    var size = this.end - this.start;
    var newStart = 0;
    var newEnd = size;
    if (arguments.length) {
        if (start < 0) {
            newStart = Math.max(size + start, 0);
        } else {
            newStart = Math.min(size, start);
        }
    }

    if (arguments.length >= 2) {
        if (end < 0) {
            newEnd = Math.max(size + end, 0);
        } else {
            newEnd = Math.min(end, size);
        }
    }

    var newFile = new File(this.name, this.localURL, this.type, this.lastModified, this.size);
    newFile.start = this.start + newStart;
    newFile.end = this.start + newEnd;
    return newFile;
};


module.exports = File;

});

/** plugins/cordova-plugin-file/www/FileEntry.js */

cordova.define("cordova-plugin-file.FileEntry", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    Entry = require('./Entry'),
    FileWriter = require('./FileWriter'),
    File = require('./File'),
    FileError = require('./FileError');

/**
 * An interface representing a file on the file system.
 *
 * {boolean} isFile always true (readonly)
 * {boolean} isDirectory always false (readonly)
 * {DOMString} name of the file, excluding the path leading to it (readonly)
 * {DOMString} fullPath the absolute full path to the file (readonly)
 * {FileSystem} filesystem on which the file resides (readonly)
 */
var FileEntry = function(name, fullPath, fileSystem, nativeURL) {
    // remove trailing slash if it is present
    if (fullPath && /\/$/.test(fullPath)) {
        fullPath = fullPath.substring(0, fullPath.length - 1);
    }
    if (nativeURL && /\/$/.test(nativeURL)) {
        nativeURL = nativeURL.substring(0, nativeURL.length - 1);
    }

    FileEntry.__super__.constructor.apply(this, [true, false, name, fullPath, fileSystem, nativeURL]);
};

utils.extend(FileEntry, Entry);

/**
 * Creates a new FileWriter associated with the file that this FileEntry represents.
 *
 * @param {Function} successCallback is called with the new FileWriter
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.createWriter = function(successCallback, errorCallback) {
    this.file(function(filePointer) {
        var writer = new FileWriter(filePointer);

        if (writer.localURL === null || writer.localURL === "") {
            if (errorCallback) {
                errorCallback(new FileError(FileError.INVALID_STATE_ERR));
            }
        } else {
            if (successCallback) {
                successCallback(writer);
            }
        }
    }, errorCallback);
};

/**
 * Returns a File that represents the current state of the file that this FileEntry represents.
 *
 * @param {Function} successCallback is called with the new File object
 * @param {Function} errorCallback is called with a FileError
 */
FileEntry.prototype.file = function(successCallback, errorCallback) {
    var localURL = this.toInternalURL();
    var win = successCallback && function(f) {
        var file = new File(f.name, localURL, f.type, f.lastModifiedDate, f.size);
        successCallback(file);
    };
    var fail = errorCallback && function(code) {
        errorCallback(new FileError(code));
    };
    exec(win, fail, "File", "getFileMetadata", [localURL]);
};


module.exports = FileEntry;

});

/** plugins/cordova-plugin-file/www/FileError.js */

cordova.define("cordova-plugin-file.FileError", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * FileError
 */
function FileError(error) {
  this.code = error || null;
}

// File error codes
// Found in DOMException
FileError.NOT_FOUND_ERR = 1;
FileError.SECURITY_ERR = 2;
FileError.ABORT_ERR = 3;

// Added by File API specification
FileError.NOT_READABLE_ERR = 4;
FileError.ENCODING_ERR = 5;
FileError.NO_MODIFICATION_ALLOWED_ERR = 6;
FileError.INVALID_STATE_ERR = 7;
FileError.SYNTAX_ERR = 8;
FileError.INVALID_MODIFICATION_ERR = 9;
FileError.QUOTA_EXCEEDED_ERR = 10;
FileError.TYPE_MISMATCH_ERR = 11;
FileError.PATH_EXISTS_ERR = 12;

module.exports = FileError;

});

/** plugins/cordova-plugin-file/www/FileReader.js */

cordova.define("cordova-plugin-file.FileReader", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    modulemapper = require('cordova/modulemapper'),
    utils = require('cordova/utils'),
    FileError = require('./FileError'),
    ProgressEvent = require('./ProgressEvent'),
    origFileReader = modulemapper.getOriginalSymbol(window, 'FileReader');

/**
 * This class reads the mobile device file system.
 *
 * For Android:
 *      The root directory is the root of the file system.
 *      To read from the SD card, the file name is "sdcard/my_file.txt"
 * @constructor
 */
var FileReader = function() {
    this._readyState = 0;
    this._error = null;
    this._result = null;
    this._progress = null;
    this._localURL = '';
    this._realReader = origFileReader ? new origFileReader() : {};
};

/**
 * Defines the maximum size to read at a time via the native API. The default value is a compromise between
 * minimizing the overhead of many exec() calls while still reporting progress frequently enough for large files.
 * (Note attempts to allocate more than a few MB of contiguous memory on the native side are likely to cause
 * OOM exceptions, while the JS engine seems to have fewer problems managing large strings or ArrayBuffers.)
 */
FileReader.READ_CHUNK_SIZE = 256*1024;

// States
FileReader.EMPTY = 0;
FileReader.LOADING = 1;
FileReader.DONE = 2;

utils.defineGetter(FileReader.prototype, 'readyState', function() {
    return this._localURL ? this._readyState : this._realReader.readyState;
});

utils.defineGetter(FileReader.prototype, 'error', function() {
    return this._localURL ? this._error: this._realReader.error;
});

utils.defineGetter(FileReader.prototype, 'result', function() {
    return this._localURL ? this._result: this._realReader.result;
});

function defineEvent(eventName) {
    utils.defineGetterSetter(FileReader.prototype, eventName, function() {
        return this._realReader[eventName] || null;
    }, function(value) {
        this._realReader[eventName] = value;
    });
}
defineEvent('onloadstart');    // When the read starts.
defineEvent('onprogress');     // While reading (and decoding) file or fileBlob data, and reporting partial file data (progress.loaded/progress.total)
defineEvent('onload');         // When the read has successfully completed.
defineEvent('onerror');        // When the read has failed (see errors).
defineEvent('onloadend');      // When the request has completed (either in success or failure).
defineEvent('onabort');        // When the read has been aborted. For instance, by invoking the abort() method.

function initRead(reader, file) {
    // Already loading something
    if (reader.readyState == FileReader.LOADING) {
      throw new FileError(FileError.INVALID_STATE_ERR);
    }

    reader._result = null;
    reader._error = null;
    reader._progress = 0;
    reader._readyState = FileReader.LOADING;

    if (typeof file.localURL == 'string') {
        reader._localURL = file.localURL;
    } else {
        reader._localURL = '';
        return true;
    }

    if (reader.onloadstart) {
        reader.onloadstart(new ProgressEvent("loadstart", {target:reader}));
    }
}

/**
 * Callback used by the following read* functions to handle incremental or final success.
 * Must be bound to the FileReader's this along with all but the last parameter,
 * e.g. readSuccessCallback.bind(this, "readAsText", "UTF-8", offset, totalSize, accumulate)
 * @param readType The name of the read function to call.
 * @param encoding Text encoding, or null if this is not a text type read.
 * @param offset Starting offset of the read.
 * @param totalSize Total number of bytes or chars to read.
 * @param accumulate A function that takes the callback result and accumulates it in this._result.
 * @param r Callback result returned by the last read exec() call, or null to begin reading.
 */
function readSuccessCallback(readType, encoding, offset, totalSize, accumulate, r) {
    if (this._readyState === FileReader.DONE) {
        return;
    }

    if (typeof r !== "undefined") {
        accumulate(r);
        this._progress = Math.min(this._progress + FileReader.READ_CHUNK_SIZE, totalSize);

        if (typeof this.onprogress === "function") {
            this.onprogress(new ProgressEvent("progress", {loaded:this._progress, total:totalSize}));
        }
    }

    if (typeof r === "undefined" || this._progress < totalSize) {
        var execArgs = [
            this._localURL,
            offset + this._progress,
            offset + this._progress + Math.min(totalSize - this._progress, FileReader.READ_CHUNK_SIZE)];
        if (encoding) {
            execArgs.splice(1, 0, encoding);
        }
        exec(
            readSuccessCallback.bind(this, readType, encoding, offset, totalSize, accumulate),
            readFailureCallback.bind(this),
            "File", readType, execArgs);
    } else {
        this._readyState = FileReader.DONE;

        if (typeof this.onload === "function") {
            this.onload(new ProgressEvent("load", {target:this}));
        }

        if (typeof this.onloadend === "function") {
            this.onloadend(new ProgressEvent("loadend", {target:this}));
        }
    }
}

/**
 * Callback used by the following read* functions to handle errors.
 * Must be bound to the FileReader's this, e.g. readFailureCallback.bind(this)
 */
function readFailureCallback(e) {
    if (this._readyState === FileReader.DONE) {
        return;
    }

    this._readyState = FileReader.DONE;
    this._result = null;
    this._error = new FileError(e);

    if (typeof this.onerror === "function") {
        this.onerror(new ProgressEvent("error", {target:this}));
    }

    if (typeof this.onloadend === "function") {
        this.onloadend(new ProgressEvent("loadend", {target:this}));
    }
}

/**
 * Abort reading file.
 */
FileReader.prototype.abort = function() {
    if (origFileReader && !this._localURL) {
        return this._realReader.abort();
    }
    this._result = null;

    if (this._readyState == FileReader.DONE || this._readyState == FileReader.EMPTY) {
      return;
    }

    this._readyState = FileReader.DONE;

    // If abort callback
    if (typeof this.onabort === 'function') {
        this.onabort(new ProgressEvent('abort', {target:this}));
    }
    // If load end callback
    if (typeof this.onloadend === 'function') {
        this.onloadend(new ProgressEvent('loadend', {target:this}));
    }
};

/**
 * Read text file.
 *
 * @param file          {File} File object containing file properties
 * @param encoding      [Optional] (see http://www.iana.org/assignments/character-sets)
 */
FileReader.prototype.readAsText = function(file, encoding) {
    if (initRead(this, file)) {
        return this._realReader.readAsText(file, encoding);
    }

    // Default encoding is UTF-8
    var enc = encoding ? encoding : "UTF-8";

    var totalSize = file.end - file.start;
    readSuccessCallback.bind(this)("readAsText", enc, file.start, totalSize, function(r) {
        if (this._progress === 0) {
            this._result = "";
        }
        this._result += r;
    }.bind(this));
};


/**
 * Read file and return data as a base64 encoded data url.
 * A data url is of the form:
 *      data:[<mediatype>][;base64],<data>
 *
 * @param file          {File} File object containing file properties
 */
FileReader.prototype.readAsDataURL = function(file) {
    if (initRead(this, file)) {
        return this._realReader.readAsDataURL(file);
    }

    var totalSize = file.end - file.start;
    readSuccessCallback.bind(this)("readAsDataURL", null, file.start, totalSize, function(r) {
        var commaIndex = r.indexOf(',');
        if (this._progress === 0) {
            this._result = r;
        } else {
            this._result += r.substring(commaIndex + 1);
        }
    }.bind(this));
};

/**
 * Read file and return data as a binary data.
 *
 * @param file          {File} File object containing file properties
 */
FileReader.prototype.readAsBinaryString = function(file) {
    if (initRead(this, file)) {
        return this._realReader.readAsBinaryString(file);
    }

    var totalSize = file.end - file.start;
    readSuccessCallback.bind(this)("readAsBinaryString", null, file.start, totalSize, function(r) {
        if (this._progress === 0) {
            this._result = "";
        }
        this._result += r;
    }.bind(this));
};

/**
 * Read file and return data as a binary data.
 *
 * @param file          {File} File object containing file properties
 */
FileReader.prototype.readAsArrayBuffer = function(file) {
    if (initRead(this, file)) {
        return this._realReader.readAsArrayBuffer(file);
    }

    var totalSize = file.end - file.start;
    readSuccessCallback.bind(this)("readAsArrayBuffer", null, file.start, totalSize, function(r) {
        var resultArray = (this._progress === 0 ? new Uint8Array(totalSize) : new Uint8Array(this._result));
        resultArray.set(new Uint8Array(r), this._progress);
        this._result = resultArray.buffer;
    }.bind(this));
};

module.exports = FileReader;

});

/** plugins/cordova-plugin-file/www/FileSystem.js */

cordova.define("cordova-plugin-file.FileSystem", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var DirectoryEntry = require('./DirectoryEntry');

/**
 * An interface representing a file system
 *
 * @constructor
 * {DOMString} name the unique name of the file system (readonly)
 * {DirectoryEntry} root directory of the file system (readonly)
 */
var FileSystem = function(name, root) {
    this.name = name;
    if (root) {
        this.root = new DirectoryEntry(root.name, root.fullPath, this, root.nativeURL);
    } else {
        this.root = new DirectoryEntry(this.name, '/', this);
    }
};

FileSystem.prototype.__format__ = function(fullPath, nativeUrl) {
    return fullPath;
};

FileSystem.prototype.toJSON = function() {
    return "<FileSystem: " + this.name + ">";
};

// Use instead of encodeURI() when encoding just the path part of a URI rather than an entire URI.
FileSystem.encodeURIPath = function(path) {
    // Because # is a valid filename character, it must be encoded to prevent part of the
    // path from being parsed as a URI fragment.
    return encodeURI(path).replace(/#/g, '%23');
};

module.exports = FileSystem;

});

/** plugins/cordova-plugin-file/www/fileSystemPaths.js */

cordova.define("cordova-plugin-file.fileSystemPaths", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');
var channel = require('cordova/channel');

exports.file = {
    // Read-only directory where the application is installed.
    applicationDirectory: null,
    // Root of app's private writable storage
    applicationStorageDirectory: null,
    // Where to put app-specific data files.
    dataDirectory: null,
    // Cached files that should survive app restarts.
    // Apps should not rely on the OS to delete files in here.
    cacheDirectory: null,
    // Android: the application space on external storage.
    externalApplicationStorageDirectory: null,
    // Android: Where to put app-specific data files on external storage.
    externalDataDirectory: null,
    // Android: the application cache on external storage.
    externalCacheDirectory: null,
    // Android: the external storage (SD card) root.
    externalRootDirectory: null,
    // iOS: Temp directory that the OS can clear at will.
    tempDirectory: null,
    // iOS: Holds app-specific files that should be synced (e.g. to iCloud).
    syncedDataDirectory: null,
    // iOS: Files private to the app, but that are meaningful to other applications (e.g. Office files)
    documentsDirectory: null,
    // BlackBerry10: Files globally available to all apps
    sharedDirectory: null
};

channel.waitForInitialization('onFileSystemPathsReady');
channel.onCordovaReady.subscribe(function() {
    function after(paths) {
        for (var k in paths) {
            exports.file[k] = paths[k];
        }
        channel.initializationComplete('onFileSystemPathsReady');
    }
    exec(after, null, 'File', 'requestAllPaths', []);
});


});

/** plugins/cordova-plugin-file/www/fileSystems-roots.js */

cordova.define("cordova-plugin-file.fileSystems-roots", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// Map of fsName -> FileSystem.
var fsMap = null;
var FileSystem = require('./FileSystem');
var exec = require('cordova/exec');

// Overridden by Android, BlackBerry 10 and iOS to populate fsMap.
require('./fileSystems').getFs = function(name, callback) {
    function success(response) {
        fsMap = {};
        for (var i = 0; i < response.length; ++i) {
            var fsRoot = response[i];
            var fs = new FileSystem(fsRoot.filesystemName, fsRoot);
            fsMap[fs.name] = fs;
        }
        callback(fsMap[name]);
    }

    if (fsMap) {
        callback(fsMap[name]);
    } else {
        exec(success, null, "File", "requestAllFileSystems", []);
    }
};


});

/** plugins/cordova-plugin-file/www/fileSystems.js */

cordova.define("cordova-plugin-file.fileSystems", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// Overridden by Android, BlackBerry 10 and iOS to populate fsMap.
module.exports.getFs = function(name, callback) {
    callback(null);
};

});

/** plugins/cordova-plugin-file/www/FileUploadOptions.js */

cordova.define("cordova-plugin-file.FileUploadOptions", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Options to customize the HTTP request used to upload files.
 * @constructor
 * @param fileKey {String}   Name of file request parameter.
 * @param fileName {String}  Filename to be used by the server. Defaults to image.jpg.
 * @param mimeType {String}  Mimetype of the uploaded file. Defaults to image/jpeg.
 * @param params {Object}    Object with key: value params to send to the server.
 * @param headers {Object}   Keys are header names, values are header values. Multiple
 *                           headers of the same name are not supported.
 */
var FileUploadOptions = function(fileKey, fileName, mimeType, params, headers, httpMethod) {
    this.fileKey = fileKey || null;
    this.fileName = fileName || null;
    this.mimeType = mimeType || null;
    this.params = params || null;
    this.headers = headers || null;
    this.httpMethod = httpMethod || null;
};

module.exports = FileUploadOptions;

});

/** plugins/cordova-plugin-file/www/FileUploadResult.js */

cordova.define("cordova-plugin-file.FileUploadResult", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * FileUploadResult
 * @constructor
 */
module.exports = function FileUploadResult(size, code, content) {
	this.bytesSent = size;
	this.responseCode = code;
	this.response = content;
 };
});

/** plugins/cordova-plugin-file/www/FileWriter.js */

cordova.define("cordova-plugin-file.FileWriter", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec'),
    FileError = require('./FileError'),
    ProgressEvent = require('./ProgressEvent');

/**
 * This class writes to the mobile device file system.
 *
 * For Android:
 *      The root directory is the root of the file system.
 *      To write to the SD card, the file name is "sdcard/my_file.txt"
 *
 * @constructor
 * @param file {File} File object containing file properties
 * @param append if true write to the end of the file, otherwise overwrite the file
 */
var FileWriter = function(file) {
    this.fileName = "";
    this.length = 0;
    if (file) {
        this.localURL = file.localURL || file;
        this.length = file.size || 0;
    }
    // default is to write at the beginning of the file
    this.position = 0;

    this.readyState = 0; // EMPTY

    this.result = null;

    // Error
    this.error = null;

    // Event handlers
    this.onwritestart = null;   // When writing starts
    this.onprogress = null;     // While writing the file, and reporting partial file data
    this.onwrite = null;        // When the write has successfully completed.
    this.onwriteend = null;     // When the request has completed (either in success or failure).
    this.onabort = null;        // When the write has been aborted. For instance, by invoking the abort() method.
    this.onerror = null;        // When the write has failed (see errors).
};

// States
FileWriter.INIT = 0;
FileWriter.WRITING = 1;
FileWriter.DONE = 2;

/**
 * Abort writing file.
 */
FileWriter.prototype.abort = function() {
    // check for invalid state
    if (this.readyState === FileWriter.DONE || this.readyState === FileWriter.INIT) {
        throw new FileError(FileError.INVALID_STATE_ERR);
    }

    // set error
    this.error = new FileError(FileError.ABORT_ERR);

    this.readyState = FileWriter.DONE;

    // If abort callback
    if (typeof this.onabort === "function") {
        this.onabort(new ProgressEvent("abort", {"target":this}));
    }

    // If write end callback
    if (typeof this.onwriteend === "function") {
        this.onwriteend(new ProgressEvent("writeend", {"target":this}));
    }
};

/**
 * Writes data to the file
 *
 * @param data text or blob to be written
 * @param isPendingBlobReadResult {Boolean} true if the data is the pending blob read operation result
 */
FileWriter.prototype.write = function(data, isPendingBlobReadResult) {

    var that=this;
    var supportsBinary = (typeof window.Blob !== 'undefined' && typeof window.ArrayBuffer !== 'undefined');
    var isProxySupportBlobNatively = (cordova.platformId === "windows8" || cordova.platformId === "windows");
    var isBinary;

    // Check to see if the incoming data is a blob
    if (data instanceof File || (!isProxySupportBlobNatively && supportsBinary && data instanceof Blob)) {
        var fileReader = new FileReader();
        fileReader.onload = function() {
            // Call this method again, with the arraybuffer as argument
            FileWriter.prototype.write.call(that, this.result, true /* isPendingBlobReadResult */);
        };
        fileReader.onerror = function () {
            // DONE state
            that.readyState = FileWriter.DONE;

            // Save error
            that.error = this.error;

            // If onerror callback
            if (typeof that.onerror === "function") {
                that.onerror(new ProgressEvent("error", {"target":that}));
            }

            // If onwriteend callback
            if (typeof that.onwriteend === "function") {
                that.onwriteend(new ProgressEvent("writeend", {"target":that}));
            }
        };

        // WRITING state
        this.readyState = FileWriter.WRITING;

        if (supportsBinary) {
            fileReader.readAsArrayBuffer(data);
        } else {
            fileReader.readAsText(data);
        }
        return;
    }

    // Mark data type for safer transport over the binary bridge
    isBinary = supportsBinary && (data instanceof ArrayBuffer);
    if (isBinary && cordova.platformId === "windowsphone") {
        // create a plain array, using the keys from the Uint8Array view so that we can serialize it
        data = Array.apply(null, new Uint8Array(data));
    }
    
    // Throw an exception if we are already writing a file
    if (this.readyState === FileWriter.WRITING && !isPendingBlobReadResult) {
        throw new FileError(FileError.INVALID_STATE_ERR);
    }

    // WRITING state
    this.readyState = FileWriter.WRITING;

    var me = this;

    // If onwritestart callback
    if (typeof me.onwritestart === "function") {
        me.onwritestart(new ProgressEvent("writestart", {"target":me}));
    }

    // Write file
    exec(
        // Success callback
        function(r) {
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // position always increases by bytes written because file would be extended
            me.position += r;
            // The length of the file is now where we are done writing.

            me.length = me.position;

            // DONE state
            me.readyState = FileWriter.DONE;

            // If onwrite callback
            if (typeof me.onwrite === "function") {
                me.onwrite(new ProgressEvent("write", {"target":me}));
            }

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                me.onwriteend(new ProgressEvent("writeend", {"target":me}));
            }
        },
        // Error callback
        function(e) {
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // Save error
            me.error = new FileError(e);

            // If onerror callback
            if (typeof me.onerror === "function") {
                me.onerror(new ProgressEvent("error", {"target":me}));
            }

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                me.onwriteend(new ProgressEvent("writeend", {"target":me}));
            }
        }, "File", "write", [this.localURL, data, this.position, isBinary]);
};

/**
 * Moves the file pointer to the location specified.
 *
 * If the offset is a negative number the position of the file
 * pointer is rewound.  If the offset is greater than the file
 * size the position is set to the end of the file.
 *
 * @param offset is the location to move the file pointer to.
 */
FileWriter.prototype.seek = function(offset) {
    // Throw an exception if we are already writing a file
    if (this.readyState === FileWriter.WRITING) {
        throw new FileError(FileError.INVALID_STATE_ERR);
    }

    if (!offset && offset !== 0) {
        return;
    }

    // See back from end of file.
    if (offset < 0) {
        this.position = Math.max(offset + this.length, 0);
    }
    // Offset is bigger than file size so set position
    // to the end of the file.
    else if (offset > this.length) {
        this.position = this.length;
    }
    // Offset is between 0 and file size so set the position
    // to start writing.
    else {
        this.position = offset;
    }
};

/**
 * Truncates the file to the size specified.
 *
 * @param size to chop the file at.
 */
FileWriter.prototype.truncate = function(size) {
    // Throw an exception if we are already writing a file
    if (this.readyState === FileWriter.WRITING) {
        throw new FileError(FileError.INVALID_STATE_ERR);
    }

    // WRITING state
    this.readyState = FileWriter.WRITING;

    var me = this;

    // If onwritestart callback
    if (typeof me.onwritestart === "function") {
        me.onwritestart(new ProgressEvent("writestart", {"target":this}));
    }

    // Write file
    exec(
        // Success callback
        function(r) {
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // Update the length of the file
            me.length = r;
            me.position = Math.min(me.position, r);

            // If onwrite callback
            if (typeof me.onwrite === "function") {
                me.onwrite(new ProgressEvent("write", {"target":me}));
            }

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                me.onwriteend(new ProgressEvent("writeend", {"target":me}));
            }
        },
        // Error callback
        function(e) {
            // If DONE (cancelled), then don't do anything
            if (me.readyState === FileWriter.DONE) {
                return;
            }

            // DONE state
            me.readyState = FileWriter.DONE;

            // Save error
            me.error = new FileError(e);

            // If onerror callback
            if (typeof me.onerror === "function") {
                me.onerror(new ProgressEvent("error", {"target":me}));
            }

            // If onwriteend callback
            if (typeof me.onwriteend === "function") {
                me.onwriteend(new ProgressEvent("writeend", {"target":me}));
            }
        }, "File", "truncate", [this.localURL, size]);
};

module.exports = FileWriter;

});

/** plugins/cordova-plugin-file/www/Flags.js */

cordova.define("cordova-plugin-file.Flags", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Supplies arguments to methods that lookup or create files and directories.
 *
 * @param create
 *            {boolean} file or directory if it doesn't exist
 * @param exclusive
 *            {boolean} used with create; if true the command will fail if
 *            target path exists
 */
function Flags(create, exclusive) {
    this.create = create || false;
    this.exclusive = exclusive || false;
}

module.exports = Flags;

});

/** plugins/cordova-plugin-file/www/ios/FileSystem.js */

cordova.define("cordova-plugin-file.iosFileSystem", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

FILESYSTEM_PROTOCOL = "cdvfile";

module.exports = {
    __format__: function(fullPath) {
        var path = ('/'+this.name+(fullPath[0]==='/'?'':'/')+FileSystem.encodeURIPath(fullPath)).replace('//','/');
        return FILESYSTEM_PROTOCOL + '://localhost' + path;
    }
};


});

/** plugins/cordova-plugin-file/www/LocalFileSystem.js */

cordova.define("cordova-plugin-file.LocalFileSystem", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

exports.TEMPORARY = 0;
exports.PERSISTENT = 1;

});

/** plugins/cordova-plugin-file/www/Metadata.js */

cordova.define("cordova-plugin-file.Metadata", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Information about the state of the file or directory
 *
 * {Date} modificationTime (readonly)
 */
var Metadata = function(metadata) {
    if (typeof metadata == "object") {
        this.modificationTime = new Date(metadata.modificationTime);
        this.size = metadata.size || 0;
    } else if (typeof metadata == "undefined") {
        this.modificationTime = null;
        this.size = 0;
    } else {
        /* Backwards compatiblity with platforms that only return a timestamp */
        this.modificationTime = new Date(metadata);
    }
};

module.exports = Metadata;

});

/** plugins/cordova-plugin-file/www/ProgressEvent.js */

cordova.define("cordova-plugin-file.ProgressEvent", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

// If ProgressEvent exists in global context, use it already, otherwise use our own polyfill
// Feature test: See if we can instantiate a native ProgressEvent;
// if so, use that approach,
// otherwise fill-in with our own implementation.
//
// NOTE: right now we always fill in with our own. Down the road would be nice if we can use whatever is native in the webview.
var ProgressEvent = (function() {
    /*
    var createEvent = function(data) {
        var event = document.createEvent('Events');
        event.initEvent('ProgressEvent', false, false);
        if (data) {
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    event[i] = data[i];
                }
            }
            if (data.target) {
                // TODO: cannot call <some_custom_object>.dispatchEvent
                // need to first figure out how to implement EventTarget
            }
        }
        return event;
    };
    try {
        var ev = createEvent({type:"abort",target:document});
        return function ProgressEvent(type, data) {
            data.type = type;
            return createEvent(data);
        };
    } catch(e){
    */
        return function ProgressEvent(type, dict) {
            this.type = type;
            this.bubbles = false;
            this.cancelBubble = false;
            this.cancelable = false;
            this.lengthComputable = false;
            this.loaded = dict && dict.loaded ? dict.loaded : 0;
            this.total = dict && dict.total ? dict.total : 0;
            this.target = dict && dict.target ? dict.target : null;
        };
    //}
})();

module.exports = ProgressEvent;

});

/** plugins/cordova-plugin-file/www/requestFileSystem.js */

cordova.define("cordova-plugin-file.requestFileSystem", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

(function() {
    //For browser platform: not all browsers use this file.
    function checkBrowser() {
        if (cordova.platformId === "browser" && require('./isChrome')()) {
            module.exports = window.requestFileSystem || window.webkitRequestFileSystem;
            return true;
        }
        return false;
    }
    if (checkBrowser()) {
        return;
    }

    var argscheck = require('cordova/argscheck'),
        FileError = require('./FileError'),
        FileSystem = require('./FileSystem'),
        exec = require('cordova/exec');
    var fileSystems = require('./fileSystems');

    /**
     * Request a file system in which to store application data.
     * @param type  local file system type
     * @param size  indicates how much storage space, in bytes, the application expects to need
     * @param successCallback  invoked with a FileSystem object
     * @param errorCallback  invoked if error occurs retrieving file system
     */
    var requestFileSystem = function(type, size, successCallback, errorCallback) {
        argscheck.checkArgs('nnFF', 'requestFileSystem', arguments);
        var fail = function(code) {
            if (errorCallback) {
                errorCallback(new FileError(code));
            }
        };

        if (type < 0) {
            fail(FileError.SYNTAX_ERR);
        } else {
            // if successful, return a FileSystem object
            var success = function(file_system) {
                if (file_system) {
                    if (successCallback) {
                        fileSystems.getFs(file_system.name, function(fs) {
                            // This should happen only on platforms that haven't implemented requestAllFileSystems (windows)
                            if (!fs) {
                                fs = new FileSystem(file_system.name, file_system.root);
                            }
                            successCallback(fs);
                        });
                    }
                }
                else {
                    // no FileSystem object returned
                    fail(FileError.NOT_FOUND_ERR);
                }
            };
            exec(success, fail, "File", "requestFileSystem", [type, size]);
        }
    };

    module.exports = requestFileSystem;
})();

});

/** plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js */

cordova.define("cordova-plugin-file.resolveLocalFileSystemURI", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/
(function() {
    //For browser platform: not all browsers use overrided `resolveLocalFileSystemURL`.
    function checkBrowser() {
        if (cordova.platformId === "browser" && require('./isChrome')()) {
            module.exports.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL || window.webkitResolveLocalFileSystemURL;
            return true;
        }
        return false;
    }
    if (checkBrowser()) {
        return;
    }

    var argscheck = require('cordova/argscheck'),
        DirectoryEntry = require('./DirectoryEntry'),
        FileEntry = require('./FileEntry'),
        FileError = require('./FileError'),
        exec = require('cordova/exec');
    var fileSystems = require('./fileSystems');

    /**
     * Look up file system Entry referred to by local URI.
     * @param {DOMString} uri  URI referring to a local file or directory
     * @param successCallback  invoked with Entry object corresponding to URI
     * @param errorCallback    invoked if error occurs retrieving file system entry
     */
    module.exports.resolveLocalFileSystemURL = module.exports.resolveLocalFileSystemURL || function(uri, successCallback, errorCallback) {
        argscheck.checkArgs('sFF', 'resolveLocalFileSystemURI', arguments);
        // error callback
        var fail = function(error) {
            if (errorCallback) {
                errorCallback(new FileError(error));
            }
        };
        // sanity check for 'not:valid:filename' or '/not:valid:filename'
        // file.spec.12 window.resolveLocalFileSystemURI should error (ENCODING_ERR) when resolving invalid URI with leading /.
        if(!uri || uri.split(":").length > 2) {
            setTimeout( function() {
                fail(FileError.ENCODING_ERR);
            },0);
            return;
        }
        // if successful, return either a file or directory entry
        var success = function(entry) {
            if (entry) {
                if (successCallback) {
                    // create appropriate Entry object
                    var fsName = entry.filesystemName || (entry.filesystem && entry.filesystem.name) || (entry.filesystem == window.PERSISTENT ? 'persistent' : 'temporary');
                    fileSystems.getFs(fsName, function(fs) {
                        // This should happen only on platforms that haven't implemented requestAllFileSystems (windows)
                        if (!fs) {
                            fs = new FileSystem(fsName, {name:"", fullPath:"/"});
                        }
                        var result = (entry.isDirectory) ? new DirectoryEntry(entry.name, entry.fullPath, fs, entry.nativeURL) : new FileEntry(entry.name, entry.fullPath, fs, entry.nativeURL);
                        successCallback(result);
                    });
                }
            }
            else {
                // no Entry object returned
                fail(FileError.NOT_FOUND_ERR);
            }
        };

        exec(success, fail, "File", "resolveLocalFileSystemURI", [uri]);
    };

    module.exports.resolveLocalFileSystemURI = function() {
        console.log("resolveLocalFileSystemURI is deprecated. Please call resolveLocalFileSystemURL instead.");
        module.exports.resolveLocalFileSystemURL.apply(this, arguments);
    };
})();

});

/** plugins/cordova-plugin-file-transfer/www/FileTransfer.js */

cordova.define("cordova-plugin-file-transfer.FileTransfer", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/* global cordova, FileSystem */

var argscheck = require('cordova/argscheck'),
    exec = require('cordova/exec'),
    FileTransferError = require('./FileTransferError'),
    ProgressEvent = require('cordova-plugin-file.ProgressEvent');

function newProgressEvent(result) {
    var pe = new ProgressEvent();
    pe.lengthComputable = result.lengthComputable;
    pe.loaded = result.loaded;
    pe.total = result.total;
    return pe;
}

function getUrlCredentials(urlString) {
    var credentialsPattern = /^https?\:\/\/(?:(?:(([^:@\/]*)(?::([^@\/]*))?)?@)?([^:\/?#]*)(?::(\d*))?).*$/,
        credentials = credentialsPattern.exec(urlString);

    return credentials && credentials[1];
}

function getBasicAuthHeader(urlString) {
    var header =  null;


    // This is changed due to MS Windows doesn't support credentials in http uris
    // so we detect them by regexp and strip off from result url
    // Proof: http://social.msdn.microsoft.com/Forums/windowsapps/en-US/a327cf3c-f033-4a54-8b7f-03c56ba3203f/windows-foundation-uri-security-problem

    if (window.btoa) {
        var credentials = getUrlCredentials(urlString);
        if (credentials) {
            var authHeader = "Authorization";
            var authHeaderValue = "Basic " + window.btoa(credentials);

            header = {
                name : authHeader,
                value : authHeaderValue
            };
        }
    }

    return header;
}

function convertHeadersToArray(headers) {
    var result = [];
    for (var header in headers) {
        if (headers.hasOwnProperty(header)) {
            var headerValue = headers[header];
            result.push({
                name: header,
                value: headerValue.toString()
            });
        }
    }
    return result;
}

var idCounter = 0;

/**
 * FileTransfer uploads a file to a remote server.
 * @constructor
 */
var FileTransfer = function() {
    this._id = ++idCounter;
    this.onprogress = null; // optional callback
};

/**
* Given an absolute file path, uploads a file on the device to a remote server
* using a multipart HTTP request.
* @param filePath {String}           Full path of the file on the device
* @param server {String}             URL of the server to receive the file
* @param successCallback (Function}  Callback to be invoked when upload has completed
* @param errorCallback {Function}    Callback to be invoked upon error
* @param options {FileUploadOptions} Optional parameters such as file name and mimetype
* @param trustAllHosts {Boolean} Optional trust all hosts (e.g. for self-signed certs), defaults to false
*/
FileTransfer.prototype.upload = function(filePath, server, successCallback, errorCallback, options, trustAllHosts) {
    argscheck.checkArgs('ssFFO*', 'FileTransfer.upload', arguments);
    // check for options
    var fileKey = null;
    var fileName = null;
    var mimeType = null;
    var params = null;
    var chunkedMode = true;
    var headers = null;
    var httpMethod = null;
    var basicAuthHeader = getBasicAuthHeader(server);
    if (basicAuthHeader) {
        server = server.replace(getUrlCredentials(server) + '@', '');

        options = options || {};
        options.headers = options.headers || {};
        options.headers[basicAuthHeader.name] = basicAuthHeader.value;
    }

    if (options) {
        fileKey = options.fileKey;
        fileName = options.fileName;
        mimeType = options.mimeType;
        headers = options.headers;
        httpMethod = options.httpMethod || "POST";
        if (httpMethod.toUpperCase() == "PUT"){
            httpMethod = "PUT";
        } else {
            httpMethod = "POST";
        }
        if (options.chunkedMode !== null || typeof options.chunkedMode != "undefined") {
            chunkedMode = options.chunkedMode;
        }
        if (options.params) {
            params = options.params;
        }
        else {
            params = {};
        }
    }

    if (cordova.platformId === "windowsphone") {
        headers = headers && convertHeadersToArray(headers);
        params = params && convertHeadersToArray(params);
    }

    var fail = errorCallback && function(e) {
        var error = new FileTransferError(e.code, e.source, e.target, e.http_status, e.body, e.exception);
        errorCallback(error);
    };

    var self = this;
    var win = function(result) {
        if (typeof result.lengthComputable != "undefined") {
            if (self.onprogress) {
                self.onprogress(newProgressEvent(result));
            }
        } else {
            if (successCallback) {
                successCallback(result);
            }
        }
    };
    exec(win, fail, 'FileTransfer', 'upload', [filePath, server, fileKey, fileName, mimeType, params, trustAllHosts, chunkedMode, headers, this._id, httpMethod]);
};

/**
 * Downloads a file form a given URL and saves it to the specified directory.
 * @param source {String}          URL of the server to receive the file
 * @param target {String}         Full path of the file on the device
 * @param successCallback (Function}  Callback to be invoked when upload has completed
 * @param errorCallback {Function}    Callback to be invoked upon error
 * @param trustAllHosts {Boolean} Optional trust all hosts (e.g. for self-signed certs), defaults to false
 * @param options {FileDownloadOptions} Optional parameters such as headers
 */
FileTransfer.prototype.download = function(source, target, successCallback, errorCallback, trustAllHosts, options) {
    argscheck.checkArgs('ssFF*', 'FileTransfer.download', arguments);
    var self = this;

    var basicAuthHeader = getBasicAuthHeader(source);
    if (basicAuthHeader) {
        source = source.replace(getUrlCredentials(source) + '@', '');

        options = options || {};
        options.headers = options.headers || {};
        options.headers[basicAuthHeader.name] = basicAuthHeader.value;
    }

    var headers = null;
    if (options) {
        headers = options.headers || null;
    }

    if (cordova.platformId === "windowsphone" && headers) {
        headers = convertHeadersToArray(headers);
    }

    var win = function(result) {
        if (typeof result.lengthComputable != "undefined") {
            if (self.onprogress) {
                return self.onprogress(newProgressEvent(result));
            }
        } else if (successCallback) {
            var entry = null;
            if (result.isDirectory) {
                entry = new (require('cordova-plugin-file.DirectoryEntry'))();
            }
            else if (result.isFile) {
                entry = new (require('cordova-plugin-file.FileEntry'))();
            }
            entry.isDirectory = result.isDirectory;
            entry.isFile = result.isFile;
            entry.name = result.name;
            entry.fullPath = result.fullPath;
            entry.filesystem = new FileSystem(result.filesystemName || (result.filesystem == window.PERSISTENT ? 'persistent' : 'temporary'));
            entry.nativeURL = result.nativeURL;
            successCallback(entry);
        }
    };

    var fail = errorCallback && function(e) {
        var error = new FileTransferError(e.code, e.source, e.target, e.http_status, e.body, e.exception);
        errorCallback(error);
    };

    exec(win, fail, 'FileTransfer', 'download', [source, target, trustAllHosts, this._id, headers]);
};

/**
 * Aborts the ongoing file transfer on this object. The original error
 * callback for the file transfer will be called if necessary.
 */
FileTransfer.prototype.abort = function() {
    exec(null, null, 'FileTransfer', 'abort', [this._id]);
};

module.exports = FileTransfer;

});

/** plugins/cordova-plugin-file-transfer/www/FileTransferError.js */

cordova.define("cordova-plugin-file-transfer.FileTransferError", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * FileTransferError
 * @constructor
 */
var FileTransferError = function(code, source, target, status, body, exception) {
    this.code = code || null;
    this.source = source || null;
    this.target = target || null;
    this.http_status = status || null;
    this.body = body || null;
    this.exception = exception || null;
};

FileTransferError.FILE_NOT_FOUND_ERR = 1;
FileTransferError.INVALID_URL_ERR = 2;
FileTransferError.CONNECTION_ERR = 3;
FileTransferError.ABORT_ERR = 4;
FileTransferError.NOT_MODIFIED_ERR = 5;

module.exports = FileTransferError;

});

/** plugins/com.phonegap.plugins.fileopener/www/fileopener.js */

cordova.define("com.phonegap.plugins.fileopener.FileOpener", function(require, exports, module) { /*
/*
 * PhoneGap is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) 2005-2010, Nitobi Software Inc.
 * Copyright (c) 2011, IBM Corporation
 */

/**
 * Constructor
 */
/*
function FileOpener() {
};

FileOpener.prototype.open = function(url) {

};
*/
/**
 * Load Plugin
 */
/*
if(!window.plugins) {
    window.plugins = {};
}

if (!window.plugins.fileOpener) {
    window.plugins.fileOpener = function (url) {
        cordova.exec(null, null, "FileOpener", "openFile", [url]);
    };
}
*/


var fileOpener = {
    open : function (url,contentType,title) {
        if(contentType == null || typeof(contentType)=="undefined"){
               var extName; //= /\.[^\.]+/.exec(url);
               var p = url.lastIndexOf(".");
               if(p > 0){
                    extName = url.substring(p+1);
               }
            if (extName == "doc" || extName == "docx") {
               contentType = "application/msword";
            } else if(extName == "pdf") {
                contentType = "application/pdf";
            } else if(extName == "ppt" || extName == "pptx") {
                contentType = "application/vnd.ms-powerpoint";
            } else if(extName == "xls" || extName == "xlsx") {
                contentType = "application/vnd.ms-excel";
            } else if(extName == "rtf") {
                contentType = "application/rtf";
            } else if(extName == "wav") {
                contentType = "audio/x-wav";
            } else if(extName == "gif") {
                contentType = "image/gif";
            } else if(extName == "jpg" || extName == "jpeg") {
                contentType = "image/jpeg";
            } else if(extName == "png") {
                contentType = "image/png";
            } else if(extName == "txt") {
                contentType = "text/plain";
            } else if(extName == "mpg" || extName == "mpeg" || extName == "mpe" || extName == "mp4" || extName == "avi"){
                contentType = "video/*";
            }               //
        }
        cordova.exec(null, null, "FileOpener", "openFile", [url,contentType,title]);
    }
};

module.exports = fileOpener;
});

/** plugins/cordova-plugin-geolocation/www/Coordinates.js */

cordova.define("cordova-plugin-geolocation.Coordinates", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * This class contains position information.
 * @param {Object} lat
 * @param {Object} lng
 * @param {Object} alt
 * @param {Object} acc
 * @param {Object} head
 * @param {Object} vel
 * @param {Object} altacc
 * @constructor
 */
var Coordinates = function(lat, lng, alt, acc, head, vel, altacc) {
    /**
     * The latitude of the position.
     */
    this.latitude = lat;
    /**
     * The longitude of the position,
     */
    this.longitude = lng;
    /**
     * The accuracy of the position.
     */
    this.accuracy = acc;
    /**
     * The altitude of the position.
     */
    this.altitude = (alt !== undefined ? alt : null);
    /**
     * The direction the device is moving at the position.
     */
    this.heading = (head !== undefined ? head : null);
    /**
     * The velocity with which the device is moving at the position.
     */
    this.speed = (vel !== undefined ? vel : null);

    if (this.speed === 0 || this.speed === null) {
        this.heading = NaN;
    }

    /**
     * The altitude accuracy of the position.
     */
    this.altitudeAccuracy = (altacc !== undefined) ? altacc : null;
};

module.exports = Coordinates;

});

/** plugins/cordova-plugin-geolocation/www/geolocation.js */

cordova.define("cordova-plugin-geolocation.geolocation", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec'),
    PositionError = require('./PositionError'),
    Position = require('./Position');

var timers = {};   // list of timers in use

// Returns default params, overrides if provided with values
function parseParameters(options) {
    var opt = {
        maximumAge: 0,
        enableHighAccuracy: false,
        timeout: Infinity
    };

    if (options) {
        if (options.maximumAge !== undefined && !isNaN(options.maximumAge) && options.maximumAge > 0) {
            opt.maximumAge = options.maximumAge;
        }
        if (options.enableHighAccuracy !== undefined) {
            opt.enableHighAccuracy = options.enableHighAccuracy;
        }
        if (options.timeout !== undefined && !isNaN(options.timeout)) {
            if (options.timeout < 0) {
                opt.timeout = 0;
            } else {
                opt.timeout = options.timeout;
            }
        }
    }

    return opt;
}

// Returns a timeout failure, closed over a specified timeout value and error callback.
function createTimeout(errorCallback, timeout) {
    var t = setTimeout(function() {
        clearTimeout(t);
        t = null;
        errorCallback({
            code:PositionError.TIMEOUT,
            message:"Position retrieval timed out."
        });
    }, timeout);
    return t;
}

var geolocation = {
    lastPosition:null, // reference to last known (cached) position returned
    /**
   * Asynchronously acquires the current position.
   *
   * @param {Function} successCallback    The function to call when the position data is available
   * @param {Function} errorCallback      The function to call when there is an error getting the heading position. (OPTIONAL)
   * @param {PositionOptions} options     The options for getting the position data. (OPTIONAL)
   */
    getCurrentPosition:function(successCallback, errorCallback, options) {
        argscheck.checkArgs('fFO', 'geolocation.getCurrentPosition', arguments);
        options = parseParameters(options);

        // Timer var that will fire an error callback if no position is retrieved from native
        // before the "timeout" param provided expires
        var timeoutTimer = {timer:null};

        var win = function(p) {
            clearTimeout(timeoutTimer.timer);
            if (!(timeoutTimer.timer)) {
                // Timeout already happened, or native fired error callback for
                // this geo request.
                // Don't continue with success callback.
                return;
            }
            var pos = new Position(
                {
                    latitude:p.latitude,
                    longitude:p.longitude,
                    altitude:p.altitude,
                    accuracy:p.accuracy,
                    heading:p.heading,
                    velocity:p.velocity,
                    altitudeAccuracy:p.altitudeAccuracy
                },
                p.timestamp
            );
            geolocation.lastPosition = pos;
            successCallback(pos);
        };
        var fail = function(e) {
            clearTimeout(timeoutTimer.timer);
            timeoutTimer.timer = null;
            var err = new PositionError(e.code, e.message);
            if (errorCallback) {
                errorCallback(err);
            }
        };

        // Check our cached position, if its timestamp difference with current time is less than the maximumAge, then just
        // fire the success callback with the cached position.
        if (geolocation.lastPosition && options.maximumAge && (((new Date()).getTime() - geolocation.lastPosition.timestamp) <= options.maximumAge)) {
            successCallback(geolocation.lastPosition);
        // If the cached position check failed and the timeout was set to 0, error out with a TIMEOUT error object.
        } else if (options.timeout === 0) {
            fail({
                code:PositionError.TIMEOUT,
                message:"timeout value in PositionOptions set to 0 and no cached Position object available, or cached Position object's age exceeds provided PositionOptions' maximumAge parameter."
            });
        // Otherwise we have to call into native to retrieve a position.
        } else {
            if (options.timeout !== Infinity) {
                // If the timeout value was not set to Infinity (default), then
                // set up a timeout function that will fire the error callback
                // if no successful position was retrieved before timeout expired.
                timeoutTimer.timer = createTimeout(fail, options.timeout);
            } else {
                // This is here so the check in the win function doesn't mess stuff up
                // may seem weird but this guarantees timeoutTimer is
                // always truthy before we call into native
                timeoutTimer.timer = true;
            }
            exec(win, fail, "Geolocation", "getLocation", [options.enableHighAccuracy, options.maximumAge]);
        }
        return timeoutTimer;
    },
    /**
     * Asynchronously watches the geolocation for changes to geolocation.  When a change occurs,
     * the successCallback is called with the new location.
     *
     * @param {Function} successCallback    The function to call each time the location data is available
     * @param {Function} errorCallback      The function to call when there is an error getting the location data. (OPTIONAL)
     * @param {PositionOptions} options     The options for getting the location data such as frequency. (OPTIONAL)
     * @return String                       The watch id that must be passed to #clearWatch to stop watching.
     */
    watchPosition:function(successCallback, errorCallback, options) {
        argscheck.checkArgs('fFO', 'geolocation.getCurrentPosition', arguments);
        options = parseParameters(options);

        var id = utils.createUUID();

        // Tell device to get a position ASAP, and also retrieve a reference to the timeout timer generated in getCurrentPosition
        timers[id] = geolocation.getCurrentPosition(successCallback, errorCallback, options);

        var fail = function(e) {
            clearTimeout(timers[id].timer);
            var err = new PositionError(e.code, e.message);
            if (errorCallback) {
                errorCallback(err);
            }
        };

        var win = function(p) {
            clearTimeout(timers[id].timer);
            if (options.timeout !== Infinity) {
                timers[id].timer = createTimeout(fail, options.timeout);
            }
            var pos = new Position(
                {
                    latitude:p.latitude,
                    longitude:p.longitude,
                    altitude:p.altitude,
                    accuracy:p.accuracy,
                    heading:p.heading,
                    velocity:p.velocity,
                    altitudeAccuracy:p.altitudeAccuracy
                },
                p.timestamp
            );
            geolocation.lastPosition = pos;
            successCallback(pos);
        };

        exec(win, fail, "Geolocation", "addWatch", [id, options.enableHighAccuracy]);

        return id;
    },
    /**
     * Clears the specified heading watch.
     *
     * @param {String} id       The ID of the watch returned from #watchPosition
     */
    clearWatch:function(id) {
        if (id && timers[id] !== undefined) {
            clearTimeout(timers[id].timer);
            timers[id].timer = false;
            exec(null, null, "Geolocation", "clearWatch", [id]);
        }
    }
};

module.exports = geolocation;

});

/** plugins/cordova-plugin-geolocation/www/Position.js */

cordova.define("cordova-plugin-geolocation.Position", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var Coordinates = require('./Coordinates');

var Position = function(coords, timestamp) {
    if (coords) {
        this.coords = new Coordinates(coords.latitude, coords.longitude, coords.altitude, coords.accuracy, coords.heading, coords.velocity, coords.altitudeAccuracy);
    } else {
        this.coords = new Coordinates();
    }
    this.timestamp = (timestamp !== undefined) ? timestamp : new Date().getTime();
};

module.exports = Position;

});

/** plugins/cordova-plugin-geolocation/www/PositionError.js */

cordova.define("cordova-plugin-geolocation.PositionError", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Position error object
 *
 * @constructor
 * @param code
 * @param message
 */
var PositionError = function(code, message) {
    this.code = code || null;
    this.message = message || '';
};

PositionError.prototype.PERMISSION_DENIED = PositionError.PERMISSION_DENIED = 1;
PositionError.prototype.POSITION_UNAVAILABLE = PositionError.POSITION_UNAVAILABLE = 2;
PositionError.prototype.TIMEOUT = PositionError.TIMEOUT = 3;

module.exports = PositionError;

});

/** plugins/cordova-plugin-splashscreen/www/splashscreen.js */

cordova.define("cordova-plugin-splashscreen.SplashScreen", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');

var splashscreen = {
    show:function() {
        exec(null, null, "SplashScreen", "show", []);
    },
    hide:function() {
        exec(null, null, "SplashScreen", "hide", []);
    }
};

module.exports = splashscreen;

});

/** plugins/xsf.window/www/window.js */

var __ret = {};
function doChildViewDidUnload(){
    if(typeof(__ret.onClose) == "function"){
        __ret.onClose();
    }else{
        if(typeof(__ret.onExit) == "function"){
            __ret.onExit();
        }
    }
}
cordova.define("xsf.window", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,callback){
		callback = callback || onSucceed;
		exec(callback,onError, "WindowPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		open : function(url,title,isCloseButton){
            if(isCloseButton){
               return window.open(url, '_blank', 'location=no,closebuttoncaption=关闭');
            }else{
               if(url.indexOf(":")<0){
                    var href = window.location.href;
                    var p = href.lastIndexOf("/");
                    if(p > 0){
                        url = href.substring(0,p+1) + url;
                    }
               }
               //alert(url);
               call('open',[url,title]);
               return __ret;
            }
		},
        showTab : function(json,callback){
            call('showTab',[json],callback);
            return __ret;
        },
        close : function(n,callback){
            call('close',n?[n]:[],callback);
        },
        rotation : function(n,callback){
            call('rotation',[],callback);
        },
        resetRotation : function(n,callback){
            call('resetRotation',[],callback);
        },
        zoom : function(isZoom,callback){
            call('zoom',[isZoom],callback);
        }
               
	};

});

/** plugins/cordova-plugin-inappbrowser/www/inappbrowser.js */

cordova.define("cordova-plugin-inappbrowser.inappbrowser", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

(function() {
    // special patch to correctly work on Ripple emulator (CB-9760)
    if (window.parent && !!window.parent.ripple) { // https://gist.github.com/triceam/4658021
        module.exports = window.open.bind(window); // fallback to default window.open behaviour
        return;
    }

    var exec = require('cordova/exec');
    var channel = require('cordova/channel');
    var modulemapper = require('cordova/modulemapper');
    var urlutil = require('cordova/urlutil');

    function InAppBrowser() {
       this.channels = {
            'loadstart': channel.create('loadstart'),
            'loadstop' : channel.create('loadstop'),
            'loaderror' : channel.create('loaderror'),
            'exit' : channel.create('exit')
       };
    }

    InAppBrowser.prototype = {
        _eventHandler: function (event) {
            if (event && (event.type in this.channels)) {
                this.channels[event.type].fire(event);
            }
        },
        close: function (eventname) {
            exec(null, null, "InAppBrowser", "close", []);
        },
        show: function (eventname) {
          exec(null, null, "InAppBrowser", "show", []);
        },
        addEventListener: function (eventname,f) {
            if (eventname in this.channels) {
                this.channels[eventname].subscribe(f);
            }
        },
        removeEventListener: function(eventname, f) {
            if (eventname in this.channels) {
                this.channels[eventname].unsubscribe(f);
            }
        },

        executeScript: function(injectDetails, cb) {
            if (injectDetails.code) {
                exec(cb, null, "InAppBrowser", "injectScriptCode", [injectDetails.code, !!cb]);
            } else if (injectDetails.file) {
                exec(cb, null, "InAppBrowser", "injectScriptFile", [injectDetails.file, !!cb]);
            } else {
                throw new Error('executeScript requires exactly one of code or file to be specified');
            }
        },

        insertCSS: function(injectDetails, cb) {
            if (injectDetails.code) {
                exec(cb, null, "InAppBrowser", "injectStyleCode", [injectDetails.code, !!cb]);
            } else if (injectDetails.file) {
                exec(cb, null, "InAppBrowser", "injectStyleFile", [injectDetails.file, !!cb]);
            } else {
                throw new Error('insertCSS requires exactly one of code or file to be specified');
            }
        }
    };

    module.exports = function(strUrl, strWindowName, strWindowFeatures, callbacks) {
        // Don't catch calls that write to existing frames (e.g. named iframes).
        if (window.frames && window.frames[strWindowName]) {
            var origOpenFunc = modulemapper.getOriginalSymbol(window, 'open');
            return origOpenFunc.apply(window, arguments);
        }

        strUrl = urlutil.makeAbsolute(strUrl);
        var iab = new InAppBrowser();

        callbacks = callbacks || {};
        for (var callbackName in callbacks) {
            iab.addEventListener(callbackName, callbacks[callbackName]);
        }

        var cb = function(eventname) {
           iab._eventHandler(eventname);
        };

        strWindowFeatures = strWindowFeatures || "";

        exec(cb, cb, "InAppBrowser", "open", [strUrl, strWindowName, strWindowFeatures]);
        return iab;
    };
})();

});

/** plugins/xsf.wps/www/wps.js */

cordova.define("xsf.wps", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
        onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "WPSPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		open : function(url,fileName,id,readOnly,revision,succeedCallback,errorCallback){
			call('open',[url,fileName,id,readOnly,revision],succeedCallback,errorCallback);
		}
	};

});

/** plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js */

cordova.define("phonegap-plugin-barcodescanner.BarcodeScanner", function(require, exports, module) {
/**
 * cordova is available under *either* the terms of the modified BSD license *or* the
 * MIT License (2008). See http://opensource.org/licenses/alphabetical for full text.
 *
 * Copyright (c) Matt Kane 2010
 * Copyright (c) 2011, IBM Corporation
 */


        var exec = require("cordova/exec");

        var scanInProgress = false;

        /**
         * Constructor.
         *
         * @returns {BarcodeScanner}
         */
        function BarcodeScanner() {

            /**
             * Encoding constants.
             *
             * @type Object
             */
            this.Encode = {
                TEXT_TYPE: "TEXT_TYPE",
                EMAIL_TYPE: "EMAIL_TYPE",
                PHONE_TYPE: "PHONE_TYPE",
                SMS_TYPE: "SMS_TYPE"
                //  CONTACT_TYPE: "CONTACT_TYPE",  // TODO:  not implemented, requires passing a Bundle class from Javascript to Java
                //  LOCATION_TYPE: "LOCATION_TYPE" // TODO:  not implemented, requires passing a Bundle class from Javascript to Java
            };

    /**
     * Barcode format constants, defined in ZXing library.
     *
     * @type Object
     */
    this.format = {
        "all_1D": 61918,
        "aztec": 1,
        "codabar": 2,
        "code_128": 16,
        "code_39": 4,
        "code_93": 8,
        "data_MATRIX": 32,
        "ean_13": 128,
        "ean_8": 64,
        "itf": 256,
        "maxicode": 512,
        "msi": 131072,
        "pdf_417": 1024,
        "plessey": 262144,
        "qr_CODE": 2048,
        "rss_14": 4096,
        "rss_EXPANDED": 8192,
        "upc_A": 16384,
        "upc_E": 32768,
        "upc_EAN_EXTENSION": 65536
        };
  }

/**
 * Read code from scanner.
 *
 * @param {Function} successCallback This function will recieve a result object: {
         *        text : '12345-mock',    // The code that was scanned.
         *        format : 'FORMAT_NAME', // Code format.
         *        cancelled : true/false, // Was canceled.
         *    }
 * @param {Function} errorCallback
 * @param config
 */
BarcodeScanner.prototype.scan = function (successCallback, errorCallback, config) {

            if (config instanceof Array) {
                // do nothing
            } else {
                if (typeof(config) === 'object') {
                    config = [ config ];
                } else {
                    config = [];
                }
            }

            if (errorCallback == null) {
                errorCallback = function () {
                };
            }

            if (typeof errorCallback != "function") {
                console.log("BarcodeScanner.scan failure: failure parameter not a function");
                return;
            }

            if (typeof successCallback != "function") {
                console.log("BarcodeScanner.scan failure: success callback parameter must be a function");
                return;
            }

            if (scanInProgress) {
                errorCallback('Scan is already in progress');
                return;
            }

            scanInProgress = true;

            exec(
                function(result) {
                    scanInProgress = false;
                    successCallback(result);
                },
                function(error) {
                    scanInProgress = false;
                    errorCallback(error);
                },
                'BarcodeScanner',
                'scan',
                config
            );
        };

        //-------------------------------------------------------------------
        BarcodeScanner.prototype.encode = function (type, data, successCallback, errorCallback, options) {
            if (errorCallback == null) {
                errorCallback = function () {
                };
            }

            if (typeof errorCallback != "function") {
                console.log("BarcodeScanner.encode failure: failure parameter not a function");
                return;
            }

            if (typeof successCallback != "function") {
                console.log("BarcodeScanner.encode failure: success callback parameter must be a function");
                return;
            }

            exec(successCallback, errorCallback, 'BarcodeScanner', 'encode', [
                {"type": type, "data": data, "options": options}
            ]);
        };

        var barcodeScanner = new BarcodeScanner();
        module.exports = barcodeScanner;

});

/** plugins/org.pgsqlite/www/SQLitePlugin.js */

cordova.define("org.pgsqlite.SQLitePlugin", function(require, exports, module) {
//
//(function() {
  var READ_ONLY_REGEX, SQLiteFactory, SQLitePlugin, SQLitePluginTransaction, argsArray, nextTick, root, txLocks;

  root = this;

  READ_ONLY_REGEX = /^\s*(?:drop|delete|insert|update|create)\s/i;

  txLocks = {};

  nextTick = window.setImmediate || function(fun) {
    window.setTimeout(fun, 0);
  };


  /*
    Utility that avoids leaking the arguments object. See
    https://www.npmjs.org/package/argsarray
   */

  argsArray = function(fun) {
    return function() {
      var args, i, len;
      len = arguments.length;
      if (len) {
        args = [];
        i = -1;
        while (++i < len) {
          args[i] = arguments[i];
        }
        return fun.call(this, args);
      } else {
        return fun.call(this, []);
      }
    };
  };

  SQLitePlugin = function(openargs, openSuccess, openError) {
    var dbname;
    console.log("SQLitePlugin openargs: " + (JSON.stringify(openargs)));
    if (!(openargs && openargs['name'])) {
      throw new Error("Cannot create a SQLitePlugin instance without a db name");
    }
    dbname = openargs.name;
    this.openargs = openargs;
    this.dbname = dbname;
    this.openSuccess = openSuccess;
    this.openError = openError;
    this.openSuccess || (this.openSuccess = function() {
      console.log("DB opened: " + dbname);
    });
    this.openError || (this.openError = function(e) {
      console.log(e.message);
    });
    this.open(this.openSuccess, this.openError);
  };

  SQLitePlugin.prototype.databaseFeatures = {
    isSQLitePluginDatabase: true
  };

  SQLitePlugin.prototype.openDBs = {};

  SQLitePlugin.prototype.addTransaction = function(t) {
    if (!txLocks[this.dbname]) {
      txLocks[this.dbname] = {
        queue: [],
        inProgress: false
      };
    }
    txLocks[this.dbname].queue.push(t);
    this.startNextTransaction();
  };

  SQLitePlugin.prototype.transaction = function(fn, error, success) {
    if (!this.openDBs[this.dbname]) {
      error('database not open');
      return;
    }
    this.addTransaction(new SQLitePluginTransaction(this, fn, error, success, true, false));
  };

  SQLitePlugin.prototype.readTransaction = function(fn, error, success) {
    if (!this.openDBs[this.dbname]) {
      error('database not open');
      return;
    }
    this.addTransaction(new SQLitePluginTransaction(this, fn, error, success, true, true));
  };

  SQLitePlugin.prototype.startNextTransaction = function() {
    var self;
    self = this;
    nextTick(function() {
      var txLock;
      txLock = txLocks[self.dbname];
      if (txLock.queue.length > 0 && !txLock.inProgress) {
        txLock.inProgress = true;
        txLock.queue.shift().start();
      }
    });
  };

  SQLitePlugin.prototype.open = function(success, error) {
    var onSuccess;
    onSuccess = (function(_this) {
      return function() {
        return success(_this);
      };
    })(this);
    if (!(this.dbname in this.openDBs)) {
      this.openDBs[this.dbname] = true;
      cordova.exec(onSuccess, error, "SQLitePlugin", "open", [this.openargs]);
    } else {

      /*
      for a re-open run onSuccess async so that the openDatabase return value
      can be used in the success handler as an alternative to the handler's
      db argument
       */
      nextTick(function() {
        return onSuccess();
      });
    }
  };

  SQLitePlugin.prototype.close = function(success, error) {
    if (this.dbname in this.openDBs) {
      delete this.openDBs[this.dbname];
      cordova.exec(success, error, "SQLitePlugin", "close", [
        {
          path: this.dbname
        }
      ]);
    }
  };

  SQLitePlugin.prototype.executeSql = function(statement, params, success, error) {
    var myerror, myfn, mysuccess;
    mysuccess = function(t, r) {
      if (!!success) {
        return success(r);
      }
    };
    myerror = function(t, e) {
      if (!!error) {
        return error(e);
      }
    };
    myfn = function(tx) {
      tx.executeSql(statement, params, mysuccess, myerror);
    };
    this.addTransaction(new SQLitePluginTransaction(this, myfn, null, null, false, false));
  };


  /*
  Transaction batching object:
   */

  SQLitePluginTransaction = function(db, fn, error, success, txlock, readOnly) {
    if (typeof fn !== "function") {

      /*
      This is consistent with the implementation in Chrome -- it
      throws if you pass anything other than a function. This also
      prevents us from stalling our txQueue if somebody passes a
      false value for fn.
       */
      throw new Error("transaction expected a function");
    }
    this.db = db;
    this.fn = fn;
    this.error = error;
    this.success = success;
    this.txlock = txlock;
    this.readOnly = readOnly;
    this.executes = [];
    if (txlock) {
      this.executeSql("BEGIN", [], null, function(tx, err) {
        throw new Error("unable to begin transaction: " + err.message);
      });
    }
  };

  SQLitePluginTransaction.prototype.start = function() {
    var err;
    try {
      this.fn(this);
      this.run();
    } catch (_error) {
      err = _error;

      /*
      If "fn" throws, we must report the whole transaction as failed.
       */
      txLocks[this.db.dbname].inProgress = false;
      this.db.startNextTransaction();
      if (this.error) {
        this.error(err);
      }
    }
  };

  SQLitePluginTransaction.prototype.executeSql = function(sql, values, success, error) {
    var qid;
    if (this.readOnly && READ_ONLY_REGEX.test(sql)) {
      this.handleStatementFailure(error, {
        message: 'invalid sql for a read-only transaction'
      });
      return;
    }
    qid = this.executes.length;
    this.executes.push({
      success: success,
      error: error,
      qid: qid,
      sql: sql,
      params: values || []
    });
  };

  SQLitePluginTransaction.prototype.handleStatementSuccess = function(handler, response) {
    var payload, rows;
    if (!handler) {
      return;
    }
    rows = response.rows || [];
    payload = {
      rows: {
        item: function(i) {
          return rows[i];
        },
        length: rows.length
      },
      rowsAffected: response.rowsAffected || 0,
      insertId: response.insertId || void 0
    };
    handler(this, payload);
  };

  SQLitePluginTransaction.prototype.handleStatementFailure = function(handler, response) {
    if (!handler) {
      throw new Error("a statement with no error handler failed: " + response.message);
    }
    if (handler(this, response)) {
      throw new Error("a statement error callback did not return false");
    }
  };

  SQLitePluginTransaction.prototype.run = function() {
    var batchExecutes, handlerFor, i, mycb, mycbmap, qid, request, tropts, tx, txFailure, waiting;
    txFailure = null;
    tropts = [];
    batchExecutes = this.executes;
    waiting = batchExecutes.length;
    this.executes = [];
    tx = this;
    handlerFor = function(index, didSucceed) {
      return function(response) {
        var err;
        try {
          if (didSucceed) {
            tx.handleStatementSuccess(batchExecutes[index].success, response);
          } else {
            tx.handleStatementFailure(batchExecutes[index].error, response);
          }
        } catch (_error) {
          err = _error;
          if (!txFailure) {
            txFailure = err;
          }
        }
        if (--waiting === 0) {
          if (txFailure) {
            tx.abort(txFailure);
          } else if (tx.executes.length > 0) {

            /*
            new requests have been issued by the callback
            handlers, so run another batch.
             */
            tx.run();
          } else {
            tx.finish();
          }
        }
      };
    };
    i = 0;
    mycbmap = {};
    while (i < batchExecutes.length) {
      request = batchExecutes[i];
      qid = request.qid;
      mycbmap[qid] = {
        success: handlerFor(i, true),
        error: handlerFor(i, false)
      };
      tropts.push({
        qid: qid,
        query: [request.sql].concat(request.params),
        sql: request.sql,
        params: request.params
      });
      i++;
    }
    mycb = function(result) {
      var q, r, res, type, _i, _len;
      for (_i = 0, _len = result.length; _i < _len; _i++) {
        r = result[_i];
        type = r.type;
        qid = r.qid;
        res = r.result;
        q = mycbmap[qid];
        if (q) {
          if (q[type]) {
            q[type](res);
          }
        }
      }
    };
    cordova.exec(mycb, null, "SQLitePlugin", "backgroundExecuteSqlBatch", [
      {
        dbargs: {
          dbname: this.db.dbname
        },
        executes: tropts
      }
    ]);
  };

  SQLitePluginTransaction.prototype.abort = function(txFailure) {
    var failed, succeeded, tx;
    if (this.finalized) {
      return;
    }
    tx = this;
    succeeded = function(tx) {
      txLocks[tx.db.dbname].inProgress = false;
      tx.db.startNextTransaction();
      if (tx.error) {
        tx.error(txFailure);
      }
    };
    failed = function(tx, err) {
      txLocks[tx.db.dbname].inProgress = false;
      tx.db.startNextTransaction();
      if (tx.error) {
        tx.error(new Error("error while trying to roll back: " + err.message));
      }
    };
    this.finalized = true;
    if (this.txlock) {
      this.executeSql("ROLLBACK", [], succeeded, failed);
      this.run();
    } else {
      succeeded(tx);
    }
  };

  SQLitePluginTransaction.prototype.finish = function() {
    var failed, succeeded, tx;
    if (this.finalized) {
      return;
    }
    tx = this;
    succeeded = function(tx) {
      txLocks[tx.db.dbname].inProgress = false;
      tx.db.startNextTransaction();
      if (tx.success) {
        tx.success();
      }
    };
    failed = function(tx, err) {
      txLocks[tx.db.dbname].inProgress = false;
      tx.db.startNextTransaction();
      if (tx.error) {
        tx.error(new Error("error while trying to commit: " + err.message));
      }
    };
    this.finalized = true;
    if (this.txlock) {
      this.executeSql("COMMIT", [], succeeded, failed);
      this.run();
    } else {
      succeeded(tx);
    }
  };

  SQLiteFactory = {

    /*
    NOTE: this function should NOT be translated from Javascript
    back to CoffeeScript by js2coffee.
    If this function is edited in Javascript then someone will
    have to translate it back to CoffeeScript by hand.
     */
    open: argsArray(function(args) {
      var errorcb, first, okcb, openargs;
      if (args.length < 1) {
        return null;
      }
      first = args[0];
      openargs = null;
      okcb = null;
      errorcb = null;
      if (first.constructor === String) {
        openargs = {
          name: first
        };
        if (args.length >= 5) {
          okcb = args[4];
          if (args.length > 5) {
            errorcb = args[5];
          }
        }
      } else {
        openargs = first;
        if (args.length >= 2) {
          okcb = args[1];
          if (args.length > 2) {
            errorcb = args[2];
          }
        }
      }
      return new SQLitePlugin(openargs, okcb, errorcb);
    }),
    delete: function(databaseName, success, error) {
      delete SQLitePlugin.prototype.openDBs[databaseName];
      return cordova.exec(success, error, "SQLitePlugin", "delete", [
        {
          path: databaseName
        }
      ]);
    }
  };

  root.sqlitePlugin = {
    sqliteFeatures: {
      isSQLitePlugin: true
    }//,
    //openDatabase: SQLiteFactory.opendb,
    //deleteDatabase: SQLiteFactory.deleteDb
  };
    module.exports = SQLiteFactory;
//}).call(this);
//
});

/** plugins/xsf.media/www/media.js */

cordova.define("xsf.media", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succees,error){
		succees = succees || onSucceed;
		error = error || error;
		exec(succees,error, "MediaPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		play : function(path,succees,error){
			call('play',[path],succees,error);
		},
		pause : function(succees,error){
			call('pause',[],succees,error);
		},
		resume : function(succees,error){
			call('resume',[],succees,error);
		},
		stop : function(succees,error){
			call('stop',[],succees,error);
		}
	};

});

/** plugins/xsf.record/www/record.js */

cordova.define("xsf.record", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succees,error){
		succees = succees || onSucceed;
		error = error || error;
		exec(succees,error, "RecordPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		start : function(path,succees,error){
			call('start',[path],succees,error);
		},
		pause : function(succees,error){
			call('pause',[],succees,error);
		},
		resume : function(succees,error){
			call('resume',[],succees,error);
		},
		stop : function(succees,error){
			call('stop',[],succees,error);
		}
	};

});

/** plugins/xsf.recognition/www/recognition.js */

cordova.define("xsf.recognition", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succees,error){
		succees = succees || onSucceed;
		error = error || error;
		exec(succees,error, "RecognitionPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		start : function(succees,error){
			call('start',[],succees,error);
		}
	};

});

/** plugins/xsf.zip/www/zip.js */

cordova.define("xsf.zip", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "ZipPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		zip : function(from,to,onSucceed,onError){
			call('zip',[from,to],onSucceed,onError);
        },unzip : function(from,to,onSucceed,onError){
            call('unzip',[from,to],onSucceed,onError);
        }
	};

});

/** plugins/xsf.securitySettings/www/securitySettings.js */

cordova.define("xsf.securitySettings", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,callback){
		callback = callback || onSucceed;
		exec(callback,onError, "SecuritySettingsPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		openSecuritySettings : function(options,onSucceed,onError){
            call('openSecuritySettings',[options],onSucceed,onError);
        }
	};

});

/** plugins/xsf.pushmessage/www/pushmessage.js */

cordova.define("xsf.pushmessage", function(require, exports, module) {
	function onSucceed(args){
		alert("succeed:" + args);
	}
	
	function onError(err){
		alert("error:" + err);
	}
	
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "PushMessagePlugin", callee,args);
	}
	
	
	var exec = require('cordova/exec');
	module.exports = {
		startPushMessage : function(data,onSucceed,onError){
			call('startPushMessage',[data],onSucceed,onError);
        },stopPushMessage : function(onSucceed,onError){
			call('stopPushMessage',[],onSucceed,onError);
        }
	};
});

/** plugins/xsf.http/www/http.js */

cordova.define("xsf.http", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "HttpPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		get : function(url,params,onSucceed,onError){
			call('get',[url,params,'text'],onSucceed,onError);
        },getJSON : function(url,params,onSucceed,onError){
            call('get',[url,params,'json'],onSucceed,onError);
        },post : function(url,params,onSucceed,onError){
            call('post',[url,params,'text'],onSucceed,onError);
        },postJSON : function(url,params,onSucceed,onError){
            call('post',[url,params,'json'],onSucceed,onError);
        },postData : function(url,data,onSucceed,onError){
            call('postData',[url,data,'json'],onSucceed,onError);
        },download : function(url,filePath,onSucceed,onError){
            //call('download',[url],onSucceed,onError);
            var fileTransfer = new xsf.FileTransfer();
            fileTransfer.download(
                url,
                filePath,
                onSucceed,
                onError,
                false,{}
            );
            return fileTransfer;
        },upload : function(path,url,onSucceed,onError){
            //call('upload',[path,url],onSucceed,onError);
            var fileTransfer = new xsf.FileTransfer();
            fileTransfer.upload(
                path,
                url,
                onSucceed,
                onError,
                {}
            );
            return fileTransfer;
        },ajax : function(options){
            if(options.dataType == 'jsonp'){
               options.dataType = 'json';
            }
            if(options.type == null ||
            	typeof(options.type) == "undefined"){
            	options.type = "get"
            }
            if(options.type == "GET" || options.type == "get" ){
                call('get',[options.url,options.data,options.dataType],options.success,options.error);
            }else if(options.type == "POST" || options.type == "post" ){
                call('post',[options.url,options.data,options.dataType],options.success,options.error);
            }
        }
	};

});

/** plugins/xsf.mobile/www/mobile.js */

cordova.define("xsf.mobile", function(require, exports, module) {
               function onSucceed(args){
               //alert("succeed:" + args);
               }
               function onError(err){
               //alert("error:" + err);
               }
               function call(callee,args,callback){
               callback = callback || onSucceed;
               exec(callback,onError, "MobilePlugin", callee,args);
               }
               var exec = require('cordova/exec');
               module.exports = {
               telto : function(tel){
               call('telto',[tel]);
               },
               smsto : function(tel){
               call('smsto',[tel]);
               },
               mailto : function(tel){
               call('mailto',[tel]);
               },
               browserto : function(url){
               call('browserto',[url]);
               }
               };
               
               });
/** plugins/nl.xservices.plugins.toast/www/Toast.js */

cordova.define("nl.xservices.plugins.toast", function(require, exports, module) {

	function Toast() {
	}
	
	Toast.prototype.show = function (message, duration, position, successCallback, errorCallback) {
	  cordova.exec(successCallback, errorCallback, "Toast", "show", [message, duration, position]);
	};
	
	Toast.prototype.showShortTop = function (message, successCallback, errorCallback) {
	  this.show(message, "short", "top", successCallback, errorCallback);
	};
	
	Toast.prototype.showShortCenter = function (message, successCallback, errorCallback) {
	  this.show(message, "short", "center", successCallback, errorCallback);
	};
	
	Toast.prototype.showShortBottom = function (message, successCallback, errorCallback) {
	  this.show(message, "short", "bottom", successCallback, errorCallback);
	};
	
	Toast.prototype.showLongTop = function (message, successCallback, errorCallback) {
	  this.show(message, "long", "top", successCallback, errorCallback);
	};
	
	Toast.prototype.showLongCenter = function (message, successCallback, errorCallback) {
	  this.show(message, "long", "center", successCallback, errorCallback);
	};
	
	Toast.prototype.showLongBottom = function (message, successCallback, errorCallback) {
	  this.show(message, "long", "bottom", successCallback, errorCallback);
	};
	
	module.exports = new Toast();
	/*Toast.install = function () {
	  if (!window.plugins) {
	    window.plugins = {};
	  }
	
	  window.plugins.toast = new Toast();
	  return window.plugins.toast;
	};
	
	cordova.addConstructor(Toast.install);
*/
});

/** plugins/xsf.store/www/store.js */

cordova.define("xsf.store", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "StorePlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		get : function(key,onSucceed,onError){
			call('get',[key],onSucceed,onError);
        },set : function(key,value,onSucceed,onError){
            call('set',[key,value],onSucceed,onError);
        },remove : function(key,onSucceed,onError){
            call('remove',[key],onSucceed,onError);
        },clear : function(onSucceed,onError){
            call('clear',[],onSucceed,onError);
        }
	};

});

/** plugins/xsf.chat/www/chat.js */

cordova.define("xsf.chat", function(require, exports, module) {
	function onSucceed(args){
		//alert("succeed:" + args);
	}
	function onError(err){
		//alert("error:" + err);
	}
	function call(callee,args,succeedCallback,errorCallback){
		onSucceed = succeedCallback || onSucceed;
        onError = errorCallback || onError;
		exec(onSucceed,onError, "ChatPlugin", callee,args);
	}
	var exec = require('cordova/exec');
	module.exports = {
		openChat : function(options,onSucceed,onError){
			call('openChat',[options],onSucceed,onError);
        },openChatList : function(options,onSucceed,onError){
            call('openChatList',[options],onSucceed,onError);
        },syncChat : function(options,onSucceed,onError){
            call('syncChat',[options],onSucceed,onError);
        }
	};

});


/** plugins/com.pylonproducts.wifiwizard/www/WifiWizard.js */
cordova.define("com.pylonproducts.wifiwizard.WifiWizard", function(require, exports, module) {
/*
 * Copyright 2015 Matt Parsons
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
               
/*
 * This is the interface for the WifiWizard Phonegap plugin.
 */
               
               var WifiWizard = {
               
               /**
                * 	This method formats wifi information into an object for use with the
                * 	addNetwork function. Currently only supports
                *		@param SSID			the SSID of the network enclosed in double quotes
                *		@param password		the password for the network enclosed in double quotes
                * 	@param algorithm	the authentication algorithm
                * 	@return	wifiConfig	a JSON object properly formatted for the plugin.
                */
               formatWifiConfig: function(SSID, password, algorithm) {
               var wifiConfig = {
               SSID: WifiWizard.formatWifiString(SSID)
               };
               if (!algorithm && !password) {
               // open network
               wifiConfig.auth = {
               algorithm: 'NONE'
               };
               } else if (algorithm === 'WPA') {
               wifiConfig.auth = {
               algorithm : algorithm,
               password : WifiWizard.formatWifiString(password)
               // Other parameters can be added depending on algorithm.
               };
               }
               else if (algorithm === 'New network type') {
               wifiConfig.auth = {
               algorithm : algorithm
               // Etc...
               };
               }
               else {
               console.log("Algorithm incorrect")
               return false;
               }
               return wifiConfig;
               },
               
               /**
                *	This method is a helper method that returns a wifi object with WPA.
                */
               formatWPAConfig: function(SSID, password) {
               return WifiWizard.formatWifiConfig(SSID, password, 'WPA');
               },
               
               /**
                *	This method formats a given SSID and ensures that it is appropriate.
                *	If the SSID is not wrapped in double quotes, it wraps it in double quotes.
                * Despite the name, this also needs to be done to WPA PSK.
                *	@param	ssid	the SSID to format
                */
               formatWifiString: function(ssid) {
               if (ssid === undefined || ssid === null) {
               ssid = "";
               }
               ssid = ssid.trim()
               
               if (ssid.charAt(0) != '"' ) {
               ssid = '"' + ssid;
               }
               
               if (ssid.charAt(ssid.length-1) != '"' ) {
               ssid = ssid + '"';
               }
               
               return ssid;
               },
               
               /**
                * This methods adds a network to the list of available networks.
                * Currently, only WPA authentication method is supported.
                *
                * @param 	wifi is JSON formatted information necessary for adding the Wifi
                * 			network, as is done in formatWifiConfig.
                * @param 	win is a callback function that gets called if the plugin is
                * 			successful.
                * @param 	fail is a callback function that gets called if the plugin gets
                * 			an error
                */
               addNetwork: function(wifi, win, fail) {
               //console.log("WifiWizard add method entered.");
               if (wifi !== null && typeof wifi === 'object') {
               // Ok to proceed!
               }
               else {
               console.log('WifiWizard: Invalid parameter. wifi not an object.');
               }
               
               var networkInformation = [];
               
               if (wifi.SSID !== undefined && wifi.SSID !== '') {
               networkInformation.push(wifi.SSID);
               }
               else {
               // i dunno, like, reject the call or something? what are you even doing?
               console.log('WifiWizard: No SSID given.');
               return false;
               }
               
               if (typeof wifi.auth == 'object') {
               
               switch (wifi.auth.algorithm) {
               case 'WPA':
               networkInformation.push('WPA');
               networkInformation.push(wifi.auth.password);
               break;
               case 'NONE':
               networkInformation.push('NONE');
               break;
               case 'Newly supported type':
               // Push values in specific order, and implement new type in the Java code.
               break;
               default:
               console.log("WifiWizard: authentication invalid.");
               }
               
               }
               else {
               console.log('WifiWizard: No authentication algorithm given.');
               return false;
               }
               
               cordova.exec(win, fail, 'WifiWizard', 'addNetwork', networkInformation);
               },
               
               /**
                *	This method removes a given network from the list of configured networks.
                *	@param	SSID	of the network to remove
                *	@param	win		function to handle successful callback
                *	@param	fail		function to handle error callback
                */
               removeNetwork: function(SSID, win, fail) {
               cordova.exec(win, fail, 'WifiWizard', 'removeNetwork', [WifiWizard.formatWifiString(SSID)]);
               },
               
               /**
                *	This method connects a network if it is configured.
                *	@param	SSID	the network to connect
                *	@param	win		function that is called if successful
                * @param	fail		function that is called to handle errors
                */
               connectNetwork: function(SSID, win, fail) {
               cordova.exec(win, fail, 'WifiWizard', 'connectNetwork', [WifiWizard.formatWifiString(SSID)]);
               },
               
               /**
                *	This method disconnects a network if it is configured.
                *	@param	SSID	the network to disconnect
                *	@param	win		function that is called if successful
                * @param	fail		function that is called to handle errors
                */
               disconnectNetwork: function(SSID, win, fail) {
               cordova.exec(win, fail, 'WifiWizard', 'disconnectNetwork', [WifiWizard.formatWifiString(SSID)]);
               
               },
               
               /**
                *	Hands the list of previously used and configured networks to the `win` success callback function.
                * @param 	win	callback function that receives list of networks
                * @param 	fail	callback function if error
                * @return		a list of networks
                */
               listNetworks: function(win, fail) {
               if (typeof win != "function") {
               console.log("listNetworks first parameter must be a function to handle list.");
               return;
               }
               cordova.exec(win, fail, 'WifiWizard', 'listNetworks', []);
               },
               
               /**
                *  Hands the list of scanned  networks to the `win` success callback function.
                * @param   opts optional json object of options
                * @param 	win	callback function that receives list of networks
                * @param 	fail	callback function if error
                * @return		a list of networks
                */
               getScanResults: function(options, win, fail) {
               if (typeof options === 'function') {
               fail = win;
               win = options;
               options = {};
               }
               
               if (typeof win != "function") {
               console.log("getScanResults first parameter must be a function to handle list.");
               return;
               }
               
               cordova.exec(win, fail, 'WifiWizard', 'getScanResults', [options]);
               },
               
               /**
                *  Start scanning wifi.
                * @param 	win	callback function
                * @param 	fail	callback function if error
                */
               startScan: function(win, fail) {
               if (typeof win != "function") {
               console.log("startScan first parameter must be a function to handle list.");
               return;
               }
               cordova.exec(win, fail, 'WifiWizard', 'startScan', []);
               },
               
               /**
                *  Disconnect current wifi.
                * @param 	win	callback function
                * @param 	fail	callback function if error
                */
               disconnect: function(win, fail) {
               if (typeof win != "function") {
               console.log("disconnect first parameter must be a function to handle list.");
               return;
               }
               cordova.exec(win, fail, 'WifiWizard', 'disconnect', []);
               },
               
               /**
                *  Gets the currently connected wifi SSID
                * @param 	win	callback function
                * @param 	fail	callback function if error
                */
               getCurrentSSID: function(win, fail) {
               if (typeof win != "function") {
               console.log("getCurrentSSID first parameter must be a function to handle SSID.");
               return;
               }
               cordova.exec(win, fail, 'WifiWizard', 'getConnectedSSID', []);
               },
               
               getCurrentBSSID: function(win, fail) {
               if (typeof win != "function") {
               console.log("getCurrentSSID first parameter must be a function to handle SSID.");
               return;
               }
               cordova.exec(win, fail, 'WifiWizard', 'getConnectedBSSID', []);
               },
               
               /**
                *  Gets 'true' or 'false' if WiFi is enabled or disabled
                * @param 	win	callback function
                * @param 	fail
                */
               isWifiEnabled: function(win, fail) {
               if (typeof win != "function") {
               console.log("isWifiEnabled first parameter must be a function to handle wifi status.");
               return;
               }
               cordova.exec(
                            // Cordova can only return strings to JS, and the underlying plugin
                            // sends a "1" for true and "0" for false.
                            function(result) {
                            win(result == "1");
                            },
                            fail, 'WifiWizard', 'isWifiEnabled', []
                            );
               },
               
               /**
                *  Gets '1' if WiFi is enabled
                * @param   enabled	callback function
                * @param 	win	callback function
                * @param 	fail	callback function if wifi is disabled
                */
               setWifiEnabled: function(enabled, win, fail) {
               if (typeof win != "function") {
               console.log("setWifiEnabled second parameter must be a function to handle enable result.");
               return;
               }
               cordova.exec(win, fail, 'WifiWizard', 'setWifiEnabled', [enabled]);
               }
               };
               
               module.exports = WifiWizard;
               
               });


cordova.define("com.telerik.plugins.nativepagetransitions.NativePageTransitions", function(require, exports, module) {
               
               function NativePageTransitions() {
               }
               
               NativePageTransitions.prototype.globalOptions =  {
               duration: 400,
               iosdelay: 60, // a number of milliseconds, or -1 (call executePendingTransition() when ready)
               androiddelay: 70, // a number of milliseconds, or -1 (call executePendingTransition() when ready)
               winphonedelay: 200,
               slowdownfactor: 4,
               fixedPixelsTop: 0,    // currently for slide left/right only
               fixedPixelsBottom: 0  // currently for slide left/right only
               };
               
               NativePageTransitions.prototype.executePendingTransition = function (onSuccess, onError) {
               cordova.exec(onSuccess, onError, "NativePageTransitions", "executePendingTransition", []);
               };
               
               NativePageTransitions.prototype.cancelPendingTransition = function (onSuccess, onError) {
               cordova.exec(onSuccess, onError, "NativePageTransitions", "cancelPendingTransition", []);
               };
               
               NativePageTransitions.prototype.slide = function (options, onSuccess, onError) {
               var opts = options || {};
               if (!this._validateHref(opts.href, onError)) {
               return;
               }
               opts.direction = opts.direction || "left";
               if (opts.duration == undefined || opts.duration == "null") {
               opts.duration = this.globalOptions.duration;
               }
               if (opts.androiddelay == undefined || opts.androiddelay == "null") {
               opts.androiddelay = this.globalOptions.androiddelay;
               }
               if (opts.iosdelay == undefined || opts.iosdelay == "null") {
               opts.iosdelay = this.globalOptions.iosdelay;
               }
               if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
               opts.winphonedelay = this.globalOptions.winphonedelay;
               }
               if (opts.fixedPixelsTop == undefined || opts.fixedPixelsTop == "null") {
               opts.fixedPixelsTop = this.globalOptions.fixedPixelsTop;
               }
               if (opts.fixedPixelsBottom == undefined || opts.fixedPixelsBottom == "null") {
               opts.fixedPixelsBottom = this.globalOptions.fixedPixelsBottom;
               }
               // setting slowdownfactor > 1 makes the next page slide less pixels. Use 1 for side-by-side.
               opts.slowdownfactor = opts.slowdownfactor || this.globalOptions.slowdownfactor;
               cordova.exec(onSuccess, onError, "NativePageTransitions", "slide", [opts]);
               };
               
               NativePageTransitions.prototype.drawer = function (options, onSuccess, onError) {
               var opts = options || {};
               if (!this._validateHref(opts.href, onError)) {
               return;
               }
               opts.origin = opts.origin || "left";
               opts.action = opts.action || "open";
               if (opts.duration == undefined || opts.duration == "null") {
               opts.duration = this.globalOptions.duration;
               }
               if (opts.androiddelay == undefined || opts.androiddelay == "null") {
               opts.androiddelay = this.globalOptions.androiddelay;
               }
               if (opts.iosdelay == undefined || opts.iosdelay == "null") {
               opts.iosdelay = this.globalOptions.iosdelay;
               }
               if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
               opts.winphonedelay = this.globalOptions.winphonedelay;
               }
               cordova.exec(onSuccess, onError, "NativePageTransitions", "drawer", [opts]);
               };
               
               NativePageTransitions.prototype.flip = function (options, onSuccess, onError) {
               var opts = options || {};
               if (!this._validateHref(opts.href, onError)) {
               return;
               }
               opts.direction = opts.direction || "right";
               if (opts.duration == undefined || opts.duration == "null") {
               opts.duration = this.globalOptions.duration;
               }
               if (opts.androiddelay == undefined || opts.androiddelay == "null") {
               opts.androiddelay = this.globalOptions.androiddelay;
               }
               if (opts.iosdelay == undefined || opts.iosdelay == "null") {
               opts.iosdelay = this.globalOptions.iosdelay;
               }
               if (opts.winphonedelay == undefined || opts.winphonedelay == "null") {
               opts.winphonedelay = this.globalOptions.winphonedelay;
               }
               cordova.exec(onSuccess, onError, "NativePageTransitions", "flip", [opts]);
               };
               
               NativePageTransitions.prototype.curl = function (options, onSuccess, onError) {
               var opts = options || {};
               if (!this._validateHref(opts.href, onError)) {
               return;
               }
               opts.direction = opts.direction || "up";
               if (opts.duration == undefined || opts.duration == "null") {
               opts.duration = this.globalOptions.duration;
               }
               if (opts.iosdelay == undefined || opts.iosdelay == "null") {
               opts.iosdelay = this.globalOptions.iosdelay;
               }
               cordova.exec(onSuccess, onError, "NativePageTransitions", "curl", [opts]);
               };
               
               NativePageTransitions.prototype.fade = function (options, onSuccess, onError) {
               var opts = options || {};
               if (!this._validateHref(opts.href, onError)) {
               return;
               }
               if (opts.duration == undefined || opts.duration == "null") {
               opts.duration = this.globalOptions.duration;
               }
               if (opts.androiddelay == undefined || opts.androiddelay == "null") {
               opts.androiddelay = this.globalOptions.androiddelay;
               }
               if (opts.iosdelay == undefined || opts.iosdelay == "null") {
               opts.iosdelay = this.globalOptions.iosdelay;
               }
               cordova.exec(onSuccess, onError, "NativePageTransitions", "fade", [opts]);
               };
               
               NativePageTransitions.prototype._validateHref = function (href, errCallback) {
               // if not contains www/ : dan zit je in een companion app..
               var hrf = window.location.href;
               var currentHref;
               if (hrf.indexOf('www/') == -1) {
               // hrf is something like file:///data/.../index.html
               currentHref = hrf.substr(hrf.lastIndexOf('/')+1);
               } else {
               currentHref = hrf.substr(hrf.indexOf('www/')+4);
               }
               // if no href was passed the transition should always kick in
               if (href) {
               // if only hash nav, do it in JS for Android
               // (I'm a little reluctant to depend on 'device' only for this: device.platform == "Android")
               if (href.indexOf('#') == 0 && navigator.userAgent.indexOf("Android") > -1) {
               // starts with a #, so check if the current one has a hash with the same value
               if (currentHref.indexOf('#') > -1) {
               var file = currentHref.substr(0, currentHref.indexOf('#'));
               if (hrf.indexOf('www/') == -1) {
               var to = hrf.substr(0, hrf.lastIndexOf('/')+1);
               window.location.href = to+file+href;
               } else {
               window.location.href = "/android_asset/www/"+file+ href;
               }
               } else {
               // the current page has no #, so simply attach the href to current url
               if (hrf.indexOf('#') > -1) {
               hrf = hrf.substring(0, hrf.indexOf('#'));
               }
               window.location = hrf += href;
               }
               }
               }
               if (currentHref == href) {
               if (errCallback) {
               errCallback("The passed href is the same as the current");
               } else {
               console.log("The passed href is the same as the current");
               }
               return false;
               }
               return true;
               };
               
               NativePageTransitions.install = function () {
               if (!window.plugins) {
               window.plugins = {};
               }
               
               window.plugins.nativepagetransitions = new NativePageTransitions();
               return window.plugins.nativepagetransitions;
               };
               
               cordova.addConstructor(NativePageTransitions.install);
               });
cordova.define("com.darktalker.cordova.screenshot.screenshot", function(require, exports, module) {
/*
 *  This code is adapted from the work of Michael Nachbaur
 *  by Simon Madine of The Angry Robot Zombie Factory
 *   - Converted to Cordova 1.6.1 by Josemando Sobral.
 *   - Converted to Cordova 2.0.0 by Simon MacDonald
 *  2012-07-03
 *  MIT licensed
 */
               var exec = require('cordova/exec'), formats = ['png','jpg'];
               module.exports = {
               save:function(callback,format,quality, filename) {
               format = (format || 'png').toLowerCase();
               filename = filename || 'screenshot_'+Math.round((+(new Date()) + Math.random()));
               if(formats.indexOf(format) === -1){
               return callback && callback(new Error('invalid format '+format));
               }
               quality = typeof(quality) !== 'number'?100:quality;
               exec(function(res){
                    callback && callback(null,res);
                    }, function(error){
                    callback && callback(error);
                    }, "Screenshot", "saveScreenshot", [format, quality, filename]);
               },
               
               URI:function(callback, quality){
               quality = typeof(quality) !== 'number'?100:quality;
               exec(function(res){
                    callback && callback(null, res);
                    }, function(error){
                    callback && callback(error);
                    }, "Screenshot", "getScreenshotAsURI", [quality]);
               
               }
               };
               
               });



cordova.define("cordova-plugin-badge.Badge", function(require, exports, module) {
/*
 * This file contains Original Code and/or Modifications of Original Code
 * as defined in and that are subject to the Apache License
 * Version 2.0 (the 'License'). You may not use this file except in
 * compliance with the License. Please obtain a copy of the License at
 * http://opensource.org/licenses/Apache-2.0/ and read it before using this
 * file.
 *
 * The Original Code and all software distributed under the License are
 * distributed on an 'AS IS' basis, WITHOUT WARRANTY OF ANY KIND, EITHER
 * EXPRESS OR IMPLIED, AND APPLE HEREBY DISCLAIMS ALL SUCH WARRANTIES,
 * INCLUDING WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT.
 * Please see the License for the specific language governing rights and
 * limitations under the License.
 */
               
               var exec      = require('cordova/exec'),
               channel   = require('cordova/channel'),
               ua        = navigator.userAgent.toLowerCase(),
               isIOS     = ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1,
               isMac     = ua.indexOf('macintosh') > -1,
               isWin     = window.Windows !== undefined,
               isAndroid = !isWin && ua.indexOf('android') > -1,
               isWinPC   = isWin && Windows.System.Profile.AnalyticsInfo.versionInfo.deviceFamily.includes('Desktop'),
               isDesktop = isMac || isWinPC;
               
               // Default settings
               exports._config = { indicator: 'badge', autoClear: false };
               
/**
 * Clears the badge number.
 *
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.clear = function (callback, scope) {
               this.exec('clear', null, callback, scope);
               };
               
/**
 * Sets the badge number.
 *
 * @param [ Int ]      badge    The new badge number.
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.set = function (badge, callback, scope) {
               var args = [parseInt(badge) || 0];
               
               this.requestPermission(function (granted) {
                                      if (granted) {
                                      this.exec('set', args, callback, scope);
                                      }
                                      }, this);
               };
               
/**
 * Gets the badge of the app icon.
 *
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.get = function (callback, scope) {
               this.exec('get', null, callback, scope);
               };
               
/**
 * Increases the badge number.
 *
 * @param [ Int ]      count    Number to add to the badge number.
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.increase = function (count, callback, scope) {
               this.get(function (badge) {
                        this.set(badge + (count || 1), callback, scope);
                        }, this);
               };
               
/**
 * Decreases the badge number.
 *
 * @param [ Int ]      count    Number to substract to the badge number.
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.decrease = function (count, callback, scope) {
               this.get(function (badge) {
                        this.set(Math.max(0, badge - (count || 1)), callback, scope);
                        }, this);
               };
               
/**
 * Check support to show badges.
 *
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.isSupported = function (callback, scope) {
               if (isAndroid) {
               this.exec('check', null, callback, scope);
               } else {
               this.createCallbackFn(callback, scope)(true);
               }
               };
               
/**
 * Check permission to show badges.
 *
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.hasPermission = function (callback, scope) {
               if (isIOS) {
               this.exec('check', null, callback, scope);
               } else {
               this.createCallbackFn(callback, scope)(true);
               }
               };
               
/**
 * Request permission to show badges.
 *
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.requestPermission = function (callback, scope) {
               if (isIOS) {
               this.exec('request', null, callback, scope);
               } else {
               this.createCallbackFn(callback, scope)(true);
               }
               };
               
/**
 * Configures the plugin's platform options.
 *
 * @param [ Hash ] object Optional config settings.
 *
 * @return [ Hash ] The merged config settings.
 */
               exports.configure = function (config) {
               this.mergeConfig(config);
               this.exec('save', this._config);
               
               return this._config;
               };
               
/**
 * Merge the config values with the current ones.
 *
 * @param [ Hash ] object Optional config settings.
 *
 * @return [ Hash ] The merged config settings.
 */
               exports.mergeConfig = function (config) {
               return Object.assign(this._config, config);
               };
               
/**
 * Create callback, which will be executed within a specific scope.
 *
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Function ] The new callback function
 */
               exports.createCallbackFn = function (callbackFn, scope) {
               if (typeof callbackFn != 'function')
               return;
               
               return function () {
               callbackFn.apply(scope || this, arguments);
               };
               };
               
/**
 * Clear the badge if autoClear is on and the indicator type is badge.
 *
 * @return [ Void ]
 */
               exports.clearIf = function () {
               if (this._config.autoClear && this._config.indicator == 'badge') {
               this.clear();
               }
               };
               
/**
 * Execute the native counterpart.
 *
 * @param [ String ] action     The name of the action to execute.
 * @param [ Array ]  args       Array of arguments to pass with.
 * @param [ Function ] callback The callback function to be execute later.
 * @param [ Function ] scope    Optional scope for the callback function.
 *
 * @return [ Void ]
 */
               exports.exec = function (action, args, callback, scope) {
               var fn     = this.createCallbackFn(callback, scope),
               params = [];
               
               if (Array.isArray(args)) {
               params = args;
               } else if (args) {
               params.push(args);
               }
               
               exec(fn, null, 'Badge', action, params);
               };
               
               // Clear badge on app start if autoClear is set to true
               channel.onCordovaReady.subscribe(function () {
                                                exports.exec('load', null, function (config) {
                                                             this.mergeConfig(config);
                                                             this.clearIf();
                                                             }, exports);
                                                });
               
               // Clear badge on app resume if autoClear is set to true
               channel.onResume.subscribe(function () {
                                          exports.clearIf();
                                          });
               
               // Clear badge on app resume if autoClear is set to true
               channel.onActivated.subscribe(function () {
                                             exports.clearIf();
                                             });
               
               if (isDesktop) {
               // Clear badge on app resume if autoClear is set to true
               document.addEventListener('visibilitychange', function () {
                                         if (!document.hidden) { exports.clearIf(); }
                                         }, false);
               
               // Clear badge on app resume if autoClear is set to true
               window.addEventListener('focus', function () {
                                       exports.clearIf();
                                       }, false);
               }
               
               // Polyfill for Object.assign
               if (typeof Object.assign != 'function') {
               Object.assign = function(target) {
               'use strict';
               if (target == null) {
               throw new TypeError('Cannot convert undefined or null to object');
               }
               
               target = Object(target);
               for (var index = 1; index < arguments.length; index++) {
               var source = arguments[index];
               if (source != null) {
               for (var key in source) {
               if (Object.prototype.hasOwnProperty.call(source, key)) {
               target[key] = source[key];
               }
               }
               }
               }
               return target;
               };
               }
               
               });
cordova.define("cordova-plugin-wkwebview-engine.ios-wkwebview", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var exec = require('cordova/exec');

var WkWebKit = {
    allowsBackForwardNavigationGestures: function (allow) {
        exec(null, null, 'CDVWKWebViewEngine', 'allowsBackForwardNavigationGestures', [allow]);
    }
};

module.exports = WkWebKit;

});
cordova.define("cordova-plugin-wkwebview-engine.ios-wkwebview-exec", function(require, exports, module) {
/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

/**
 * Creates the exec bridge used to notify the native code of
 * commands.
 */
var cordova = require('cordova');
var utils = require('cordova/utils');
var base64 = require('cordova/base64');

function massageArgsJsToNative (args) {
    if (!args || utils.typeName(args) !== 'Array') {
        return args;
    }
    var ret = [];
    args.forEach(function (arg, i) {
        if (utils.typeName(arg) === 'ArrayBuffer') {
            ret.push({
                'CDVType': 'ArrayBuffer',
                'data': base64.fromArrayBuffer(arg)
            });
        } else {
            ret.push(arg);
        }
    });
    return ret;
}

function massageMessageNativeToJs (message) {
    if (message.CDVType === 'ArrayBuffer') {
        var stringToArrayBuffer = function (str) {
            var ret = new Uint8Array(str.length);
            for (var i = 0; i < str.length; i++) {
                ret[i] = str.charCodeAt(i);
            }
            return ret.buffer;
        };
        var base64ToArrayBuffer = function (b64) {
            return stringToArrayBuffer(atob(b64)); // eslint-disable-line no-undef
        };
        message = base64ToArrayBuffer(message.data);
    }
    return message;
}

function convertMessageToArgsNativeToJs (message) {
    var args = [];
    if (!message || !message.hasOwnProperty('CDVType')) {
        args.push(message);
    } else if (message.CDVType === 'MultiPart') {
        message.messages.forEach(function (e) {
            args.push(massageMessageNativeToJs(e));
        });
    } else {
        args.push(massageMessageNativeToJs(message));
    }
    return args;
}

var iOSExec = function () {
    // detect change in bridge, if there is a change, we forward to new bridge

    // if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cordova && window.webkit.messageHandlers.cordova.postMessage) {
    //     bridgeMode = jsToNativeModes.WK_WEBVIEW_BINDING;
    // }

    var successCallback, failCallback, service, action, actionArgs;
    var callbackId = null;
    if (typeof arguments[0] !== 'string') {
        // FORMAT ONE
        successCallback = arguments[0];
        failCallback = arguments[1];
        service = arguments[2];
        action = arguments[3];
        actionArgs = arguments[4];

        // Since we need to maintain backwards compatibility, we have to pass
        // an invalid callbackId even if no callback was provided since plugins
        // will be expecting it. The Cordova.exec() implementation allocates
        // an invalid callbackId and passes it even if no callbacks were given.
        callbackId = 'INVALID';
    } else {
           throw new Error('The old format of this exec call has been removed (deprecated since 2.1). Change to: ' + // eslint-disable-line
            'cordova.exec(null, null, \'Service\', \'action\', [ arg1, arg2 ]);');
    }

    // If actionArgs is not provided, default to an empty array
    actionArgs = actionArgs || [];

    // Register the callbacks and add the callbackId to the positional
    // arguments if given.
    if (successCallback || failCallback) {
        callbackId = service + cordova.callbackId++;
        cordova.callbacks[callbackId] =
            {success: successCallback, fail: failCallback};
    }

    actionArgs = massageArgsJsToNative(actionArgs);

    // CB-10133 DataClone DOM Exception 25 guard (fast function remover)
    var command = [callbackId, service, action, JSON.parse(JSON.stringify(actionArgs))];
    window.webkit.messageHandlers.cordova.postMessage(command);
};

iOSExec.nativeCallback = function (callbackId, status, message, keepCallback, debug) {
    var success = status === 0 || status === 1;
    var args = convertMessageToArgsNativeToJs(message);
    Promise.resolve().then(function () {
        cordova.callbackFromNative(callbackId, success, status, args, keepCallback); // eslint-disable-line
    });
};

// for backwards compatibility
iOSExec.nativeEvalAndFetch = function (func) {
    try {
        func();
    } catch (e) {
        console.log(e);
    }
};

// Proxy the exec for bridge changes. See CB-10106

function cordovaExec () {
    var cexec = require('cordova/exec');
    var cexec_valid = (typeof cexec.nativeFetchMessages === 'function') && (typeof cexec.nativeEvalAndFetch === 'function') && (typeof cexec.nativeCallback === 'function');
    return (cexec_valid && execProxy !== cexec) ? cexec : iOSExec;
}

function execProxy () {
    cordovaExec().apply(null, arguments);
}

execProxy.nativeFetchMessages = function () {
    return cordovaExec().nativeFetchMessages.apply(null, arguments);
};

execProxy.nativeEvalAndFetch = function () {
    return cordovaExec().nativeEvalAndFetch.apply(null, arguments);
};

execProxy.nativeCallback = function () {
    return cordovaExec().nativeCallback.apply(null, arguments);
};

module.exports = execProxy;

if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.cordova && window.webkit.messageHandlers.cordova.postMessage) {
    // unregister the old bridge
    cordova.define.remove('cordova/exec');
    // redefine bridge to our new bridge
    cordova.define('cordova/exec', function (require, exports, module) {
        module.exports = execProxy;
    });
}

});


