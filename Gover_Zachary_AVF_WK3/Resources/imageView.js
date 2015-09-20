// Image View
var pWidth = Ti.Platform.displayCaps.platformWidth;
var pHeight = Ti.Platform.displayCaps.platformHeight;
var rowCount = 6;
var margin = 5;
if (Ti.Platform.osname === "android") {
	pWidth = pWidth/3;
}
var size = (pWidth - (margin * (rowCount+1))) / rowCount;
var globalOrientation = [
	Ti.UI.PORTRAIT,
	Ti.UI.LANDSCAPE_LEFT,
	Ti.UI.LANDSCAPE_RIGHT
];

var imageWin = Ti.UI.createWindow ({
	title: "Search Results",
	backButtonTitle: "Back",
	backgroundColor: "#333333"
});

var buildUi = function(response) {
	var viewContainer = Ti.UI.createScrollView ({
		width: pWidth,
		contentWidth: pWidth, 	
		height: "100%",
		layout: "horizontal",
		showVerticalIndicator: true
	});
	
	for (var i = 0; i<response.length; i++){		
		var imageView = Ti.UI.createView ({
			width: size,
			height: size,
			left: margin,
			top: margin,
			borderRadius: 10
		});
		var currentImage = Ti.UI.createImageView({
			image: response[i].preview,
			title: "Image",
			top: 0,
			width: size*2, height: size*2,
			fullImage: response[i].fullImage
		});
		
		imageView.add(currentImage);
		viewContainer.add(imageView);
	}
	
	imageWin.add(viewContainer);
	
	exports.viewContainer = viewContainer;
	
	viewContainer.addEventListener("click", function(data){
		if (data.source.fullImage) {
			var fullImage = require("fullImage");
			fullImage.showFullImage(data.source);
		}
	});
	
	if (Ti.Platform.osname === "android") {
		imageWin.open();
	} else {
		if (Ti.Network.online) {
			var ui = require("ui");
			ui.navWin.openWindow(imageWin, {animated: true});
		} else {
			var navWin = Titanium.UI.iOS.createNavigationWindow({
			   window: imageWin
			});
			navWin.open();
		}
	}
};

exports.buildUi = buildUi;
exports.imageWin = imageWin;