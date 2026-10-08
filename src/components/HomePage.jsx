function HomePage({ tasks = [], setActivePage = () => {}, setTask = () => {} }) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.filter(task => !task.completed).length;
    const recentTasks = [...tasks].slice(-5).reverse();

    return (
        <div className="home-page">
            <section className="welcome-section">
                <div>
                    <p className="welcome-small">Good afternoon Ezzoubeir 👋</p>
                    <h1>Welcome back!</h1>
                    <p className="welcome-text">Stay focused, manage your tasks, and keep making progress.</p>
                </div>

                <div className="welcome-icon">✓</div>
            </section>

            <section className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">☷</div>
                    <div>
                        <p>Total Tasks</p>
                        <h2>{totalTasks}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">✓</div>
                    <div>
                        <p>Completed</p>
                        <h2>{completedTasks}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">◷</div>
                    <div>
                        <p>Pending</p>
                        <h2>{pendingTasks}</h2>
                    </div>
                </div>
            </section>

            <section className="quick-actions">
                <button
                    className="quick-action"
                    onClick={() => {
                        setActivePage("all");
                        setTask("");
                    }}
                >
                    <span className="quick-icon">＋</span>
                    <div>
                        <h3>Add a New Task</h3>
                        <p>Create something you need to accomplish</p>
                    </div>
                    <span className="arrow">→</span>
                </button>
            </section>

            <section className="recent-section">
                <div className="section-header">
                    <div>
                        <h2>Recent Tasks</h2>
                        <p>Your latest tasks</p>
                    </div>

                    <button className="view-all-button" onClick={() => setActivePage("all")}>
                        View All →
                    </button>
                </div>

                <div className="recent-tasks">
                    {recentTasks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">✓</div>
                            <h3>No tasks yet</h3>
                            <p>Create your first task to get started and stay organized.</p>
                            <button onClick={() => setActivePage("all")}>
                                Create Your First Task
                            </button>
                        </div>
                    ) : (
                        recentTasks.map(task => (
                            <div className={`task-card ${task.completed ? "completed" : ""}`} key={task.id}>
                                <div className="task-icon">{task.completed ? "✓" : ""}</div>
                                <div className="recent-task-content">
                                    <span
                                        className={
                                            task.completed ? "recent-task-title completed-text" : "recent-task-title"
                                        }
                                    >
                                        {task.title}
                                    </span>
                                    <span className="task-label">
                                        {task.completed ? "Completed" : "In progress"}
                                    </span>
                                </div>
                                <span className="arrow">→</span>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}

export default HomePage;