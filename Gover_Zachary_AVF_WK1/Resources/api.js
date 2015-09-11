var dbFile = require("db");

var getGeo = function() {
	// Retreive the users current location
	if (Ti.Platform.osname === "android") {
		var lat = 37.776289;
		var lng = -122.395234;
		apiConnection(lat, lng);
	} else {
		Ti.Geolocation.getCurrentPosition(function(e) {
			if (!e.success || e.error) {
				console.log(e.error);
				alert("Sorry there was an error getting your current location.");
				dbFile.read();
			} else {
				var lat = e.coords.latitude;
				var lng = e.coords.longitude;
				apiConnection(lat, lng);
			}
		});
	}
};

var apiConnection = function (lat, lng) {
	// Connect to the Wunderground API and store the needed objects
	Ti.API.info("apiConnection");
	var url = "http://api.wunderground.com/api/1ca3f32c8865e443/geolookup/conditions/alerts/forecast/hourly/q/" + lat + "," + lng + ".json";
	var xhrRequest = Ti.Network.createHTTPClient ({
		onload : function(e) {
			var json = JSON.parse(this.responseText);
			for (i=0; i < json.alerts.length; i++) {
				var alertDesc = json.alerts[i].description;
				var alertMsg = json.alerts[i].message;
			}
			var response = {
				// Weather data
				"ctry"		: json.location.country,
				"state"		: json.location.state,
				"city"		: json.location.city,
				"zip"		: json.location.zip,
				"wthrImg"	: json.current_observation.icon_url,
				"wthr"		: json.current_observation.weather,
				"temp"		: Math.round(json.current_observation.temp_f),
				// Alerts
				"desc"		: alertDesc,
				"msg"		: alertMsg
			};
			dbFile.save(response);
			dbFile.read();
		},
		onerror : function(e) {
			console.log(e);
			alert("There was an error while retreiving the weather data.");
		},
		timeout : 5000
	});
	
	xhrRequest.open("GET", url);
	xhrRequest.send();
};

exports.getGeo = getGeo;