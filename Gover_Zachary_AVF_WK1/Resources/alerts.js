var infoWin = Ti.UI.createWindow({
	backgroundColor: "#FFFFFF"
});

var infoView = Ti.UI.createScrollView({
	backgroundColor: "#ededed",
	top: 20, left: 0, right: 0,
	layout: "vertical",
	width: "100%",
	height: "90%",
	contentWidth: "100%",
	showVerticalIndicator: true
});

var infoText = Ti.UI.createLabel({
	text: "",
	left: 20, right: 20,
	color: "#333333"
});
infoView.add(infoText);

var closeView = Ti.UI.createView({
	backgroundColor: "#333333",
	height: 50, bottom: 0, left: 0, right: 0
});

var closeText = Ti.UI.createLabel({
	top: 10,
	text: "Close",
	color: "#FFFFFF"
});
closeView.add(closeText);

closeView.addEventListener("click", function(){
	infoWin.close();
});

infoWin.add(infoView, closeView);
exports.infoWin = infoWin;
exports.infoText = infoText;