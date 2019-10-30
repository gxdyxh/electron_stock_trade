const {app} = require('electron');
const path = require('path')

const sys = require('./lib/action');
const axios = require('./lib/http-request');
const untils = require('./lib/untils');
const winManger = require('./lib/wins');
const myUpdater= require('./lib/auto-updater');
//import db from './lib/loacldb'

global.mainWindow=null;//主界面


const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {

  app.quit();
  return;
}

app.on('second-instance', (event, commandLine, workingDirectory) => {
  // 当运行第二个实例时,将会聚焦到myWindow这个窗口
  if (global.mainWindow) {
    if (global.mainWindow.isMinimized()) global.mainWindow.restore()
    global.mainWindow.focus()
  }
})

app.on('ready', () => { 
  global.mainWindow = winManger.loginWindow();
  global.mainWindow.hide();
 
  global.mainWindow.webContents.on('did-finish-load', () => {
     global.mainWindow.show();
     myUpdater.init();
   })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
  if (global.mainWindow === null){
    global.mainWindow = winManger.loginWindow()};
})

//挂在系统 函数
app.sys = new sys(app);
app.http = axios;
app.untils = untils;
app.winManger = winManger;
//app.db = db;

//全局变量
global.userData=false;

