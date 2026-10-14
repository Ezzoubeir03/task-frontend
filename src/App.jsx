
import { useState, useEffect } from "react";

import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import TaskOverview from "./components/TaskOverview";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";


import { loginUser, registerUser } from "./api/auth";

import "./App.css";

const API_URL = "http://localhost:8080/api/tasks";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [activePage, setActivePage] = useState("home");

  // Authentication state
  const [authToken, setAuthToken] = useState(
    () => sessionStorage.getItem("authToken")
  );

  const isAuthenticated = Boolean(authToken);

  // Task filters
  const currentTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  // Fetch tasks from the backend
  async function getTasks() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch tasks:", response.status);
        return;
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to get tasks:", error);
    }
  }

  // Fetch tasks only after a token exists
  useEffect(() => {
    if (authToken) {
      getTasks();
    } else {
      setTasks([]);
    }
  }, [authToken]);

  // Add a new task
  async function addTask() {
    if (!task.trim()) {
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          title: task.trim(),
        }),
      });

      if (!response.ok) {
        console.error("Failed to add task:", response.status);
        return;
      }

      const newTask = await response.json();

      setTasks((previousTasks) => [...previousTasks, newTask]);
      setTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  }

  // Update a task
  async function updateTask(updatedTask) {
    try {
      const response = await fetch(
        `${API_URL}/${updatedTask.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!response.ok) {
        console.error("Failed to update task:", response.status);
        return;
      }

      const savedTask = await response.json();

      setTasks((previousTasks) =>
        previousTasks.map((previousTask) =>
          previousTask.id === savedTask.id
            ? savedTask
            : previousTask
        )
      );
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  }

  // Delete a task
  async function deleteTask(taskId) {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to delete task:", response.status);
        return;
      }

      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  // Login
  async function handleLogin(credentials) {
    const data = await loginUser(credentials);

    if (!data.token) {
      throw new Error("The server did not return an authentication token.");
    }

    sessionStorage.setItem("authToken", data.token);
    setAuthToken(data.token);
  }

  // Register a new account
  async function handleSignup(user) {
    await registerUser(user);

    // Return to the login form after successful registration.
    // This is a simple reload-based approach for now.
    window.location.reload();
  }

  // Logout
  function handleLogout() {
    sessionStorage.removeItem("authToken");
    setAuthToken(null);
    setTasks([]);
    setTask("");
    setActivePage("home");
  }

  // Show authentication screen when logged out
  if (!isAuthenticated) {
    return (
      <AuthPage
        onLogin={handleLogin}
        onSignup={handleSignup}
      />
    );
  }

  // Dashboard
  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={handleLogout}
      />

      <main className="main">
        {activePage === "home" && (
          <HomePage
            tasks={tasks}
            setActivePage={setActivePage}
            setTask={setTask}
          />
        )}

        {activePage === "all" && (
          <div className="all-tasks-page">
            <div className="all-tasks-heading">
              <h1>All Tasks</h1>
              <p>Manage and track everything you need to do.</p>
            </div>

            <DashboardHeader
              onAddTask={() => {
                document.getElementById("task-input")?.focus();
              }}
            />

            <TaskForm
              task={task}
              setTask={setTask}
              addTask={addTask}
            />

            <TaskOverview tasks={tasks} />

            <ul className="all-task-list">
              {currentTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              ))}
            </ul>

            {currentTasks.length === 0 && (
              <p className="empty-state">
                No pending tasks. You're all caught up!
              </p>
            )}
          </div>
        )}

        {activePage === "completed" && (
          <section className="completed-page">
            <h1>Completed Tasks</h1>
            <p>Here are the tasks you have completed.</p>

            <ul className="all-task-list">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              ))}
            </ul>

            {completedTasks.length === 0 && (
              <p className="empty-state">
                You haven't completed any tasks yet.
              </p>
            )}
          </section>
        )}

        {activePage === "settings" && (
          <section className="settings-page">
            <h1>Settings</h1>
            <p>Manage your Task Manager settings here.</p>

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
