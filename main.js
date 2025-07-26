const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win; 

function createWindow() {
   win = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  
      nodeIntegration: false 
    }
  });

  win.webContents.openDevTools();

  win.loadFile('index.html');
}

ipcMain.on("load-egg-page", () => {
    console.log("Loading egg page");
    win.loadFile(path.join(__dirname, 'html', 'eggPage.html'));
})

ipcMain.on("load-dragon-page", () => {
    console.log("Loading dragon page");
    win.loadFile(path.join(__dirname, 'html', 'dragonPage.html'));
})

ipcMain.on("load-metrics-page", () => {
    console.log("Loading metrics page");
    win.loadFile(path.join(__dirname, 'html', 'metricsPage.html'));
})

app.whenReady().then(createWindow);
