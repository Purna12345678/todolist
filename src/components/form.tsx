import React, { useState } from "react";
import "./form.css";

interface TodoItem {
  id: number;
  value: string;
  selected: boolean;
}

const Form: React.FC = () => {
  const [list, setList] = useState<TodoItem[]>([]);

  const AddToList = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value !== "") {
      setList([
        ...list,
        { id: Date.now(), value: event.currentTarget.value, selected: false },
      ]);
      event.currentTarget.value = "";
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

  const List = list.map((item) => (
    <div className="listitem1" key={item.id}>
      <input
        type="checkbox"
        className="item-checkbox"
        checked={item.selected}
        onChange={() => toggleSelection(item.id)}
      />
      {item.selected ? (
        <s>
          <li className="listitem2">{item.value}</li>
        </s>
      ) : (
        <li className="listitem">{item.value}</li>
      )}
      {item.selected && (
        <button className="remove-this" onClick={() => removeItem(item.id)}>
          x
        </button>
      )}
    </div>
  ));

  const Bottom: React.FC = () => {
    if (list.length > 0) {
      const selectedItems = list.filter((item) => item.selected).length;
      return (
        <div id="footer1">
          <p id="count">{list.length} items left</p>
          <button id="all">All</button>
          <button id="active">Active</button>
          <button id="completed">Completed</button>
          {selectedItems > 0 && (
            <button id="remove-selected" onClick={removeSelectedItems}>
              Clear completed
            </button>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="box1">
      <div>
        <input
          className="select-all"
          type="checkbox"
          onChange={toggleSelectAll}
          checked={list.length > 0 && list.every((item) => item.selected)}
        />
        <input id="input" onKeyDown={AddToList} />
      </div>
      <div>{List}</div>
      <Bottom />
    </div>
  );
};

export default Form;
