import { useDrop } from 'react-dnd';

const DroppableUser = ({ user, tasks, onDropTask }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => onDropTask(item.id, user.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} className={`user-card ${isOver ? 'hovered' : ''}`}>
            <h4>{user.username}</h4>
            {tasks.length === 0 ? (
                <p style={{ color: '#999', fontSize: '0.8rem' }}>No tasks assigned</p>
            ) : (
                <ul className="user-task-list">
                    {tasks.map(t => (
                        <li key={t.id}>
                            {t.title} <span style={{ color: '#666', fontSize: '0.8em' }}>({t.status})</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DroppableUser;