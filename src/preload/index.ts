import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'


const api = {
  obtenerMiniaturas: (rutaBase: string) => ipcRenderer.invoke("obtener-miniaturas", rutaBase),
  changeBackground: (rutaBase: string) => ipcRenderer.invoke("cambiar-fondo",rutaBase)
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