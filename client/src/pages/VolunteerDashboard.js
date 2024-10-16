import React, { useState, useEffect } from 'react';
import { getVolunteerTasks } from '../services/volunteerService';
import TaskOverview from '../components/TaskOverview';

const VolunteerDashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchVolunteerTasks();
    }, []);

    const fetchVolunteerTasks = async () => {
        const data = await getVolunteerTasks();
        setTasks(data);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Volunteer Dashboard</h1>
            <TaskOverview tasks={tasks} />
        </div>
    );
};

export default VolunteerDashboard;
