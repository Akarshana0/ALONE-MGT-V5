// ============================================================
// ALONE MANAGEMENT PRO - Electron Main Process
// Windows & Linux Desktop App
// ============================================================

const { app, BrowserWindow, shell, Menu, nativeImage } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  const icon = path.join(__dirname, 'icon.jpg');

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 390,
    minHeight: 700,
    icon: icon,
    title: 'Alone Management Pro',
    backgroundColor: '#0b0e14',
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
    },
  });

  // Load the app
  mainWindow.loadFile('index.html');

  // Open external URLs in system browser (not in app)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Remove default menu (keep only essential)
  Menu.setApplicationMenu(null);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
