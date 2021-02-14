import { app, BrowserWindow, ipcMain } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";
import Store from "electron-store";

const store = new Store();

ipcMain.handle("save", async (event, key, value) => store.set(key, value));
ipcMain.handle("find", async (event, key) => store.get(key));

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: "#272727",
    webPreferences: {
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: `${__dirname}/preload.js`,
    },
  });

  if (process.env.NODE_ENV === "development") {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";
    await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    await win.loadURL("http://localhost:3000/index.html");
    win.webContents.toggleDevTools();
  } else {
    win.loadFile(`${__dirname}/index.html`);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
