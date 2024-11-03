-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Admin Table
CREATE TABLE Admin (
    Admin_id SERIAL PRIMARY KEY,
    Admin_name CHAR(100) NOT NULL,
    Admin_email CHAR(100) NOT NULL UNIQUE,
    Admin_address TEXT,
    Admin_phone VARCHAR(15),
    Admin_password TEXT NOT NULL, -- Stores hashed password
    Date_of_joining DATE DEFAULT CURRENT_DATE
);

-- Volunteer Table
CREATE TABLE Volunteer (
    Volunteer_id SERIAL PRIMARY KEY,
    Volunteer_name CHAR(100) NOT NULL,
    Volunteer_email CHAR(50) NOT NULL UNIQUE,
    Volunteer_address TEXT,
    Volunteer_phone VARCHAR(15),
    Volunteer_password TEXT NOT NULL, -- Stores hashed password
    Date_of_joining DATE DEFAULT CURRENT_DATE
);

-- Report Table
CREATE TABLE Report (
    Report_id SERIAL PRIMARY KEY,
    Report_name CHAR(100),
    Task_completed INT,
    Task_pending INT,
    Total_hours FLOAT,
    Date DATE,
    Volunteer_id INT REFERENCES Volunteer (Volunteer_id) ON DELETE SET NULL, -- Foreign key to Volunteer
    Report_Description TEXT,
    Report_Comments TEXT,
    Report_status CHAR(50),
    Admin_id INT REFERENCES Admin (Admin_id) ON DELETE SET NULL -- Foreign key to Admin
);

-- Task Table
CREATE TABLE Task (
    Task_id SERIAL PRIMARY KEY,
    Task_name CHAR(100),
    Task_status CHAR(50),
    Report_id INT REFERENCES Report (Report_id) ON DELETE CASCADE
);
