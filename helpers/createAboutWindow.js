const { BrowserWindow } = require("electron");

function createAboutWindow() {
	const win = new BrowserWindow({ width: 600, height: 300 });
	win.setMenuBarVisibility(false);
	win.loadFile("about.html");
}

module.exports = createAboutWindow;
