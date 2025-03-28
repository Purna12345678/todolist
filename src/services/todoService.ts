import axios from "axios";

interface TodoItem {
    id: number;
    title: string;
    compleated: boolean;
  }
  

export const getItems = async () => {
  
    const response = await axios.get<TodoItem[]>("https://jsonplaceholder.typicode.com/todos");

    const newList = response.data.slice(0, 10).map((item) => ({
      id: item.id,
      title: item.title,
      compleated: item.compleated,
    }));
    return (newList);
};  

export const postItem = async (newItem: TodoItem) => {
    const response = await axios.post<TodoItem>("https://jsonplaceholder.typicode.com/todos", newItem);
    return response.data;
  }

export const deleteItem = async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  };
export  const updateItem = async (id: number, data: { title: string }) => {
  try {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
};

  