import chokidar from "chokidar";
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { app, shell, BrowserWindow, dialog, ipcMain } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { obtenerMiniaturas } from './application/use-cases/getThumbnails'
import { changeBGHyprland } from './infraestructure/changers/linux/hyprland'
import fs from "fs/promises"
import { readFile } from "fs/promises";
import path from "path";
import os from "os";

const WAL_PATH = "/home/fercho/.cache/wal/colors.json";

import sharp from 'sharp'
import { watchWalColors } from './ipc/walWatcher'

sharp.cache(false);
sharp.concurrency(Math.max(1, require("os").cpus().length - 1));


export function initWalWatcher(win: BrowserWindow) {
  const watcher = chokidar.watch(WAL_PATH, {
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 200,
      pollInterval: 100,
    },
  });

  watcher.on("change", async () => {
    try {
      const raw = await readFile(WAL_PATH, "utf-8");
      const data = JSON.parse(raw);

      win.webContents.send("wal-colors-updated", data);
    } catch (err) {
      console.error("[wal] error reading colors.json", err);
    }
  });
}



function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  })

  initWalWatcher(mainWindow);

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.on('ping', () => {
  console.log("pong")
})

ipcMain.handle("obtener-miniaturas", async (_, rutaBase: string) => {
  return obtenerMiniaturas(rutaBase);
});

ipcMain.handle("cambiar-fondo", async (_, rutaImagen: string) => {
  return changeBGHyprland(rutaImagen)
});

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory"],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return null;
  }

  return result.filePaths[0];
});



ipcMain.handle("get-wal-colors", async () => {
  try {
    const walPath = path.join(
      os.homedir(),
      ".cache",
      "wal",
      "colors.json"
    );

    const raw = await fs.readFile(walPath, "utf-8");
    const data = JSON.parse(raw);

    return data;
  } catch (error) {
    console.error("Error leyendo colors.json de pywal:", error);
    return null;
  }
});


app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})