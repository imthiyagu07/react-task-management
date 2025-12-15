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
      <div className="App">
        {!user ? (
          <LoginForm />
        ) : (
          <div>
            <header>
              <h1>Task Manager</h1>
              <div>
                <span>Welcome, {user.username} ({user.role})</span>
                <button onClick={logout}>Logout</button>
              </div>
            </header>
            <main>
              {user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
            </main>
          </div>
        )}
      </div>
    </DndProvider>
  )

}

export default App;