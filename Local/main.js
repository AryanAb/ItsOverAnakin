const path = require("path");
const { app, BrowserWindow, Menu, Tray, nativeImage, Notification, shell } = require("electron");

var win;

function createWindow() {
	// create a window
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	// load the html
	win.loadFile('index.html');

	// add the icon to the tray
	let tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "ioa.png")));
	tray.setToolTip("It's Over Anakin");
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Open', type: "normal", click() { win.show(); win.focus(); } },
		{
			label: 'Dashboard', type: "normal", click() { shell.openExternal("https://itsoveranakin.tech") }
		},
		{ label: 'Quit', type: "normal", click() { win.removeAllListeners('close'); app.quit(); } }
	]);
	tray.setContextMenu(contextMenu);

	const notif = new Notification({
		title: "IOA",
		body: "IOA Is Now Running!"
	}).show();

}

app.whenReady().then(() => {
	createWindow();
	app.setAppUserModelId(process.execPath);

	win.on('minimize', function (event) {
		event.preventDefault();
		win.hide();
	});

	win.on('close', function (event) {
		if (!app.isQuiting) {
			event.preventDefault();
			win.hide();
		}

		return false;
	});

});

function takeSurvey() {
	const notif = new Notification({
		title: "IOA",
		body: "Time to Take a Survey!"
	});

	notif.show();

	notif.on('click', (event, arg) => {
		win.show();
		win.focus();
		win.loadFile();
	});
}

setInterval(takeSurvey, 600000);