// App.jsx
import { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";

const MAIN_COLOR = "#4CAF50"; // Green
const DANGER_COLOR = "#f44336"; // Red

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now() + Math.random(), text: input, completed: false }]);
    setInput("");
  };

  const clearTasks = () => setTasks([]);
  const clearCompleted = () => setTasks(tasks.filter(t => !t.completed));

  const totalTasks = tasks.length;
  const remainingTasks = tasks.filter(t => !t.completed).length;

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Poppins', 'Roboto', sans-serif",
        maxWidth: 600,
        margin: "50px auto",
        padding: 25,
        borderRadius: 14,
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ color: MAIN_COLOR, marginBottom: 5 }}>Task Tracker</h1>
      <p className="subtitle" style={{ marginBottom: 15, color: "#555" }}>Simple React app by Sylviah</p>

      {/* Task Counter */}
      <div style={{ marginBottom: 15, fontSize: 14, color: "#333" }}>
        <strong>Total:</strong> {totalTasks} | <strong>Remaining:</strong> {remainingTasks}
      </div>

      {/* Input Row */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") addTask(); }}
          placeholder="Enter task"
          style={{
            flex: 1,
            padding: 12,
            fontSize: 16,
            borderRadius: 6,
            border: "1px solid #ccc",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease-in-out",
            outline: "none"
          }}
          onFocus={(e) => {
            e.target.style.border = `2px solid ${MAIN_COLOR}`;
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #ccc";
            e.target.style.boxShadow = "0 1px 3px rgba(0,0,0,0.08)";
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "12px 20px",
            fontSize: 16,
            backgroundColor: MAIN_COLOR,
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Add
        </button>
        <button
          onClick={clearTasks}
          style={{
            padding: "12px 20px",
            fontSize: 16,
            backgroundColor: DANGER_COLOR,
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Clear All
        </button>
        <button
          onClick={clearCompleted}
          style={{
            padding: "12px 20px",
            fontSize: 16,
            backgroundColor: "#FF9800",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Clear Completed
        </button>
      </div>

      {/* Task List */}
      {tasks.length === 0 ? (
        <p style={{ color: "#777" }}>No tasks yet 👀</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              mainColor={MAIN_COLOR}
              dangerColor={DANGER_COLOR}
              onToggle={() =>
                setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))
              }
              onEdit={(newText) =>
                setTasks(tasks.map(t => t.id === task.id ? { ...t, text: newText } : t))
              }
              onDelete={() => setTasks(tasks.filter(t => t.id !== task.id))}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;