function DashboardHeader(){
    return(
        <header className="dashboard-header">
            <div>
                <p className="welcome-text">
                   Good afternoon, Ezzoubeir👋
                </p>
                <h1>My Tasks</h1>

                <p className="subtitle">
                    Stay focused and keep making progress.
                </p>
            </div>
            <button className="add-task-button">
                + Add Task
            </button>
        </header>
    );

}
export default DashboardHeader;