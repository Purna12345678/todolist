/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; 
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

interface TodoItems {
  id: number;
  title: string;
  compleated: boolean;
}

interface TodoAPI {
  getTodos: () => Promise<TodoItems[]>;
  addTodo: (item: TodoItems) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  saveTodos: (list: TodoItems[]) => Promise<void>;
}

interface Window {
  todoAPI: TodoAPI;
}
