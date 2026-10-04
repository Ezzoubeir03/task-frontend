import { useState } from "react";

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
      <input type ="text" placeholder="Enter a new task" value={task} onChange={(e) =>  setTask(e.target.value)} />

      <button onClick={addTask}>Add Task </button>

      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key ={index} > {task.title} </li>
        ))}
      </ul>
    </div>
    );
}  
export default App;