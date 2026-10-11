function TaskForm({ task, setTask, addTask}){
      return(
        <div>
            <input type="text"  value={task} onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task tittle..."
            />
            <button onClick={addTask}> Add Task</button>

        </div>
      );
}
export default TaskForm;