import { useDrag } from 'react-dnd';

const DraggableTask = ({ task }) => {
    const [drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag}>
            <strong>{task.title}</strong>
            <small>{task.status}</small>
        </div>
    );
};

export default DraggableTask;