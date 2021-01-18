import { app, BrowserWindow } from "electron";
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from "electron-devtools-installer";

async function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: "#272727",
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "1";
    await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]);
    await win.loadURL("http://localhost:3000/index.html");
    win.webContents.toggleDevTools();
  } else {
    win.loadFile("index.html");
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
