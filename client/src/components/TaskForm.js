import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const TaskForm = ({ onTaskCreate }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { task_name: taskName, description, due_date: dueDate };
        await createTask(newTask);
        setTaskName('');
        setDescription('');
        setDueDate('');
        onTaskCreate();
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Create Task</h2>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
                className="border p-2 mb-2 w-full"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="border p-2 mb-2 w-full"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border p-2 mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create Task</button>
        </form>
    );
};

export default TaskForm;
