// Search View
var mainWin = Ti.UI.createWindow ({
	title: "Project 3",
	backgroundColor: "#F0F0F0",
	layout: "vertical"
});

if (Ti.Platform.osname !== "android") {
	var navWin = Titanium.UI.iOS.createNavigationWindow({
	   window: mainWin
	});
}

var mainView = Ti.UI.createScrollView ({
	top: 20, right: 0, bottom: 0, left: 0,
	layout: "vertical",
	contentHeight: "100%", contentWidth: "100%"
});

var searchLabel = Ti.UI.createLabel ({
	text: "Search Images", top: "20%", color: "#000000",
	font: { fontSize: "20%", fontFamily: "Arial", fontWeight: "Bold" }
});
mainView.add(searchLabel);

var searchField = Ti.UI.createTextField ({
	left: 20, right: 20, top: 50, height: 40,
	borderColor: "#EDEDED", backgroundColor: "#FFFFFF", borderRadius: 3,
	color: "#000000",
	hintText: "Jeff Dunham",
	paddingLeft: 10, paddingRight: 10
});
mainView.add(searchField);

var searchBtn = Ti.UI.createView({
	top: 5, left: 20, right: 20, height: 40,
	borderRadius: 3, backgroundColor: "#333333"
});

var searchTxt = Ti.UI.createLabel ({
	text: "Search",
	color: "#FFFFFF",
	top: 8, 
	font: { fontSize: 18, fontFamily: "Arial" }
});
searchBtn.add(searchTxt);
mainView.add(searchBtn);

searchBtn.addEventListener("click", function(){
	
	if (Ti.Network.online) {
		var searchVal = searchField.value;
		if (searchVal == "" || searchVal == null) {
			alert("The search field must not be empty.");
		} else {
			var imageView = require("imageView");
			if (imageView.viewContainer) {
				imageView.imageWin.remove(imageView.viewContainer);
			}
			
			var api = require("api");
			api.apiConnection(searchVal);
		}
	} else {
		alert("You're not connected to a network.");
	}
});

mainWin.add(mainView);
if (Ti.Platform.osname !== "android") {
	navWin.open();
} else {
	mainWin.open();
}
exports.navWin = navWin;
