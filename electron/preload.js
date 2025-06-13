const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("todoAPI", {
  getTodos: () => ipcRenderer.invoke("get-todos"),
  addTodo: (item) => ipcRenderer.invoke("add-todo", item),
  deleteTodo: (id) => ipcRenderer.invoke("delete-todo", id),
  saveTodos: (list) => ipcRenderer.invoke("save-todos", list),
});
