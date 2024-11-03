# Report Generation AP S1

A full-stack report generation application that allows users to manage and view reports. The app is designed with React on the frontend, Node.js on the backend, and utilizes SQL for database management.

## Features

- **User Management**: Allows admins to manage volunteers and assign roles with specific access permissions.
- **Report Management**: Enables users to create, edit, view, and delete reports for streamlined data tracking.
- **Responsive Design**: Designed to be mobile-friendly, offering a seamless experience across devices.

## Project Structure

- **client/**: React frontend with components and pages.
- **server/**: Node.js backend with APIs for admin and volunteer operations.
- **database/**: SQL scripts for database setup and sample data insertion.

## Prerequisites

- **Node.js**: Ensure Node.js is installed to run the server.
- **Database**: Set up a relational database (e.g., MySQL) and execute the SQL scripts provided in the `database` folder.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Report-Generation-AP-S1.git
   cd Report-Generation-AP-S1
2. **Install Dependencies**:
   - For the backend:
     ```bash
     cd server
     npm install
     ```
   - For the frontend:
     ```bash
     cd ../client
     npm install
     ```
3. **Configure the Database**:
   - Set up a Supabase account and project.
   - Configure your environment variables with the Supabase connection details, typically found in the project's .env file.
   - Run the SQL scripts located in the database folder within your Supabase project to create the necessary tables and insert sample data. Start with table_creation.sql for the structure and admin_table_insertion.sql for initial admin credentials.
4. **Run the Application:**:
   - Start the backend server:
     ```bash
     cd ../server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd ../client
     npm start
     ```
   - The application should now be running, with the frontend typically accessible at http://localhost:3000 and the backend at http://localhost:5000 (or as specified in your configuration).
  
## Usage 

- **Admin Login**: Log in using the admin credentials set in the admin_table_insertion.sql script. The admin dashboard will allow access to all report and user management features.
- **Creating Reports**:On the dashboard, you can create new reports, edit existing ones, and assign tasks to volunteers.
- **Volunteer Tasks**:Volunteers can log in, view assigned tasks, and update the status of their tasks.

## Project Structure

- **client/**:Contains the React frontend application, including components for user interfaces like report tables, forms, and dashboards.
- **server/**:Node.js backend, including routes, models, and controllers for handling report and user-related data.
- **database/**:SQL scripts to create the required tables and populate them with sample data.

## Tech Stack

- **Frontend**:React, Tailwind CSS for styling, and Axios for API requests.
- **Backend**:Node.js with Express for API routing and handling server-side logic.
- **Database**:Supabase for database management and real-time data sync.




   
