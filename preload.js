// A preload script contains code that runs before your web page is loaded into the browser window. It has access to both DOM APIs and Node.js environment, and is often used to expose privileged APIs to the renderer via the contextBridge API.
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
	fileOpened: (cb) => ipcRenderer.on("file-opened", cb),
	saveFile: (content) => ipcRenderer.invoke("save-file", content),
});
