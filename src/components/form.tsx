
import React, { useState } from "react";
import "./form.css";
import Input from "../components/reusablecomponents/Input";
import Button from "../components/reusablecomponents/Button";
import Card from "../components/reusablecomponents/Card";

interface TodoItem {
  id: number;
  value: string;
  selected: boolean;
}

const Form: React.FC = () => {
  const [list, setList] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); 
  };

  const AddToList = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value !== "") {
      setList([
        ...list,
        { id: Date.now(), value: event.currentTarget.value, selected: false },
      ]);
      setInputValue("");
    }
  };

  const toggleSelection = (id: number) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const removeSelectedItems = () => {
    setList((prevList) => prevList.filter((item) => !item.selected));
  };

  const toggleSelectAll = () => {
    const allSelected = list.every((item) => item.selected);
    setList((prevList) =>
      prevList.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const removeItem = (id: number) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <div className="opteamix-box1">
     
      <div>
        <input
          className="opteamix-select-all"
          type="checkbox"
          onChange={toggleSelectAll}
          checked={list.length > 0 && list.every((item) => item.selected)}
        />
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={AddToList}
        />
      </div>

     
      <div>
        {list.map((item) => (
          <Card key={item.id} item={item} toggleSelection={toggleSelection} removeItem={removeItem} />
        ))}
      </div>

      
      {list.length > 0 && (
        <div id="footer1">
          <p id="count">{list.length} items left</p>
          <Button text="All" />
          <Button text="Active" />
          <Button text="Completed" />
          {list.some((item) => item.selected) && (
            <Button text="Clear completed" variant="danger" onClick={removeSelectedItems} />
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
