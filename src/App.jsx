import { useState } from 'react';
function App(){
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);


  function addTask(){
    if(task.trim() === "")return;
    setTasks([...tasks,task]);
    setTask("");
  }
  return (
    <div>
      <h1> Task Manager</h1>
      <input type ="text" placeholder="Enter a new task" value={task} onChange={(e) =>  setTask(e.target.value)} />

      <button onClick={addTask}>Add Task </button>

      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task, index) => (
          <li key ={index} > {task} </li>
        ))}
      </ul>
    </div>
  );
}

export default App;