const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
let workerWindow;
let captchaWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 675,
        show: true,
        resizable: false,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    mainWindow.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => (app.quit()));

    workerWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    workerWindow.loadURL(`file://${__dirname}/worker.html`).catch((e) => {
        console.log(e)
    });
    workerWindow.on("closed", () => (workerWindow = null));
}
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});

function sendWindowMessage(targetWindow, message, payload) {
    if(typeof targetWindow === 'undefined') {
        console.log('Target window does not exist');
        return;
    }
    targetWindow.webContents.send(message, payload);
}

function openCaptchaHarvester() {
    captchaWindow = new BrowserWindow({
        show: true,
        width: 375,
        height: 550,
        webPreferences: {
            show: true,
            resizable: false,
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    captchaWindow.loadURL(`file://${__dirname}/captcha-harvester.html`).catch((e) => {
        console.log(e)
    });
    captchaWindow.setBackgroundColor('#000000')
}

electron.ipcMain.on('open-captcha-harvester', (event, arg) => {
    openCaptchaHarvester();
})

electron.ipcMain.on('sendCaptcha', (event, arg) => {
    console.log(arg);
})

electron.ipcMain.on('call-running-tasks', (event, arg) => {
    sendWindowMessage(workerWindow, 'call-running-tasks', arg);
})

electron.ipcMain.on('get-running-tasks', (event, arg) => {
    sendWindowMessage(mainWindow, 'get-running-tasks', arg);
})

electron.ipcMain.on('start-task', (event, arg) => {
    console.log(arg);
    sendWindowMessage(workerWindow, 'start-task', arg);
})

electron.ipcMain.on('start-all', (event, arg) => {
    sendWindowMessage(workerWindow, 'start-all', arg);
})

electron.ipcMain.on('stop-all', (event, arg) => {
    sendWindowMessage(workerWindow, 'stop-all', arg);
})


electron.ipcMain.on('stop-task', (event, arg) => {
    sendWindowMessage(workerWindow, 'stop-task', arg);
})

electron.ipcMain.on('app-control', (event, arg) => {
    if (arg === 'close') {
        app.quit();
    } else if (arg === 'minimize') {
        mainWindow.minimize();
    }
})

electron.ipcMain.on('task-status', (event, arg) => {
    sendWindowMessage(mainWindow, 'task-status', arg);
})
