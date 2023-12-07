window.electronAPI.fileOpened((event, data) => {
	const textArea = document.getElementById("text-area");
	textArea.value = data;
});

// listen for ctrl+s or cmd+s and save the file
document.addEventListener("keydown", async (event) => {
	if ((event.ctrlKey || event.metaKey) && event.key === "s") {
		event.preventDefault();
		const textArea = document.getElementById("text-area");
		const filePath = await window.electronAPI.saveFile(textArea.value);
		if (filePath) alert(`File saved at ${filePath}`);
	}
});
