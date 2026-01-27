import { useState } from "react";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  return (
    <div>
      <h1>Task Tracker</h1>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />

      <button
        onClick={() => {
          if (input.trim() === "") return;
          setTasks([...tasks, input]);
          setInput("");
        }}
      >
        Add Task
      </button>

      <ul>
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
