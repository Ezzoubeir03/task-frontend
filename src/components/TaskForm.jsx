function TaskForm({ task, setTask, addTask}){
      return(
        <div>
            <input type="text" placeholder="Enter a new task" value={task} onChange={(e) => setTask(e.target.value)}/>
            <button onClick={addTask}> Add Task</button>

        </div>
      );
}
export default TaskForm;