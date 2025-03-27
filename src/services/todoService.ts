import axios from "axios";

interface TodoItem {
    id: number;
    title: string;
    compleated: boolean;
  }
  

export const addApiImp = async () => {
  
    const response = await axios.get<TodoItem[]>("https://jsonplaceholder.typicode.com/todos");

    const newList = response.data.slice(0, 10).map((item) => ({
      id: item.id,
      title: item.title,
      compleated: item.compleated,
    }));
    return (newList);
};  