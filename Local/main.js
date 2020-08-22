const { app, BrowserWindow, Menu, Tray } = require('electron')

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadFile('index.html');

	let tray = new Tray('C:/Users/aryan/OneDrive/Pictures/rbc.png');
	tray.setToolTip('[Insert Name Here]');
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Item1', type: 'radio' },
		{ label: 'Item2', type: 'radio', checked: true }
	]);
	tray.setContextMenu(contextMenu);

}

app.whenReady().then(createWindow);