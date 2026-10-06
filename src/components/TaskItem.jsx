function TaskItem({task, updateTask, deleteTask}){
    async function handleToggle(){

        const updatedTask = {...task, completed: !task.completed,}; 
        await updateTask(updatedTask);
    }
     
    
    return(
        <li className="task-item">
            <input type="checkbox" checked={task.completed} onChange={handleToggle} />

            <span className={task.completed ? 'completed': ""}>
                {task.title}
            </span>
            <button className="delete-button" onClick={() => deleteTask(task.id)}>
                Delete
            </button>
        </li>
    );

}
export default TaskItem;