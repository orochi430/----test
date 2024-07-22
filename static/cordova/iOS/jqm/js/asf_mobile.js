function scanDevice() {
	barcodescanner.scan(
      function (result) {
    	  if(result && result.text){
    		  $("#scanId").val(result.text);
    	  }
      }, 
      function (error) {
          alert("失败: " + error);
      }
   );
	//
}

var pictureSource;
var destinationType;
document.addEventListener("deviceready",onDeviceReady,false);
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
}
function onPhotoDataSuccess(imageData) {
  var smallImage = document.getElementById('smallImage');
  smallImage.style.display = 'block';
  smallImage.src = "data:image/jpeg;base64," + imageData;
  $("#cameraId").val("data:image/jpeg;base64," + imageData);
}
function onPhotoURISuccess(imageURI) {
  var largeImage = document.getElementById('largeImage');
  largeImage.style.display = 'block';
  largeImage.src = imageURI;
  $("#cameraId").val(imageURI);
}
function capturePhoto() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
  destinationType: destinationType.DATA_URL });
}
function capturePhotoEdit() {
  navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
  destinationType: destinationType.DATA_URL });
}
function getPhoto(source) {
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}
function onFail(message) {
  alert('失败: ' + message);
}

function getPosition(e) {
	asf.getLocation(onSuccess,onFail);
	//navigator.geolocation.getCurrentPosition(onSuccess, onFail);
}
function onSuccess(location) {
	//用百度地图获取逆地理编码。
	var url = "http://api.map.baidu.com/geocoder/v2/?ak=3gqRCzNgHHe1uMHGkrYzfv0o&location="+location+"&output=json&coordtype=wgs84ll&callback=?";
	$.getJSON(url , function(data) {
		if(data && data.status === 0 && data.result){
			$('#GPSId').val(data.result.formatted_address);
		}else{
			alert("获取位置失败" + location);
		}
	}); 	
/*	//alert(location);
	$('#GPSId').val(location);
	 $.getJSON("http://maps.google.com/maps/api/geocode/json?latlng=" +  location  + "&language=zh-CN&sensor=false" , function(data) {
		//alert(data);
		 if(data.results && data.results.length>0){
			//alert(data.results[0].formatted_address);
			 $('#GPSId').val(data.results[0].formatted_address);
		}
	}); */
}