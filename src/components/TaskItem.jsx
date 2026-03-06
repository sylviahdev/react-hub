// components/TaskItem.jsx
import { useState } from "react";

export default function TaskItem({ task, onToggle, onEdit, onDelete, mainColor, dangerColor }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(editText);
      setIsEditing(false);
    }
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        padding: 12,
        borderRadius: 8,
        border: "1px solid #e0e0e0",
        backgroundColor: "#fafafa",
        transition: "all 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input type="checkbox" checked={task.completed} onChange={onToggle} />
        {isEditing ? (
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleEdit(); }}
            style={{ padding: 6, fontSize: 16, borderRadius: 6, border: "1px solid #ccc" }}
          />
        ) : (
          <span style={{
            textDecoration: task.completed ? "line-through" : "none",
            opacity: task.completed ? 0.6 : 1,
            fontSize: 16
          }}>
            {task.text}
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {isEditing ? (
          <button
            onClick={handleEdit}
            style={{
              padding: "8px 16px",
              backgroundColor: mainColor,
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Save ✏️
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              padding: "8px 16px",
              backgroundColor: mainColor,
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Edit ✏️
          </button>
        )}
        <button
          onClick={onDelete}
          style={{
            padding: "8px 16px",
            backgroundColor: dangerColor,
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Delete 🗑️
        </button>
      </div>
    </li>
  );
}