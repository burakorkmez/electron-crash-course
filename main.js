const { app, BrowserWindow, ipcMain } = require("electron");
const createMenu = require("./helpers/createMenu");
const path = require("node:path");
const saveFile = require("./helpers/saveFile");

let mainWindow;
const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
	});
	createMenu(mainWindow);
	mainWindow.loadFile("index.html");
};

app.whenReady().then(() => {
	ipcMain.handle("save-file", saveFile);
	createWindow();
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
		mainWindow = null;
	}
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});
