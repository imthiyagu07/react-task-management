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
    if (user) {
      loadMyTasks();
    }
  }, [user]);

  const handleComplete = (taskId) => {
    const allTasks = getTasks();
    const updatedTasks = allTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: 'Completed' };
      }
      return task;
    });
    saveTasks(updatedTasks);
    loadMyTasks();
  }

  return (
    <div>
      <h2>My Tasks</h2>
      {myTasks.length === 0 ? (
        <p>No tasks assigned to you yet.</p>
      ) : (
        <div>
          {myTasks.map(task => (
            <div key={task.id}>
              <div>
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <div>
                    Status: <span>{task.status}</span>
                  </div>
                </div>

                {task.status !== 'Completed' && (
                  <button onClick={() => handleComplete(task.id)}>Mark Done</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDashboard