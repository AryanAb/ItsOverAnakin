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

	// load te html
	win.loadFile('index.html');

	// add the icon to the tray
	let tray = new Tray(nativeImage.createFromPath(path.join(__dirname, "obi wan.png")));
	tray.setToolTip("It's Over Anakin");
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Item1', type: 'radio' },
		{ label: 'Item2', type: 'radio', checked: true }
	]);
	tray.setContextMenu(contextMenu);

	// read the token
	readToken();

	logIn();

}

app.whenReady().then(createWindow);


function readToken() {
	fs.open(path.join(__dirname, "token.txt"), 'r', (err, fd) => {
		if (err) {
			_token = makeToken(16);
			token = _token;
			fs.writeFileSync(path.join(__dirname, "token.txt"), _token);
		} else {
			token = fs.readFileSync(path.join(__dirname, "token.txt"), "utf8");
		}
	});
}

function makeToken(length) {
	let result = '';
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function logIn() {
	axios.get("http://127.0.0.1:5000/login_api?email=aryanabed48@gmail.com&pass=testpass").then(response => {
		console.log(response);
	}).catch(err => {
		console.error(err);
	})
}