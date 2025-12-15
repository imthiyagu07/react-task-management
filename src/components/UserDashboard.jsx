import { useState, useEffect } from "react"
import useAuthStore from "../stores/authStore"
import { getTasks, saveTasks } from "../utils/storage"

const UserDashboard = () => {
  const { user } = useAuthStore();
  const [myTasks, setMyTasks] = useState([]);

  const loadMyTasks = () => {
    const allTasks = getTasks();
    const userTasks = allTasks.filter(task => task.assigneeId === user.id);
    setMyTasks(userTasks);
  };

  useEffect(() => {
    if (user) loadMyTasks();
  }, [user]);

  const handleComplete = (taskId) => {
    const updatedTasks = getTasks().map(task =>
      task.id === taskId ? { ...task, status: 'Completed' } : task
    );
    saveTasks(updatedTasks);
    loadMyTasks();
  }

  return (
    <div>
      <h2>My Tasks</h2>
      <div className="my-tasks-grid">
        {myTasks.length === 0 ? <p>No tasks found.</p> : myTasks.map(task => (
          <div key={task.id} className={`my-task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
            <div>
              <strong style={{ fontSize: '1.2rem' }}>{task.title}</strong>
              <p style={{ margin: '0.5rem 0', color: '#555' }}>{task.description}</p>
              <span className="status-badge">{task.status}</span>
            </div>
            {task.status !== 'Completed' && (
              <button className="btn btn-primary" onClick={() => handleComplete(task.id)}>Mark Done</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserDashboard;