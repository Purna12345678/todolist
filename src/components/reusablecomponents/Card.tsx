import React from "react";
import "./Card.css"; 

interface CardProps {
  item: { id: number; title: string; compleated: boolean };
  toggleSelection: (id: number) => void;
  removeItem: (id: number) => void;
  highlight?: boolean; 
}

const Card: React.FC<CardProps> = ({
  item,
  toggleSelection,
  removeItem,
  highlight = false,
}) => {
  return (
    <div className="listitem1">
      <input
        type="checkbox"
        className= "item-checkbox"
        checked={item.compleated}
        onChange={() => toggleSelection(item.id)}
      />
      <span className={`listitem ${item.compleated ? "strikethrough" : ""}`}>{item.title}</span>
      <button className= "remove-this" onClick={() => removeItem(item.id)}>X</button>
    </div>
  );
};

export default Card;
