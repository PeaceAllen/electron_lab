# Electron Demo

## 学习文档：
> 快速开始文档： https://www.electronjs.org/docs/latest/tutorial/quick-start

## 创建步骤：
```
mkdir demo-1
cd demo-1
npm init

npm install electron --save-dev

// 运行在ipcRender进程中
touch index.html
// 运行在ipcRender进程中
touch render.js

// 运行在ipcMain进程中
touch main.js

```
## 学习IPC，主要是ipcMain和ipcRender之前如何通信
```
主要通过预加载脚本通信

touch preload.js

// 单向render -> main
// 双向render -> main

// 单向main -> render
// 双向 main -> render

```

## 打包发布
```
// 使用forge工具打包
// 安装forge
npm install --save-dev @electron-forge/cli
// 将forge工具引入到本地工程
npx electron-forge import
```