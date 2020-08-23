const psList = require('ps-list');
const ps = require('ps-node');

const apps = [
    {
        "name": "chrome.exe",
        "time": 0,
        "start": null,
        "end": null,
        "running": false
    },
    {
        "name": "excel.exe",
        "time": 0,
        "start": null,
        "end": null,
        "running": false
    },
    {
        "name": "Spotify.exe",
        "time": 0,
        "start": null,
        "end": null,
        "running": false
    },
    {
        "name": "Discord.exe",
        "time": 0,
        "start": null,
        "end": null,
        "running": false
    }

];

window.setInterval(getProcesses, 5000);
window.setInterval(updateInfo, 600000);

async function getProcesses() {
    console.log("runs");
    let processes = await psList();
    //=> [{pid: 3213, name: 'node', cmd: 'node test.js', ppid: 1, uid: 501, cpu: 0.1, memory: 1.5}, …]
    //console.table(processes);
    for (const app of apps) {

        if (processes.some(e => e.name === app.name)) {
            if (!app.running) {
                app.start = new Date();
                app.running = true;
                console.log(app.name);
                console.log("started running");
            }
        } else {
            if (app.running) {
                app.end = new Date();
                app.running = false;
                console.log(app.name);
                console.log("stopped running");
                app.time += app.end - app.start;
            }
        }
    }

    for (const item of processes) {
        for (const app of apps)
            if (item.name === app) {
                // save
            }
    }

    console.table(apps)

}

function updateInfo() {

}
