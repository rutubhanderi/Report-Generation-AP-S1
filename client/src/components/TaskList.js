import React from 'react';

const TaskList = ({ tasks }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.task_id} className="border-b py-2">
                        <h3 className="font-bold">{task.task_name}</h3>
                        <p>{task.description}</p>
                        <p>Due Date: {task.due_date}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
