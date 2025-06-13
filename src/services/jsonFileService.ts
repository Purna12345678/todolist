interface TodoItems {
  id: number;
  title: string;
  compleated: boolean;
}

class JsonFileService {
  async getTodoList(): Promise<TodoItems[]> {
    if (window.todoAPI && window.todoAPI.getTodos) {
      return await window.todoAPI.getTodos();
    }
    return [];
  }

  async addItem(item: TodoItems): Promise<void> {
    if (window.todoAPI && window.todoAPI.addTodo) {
      await window.todoAPI.addTodo(item);
    }
  }


  async deleteItem(id: number): Promise<void> {
    if (window.todoAPI && window.todoAPI.deleteTodo) {
      await window.todoAPI.deleteTodo(id);
    }
  }

 
  async updateItem(id: number, data: Partial<TodoItems>): Promise<void> {
    throw new Error('updateItem method is not implemented in the preload API');
  }


  async saveTodoList(list: TodoItems[]): Promise<void> {
    if (window.todoAPI && window.todoAPI.saveTodos) {
      await window.todoAPI.saveTodos(list);
    } else {
      console.warn('saveTodoList method is not implemented in the preload API');
    }
  }
}

const jsonFileService = new JsonFileService();

export { jsonFileService, TodoItems };
