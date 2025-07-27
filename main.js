/*
  main.js
  Main Electron process for Dragonfly Desktop App.
  Handles window creation, navigation between pages, and IPC communication.
*/

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let win; 
let chosenDragon = null;
let randomInt = 0;
let savedProgress = {};

// Create the main application window
function createWindow() {
   win = new BrowserWindow({
    width: 406, // Window width matches content
    height: 546, // Window height matches content
    frame: false, // Custom title bar
     webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,  
      nodeIntegration: false 
    }
  });

  win.webContents.openDevTools(); // Open DevTools for debugging

  win.loadFile('index.html'); // Load the home page
}

// IPC handlers for navigation and state management
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

// Window control handlers
ipcMain.on('close-window', () => {
  win.close();
});

ipcMain.on('minimize-window', () => {
  win.minimize();
});

// Create window when app is ready
app.whenReady().then(createWindow);
