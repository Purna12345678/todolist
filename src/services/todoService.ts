import axios from "axios";

interface TodoItem {
    id: number;
    title: string;
    compleated: boolean;
}

const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {throw new Error("REACT_APP_API_URL does not exist")}

export const getItems = async () => {
    const response = await axios.get<TodoItem[]>(apiUrl);

    const newList = response.data.slice(0, 10).map((item) => ({
        id: item.id,
        title: item.title,
        compleated: item.compleated,
    }));
    return newList;
};

export const postItem = async (newItem: TodoItem) => {
    const response = await axios.post<TodoItem>(apiUrl, newItem);
    return response.data;
};

export const deleteItem = async (id: number) => {
    await axios.delete(`${apiUrl}/${id}`);
};

export const updateItem = async (id: number, data: { title: string }) => {
    try {
        const response = await axios.patch(`${apiUrl}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Update failed:", error);
        throw error;
    }
};