const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    goToEggPage: () => ipcRenderer.send("load-egg-page"),
    goToDragonPage: () => ipcRenderer.send("load-dragon-page"),
    goToMetricsPage: () => ipcRenderer.send("load-metrics-page")
});