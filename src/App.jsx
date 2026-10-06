import TaskForm from "./components/TaskForm";
import { useState } from "react";
import TaskItem from "./components/TaskItem";
import Sidebar from "./components/Sidebar";
import "./App.css";
import  DashboardHeader from "./components/DashboardHeader";
import TaskOverview from "./components/TaskOverview";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  async function addTask() {
  if (task.trim() === "") return;

  
  ////this is for connecting our frontend to the backend API
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
  async function updateTask(updatedTask){
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${updatedTask.id}`,{
        method:"PUT",
        headers : {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok){
        console.error("Failed to update the task");
        return;
      }
      const savedTask = await response.json();

      setTasks(
        tasks.map((task) => task.id ===savedTask.id ? savedTask : task)
      );
    } catch (error){
      console.error("Failed to update task:", error);
    }
  }
  return (
    <div className ="app">
      <Sidebar />
      <main className="main">
       <DashboardHeader />
        <TaskOverview tasks={tasks} />
        <TaskForm task={task} setTask={setTask} addTask={addTask} />

      {/* <button onClick={addTask}>Add Task </button> */}
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} updateTask={updateTask} />
        ))}
         </ul>
      </main>
    </div>
    );
}  
export default App;