
const {app, BrowserWindow, dialog, ipcMain, Menu} = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width:800,
        height:600,
        webPreferences: {
            // 在这设置好预加载脚本
            preload: path.join(__dirname, "preload.js")
        }
    })

    const menu = Menu.buildFromTemplate([
        {
          label: app.name,
          submenu: [
            {
              click: () => win.webContents.send('update-counter', 1),
              label: 'Increment'
            },
            {
              click: () => win.webContents.send('update-counter', -1),
              label: 'Decrement'
            }
          ]
        }
      ])
    Menu.setApplicationMenu(menu)

    win.loadFile('index.html')

    //打开前端调试工具
    win.webContents.openDevTools()
}

// 设置标题
function handleSetTitle(event, title) {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
}

async function handleOpenFile() {

    const {canceled, filePaths } = await dialog.showOpenDialog()

    console.log('canceled = ' + canceled + ", file paths = " + filePaths[0])

    if( canceled ) {
        console.log("operation is canceled.")
        return "canceld."
    } else {
        console.log("operation result = " + filePaths[0])
        return filePaths[0]
    }
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

    ipcMain.handle("getMsg", () => {
        return "Greeting from ipc main."
    })

    ipcMain.handle("dialog:openFile", async () => {
        return handleOpenFile()
    })
    
    // 用于接受Render进程的消息, 就是ipcRender.send(msg)的消息
    ipcMain.on('set-title', handleSetTitle)

})