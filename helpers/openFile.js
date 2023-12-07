const { dialog } = require("electron");
const fs = require("fs");

async function openFile(mainWindow) {
	const { filePaths } = await dialog.showOpenDialog({
		properties: ["openFile"],
	});
	if (filePaths) {
		fs.readFile(filePaths[0], "utf8", (err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			mainWindow.webContents.send("file-opened", data);
		});
	}
}

module.exports = openFile;
