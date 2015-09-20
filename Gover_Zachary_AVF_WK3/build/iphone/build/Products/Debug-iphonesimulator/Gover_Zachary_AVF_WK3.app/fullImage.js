// View full image
var globalOrientation = [
	Ti.UI.PORTRAIT,
	Ti.UI.LANDSCAPE_LEFT,
	Ti.UI.LANDSCAPE_RIGHT
];

var showFullImage = function(data) {
	var imageFull = Ti.UI.createWindow({
		backgroundColor: '#333333',
		title: "Full Image",
		orientationModes: globalOrientation,
		backButtonTitle: "Back",
	});
	
	var imgScrollView = Ti.UI.createScrollView ({
		left: 0, right: 0, top: 0,
		layout: "vertical",
		width: "100%",
		height: "90%",
		contentWidth: "100%",
		showVerticalIndicator: true
	});
	
	var presentImage = Ti.UI.createImageView ({
		image: data.fullImage,
		left: 20, right: 20, top: 20
	});
	imgScrollView.add(presentImage);
	imageFull.add(imgScrollView);
	
	var saveBtn = Ti.UI.createView ({
		backgroundColor: "#000000",
		height: "10%", bottom: 0, left: 0, right: 0
	});
	
	var saveText = Ti.UI.createLabel({
		top: "35%",
		text: "Save Image",
		color: "#FFFFFF",
		font: {fontWeight: "bold"}
	});
	saveBtn.add(saveText);
	imageFull.add(saveBtn);
	
	saveBtn.addEventListener("click", function(){
		// Save the current image
		var img = presentImage.toImage();
		
		Ti.Media.saveToPhotoGallery(img, {
			success: function(e) {
				if (e.success == 1) {
					alert("Image Saved");
				} else {
					alert("There was an error when trying to save the image");
				}
			}
		});
	});
	
	if (Ti.Platform.osname === "android") {
		imageFull.open();
	} else {
		if (Ti.Network.online) {
			var ui = require("ui");
			ui.navWin.openWindow(imageFull, {animate:true});
		} else {
			var imageView = require("imageView");
			imageView.navWin.openWindow(imageFull, {animate:true});
		}
	}
	exports.imageFull = imageFull;
};

exports.showFullImage = showFullImage;
