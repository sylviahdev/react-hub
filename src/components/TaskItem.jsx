import { useState } from "react";

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.text);

  return (
    <li className="task">
      {isEditing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => {
            onEdit(text);
            setIsEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onEdit(text);
              setIsEditing(false);
            }
          }}
          autoFocus
        />
      ) : (
        <span
          onClick={onToggle}
          style={{
            textDecoration: task.completed
              ? "line-through"
              : "none",
            color: task.completed ? "#888" : "#000",
            cursor: "pointer",
          }}
        >
          {task.text}
        </span>
      )}

      <div>
        <button onClick={() => setIsEditing(!isEditing)}>
          ✏️
        </button>
        <button onClick={onDelete}>🗑</button>
      </div>
    </li>
  );
}

export default TaskItem;
