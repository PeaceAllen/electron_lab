
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    })

    //打开前端调试工具
    win.webContents.openDevTools()

    win.loadFile('index.html')
}

app.whenReady().then( () => {
    createWindow()


    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length == 0) {
            createWindow()
        }
    })

    app.on("window-all-closed", () => {
        if (process.platform !== 'darwin') app.quit()
    })

    ipcMain.handle('ping', () => {
        return "pong from main process."
    })

})