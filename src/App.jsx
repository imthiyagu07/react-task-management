import { useEffect } from "react";
import useAuthStore from "./stores/authStore";
import { initializeUsers } from "./utils/storage";
import LoginForm from "./components/LoginForm";

const App = () => {
  const {user, logout} = useAuthStore();
  useEffect(() => {
    initializeUsers();
  }, []);

  return (
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
        </div>
      )}
    </div>
  )

}

export default App;