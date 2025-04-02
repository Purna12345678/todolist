import React, { useState, useEffect } from "react";
import { deleteItem, getItems, postItem, updateItem } from "../services/todoService";
import "./form.css";
import Input from "./Input/Input";
import Button from "./button/Button";
import Card from "./Card/Card";

interface TodoItem {
  id: number;
  title: string;
  compleated: boolean;
}

const getStoredList = (): TodoItem[] => {
  const storedList = localStorage.getItem("todoList");
  return storedList ? JSON.parse(storedList) : [];
};


const Form: React.FC = () => {
  const [list, setList] = useState<TodoItem[]>(getStoredList);
const [inputValue, setInputValue] = useState<string>("");
const [searchQuery, setSearchQuery] = useState<string>("");


const addApi = async () => {
  try {
    const newList = await getItems();

    setList((prevList) => [...prevList, ...newList]);
    localStorage.setItem("todoList", JSON.stringify([...list, ...newList])); 
  } catch (error) {
    console.error("Error fetching API data:", error);
  }
};


  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const AddToList = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const listItem: TodoItem = { id: 201 + list.length, title: inputValue.trim(), compleated: false }
      const newList = [
        ...list,
        listItem,
      ];
      postItem(listItem)
      setList(newList);
      setInputValue("");
      setSearchQuery("");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredList = searchQuery.trim() === ""
    ? list
    : list.filter((item) =>
      
       {const filteritem = item.title.toLowerCase().includes(searchQuery.toLowerCase())
       console.log( item.title.toLowerCase().includes(searchQuery.toLowerCase()));
        return filteritem
      }
      );

  const toggleSelection = (id: number) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, compleated: !item.compleated } : item
      )
    );
  };

  const removeSelectedItems = () => {
    const updatedList = list.filter((item) => !item.compleated);
    const selectedItems = list.filter((item) => item.compleated);
    selectedItems.forEach((item) => deleteItem(item.id));
    setList(updatedList);
  };

  const toggleSelectAll = () => {
    const allSelected = list.every((item) => item.compleated);
    const updatedList = list.map((item) => ({ ...item, compleated: !allSelected }));
    setList(updatedList);
  };

  const removeItem = (id: number) => {
    const updatedList = list.filter((item) => item.id !== id );
    deleteItem(id);
    setList(updatedList);
  };

  const editItem = (id: number, title: string) => {
    updateItem(id, { title });
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, title } : item
    );
    setList(updatedList);
  };
  

  return (
    <div className="box1">
      <div className="input-container">
        <input
          className="select-all"
          type="checkbox"
          onChange={toggleSelectAll}
          checked={list.length > 0 && list.every((item) => item.compleated)}
        />
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={AddToList}
          placeholder="Add new task..."
        />
      </div>


      <div className="search-container">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button text="Add API" onClick={addApi} />
      </div>


      <div>
        {filteredList.map((item) => (
          <Card
            key={item.id}
            item={item}
            toggleSelection={toggleSelection}
            removeItem={removeItem}
            editItem={editItem}
            highlight={searchQuery.trim() !== ""}
          />
        ))}
      </div>

      {list.length > 0 && (
        <div id="footer1">
          <p id="count">{list.length} items left</p>
          <Button text="All" />
          <Button text="Active" />
          <Button text="Completed" />
          {list.some((item) => item.compleated) && (
            <Button text="Clear completed" variant="danger" onClick={removeSelectedItems} />
          )}
        </div>
      )}
    </div>
  );
};

export default Form;