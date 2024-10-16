import React, { useState, useEffect } from 'react';
import { getAllTasks, createTask } from '../services/taskService';
import TaskList from '../components/TaskList';
import axios from 'axios';

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getAllTasks().then((data) => {
            setTasks(data);
        });
    }, []);

    const handleTaskCreate = (task) => {
        createTask(task).then(() => {
            // Refresh task list after creation
            getAllTasks().then((data) => {
                setTasks(data);
            });
        });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <TaskList tasks={tasks} />
            {/* Form for creating tasks */}
        </div>
    );
};

export const getAllTasks = async () => {
    const response = await axios.get('/api/tasks');
    return response.data;
};

export const createTask = async (task) => {
    const response = await axios.post('/api/tasks', task);
    return response.data;
};

export default AdminDashboard;
