	function launchBrowser() {
            alert((window.plugins.childBrowser != undefined) + " should be true")
            window.plugins.childBrowser.showWebPage('http://www.phonegap.com',
            { showLocationBar: true });
        }
    function showPage(sort) 
    {
    	if(sort == "start")
    	{
    		 window.localStorage.setItem("url", localStorage['startpage']);
            
        }
       // var url = window.localStorage.getItem("url");
		//window.plugins.childBrowser.showWebPage("file:///android_asset/www/Loading/Loading.html",
        //{ showLocationBar: false }); 
  		  //    alert(window.localStorage.getItem("url"));
  		  var myframe = document.getElementById("webFrame");
   		if(myframe !== null)
		{
  		  if(myframe.src){
   		  myframe.src = "Loading/Loading.html"; }
   		  else if(myframe.contentWindow !== null && myframe.contentWindow.location !== null){
          myframe.contentWindow.location = "Loading.html"; }
    		else{ myframe.setAttribute('src', "Loading/Loading.html"); }
		}		
  	//	  window.frames['webFrame'].document.location.href = "http://google.nl";

	}
       //
    
    function loadSeneca()
	{
		window.localStorage.setItem("url", "http://ixpdev.smartsite.seneca.intern/Mgr/Add-Item");
		showPage("other");
	}
	function addItem()
	{
		window.localStorage.setItem("url", "http://ixpdev.smartsite.seneca.intern/Mgr/Add-Item");
		showPage("other");
	}
	function editItem()
	{
		window.localStorage.setItem("url", "http://ixpdev.smartsite.seneca.intern/Mgr/Add-Item");
		showPage("other");
	}
	function loadExtern()
	{
		window.localStorage.setItem("url", "http://ixpdev.smartsite.seneca.intern/Mgr/Add-Item");
		showPage("other");
	}
	function loadExternalBrowser()
	{
		window.localStorage.setItem("url", "http://ixpdev.smartsite.seneca.intern/Mgr/Add-Item");
		showPage("other");
	}
	function loadStartpage()
	{
		if(localStorage['startpage'] == null || localStorage['startpage'] == "")
		{
			saveURL()
			loadStartpage()
		}
		else{
			showPage("start");
		}
	}
	function openProfile()
	{
		localStorage['urlother'] = 'http://ixpdev.smartsite.seneca.intern/Mgr/ManagerProfile' ;
		showPage("other");
	}
	
	
   function saveURL()
   {
   	var url=prompt("Give url for the startpage","http://www.");
   	var subsurl = url.substr(0,4)
	if (url!=null && url!="")
  	{
  		alert(subsurl);
  		if(subsurl != "http")
  		{
  			url = "http://" + url;
  		}
  		localStorage['startpage'] = url;
  	}
  	else{
  		alert("enter something");
  	} 
   }var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;
};

var getLocation = function() {
    var suc = function(p) {
        var cords = p.coords.latitude + " " + p.coords.longitude ;
        locationPhoto.src = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + p.coords.latitude+ ',' + p.coords.longitude +  
                    "&zoom=14&size=300x400&markers=color:blue|label:S|" + p.coords.latitude + ',' + p.coords.longitude;  
                    
   //     localStorage['urlother'] = image_url;
 //  		showPage("other");
        
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

var watchID = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

function toggleCompass() {
    if (watchID !== null) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        updateHeading({ magneticHeading : "Off"});
    } else 
    {        
        var options = { frequency: 1000 
        	};
        watchID = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}


function showPhotoView()
{
	document.getElementById('webpagina').style.display='none';
	document.getElementById('photoview').style.display='block';
	document.getElementById('options').style.display='none';
}
function backCamera()
{
	document.getElementById('webpagina').style.display='block';
	document.getElementById('photoview').style.display='none';
	document.getElementById('options').style.display='none';
}
function openOptions()
{
	if(document.getElementById('options').style.display == 'block')
	{
		document.getElementById('webpagina').style.display='block';
		document.getElementById('options').style.display='none';
		document.getElementById('photoview').style.display='none';
	}
	else
	{
		document.getElementById('webpagina').style.display='none';
		document.getElementById('photoview').style.display='none';
		document.getElementById('options').style.display='block';
	}
}
function capturePhoto()
{
navigator.camera.getPicture(uploadPhoto,null,{sourceType:1,quality:60});
}

function uploadPhoto(imageURI) 
	{
			cameraPic.src = imageURI;
			
			var answer = confirm ("Upload the picture?")
			if (answer)
			{
				var options = new FileUploadOptions();
	            options.fileKey="files";
	            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	            options.chunkedMode = false;
	            options.mimeType="image/jpeg";
	            
	 
	            var params = new Object();
	            params.value1 = "test";
	            params.value2 = "param";
	 
	            options.params = params;
	            options.chunkedMode = false;
	 
	            var ft = new FileTransfer();
	            ft.upload(imageURI, "http://ixpdev.smartsite.seneca.intern/Pub/TestUpload", win, fail, options);	
			}
			else
			{
				alert ("Picture upload cancelled by user");
			}
            
	}
function win(r) 
		{
        	console.log("Code = " + r.responseCode);
			console.log("Response = " + r.response);
			console.log("Sent = " + r.bytesSent);
            alert(r.response);
        }


function win(r) { 
     	     //console.log("Code = " + r.responseCode); 
            //console.log("Response = " + r.response); 
			alert("Image uploaded");
        } 
    
function fail(error) { 
            alert("An error has occurred: Code = " + error.code); 
        }
        
       
function getSrc(obj) 
{
	return obj.src;
}
function initPage()
{
	document.getElementById('btnCount').click();
	redirect();

	}
function redirect () 
{ 
	setTimeout("go_now()",400); 
}
function go_now ()   
{ 
	var url = window.localStorage.getItem("url");
	 window.location = url;
//	var myframe = document.getElementById("webFrame");
  // 		if(myframe !== null)
//		{
  //		  if(myframe.src){
   //		  myframe.src = "http://tweakers.net;" }
   //		  else if(myframe.contentWindow !== null && myframe.contentWindow.location !== null){
   //       myframe.contentWindow.location = "http://tweakers.net"; }
   // 		else{ myframe.setAttribute("http://tweakers.net", url); }
	//	}	

	//	window.plugins.childBrowser.showWebPage(url,
   //   { showLocationBar: false }); 

}
function noStay()
{
	var url = window.localStorage.getItem("url");
		window.plugins.childBrowser.showWebPage(url,
        { showLocationBar: false }); 
}
function yesBack()
{
	window.location.href="file:///android_asset/www/index.html";
}
