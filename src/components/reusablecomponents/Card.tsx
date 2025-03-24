import React from "react";
import "./Card.css"

interface CardProps {
  item: { id: number; value: string; selected: boolean };
  toggleSelection: (id: number) => void;
  removeItem: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ item, toggleSelection, removeItem }) => {
  return (
    <div className="opteamix-listitem1">
      <input
        type="checkbox"
        className="opteamix-item-checkbox"
        checked={item.selected}
        onChange={() => toggleSelection(item.id)}
      />
      <li className={`opteamix-listitem ${item.selected ? "opteamix-strikethrough" : ""}`}>
        {item.value}
      </li>

      {item.selected && (
        <button className="opteamix-remove-this" onClick={() => removeItem(item.id)}>
          x
        </button>
      )}
    </div>
  );
};

export default Card;
