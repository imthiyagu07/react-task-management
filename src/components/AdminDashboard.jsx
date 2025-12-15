import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { getTasks } from "../utils/storage";

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);

    const refreshTasks = () => {
        setTasks(getTasks());
    }

    useEffect(() => {
        refreshTasks();
    }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <div>
                <div>
                    <TaskForm onTaskAdded={refreshTasks} />
                </div>
                <div>
                    <h3>Current Tasks</h3>
                    {tasks.length === 0 ? <p>No tasks found.</p> : (
                        <ul>
                            {tasks.map(task => (
                                <li key={task.id}>
                                    <strong>{task.title}</strong> - <span>{task.status}</span>
                                    <br />
                                    <small>Assigned to User ID: {task.assigneeId}</small>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard