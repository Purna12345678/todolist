"use strict";
const { app, BrowserWindow } = require("electron");
const path = require("path");
if (require("electron-squirrel-startup")) return;

const fs = require("fs");
const { ipcMain } = require("electron");

const storagePath = "C:/Users/PUYadav/TodoAppData/storage.json";

function ensureStorageFile() {
  const dir = path.dirname(storagePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(storagePath)) {
    fs.writeFileSync(storagePath, JSON.stringify([]));
  }
}

function createWindow() {
  let win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  win.loadURL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:5174"
      : `file://${path.join(__dirname, "../public/dist/index.html")}`
  );
  if (process.env.NODE_ENV === "development") {
    win.webContents.openDevTools();
  }
  win.on("closed", () => {
    win = null;
  });
}
app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

ipcMain.handle("get-todos", async () => {
  ensureStorageFile();
  const data = fs.readFileSync(storagePath, "utf-8");
  return JSON.parse(data);
});

ipcMain.handle("add-todo", async (_, newItem) => {
  ensureStorageFile();
  const todos = JSON.parse(fs.readFileSync(storagePath, "utf-8"));
  todos.push(newItem);
  fs.writeFileSync(storagePath, JSON.stringify(todos, null, 2));
});

ipcMain.handle("delete-todo", async (_, id) => {
  ensureStorageFile();
  let todos = JSON.parse(fs.readFileSync(storagePath, "utf-8"));
  todos = todos.filter((item) => item.id !== id);
  fs.writeFileSync(storagePath, JSON.stringify(todos, null, 2));
});

ipcMain.handle("save-todos", async (_, list) => {
  ensureStorageFile();
  fs.writeFileSync(storagePath, JSON.stringify(list, null, 2));
});
