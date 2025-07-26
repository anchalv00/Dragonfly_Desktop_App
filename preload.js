const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    goToEggPage: () => ipcRenderer.send("load-egg-page"),
    goToDragonPage: () => ipcRenderer.send("load-dragon-page"),
    setDragon: (data) => ipcRenderer.send("set-dragon", data),
    getDragon: () => ipcRenderer.invoke('get-dragon'),
    setRandomInt: (randomInt) => ipcRenderer.send("set-random-int", randomInt),
    getRandomInt: () => ipcRenderer.invoke("get-random-int"),
    goToMetricsPage: () => ipcRenderer.send("load-metrics-page")
});