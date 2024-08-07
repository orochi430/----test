cordova.define('cordova/plugin_list', function (require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-battery-status.battery",
      "pluginId": "cordova-plugin-battery-status",
      "clobbers": [
        "navigator.battery"
      ]
    },
    {
      "id": "cordova-plugin-wkwebview-engine.ios-wkwebview-exec",
      "pluginId": "cordova-plugin-wkwebview-engine",
      "clobbers": [
        "cordova.exec"
      ]
    },
    {
      "id": "cordova-plugin-wkwebview-engine.ios-wkwebview",
      "pluginId": "cordova-plugin-wkwebview-engine",
      "clobbers": [
        "window.WkWebView"
      ]
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera",
        "xsfCamera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-contacts.contacts",
      "pluginId": "cordova-plugin-contacts",
      "clobbers": [
        "navigator.contacts",
        "xsfContacts"
      ]
    },
    {
      "id": "cordova-plugin-contacts.Contact",
      "pluginId": "cordova-plugin-contacts",
      "clobbers": [
        "Contact"
      ]
    },
    {
      "id": "cordova-plugin-contacts.convertUtils",
      "pluginId": "cordova-plugin-contacts"
    },
    {
      "id": "cordova-plugin-contacts.ContactAddress",
      "pluginId": "cordova-plugin-contacts",
      "clobbers": [
        "ContactAddress"
      ]
    },
    {
      "id": "cordova-plugin-contacts.ContactError",
      "pluginId": "cordova-plugin-contacts",
      "clobbers": [
        "ContactError"
      ]
    },
    {
      "id": "cordova-plugin-contacts.ContactField",
      "pluginId": "cordova-plugin-contacts",
      "clobbers": [
        "ContactField"
      ]
    },
    {
      "id": "cordova-plugin-contacts.ContactFindOptions",
      "pluginId": "cordova-plugin-contacts",
      "clobbers": [
        "ContactFindOptions"
      ]
    },
    {
      "id": "cordova-plugin-contacts.ContactName",
      "pluginId": "cordova-plugin-contacts",
      "clobbers": [
        "ContactName"
      ]
    },
    {
      "id": "cordova-plugin-contacts.ContactOrganization",
      "pluginId": "cordova-plugin-contacts",
      "clobbers": [
        "ContactOrganization"
      ]
    },
    {
      "id": "cordova-plugin-contacts.ContactFieldType",
      "pluginId": "cordova-plugin-contacts",
      "merges": [
        ""
      ]
    },
    {
      "id": "cordova-plugin-contacts.contacts-ios",
      "pluginId": "cordova-plugin-contacts",
      "merges": [
        "navigator.contacts"
      ]
    },
    {
      "id": "cordova-plugin-contacts.Contact-iOS",
      "pluginId": "cordova-plugin-contacts",
      "merges": [
        "Contact"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-console.console",

      "pluginId": "cordova-plugin-console",
      "clobbers": [
        "console"
      ]
    },
    {
      "id": "cordova-plugin-console.logger",

      "pluginId": "cordova-plugin-console",
      "clobbers": [
        "cordova.logger"
      ]
    },
    {
      "id": "cordova-plugin-device-motion.Acceleration",

      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "Acceleration"
      ]
    },
    {
      "id": "cordova-plugin-device-motion.accelerometer",

      "pluginId": "cordova-plugin-device-motion",
      "clobbers": [
        "navigator.accelerometer"
      ]
    },
    {
      "id": "cordova-plugin-device-orientation.CompassError",

      "pluginId": "cordova-plugin-device-orientation",
      "clobbers": [
        "CompassError"
      ]
    },
    {
      "id": "cordova-plugin-device-orientation.CompassHeading",

      "pluginId": "cordova-plugin-device-orientation",
      "clobbers": [
        "CompassHeading"
      ]
    },
    {
      "id": "cordova-plugin-device-orientation.compass",

      "pluginId": "cordova-plugin-device-orientation",
      "clobbers": [
        "navigator.compass"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-file.DirectoryEntry",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.DirectoryReader",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.DirectoryReader"
      ]
    },
    {
      "id": "cordova-plugin-file.Entry",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Entry"
      ]
    },
    {
      "id": "cordova-plugin-file.File",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.File"
      ]
    },
    {
      "id": "cordova-plugin-file.FileEntry",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileEntry"
      ]
    },
    {
      "id": "cordova-plugin-file.FileError",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileError"
      ]
    },
    {
      "id": "cordova-plugin-file.FileReader",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileReader"
      ]
    },
    {
      "id": "cordova-plugin-file.FileSystem",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadOptions",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadOptions"
      ]
    },
    {
      "id": "cordova-plugin-file.FileUploadResult",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileUploadResult"
      ]
    },
    {
      "id": "cordova-plugin-file.FileWriter",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.FileWriter"
      ]
    },
    {
      "id": "cordova-plugin-file.Flags",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Flags"
      ]
    },
    {
      "id": "cordova-plugin-file.LocalFileSystem",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.LocalFileSystem"
      ],
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.Metadata",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.Metadata"
      ]
    },
    {
      "id": "cordova-plugin-file.ProgressEvent",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.ProgressEvent"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems",
      "pluginId": "cordova-plugin-file"
    },
    {
      "id": "cordova-plugin-file.requestFileSystem",
      "pluginId": "cordova-plugin-file",
      "clobbers": [
        "window.requestFileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.resolveLocalFileSystemURI",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "window"
      ]
    },
    {
      "id": "cordova-plugin-file.isChrome",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.iosFileSystem",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "FileSystem"
      ]
    },
    {
      "id": "cordova-plugin-file.fileSystems-roots",
      "pluginId": "cordova-plugin-file",
      "runs": true
    },
    {
      "id": "cordova-plugin-file.fileSystemPaths",
      "pluginId": "cordova-plugin-file",
      "merges": [
        "cordova"
      ],
      "runs": true
    },
    {
      "id": "cordova-plugin-file-transfer.FileTransferError",
      "pluginId": "cordova-plugin-file-transfer",
      "clobbers": [
        "window.FileTransferError"
      ]
    },
    {
      "id": "cordova-plugin-file-transfer.FileTransfer",
      "pluginId": "cordova-plugin-file-transfer",
      "clobbers": [
        "window.FileTransfer",
        "xsf.FileTransfer"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.Coordinates",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "Coordinates"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.PositionError",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "PositionError"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.Position",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "Position"
      ]
    },
    {
      "id": "cordova-plugin-geolocation.geolocation",
      "pluginId": "cordova-plugin-geolocation",
      "clobbers": [
        "navigator.geolocation"
      ]
    },
    {
      "id": "cordova-plugin-globalization.GlobalizationError",

      "pluginId": "cordova-plugin-globalization",
      "clobbers": [
        "window.GlobalizationError"
      ]
    },
    {
      "id": "cordova-plugin-globalization.globalization",

      "pluginId": "cordova-plugin-globalization",
      "clobbers": [
        "navigator.globalization"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open",
        "window.open"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.CaptureAudioOptions",

      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "CaptureAudioOptions"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.CaptureImageOptions",

      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "CaptureImageOptions"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.CaptureVideoOptions",

      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "CaptureVideoOptions"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.CaptureError",

      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "CaptureError"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.MediaFileData",

      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "MediaFileData"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.MediaFile",

      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "MediaFile"
      ]
    },
    {
      "id": "cordova-plugin-media-capture.capture",

      "pluginId": "cordova-plugin-media-capture",
      "clobbers": [
        "navigator.device.capture"
      ]
    },
    {
      "id": "cordova-plugin-network-information.network",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection",
        "navigator.network.connection",
        "xsfConnection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-vibration.notification",

      "pluginId": "cordova-plugin-vibration",
      "merges": [
        "navigator.notification",
        "navigator"
      ]
    },
    {
      "id": "cordova-plugin-statusbar.statusbar",

      "pluginId": "cordova-plugin-statusbar",
      "clobbers": [
        "window.StatusBar"
      ]
    },
    {
      "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
      "pluginId": "phonegap-plugin-barcodescanner",
      "clobbers": [
        "cordova.plugins.barcodeScanner",
        "xsfBarcode"
      ]
    },
    {
      "id": "cordova-plugin-media.MediaError",

      "pluginId": "cordova-plugin-media",
      "clobbers": [
        "window.MediaError"
      ]
    },
    {
      "id": "cordova-plugin-media.Media",

      "pluginId": "cordova-plugin-media",
      "clobbers": [
        "window.Media"

      ]
    },
    {
      "id": "xsf.media",
      "pluginId": "xsf.media",
      "clobbers": [
        "xsfMedia"
      ]
    },
    {
      "id": "xsf.record",
      "pluginId": "xsf.record",
      "clobbers": [
        "xsfRecord"
      ]
    },
    {
      "id": "xsf.chat",
      "merges": ["xsfChat"]
    },
    {
      "id": "nl.xservices.plugins.toast",
      "merges": ["window.plugins.toast", "xsfToast"]
    },
    {
      "id": "xsf",
      "clobbers": ["xsf", "box"]
    },
    {
      "id": "xsf.http",
      "merges": ["xsfHttp"]
    },
    {
      "id": "com.phonegap.plugins.fileopener.FileOpener",
      "clobbers": [
        "window.plugins.fileOpener",
        "xsfFileOpener"
      ]
    },
    {
      "id": "xsf.pushmessage",
      "merges": ["xsfPushMessage"]
    },
    {
      "id": "xsf.recognition",
      "merges": ["xsfRecognition"]
    },
    {
      "id": "xsf.securitySettings",
      "merges": ["xsfSecuritySettings"]
    },
    {
      "id": "org.pgsqlite.SQLitePlugin",
      "merges": ["xsfSqlite"]
    },
    {
      "id": "xsf.store",
      "merges": ["xsfStore"]
    },
    {
      "id": "xsf.mobile",
      "merges": ["xsfMobile"]
    },
    {
      "id": "xsf.window",
      "merges": ["xsfWindow"]
    },
    {
      "id": "xsf.wps",
      "clobbers": ["xsfWPS"]
    },
    {
      "id": "xsf.zip",
      "merges": ["xsfZip"]
    }, {
      "id": "com.pylonproducts.wifiwizard.WifiWizard",
      "pluginId": "com.pylonproducts.wifiwizard",
      "clobbers": ["window.WifiWizard"]
    },
    {

      "id": "com.telerik.plugins.nativepagetransitions.NativePageTransitions",
      "pluginId": "com.telerik.plugins.nativepagetransitions",
      "clobbers": ["window.plugins.nativepagetransitions"]
    },
    {
      "id": "com.darktalker.cordova.screenshot.screenshot",

      "pluginId": "com.darktalker.cordova.screenshot",
      "merges": ["navigator.screenshot"]
    },
    {

      "id": "cordova-plugin-badge.Badge",
      "pluginId": "cordova-plugin-badge",
      "clobbers": [
        "cordova.plugins.notification.badge"
      ]
    },
    {
      "id": "inAppPurchase",
      "pluginId": "inAppPurchase",
      "clobbers": ["Purchase"]
    },
    {
      "id": "xsf.chartutility",
      "merges": ["xsfChartUtility"]
    },
    {
      "id": "xsf.umshare",
      "merges": ["xsfUmSahre"]
    },
    {
      "id": "xsf.uusafelogin",
      "merges": ["xsfUuSafeLogin", "xsfCommon"]
    },
    {
      "id": "xsf.imagedownloadandsave",
      "merges": ["xsfImageDownloadAndSave"]
    },
    {
      "id": "xsf.sharedPreferences",
      "merges": ["xsfSharedPreferences"]
    },
    {
      "id": "xsf.zjdownloadFile",
      "merges": ["xsfZJDownloadFile"]
    },
    {
      "id": "CustomeCamera",
      "pluginId": "CustomeCamera",
      "clobbers": [
        "CFCamera"
      ]
    },

    {
      "id": "xsf.showWelcome",
      "pluginId": "xsf.showWelcome",
      "clobbers": [
        "xsfShowWelcome"
      ]
    },
    {
      "id": "ThirdAppOpen",
      "pluginId": "ThirdAppOpen",
      "clobbers": [
        "xsfThirdApp"
      ]
    },
    {
      "id": "DDLocation",
      "pluginId": "DDLocation",
      "clobbers": [
        "xsfDDLocationPlugin"
      ]
    },
    {
      "id": "JPush",
      "pluginId": "JPush",
      "clobbers": [
        "xsfJPush",
        "JPush"
      ]
    },
    {
      "id": "ionic-plugin-keyboard.keyboard",
      "pluginId": "ionic-plugin-keyboard",
      "clobbers": [
        "cordova.plugins.Keyboard"
      ],
      "runs": true
    },
    {
      "id": "dreambox-BaiduLocation",
      "pluginId": "dreambox-BaiduLocation",
      "clobbers": [
        "$BaiduLocation"
      ]
    },
    {
      "id": "OpenPlugin",
      "pluginId": "OpenPlugin",
      "clobbers": [
        "OpenPlugin"
      ]
    },
    {
      "id": "dreambox-version",
      "file": "plugins/dreambox-version/version.js",
      "pluginId": "dreambox-version",
      "clobbers": [
        "$Version"
      ]
    },
    {
      "id": "dreambox-NetSchoolJump",
      "pluginId": "dreambox-NetSchoolJump",
      "clobbers": [
        "NetSchoolPlugin", "$iaction"
      ]
    }
  ];
  module.exports.metadata =
  // TOP OF METADATA
  {
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-battery-status": "1.1.2",
    "cordova-plugin-compat": "1.0.0",
    "cordova-plugin-camera": "2.2.0",
    "cordova-plugin-contacts": "2.1.0",
    "cordova-plugin-device": "1.1.2",
    "cordova-plugin-console": "1.0.3",
    "cordova-plugin-device-motion": "1.2.1",
    "cordova-plugin-device-orientation": "1.0.3",
    "cordova-plugin-dialogs": "1.2.1",
    "cordova-plugin-file": "4.2.0",
    "cordova-plugin-file-transfer": "1.5.1",
    "cordova-plugin-geolocation": "2.2.0",
    "cordova-plugin-globalization": "1.0.3",
    "cordova-plugin-inappbrowser": "1.4.0",
    "cordova-plugin-media-capture": "1.3.0",
    "cordova-plugin-network-information": "1.2.1",
    "cordova-plugin-splashscreen": "3.2.2",
    "cordova-plugin-vibration": "2.1.1",
    "cordova-plugin-statusbar": "2.1.3",
    "cordova-plugin-legacy-whitelist": "1.1.1",
    "phonegap-plugin-barcodescanner": "6.0.1",
    "cordova-plugin-media": "2.3.0",
    "com.pylonproducts.wifiwizard": "0.2.11",
    "com.telerik.plugins.nativepagetransitions": "0.6.5",
    "com.darktalker.cordova.screenshot": "0.1.5"
  };
  // BOTTOM OF METADATA
});
