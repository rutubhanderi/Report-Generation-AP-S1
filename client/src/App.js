import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/admin" component={AdminDashboard} />
                <Route path="/employee" component={EmployeeDashboard} />
                <Route path="/volunteer" component={VolunteerDashboard} />
            </Switch>
        </Router>
    );
};

export default App;