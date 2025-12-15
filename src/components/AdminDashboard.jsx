import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import { getTasks } from "../utils/storage";
import DraggableTask from "./DraggableTask";
import DroppableUser from "./DroppableUser";

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const refreshTasks = () => {
        setTasks(getTasks());
        setUsers(getUsers());
    }

    useEffect(() => {
        refreshTasks();
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
            <div>
                <div>
                    <TaskForm onTaskAdded={refreshData} />
                </div>
                <div>
                    <div>
                        <h3>All Tasks (Drag from here)</h3>
                        {tasks.map(task => (
                            <DraggableTask key={task.id} task={task} />
                        ))}
                    </div>
                    <div>
                        <h3>Users (Drop to assign)</h3>
                        <div>
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
        </div>
    )
}

export default AdminDashboard