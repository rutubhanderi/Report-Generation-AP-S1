import React, { useState, useEffect } from 'react';
import { getAllTasks, createTask } from '../services/taskService';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [taskCreated, setTaskCreated] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [taskCreated]);

    const fetchTasks = async () => {
        const data = await getAllTasks();
        setTasks(data);
    };

    const handleTaskCreate = () => {
        setTaskCreated(!taskCreated);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <TaskForm onTaskCreate={handleTaskCreate} />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default AdminDashboard;
