import React, { useState, useEffect } from 'react';
import { getVolunteerPerformance } from '../services/volunteerService';
import VolunteerPerformance from '../components/VolunteerPerformance';

const EmployeeDashboard = () => {
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        fetchVolunteerPerformance();
    }, []);

    const fetchVolunteerPerformance = async () => {
        const data = await getVolunteerPerformance();
        setVolunteers(data);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Employee Dashboard</h1>
            {volunteers.map(volunteer => (
                <VolunteerPerformance key={volunteer.volunteer_id} volunteer={volunteer} />
            ))}
        </div>
    );
};

export default EmployeeDashboard;
