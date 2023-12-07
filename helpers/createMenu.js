const { app, Menu } = require("electron");
const openFile = require("./openFile");
const createAboutWindow = require("./createAboutWindow");

function createMenu(mainWindow) {
	const isMac = process.platform === "darwin";

	const menu = Menu.buildFromTemplate([
		...(isMac
			? [
					{
						label: app.name,
						submenu: [
							{ role: "about" },
							{ type: "separator" },
							{ role: "services" },
							{ type: "separator" },
							{ role: "hide" },
							{ role: "hideOthers" },
							{ role: "unhide" },
							{ type: "separator" },
							{ role: "quit" },
						],
					},
			  ]
			: []),
		{
			label: "File",
			submenu: [
				isMac ? { role: "close" } : { role: "quit" },
				{
					label: "Open file",
					accelerator: "CmdOrCtrl+O",
					click: () => openFile(mainWindow),
				},
				{
					label: "Save file",
					accelerator: "CmdOrCtrl+S",
					click: () => console.log("save file clicked"),
				},
			],
		},
		{
			label: "Edit",
			submenu: [
				{ role: "undo" },
				{ role: "redo" },
				{ type: "separator" },
				{ role: "cut" },
				{ role: "copy" },
				{ role: "paste" },
				...(isMac
					? [
							{ role: "pasteAndMatchStyle" },
							{ role: "delete" },
							{ role: "selectAll" },
							{ type: "separator" },
							{
								label: "Speech",
								submenu: [{ role: "startSpeaking" }, { role: "stopSpeaking" }],
							},
					  ]
					: [{ role: "delete" }, { type: "separator" }, { role: "selectAll" }]),
			],
		},
		{
			label: "View",
			submenu: [
				{ role: "reload" },
				{ role: "forceReload" },
				{ type: "separator" },
				{ role: "resetZoom" },
				{ role: "zoomIn" },
				{ role: "zoomOut" },
				{ type: "separator" },
				{ role: "togglefullscreen" },
			],
		},
		{
			label: "Window",
			submenu: [
				{ role: "minimize" },
				{ role: "zoom" },
				...(isMac
					? [{ type: "separator" }, { role: "front" }, { type: "separator" }, { role: "window" }]
					: [{ role: "close" }]),
			],
		},
		{
			role: "help",
			submenu: [
				{
					label: "About",
					click: createAboutWindow,
				},
				{
					label: "Build more",
					click: async () => {
						const { shell } = require("electron");
						await shell.openExternal("https://electronjs.org");
					},
				},
			],
		},
	]);

	Menu.setApplicationMenu(menu);
}

module.exports = createMenu;
