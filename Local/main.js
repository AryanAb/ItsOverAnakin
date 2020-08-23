const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, Menu, Tray, nativeImage, Notification } = require("electron");

var token;

function createWindow() {
	// create a window
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	// load the html
	win.loadFile('index.html');
	win.webContents.openDevTools()

	// add the icon to the tray
	let tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "obi wan.png")));
	tray.setToolTip("It's Over Anakin");
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Item1', type: 'radio' },
		{ label: 'Item2', type: 'radio', checked: true }
	]);
	tray.setContextMenu(contextMenu);

	const notif = new Notification({
		title: "IOA",
		body: "IOA Is Now Running!"
	}).show();

	//notif.show();

}

app.whenReady().then(() => {
	createWindow();
	app.setAppUserModelId(process.execPath);
});