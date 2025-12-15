import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { getTasks, getUsers, saveTasks } from "../utils/storage";
import DraggableTask from "./DraggableTask";
import DroppableUser from "./DroppableUser";

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const refreshData = () => {
        setTasks(getTasks());
        setUsers(getUsers());
    }

    useEffect(() => {
        refreshData();
    }, []);

    const handleReassign = (taskId, newUserId) => {
        const updatedTasks = tasks.map(t =>
            t.id === taskId ? { ...t, assigneeId: newUserId } : t
        );
        saveTasks(updatedTasks);
        refreshData();
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <TaskForm onTaskAdded={refreshData} />

            <div className="admin-section">
                <div className="task-source-list">
                    <h3 className="column-title">All Tasks (Drag)</h3>
                    {tasks.map(task => (
                        <DraggableTask key={task.id} task={task} />
                    ))}
                </div>

                <div className="users-target-list">
                    <h3 className="column-title">Users (Drop)</h3>
                    <div className="users-grid">
                        {users.filter(u => u.role !== 'admin').map(user => (
                            <DroppableUser
                                key={user.id}
                                user={user}
                                tasks={tasks.filter(t => t.assigneeId === user.id)}
                                onDropTask={handleReassign}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;