import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { loadConfig, saveConfig } from '../main/infraestructure/config/Config'


const api = {
  obtenerMiniaturas: (rutaBase: string) => ipcRenderer.invoke("obtener-miniaturas", rutaBase),
  changeBackground: (rutaBase: string) => ipcRenderer.invoke("cambiar-fondo", rutaBase),
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  loadConfig: () => loadConfig(),
  saveConfig: (config) => saveConfig(config),
  getWalColors: () => ipcRenderer.invoke("get-wal-colors"),

  onWalColorsUpdated: (handler: (data: any) => void) => {
    ipcRenderer.on("wal-colors-updated", (_, data) => handler(data));
  },

  offWalColorsUpdated: (handler: (data: any) => void) => {
    ipcRenderer.removeListener("wal-colors-updated", handler as any);
  },
}


if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}