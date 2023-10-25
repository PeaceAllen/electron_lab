
const func = async ()=> {

    let res = await window.versions.ping()
    var infoEl = document.getElementById('el-ping')  
    console.log('from ipc main msg: ' + res)
    infoEl.innerText = res


    let elVersion = document.getElementById("el-version")

    let infoStr = `This is using Chrome (v${window.versions.chrome()}), Node (v${window.versions.node()}), Electron (v${window.versions.electron()})`

    elVersion.innerText = infoStr

}


document.getElementById("btn-get-msg").addEventListener('click', async () => {
    let msg = await window.versions.getMsg()
    let elMsg = document.getElementById('p-msg')
    elMsg.innerText = msg
})


document.getElementById("btn-set-title").addEventListener('click', () => {
    window.electronApi.setTitle("设置的标题")
})

document.getElementById("btn-sel-file").addEventListener('click', async () => {
    let selectedPath = await window.electronApi.openFile()
    console.log("file path = " + selectedPath)
    document.getElementById("file-path").innerText = selectedPath
})

const counterValue = document.getElementById('counter-value')

// 这里直接调用了preload.js中的onUpdateCounter函数，相当于让ipcRender监听去"counter-update" event
window.counterApi.onUpdateCounter((event, _value) => {
    let oldValue = Number(counterValue.innerText)
    let newValue = oldValue + _value
    counterValue.innerText = newValue
})

func()