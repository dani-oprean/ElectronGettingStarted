const electron = require('electron');
const countDown = require('./countDown');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

const windows = [];

app.on('ready', _ => {
    
    [1,2,3].forEach(_ => {
        let win = new BrowserWindow({
            height: 400,
            width: 400
        });

        win.loadURL(`file://${__dirname}/countDown.html`);

        win.on('closed', _ => {
            win = null;
        });

        windows.push(win);
    })
});

ipc.on('countdown-start', _ => {
    countDown(count => {
        windows.forEach(win => {
            win.webContents.send('countdown', count);
        });
    });
});