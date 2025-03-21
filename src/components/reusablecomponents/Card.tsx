import React from "react";

interface CardProps {
  item: { id: number; value: string; selected: boolean };
  toggleSelection: (id: number) => void;
  removeItem: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ item, toggleSelection, removeItem }) => {
  return (
    <div className="listitem1">
      <input
        type="checkbox"
        className="item-checkbox"
        checked={item.selected}
        onChange={() => toggleSelection(item.id)}
      />
      <li className={`listitem ${item.selected ? "strikethrough" : ""}`}>
        {item.value}
      </li>
      {item.selected && (
        <button className="remove-this" onClick={() => removeItem(item.id)}>
          x
        </button>
      )}
    </div>
  );
};

export default Card;
