const path = require("path");
const fs = require("fs");
const { app, BrowserWindow, Menu, Tray, nativeImage } = require("electron");
const axios = require("axios");

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

}

app.whenReady().then(createWindow);

// function logIn() {
// 	console.log("pressed");
// 	let email = document.getElementById("email").value;
// 	let pass = document.getElementById("pass").value;
// 	axios.get("http://127.0.0.1:5000/login_api?email=" + email + "&pass=" + pass).then(response => {
// 		token = response.data.token;
// 		console.log(token);
// 	}).catch(err => {
// 		console.error(err);
// 	})
// }