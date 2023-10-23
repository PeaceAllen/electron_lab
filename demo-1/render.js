
const func = async ()=> {

    let res = await window.versions.ping()
    var infoEl = document.getElementById('el-ping')  
    console.log('from ipc main msg: ' + res)
    infoEl.innerText = res


    let elVersion = document.getElementById("el-version")

    let infoStr = `This is using Chrome (v${window.versions.chrome()}), Node (v${window.versions.node()}), Electron (v${window.versions.electron()})`

    elVersion.innerText = infoStr

}


func()