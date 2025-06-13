import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getItems, postItem, deleteItem, updateItem } from "./todoService"; 
import { TodoItem } from "./todoService"; 

const mock = new MockAdapter(axios);
const apiUrl = "https://jsonplaceholder.typicode.com/todos";

describe("Todo API functions", () => {
  afterEach(() => {
    mock.reset();
  });

  const mockData: TodoItem[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    compleated: i % 2 === 0,
  }));

  test("getItems should return paginated items", async () => {
    mock.onGet(apiUrl).reply(200, mockData);

    const items = await getItems(0);
    expect(items.length).toBe(10);
    expect(items[0].title).toBe("Item 1");
  });

  test("postItem should send a new item and return it", async () => {
    const newItem: TodoItem = { id: 21, title: "New Task", compleated: false };
    mock.onPost(apiUrl, newItem).reply(201, newItem);

    const result = await postItem(newItem);
    expect(result).toEqual(newItem);
  });

  test("deleteItem should call axios.delete with correct URL", async () => {
    const id = 5;
    mock.onDelete(`${apiUrl}/${id}`).reply(204);

    await expect(deleteItem(id)).resolves.toBeUndefined();
  });

  test("updateItem should patch item title", async () => {
    const id = 3;
    const data = { title: "Updated title" };
    const updated = { ...mockData[2], ...data };

    mock.onPatch(`${apiUrl}/${id}`, data).reply(200, updated);

    const result = await updateItem(id, data);
    expect(result.title).toBe("Updated title");
  });
});
