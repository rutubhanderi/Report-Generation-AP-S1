const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { sequelize } = require('./config/db');

dotenv.config();
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Route Middlewares
app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);

// Sync Database and Start Server
sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(process.env.PORT || 5000, () => {
        console.log('Server running on port 5000');
    });
});
