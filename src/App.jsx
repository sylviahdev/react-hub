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
           setTasks([
  ...tasks,
  { text: input, completed: false }
]);

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
    onToggle={() =>
      setTasks(
        tasks.map((t, i) =>
          i === index
            ? { ...t, completed: !t.completed }
            : t
        )
      )
    }
    onEdit={(newText) =>
      setTasks(
        tasks.map((t, i) =>
          i === index ? { ...t, text: newText } : t
        )
      )
    }
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
