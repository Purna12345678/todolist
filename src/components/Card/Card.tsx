import React from "react";
import "./Card.css"; 

interface CardProps {
  item: { id: number; title: string; compleated: boolean };
  toggleSelection: (id: number) => void;
  removeItem: (id: number) => void;
  editItem: (id: number, title: string) => void;
  highlight?: boolean; 
}

const Card: React.FC<CardProps> = ({
  item,
  toggleSelection,
  removeItem,
  editItem,
  highlight = false,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(item.title);

  return (
    <div className="listitem1">
      <input
        type="checkbox"
        className="item-checkbox"
        checked={item.compleated}
        onChange={() => toggleSelection(item.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={() => {
            editItem(item.id, newTitle);
            setIsEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editItem(item.id, e.currentTarget.value);
              setIsEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        <span
          className={`listitem ${item.compleated ? "strikethrough" : ""}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {item.title}
        </span>
      )}

      <button className="remove-this" onClick={() => removeItem(item.id)}>
        X
      </button>
    </div>
  );
};


export default Card;
