function Sidebar(){
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
        <div className="nav-item active">
             🏠 Home
        </div>
        <div className="nav-item">
             ☷ All Tasks
        </div>
        <div className="nav-item">
            ✓ Completed
        </div>
        <div className="nav-item">
            ⚙ Settings
        </div>
    </nav>
 </aside>
);
}
export default Sidebar;