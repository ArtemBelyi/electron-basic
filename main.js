const { app, BrowserWindow } = require('electron/main');
const windowStateKeeper = require('electron-window-state');

const createWindow = () => {
    let mainWindowState = windowStateKeeper({
        defaultWidth: 1200,
        defaultHeight: 1000
    });

    const win = new BrowserWindow({
        'x': mainWindowState.x,
        'y': mainWindowState.y,
        'width': mainWindowState.width,
        'height': mainWindowState.height
    })

    win.webContents.openDevTools({
        mode: "right",
    });

    void win.loadFile('index.html')
    mainWindowState.manage(win);
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})