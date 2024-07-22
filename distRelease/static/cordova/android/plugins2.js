cordova.define('cordova/plugin_list', function (require, exports, module) {
    module.exports = [
    {
          "file": "plugins/merge_android.js",
          "id": "cordova-plugin-device.device",
          "clobbers": [
            "device"
          ]
        },
        {
          "file": "plugins/merge_android.js",
          "id": "cordova-plugin-splashscreen.SplashScreen",
          "clobbers": [
            "navigator.splashscreen",
            "xsfSplashscreen"
          ]
        },
        {
          "id": "dreambox-sharedPreferences",
          "file": "plugins/merge_android.js",
          "pluginId": "dreambox-sharedPreferences",
          "clobbers": [
            "$sharedPreferences"
          ]
        },
        {
         "file": "plugins/merge_android.js",
          "id": "org.binarypark.cordova.plugins.version.getAppVersion",
          "clobbers": [
            "cordova.plugins.version"
          ]
        },

        //以上默认应用插件----------------------------------------------


        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-file.FileUploadOptions",
            "clobbers": [
                "window.FileUploadOptions"
            ]
        },


        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-file.fileSystems"
        },
        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-file.requestFileSystem",
            "clobbers": [
                "window.requestFileSystem"
            ]
        },
        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-file.resolveLocalFileSystemURI",
            "merges": [
                "window"
            ]
        },
        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-file.androidFileSystem",
            "merges": [
                "FileSystem"
            ]
        },
        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-file.fileSystems-roots",
            "runs": true
        },
        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-file.fileSystemPaths",
            "merges": [
                "cordova"
            ],
            "runs": true
        },


        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-inappbrowser.inappbrowser",
            "clobbers": [
                "cordova.InAppBrowser.open",
                "window.open"
            ]
        },

        {
            "file": "plugins/merge_android.js",
            "id": "cordova-plugin-camera.camera",
            "clobbers": [
                "navigator.camera",
                "xsfCamera"
            ]
        },


        {
            "file": "plugins/merge_android.js",
            "id": "xsf.window",
            "merges": ["xsfWindow"]
        },
        {
            "file": "plugins/merge_android.js",
            "id": "xsf.wps",
            "clobbers": ["xsfWPS", "$WPS"]
        },


        {
            "id": "restart-main-plugin",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "xsfRestart"
            ]
        },

        {
            "id": "time-main-plugin",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "xsfTime"
            ]
        },
        {
            "id": "take-picture-plugin",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "xsfTakePicture"
            ]

        },

        {
            "id": "xsf.jPush",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "JPush"
            ]
        },

        {
            "id": "netSchool",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "NetSchoolPlugin"
            ]
        },

        {
            "id": "umshare",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "UMSharePlugin"
            ]
        },
        {
            "id": "DownloadPlugin",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "DownloadPlugin"
            ]
        },
        {
            "id": "ScreenOrientationPlugin",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "ScreenOrientationPlugin"
            ]
        },
        {
            "id": "OpenPlugin",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "OpenPlugin"
            ]
        },

        {
            "id": "trusfort-main-plugin",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "xsfTrusfort"
            ]
        },
        {
            "id": "common-main-plugin",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "xsfCommon"
            ]
        },
        {
            "file": "plugins/merge_android.js",
            "id": "YOZOPlugin",
            "merges": [
                "YOZOPlugin"
            ]
        },

        {
            "id": "dreambox-mfile",
            "file": "plugins/merge_android.js",
            "pluginId": "dreambox-mfile",
            "clobbers": [
                "$MFile"
            ]
        },
        {
            "id": "dreambox-iaction",
            "file": "plugins/merge_android.js",
            "pluginId": "dreambox-iaction",
            "clobbers": [
                "$iaction"
            ]
        },
        {
            "id": "dreambox-BaiduLocation",
            "file": "plugins/merge_android.js",
            "pluginId": "dreambox-BaiduLocation",
            "clobbers": [
                "$BaiduLocation"
            ]
        },
        {
            "id": "xsf.IFlytekSpeechRecognition",
            "file": "plugins/merge_android.js",
            "clobbers": [
                "IFlytekSpeechRecognition"
            ]
        },
        {
            "file": "plugins/merge_android.js",
            "id": "dreambox-tna",
            "clobbers": [
                "$TNA"
            ]
        }
    ];
    module.exports.metadata =
        // TOP OF METADATA
        {
            "cordova-plugin-crosswalk-webview": "1.7.0",
            "cordova-plugin-splashscreen": "3.2.2",
            "cordova-plugin-compat": "1.0.0",
            "cordova-plugin-file": "4.3.0",
            "cordova-plugin-file-transfer": "1.5.1",
            "cordova-plugin-device": "1.1.2",
            "cordova-plugin-dialogs": "1.2.1",
            "cordova-plugin-inappbrowser": "1.4.0",
            "cordova-plugin-appversion": "1.0.0",
            "cordova-plugin-camera": "2.2.0",
            "cordova-plugin-x-toast": "2.5.1",
            "cordova-plugin-actionsheet": "2.2.2",
            "cordova-plugin-background-mode": "0.6.5",
            "phonegap-plugin-barcodescanner": "5.0.0",
            "org.binarypark.cordova.plugins.version": "0.2.3",
            "cordova-plugin-app-event": "1.2.0",
            "de.appplant.cordova.plugin.local-notification": "0.8.4",
            "cordova-plugin-app-version": "0.1.8",
            "cordova-plugin-appavailability": "0.4.2",
            "cordova-open": "1.0.9",
            "cordova-plugin-whitelist": "1.3.0",
            "cordova-plugin-console": "1.0.4",
            "cordova-plugin-device-orientation": "1.0.4",

        };
    // BOTTOM OF METADATA
});