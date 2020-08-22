const path = require("path")

const { app, BrowserWindow, Menu, Tray, nativeImage } = require('electron')
const psList = require('ps-list');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadFile('index.html');

	let tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "obi wan.png")));
	tray.setToolTip("It's Over Anakin");
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Item1', type: 'radio' },
		{ label: 'Item2', type: 'radio', checked: true }
	]);
	tray.setContextMenu(contextMenu);

}

app.whenReady().then(createWindow);

