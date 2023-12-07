const { dialog } = require("electron");
const fs = require("fs");

async function saveFile(event, data) {
	const { filePath } = await dialog.showSaveDialog({
		title: "Save File",
		defaultPath: "filename.txt", // Default file name
		filters: [{ name: "Text Files", extensions: ["txt"] }],
	});

	if (filePath) {
		fs.writeFile(filePath, data, (err) => {
			if (err) {
				console.error(err);
				return;
			}
		});
		return filePath;
	}
}

module.exports = saveFile;
