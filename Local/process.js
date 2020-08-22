const psList = require('ps-list');

const processDiv = document.getElementById("processes");

(async () => {
    let processes = await psList();
    console.log(processes);
    //=> [{pid: 3213, name: 'node', cmd: 'node test.js', ppid: 1, uid: 501, cpu: 0.1, memory: 1.5}, …]
    for (let item of processes) {
        let proc = await document.createElement("h5");
        proc.innerText = item.name;
        processDiv.appendChild(proc);
    }
})();