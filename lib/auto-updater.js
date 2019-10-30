const { ipcMain,BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const feedUrl = 'http://images.huaer168.com/down/win32';
let init = () => {

    let sendUpdateMessage = (message, data) => {
        BrowserWindow.getFocusedWindow().send('message', { message, data });
    };
    autoUpdater.setFeedURL(feedUrl);

    autoUpdater.on('error', function (message) {
        sendUpdateMessage('error', message)
    });
    autoUpdater.on('checking-for-update', function (message) {
        sendUpdateMessage('checking-for-update', message)
    });
    autoUpdater.on('update-available', function (message) {
        sendUpdateMessage('update-available', message)
    });
    autoUpdater.on('update-not-available', function (message) {
        sendUpdateMessage('update-not-available', message)
    });

    // 更新下载进度事件
    autoUpdater.on('download-progress', function (progressObj) {
        sendUpdateMessage('downloadProgress', progressObj)
    })
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.on('updateNow', (e, arg) => {
            //some code here to handle event
            autoUpdater.quitAndInstall();
        })
        sendUpdateMessage('isUpdateNow');
    });

    ipcMain.on('checkUpdate', (e, arg) => {
        //some code here to handle event
        autoUpdater.checkForUpdates();
    })

    ipcMain.on('topage', (e, arg) => {
        debugger;
        //some code here to handle event
        sendUpdateMessage('topage',arg);
    })

    //执行自动更新检查
    autoUpdater.checkForUpdates();
};

module.exports = {
    init
}