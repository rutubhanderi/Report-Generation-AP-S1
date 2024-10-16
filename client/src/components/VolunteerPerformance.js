import React from 'react';

const VolunteerPerformance = ({ volunteer }) => {
    return (
        <div className="border p-4 mb-4 rounded shadow">
            <h2 className="font-bold">{volunteer.first_name} {volunteer.last_name}</h2>
            <p>Email: {volunteer.email}</p>
            <p>Tasks Completed: {volunteer.tasks_completed}</p>
            <p>Hours Logged: {volunteer.hours_logged}</p>
        </div>
    );
};

export default VolunteerPerformance;
