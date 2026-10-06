function TaskOverview({ tasks }) {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    return (
        <div className="task-overview">

            <div className="overview-card">
                <p>Total Tasks</p>
                <h2>{totalTasks}</h2>
            </div>

            <div className="overview-card">
                <p>Completed Tasks</p>
                <h2>{completedTasks}</h2>
            </div>

            <div className="overview-card">
                <p>Pending Tasks</p>
                <h2>{pendingTasks}</h2>
            </div>

        </div>
    );
}

export default TaskOverview;


