const psList = require('ps-list');
//const ps = require('ps-node');
const axios = require("axios");
const fs = require("fs");
const { shell } = require('electron');

let apps = JSON.parse(fs.readFileSync("apps.json"));
var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

window.setInterval(getProcesses, 5000);
window.setInterval(updateInfo, 5000);
window.setInterval(displayTimer, 1000);

async function getProcesses() {
    let processes = await psList();
    //=> [{pid: 3213, name: 'node', cmd: 'node test.js', ppid: 1, uid: 501, cpu: 0.1, memory: 1.5}, …]
    //console.table(processes);
    for (const app of apps) {

        if (processes.some(e => e.name === app.name)) {
            if (!app.running) {
                app.start.push(new Date());
                app.running = true;
                console.log(app.name);
                console.log("started running");
            }
        } else {
            if (app.running) {
                app.end.push(new Date());
                app.running = false;
                console.log(app.name);
                console.log("stopped running");
                app.time += app.end[app.end.length - 1] - app.start[app.start.length - 1];
            }
        }
    }

    for (const item of processes) {
        for (const app of apps)
            if (item.name === app) {
                // save
            }
    }

    //console.table(apps)

}

function updateInfo() {
    axios.post("https://itsoveranakin.tech/update_api/" + localStorage.getItem("email"), {
        data: apps
    }).then(response => {
        console.log(response);
    }).catch(err => {
        console.error(err);
    })
}

function displayTimer() {
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "IT'S OVER ANAKIN";
        shell.openExternal("https://itsoveranakin.tech/break")
    }
}