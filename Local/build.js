const packager = require('electron-packager')

async function bundleElectronApp(options) {
    const appPaths = await packager(options)
    console.log(`Electron app bundles created:\n${appPaths.join("\n")}`)
}

bundleElectronApp({dir: "C:\\Users\\daksh\\PycharmProjects\\ItsOverAnakin\\Local", name:"itsoveranakin", all:true}).then()