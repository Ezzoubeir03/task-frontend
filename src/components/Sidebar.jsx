import {House, Settings, Check, List, LogOut} from "lucide-react";




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
            <House size={20} />
            <span>🏠 Home</span> 
        </button>
        <button className={`nav-item ${activePage === "all" ? "active" : ""}`} onClick={() => setActivePage("all")}>
            <List size={20} />
            <span>☷ All Tasks</span> 
        </button>
        <button className={`nav-item ${activePage === "completed" ? "active" : ""}`} onClick={() => setActivePage("completed")}>
            <Check size={20}/>
            <span>✓ Completed</span>
        </button>
        <button className={`nav-item ${activePage === "settings" ? "active" : ""}`} onClick ={() => setActivePage("settings")}>  
            <Settings size={20} />
            <span>Settings</span>
       </button>
       <button className={"nav-item"}>
            <LogOut size={20} />
            <span>Logout</span>
       </button>
    </nav>
 </aside>
);
}
export default Sidebar;