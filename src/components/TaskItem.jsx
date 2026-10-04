function TaskItem({task}){
    return(
        <div>
            <h3>{task.title}</h3>
            <p>{task.completed ? 'Completed': 'Not completed'}</p>
        </div>
    );
}
export default TaskItem;