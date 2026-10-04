import TaskForm from "./components/TaskForm";
import { useState } from "react";
import TaskItem from "./components/TaskItem";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  async function addTask() {
  if (task.trim() === "") return;

  try {
    const response = await fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task,
      }),
    });

    console.log("Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Failed to add the task:", errorText);
      return;
    }

    const newTask = await response.json();

    console.log("New task added:", newTask);

    setTasks([...tasks, newTask]);
    setTask("");
  } catch (error) {
    console.error("Failed to add task:", error);
     }
  }
  return (
    <div>
      <h1> Task Manager</h1>
      <TaskForm task={task} setTask={setTask} addTask={addTask} />

      {/* <button onClick={addTask}>Add Task </button> */}

      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </ul>
    </div>
    );
}  
export default App;