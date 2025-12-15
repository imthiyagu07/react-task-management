import { useEffect } from "react";
import useAuthStore from "./stores/authStore";
import { initializeUsers } from "./utils/storage";
import LoginForm from "./components/LoginForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App = () => {
  const { user, logout } = useAuthStore();

  useEffect(() => {
    initializeUsers();
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        {!user ? (
          <LoginForm />
        ) : (
          <>
            <header className="app-header">
              <h1>Task Manager</h1>
              <div className="user-info">
                <span>Welcome, {user.username} ({user.role})</span>
                <button className="btn btn-logout" onClick={logout}>Logout</button>
              </div>
            </header>
            <main className="main-content">
              {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
            </main>
          </>
        )}
      </div>
    </DndProvider>
  )
}

export default App;