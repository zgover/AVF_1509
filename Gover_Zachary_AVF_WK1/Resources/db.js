// Define the database connection; connect, read and save

var read = function() {
	// Read the saved data in case the user has lost connection
	var db = Ti.Database.open("weather_db");
	var dbResult = db.execute("SELECT * FROM weather_data");
	
	while (dbResult.isValidRow()) {
		var response = {
			// Weather data
			"id"		: dbResult.fieldByName("id"),
			"ctry"		: dbResult.fieldByName("ctry"),
			"state"		: dbResult.fieldByName("state"),
			"city"		: dbResult.fieldByName("city"),
			"zip"		: dbResult.fieldByName("zip"),
			"wthrImg"	: dbResult.fieldByName("wthrImg"),
			"wthr"		: dbResult.fieldByName("wthr"),
			"temp"		: Math.round(dbResult.fieldByName("temp")),
			
			// Alerts
			"desc"		: dbResult.fieldByName("desc"),
			"msg"		: dbResult.fieldByName("msg"),
			
			// Hour One
			"hourOneImage" : dbResult.fieldByName("hourOneImage"),
			"hourOneText" : dbResult.fieldByName("hourOneText"),
			
			// Hour Two
			"hourTwoImage" : dbResult.fieldByName("hourTwoImage"),
			"hourTwoText" : dbResult.fieldByName("hourTwoText"),
			
			// Hour Three
			"hourThreeImage" : dbResult.fieldByName("hourThreeImage"),
			"hourThreeText" : dbResult.fieldByName("hourThreeText"),
			
			// Hour Four
			"hourFourImage" : dbResult.fieldByName("hourFourImage"),
			"hourFourText" : dbResult.fieldByName("hourFourText"),
			
			// Day One
			"dayOneImage" : dbResult.fieldByName("dayOneImage"),
			"dayOneText" : dbResult.fieldByName("dayOneText"),
			
			// Day Two
			"dayTwoImage" : dbResult.fieldByName("dayTwoImage"),
			"dayTwoText" : dbResult.fieldByName("dayTwoText"),
			
			// Day Three
			"dayThreeImage" : dbResult.fieldByName("dayThreeImage"),
			"dayThreeText" : dbResult.fieldByName("dayThreeText"),
		};
		dbResult.next();
	}
	
	dbResult.close();
	db.close();
	
	var ui = require("ui");
	console.log(response);
	ui.updateView(response);
};

var save = function(arg, arg1, arg2) {
	// Save the new data that has been fetched into the the Database
	var db = Ti.Database.open("weather_db");
	db.execute("DROP TABLE IF EXISTS weather_data");
	db.execute("CREATE TABLE IF NOT EXISTS weather_data (id INTEGER PRIMARY KEY, ctry TEXT, state TEXT, city TEXT, zip INTEGER, wthrImg TEXT, wthr TEXT, temp INTEGER, desc TEXT, msg TEXT, hourOneImage TEXT, hourOneText TEXT, hourTwoImage TEXT, hourTwoText TEXT, hourThreeImage TEXT, hourThreeText TEXT, hourFourImage TEXT, hourFourText TEXT, dayOneImage TEXT, dayOneText TEXT, dayTwoImage TEXT, dayTwoText TEXT, dayThreeImage TEXT, dayThreeText TEXT)");
	db.execute("DELETE FROM weather_data");
	db.execute("INSERT INTO weather_data (ctry, state, city, zip, wthrImg, wthr, temp, desc, msg, hourOneImage, hourOneText, hourTwoImage, hourTwoText, hourThreeImage, hourThreeText, hourFourImage, hourFourText, dayOneImage, dayOneText, dayTwoImage, dayTwoText, dayThreeImage, dayThreeText) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", arg.ctry, arg.state, arg.city, arg.zip, arg.wthrImg, arg.wthr, arg.temp, arg.desc, arg.msg, arg1.hourOneImage, arg1.hourOneText, arg1.hourTwoImage, arg1.hourTwoText, arg1.hourThreeImage, arg1.hourThreeText, arg1.hourFourImage, arg1.hourFourText, arg2.dayOneImage, arg2.dayOneText, arg2.dayTwoImage, arg2.dayTwoText, arg2.dayThreeImage, arg2.dayThreeText);
	db.close();
};

exports.read = read;
exports.save = save;