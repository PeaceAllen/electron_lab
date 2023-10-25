
const {contextBridge, ipcRenderer} = require('electron')


// 配置向render进程暴露的api，这样render进程就可以通过window.versions.xxx()进行调用了
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    electron: () => process.versions.electron,
    chrome: () => process.versions.chrome,
    ping: () => ipcRenderer.invoke('ping'),
    getMsg: () => ipcRenderer.invoke("getMsg"),
})

// 这样的话，在渲染页面，就可以通过window.electronApi.setTitle()进行调用了
contextBridge.exposeInMainWorld('electronApi', {

    setTitle: (title) => {
        // render.send实现向main的单向调用，ipcMain.on()进行处理
        ipcRenderer.send('set-title', title)
    },

    openFile: async () => {
        // render.invoke实现向main的双向调用,main可以有返回值返回到render。ipcMain.handle()进行处理
        return ipcRenderer.invoke("dialog:openFile")
    }
})

contextBridge.exposeInMainWorld('counterApi', {
    onUpdateCounter: (callback) => {
        ipcRenderer.on('update-counter', callback)
    },
})

