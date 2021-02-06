import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("cache", {
  save: <T>(key: string, value: T) => ipcRenderer.invoke("save", key, value),
  find: (key: string) => ipcRenderer.invoke("find", key),
});
