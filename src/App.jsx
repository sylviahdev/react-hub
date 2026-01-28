import { useEffect, useState } from "react";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app">
     <h1>Task Tracker</h1>
<p className="subtitle">Simple React app by Sylviah</p>

      <div className="input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task"
        />

        <button
          onClick={() => {
            if (!input.trim()) return;
            setTasks([...tasks, input]);
            setInput("");
          }}
        >
          Add
        </button>
      </div>

      <ul>
        {tasks.length === 0 && (
  <p className="empty">No tasks yet 👀</p>
)}

        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            onDelete={() =>
              setTasks(tasks.filter((_, i) => i !== index))
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
