import { useDrop } from 'react-dnd';

const DroppableUser = ({ user, tasks, onDropTask }) => {
    const [drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => onDropTask(item.id, user.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop}>
            <h4>{user.username}</h4>
            {tasks.length === 0 ? (
                <p>No tasks assigned</p>
            ) : (
                <ul>
                    {tasks.map(t => (
                        <li key={t.id}>
                            {t.title} <span>({t.status})</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DroppableUser;