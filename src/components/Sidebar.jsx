function Sidebar({ activePage, setActivePage }) {
       
    return(
        <aside className="sidebar">

        <div className="logo">
            <div className="logo-icon">
                ✓
            </div>
            <div>
            <h2>Task Manager</h2>
            <p>Plan . Focus . Achieve</p>
        </div>
    </div>
    <nav className="nav">
        <button className={`nav-item ${activePage === "home"? "active" :""}`} onClick={() => setActivePage("home")}>
             🏠 Home
        </button>
        <button className={`nav-item ${activePage === "all" ? "active" : ""}`} onClick={() => setActivePage("all")}>
             ☷ All Tasks
        </button>
        <button className={`nav-item ${activePage === "completed" ? "active" : ""}`} onClick={() => setActivePage("completed")}>
            ✓ Completed
        </button>
        <button className={`nav-item ${activePage === "settings" ? "active" : ""}`} onClick ={() => setActivePage("settings")}>
            ⚙ Settings
        </button>
    </nav>
 </aside>
);
}
export default Sidebar;