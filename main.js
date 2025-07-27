const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win; 
let chosenDragon = null;
let randomInt = 0;
let savedProgress = {};


function createWindow() {
   win = new BrowserWindow({
    width: 400,
    height: 500,
    frame: false,

    width: 437,
    height: 585,

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

ipcMain.on('set-dragon', (event, data) => {
  console.log("Setting dragon img", data);
  chosenDragon = data;
});

ipcMain.handle('get-dragon', () => {
  console.log("Getting dragon img");
  return chosenDragon;
});

ipcMain.on('set-random-int', (event, intData) => {
  console.log("Setting random int", intData);
  randomInt = intData;
});

ipcMain.handle('get-random-int', () => {
  console.log("Getting random int");
  return randomInt;
});

ipcMain.on("load-metrics-page", () => {
    console.log("Loading metrics page");
    win.loadFile(path.join(__dirname, 'html', 'metricsPage.html'));
})

ipcMain.on('save-progress', (event, data) => {
  savedProgress = data;
});

ipcMain.handle('get-progress', () => {
  return savedProgress;
});

ipcMain.on('close-window', () => {
  win.close();
});

ipcMain.on('minimize-window', () => {
  win.minimize();
});


app.whenReady().then(createWindow);
