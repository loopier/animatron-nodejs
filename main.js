const {app, BrowserWindow } = require('electron')
const path = require('path')
const log = require('electron-log')

// const osc_module = require('./src/osc.js')
// const plane_module = require('./src/plane.js')

require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin'),
})
// require('electron-reload')(__dirname)
// require('electron-reload')(process.cwd())

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }


        // To make transparent window
        // transparent: true,
        // frame: false
        // ----- make sure to make the body background transparent in the css file.
        // body {
        //   background-color: rgba(0,0,0,0);
        // }
        // ----- end of CSS
    })

    mainWindow.webContents.openDevTools()
    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function() {
        if (BrowserWindow.getAllWindows().length() === 0) createWindow()
    })
})

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})
