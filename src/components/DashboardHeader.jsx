function DashboardHeader({onAddTask}){
    return(
        <header className="dashboard-header">
            <div className="header-content">
                <p className="welcome-text">
                   Good afternoon, Ezzoubeir
                   <span>👋</span>
                </p>
                <h1>My Tasks</h1>

                <p className="subtitle">
                    Stay focused and keep making progress.
                </p>
            </div>
            <button className="add-task-button"
                onClick={onAddTask}>
                    <span>+</span> 
                    Add Task
           </button>
            
        </header>
        
    );

}
export default DashboardHeader;