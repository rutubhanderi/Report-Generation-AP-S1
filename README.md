# Report Generation AP S1

A full-stack report generation application that allows users to manage and view reports. The app is designed with React on the frontend, Node.js on the backend, and utilizes PostgreSQL for database management.

## Features

- **User Management**: Allows admins to manage volunteers and assign roles with specific access permissions.
- **Report Management**: Enables users to create, edit, view, and delete reports for streamlined data tracking.
- **Responsive Design**: Designed to be mobile-friendly, offering a seamless experience across devices.

## Project Structure

- **client**: React frontend with components and pages.
- **server**: Node.js backend with APIs for admin and volunteer operations.
- **database**: PostgreSQL scripts for database setup and sample data insertion.

## Prerequisites

- **Node.js**: Ensure Node.js is installed to run the server.
- **Database**: Set up PostgreSQL and execute the SQL scripts provided in the `database` folder.

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
     cd client
     npm install
     ```
3. **Configure the Database**:
   - Set up a Supabase account and project.
   - Configure your environment variables with the Supabase connection details, typically found in the project's .env file.
   - Run the SQL scripts located in the database folder within your Supabase project to create the necessary tables and insert sample data. Start with table_creation.sql for the structure and admin_table_insertion.sql for initial admin credentials.
4. **Run the Application:**:
   - Start the backend server:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd client
     npm start
     ```
   - The application should now be running, with the frontend typically accessible at http://localhost:3000 and the backend at http://localhost:3001 (or as specified in your configuration).
  
## Usage 

- **Admin Login**: Log in using the admin credentials set in the admin_table_insertion.sql script. The admin dashboard will allow access to all report and user management features.
- **Creating Reports**:On the dashboard, you can create new reports, edit existing ones, and assign tasks to volunteers.
- **Editing and Printing Repors**:Volunteers can log in, view and update reports.Both admin and volunteers can view and print reports.

## Project Structure

- **client**:Contains the React frontend application, including components for user interfaces like report tables, forms, and dashboards.
- **server**:Node.js backend, including routes, models, and controllers for handling report and user-related data.
- **database**: PostgreSQL scripts to create the required tables and populate them with sample data.


## Tech Stack

- **Frontend**:React, Tailwind CSS for styling, and fetch api for API requests.
- **Backend**:Node.js with Express for API routing and handling server-side logic.
- **Database**:PostgreSQL for database and Supabase for database management and real-time data sync.

## Database

**Setting up Supabase**

- Go to [supabase.com](https://supabase.com/)
- Fill in the following details in the "Create a new project" section:
    - Organization: Choose the organization for the project ("eg. Akshar Paaul").
    - Project Name: Enter a project name ("eg. Akshar Paaul NGO Database").
    - Database Password: Set a secure password for the database or use the "Generate a password" option.
    - Region: Choose the region closest to your users for optimal performance ("South Asia (Mumbai)").
      
      ![Screenshot 2024-10-29 091118](https://github.com/user-attachments/assets/bda9bac5-3007-402a-b2e7-2e98f57905a5)
- Click **Create new project** to finalize.
- Once created, your project will appear under your organization's list of projects in the dashboard .

  ![Screenshot 2024-10-29 090929](https://github.com/user-attachments/assets/48cdc552-38df-4cdd-8f80-06026f8f919a)




   
