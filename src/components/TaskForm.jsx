import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getUsers, getTasks, saveTasks } from '../utils/storage';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assigneeId, setAssigneeId] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const users = getUsers();
        setUsers(users);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!assigneeId) {
            alert("please select a user to assign the task.");
            return;
        }
        const newTask = {
            if: uuidv4(),
            title,
            description,
            assigneeId,
            status: 'Pending',
        }
        const existingTasks = getTasks();
        const updatedTasks = [...existingTasks, newTask];
        saveTasks(updatedTasks);
        if (onTaskAdded) onTaskAdded(updatedTasks);
        setTitle('');
        setDescription('');
        setAssigneeId('');
    }

    return (
        <div>
            <h3>Create New Task</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Task Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea placeholder="Task Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <select value={assigneeId} onChange={(e) => setAssigneeId(e.target.value)} required>
                    <option value="">Select Assignee</option>
                    {users.filter(u => u.role !== 'admin').map((user) => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                    ))}
                </select>
                <button type="submit">Assign Task</button>
            </form>
        </div>
    )
}

export default TaskForm