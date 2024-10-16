import axios from 'axios';

export const getVolunteerPerformance = async () => {
    const response = await axios.get('/api/volunteers/performance');
    return response.data;
};

export const getVolunteerTasks = async () => {
    const response = await axios.get('/api/volunteers/tasks');
    return response.data;
};
