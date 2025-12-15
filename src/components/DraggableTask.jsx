import { useDrag } from 'react-dnd';

const DraggableTask = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} className={`task-card ${isDragging ? 'dragging' : ''}`}>
            <strong>{task.title}</strong>
            <small>{task.status}</small>
        </div>
    );
};

export default DraggableTask;