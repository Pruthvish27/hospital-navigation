# Hospital Management System
## Problem
### Problem Statement: Hospital Navigation System

### Description of the Problem:
Navigating large hospitals, especially government hospitals, is a significant challenge for patients, visitors, and staff. Hospital infrastructure is often spread across multiple blocks, making it difficult for patients to locate the correct departments efficiently. This leads to confusion, increased waiting times, and dissatisfaction among patients and visitors. Additionally, there is no real-time system to track doctor availability, further complicating the process.

### Current Challenges:

Complex Navigation: Hospital layouts are often confusing, with multiple departments spread across large areas.

Lack of Real-Time Information: Patients and visitors have no way to check doctor availability in real time.

Language Barriers: Many patients struggle with language barriers, as navigation systems often lack multi-language support.

Over-reliance on Staff: Hospital staff are frequently burdened with guiding patients, leading to inefficiencies.

### Expected Outcomes:

A user-friendly digital solution that simplifies hospital navigation.

Real-time tracking of doctor availability.

Multi-language support to cater to diverse patients.

Reduced stress on patients, visitors, and staff.

### Potential Impact:

Improved patient and visitor satisfaction.

Enhanced patient experience.

Minimized staff inconvenience in guiding patients.

## Solution
### Hospital Navigation System
Our Hospital Management System is a web-based solution designed to address the challenges of hospital navigation and doctor availability. The system provides an interactive, user-friendly platform that helps patients and visitors locate departments, find doctors, and navigate hospital premises efficiently.

### Key Features
Patient-Side Features
Interactive Hospital Map:

Displays departments, pathways, and key locations within the hospital.

Click on a department to view available doctors and their real-time status.

### Search Functionality:

Search for departments by name or specialty.

View real-time doctor availability within each department.

### Doctor Availability Status:

Doctors are marked as "Available," "On Break," or "Unavailable."

Patients can see live updates on doctor availability.

### Multi-Language Support:

Supports multiple languages (e.g., English and local languages) to cater to diverse patients.

Hospital Staff-Side Features
### Doctor Login & Availability Management:

Doctors can log in and update their status (Available, Unavailable, On Break).

Simple dashboard for managing availability.

Admin Dashboard:

View all doctors and their current status.

Manually update doctor availability if needed.

# Technical Overview
## Tech Stack
### Frontend:

Vite + React: For a fast and modern user interface.

TypeScript: Adds static typing for better code quality.

Tailwind CSS: Utility-first CSS framework for responsive design.

ShadCN UI: Reusable UI components for a consistent design.

### Backend:

Django: A high-level Python web framework for handling business logic.

Django REST Framework (DRF): For building RESTful APIs.

### Database:

PostgreSQL: A powerful, open-source relational database.

Supabase: Hosting and real-time synchronization of the database.

### Real-Time Updates:

Supabase Realtime: Ensures live updates across all devices.

### Mapping & Navigation:

OpenStreetMap + Leaflet.js: For interactive hospital maps.

### Multi-Language Support:

i18next: For translating the interface into multiple languages.

Implementation Strategy
### Database & Backend Development:

Set up PostgreSQL on Supabase for cloud-based data storage.

Create API endpoints in Django REST Framework to handle:

Fetching department locations.

Checking doctor availability.

Storing user feedback.

### Frontend Development:

Build an interactive hospital map using Leaflet.js.

Implement search functionality for departments and doctors.

Add real-time doctor availability tracking.

Integrate multi-language support using i18next.

### Real-Time Doctor Availability System:

Doctors log in and update their status (Available, Unavailable, On Break).

Patients see live updates on the hospital dashboard.

### Multi-Device Synchronization:

Supabase ensures automatic data sync across all devices.

Updates made by doctors are instantly visible to patients.

## Future Enhancements
Dynamic Maps: Integrate with Google Maps API or OpenStreetMap for more advanced navigation.

AI Chatbot: Provide AI-powered assistance for navigation and queries.

Appointment Booking System: Allow patients to book appointments directly through the platform.

QR Code Navigation: Patients scan QR codes to get navigation instructions to their desired department.

# Installation
### Prerequisites
Before you begin, ensure you have the following installed on your system:
```
Node.js (v16 or higher)

Python (v3.8 or higher)

PostgreSQL (v12 or higher)

Git (for cloning the repository)
```
### Step 1: Clone the Repository
First, clone the repository to your local machine:


```
gh repo clone Pruthvish27/hospital-navigation
cd hospital-navigation
```
Step 2: Set Up the Frontend
Navigate to the frontend directory:

```
cd frontend
```
Install the required dependencies:

```
npm install
```
Start the development server:

```
npm run dev
```
The frontend should now be running on `http://localhost:3000`.

Step 3: Set Up the Backend
Navigate to the backend directory:

```
cd ../backend
```
Create a virtual environment and activate it:

```
python -m venv venv
venv\Scripts\activate
```
Install the required Python packages:

```
pip install -r requirements.txt
```
Set up the database:

`Ensure you have a PostgreSQL database running.`

`Update the settings.py file with your database credentials.`

Run migrations:

```
python manage.py migrate
```
Start the Django development server:

```
python manage.py runserver
```
The backend should now be running on `http://localhost:8000`.

### Step 4: Set Up Supabase (Database)
```
Create a new project on Supabase.

Set up the required tables (departments, doctors, tables, etc.) in the Supabase dashboard.

Update the Supabase credentials in the frontend and backend configurations.
```

### Step 5: Run the Application
Ensure both the frontend and backend servers are running.

Open your browser and navigate to `http://localhost:3000` to access the application.

# Credits
## Developers
### Pruthvish Ghedia (aka Dimey)

Frontend, Backend, Database

1st Year Student (2024-2025) @ R.C. Technical Institute, Ahmedabad (ICT Department)

Email: dimey9682@gmail.com

### Garv Bumtariya (aka Gary)

Frontend

2nd Year Student (2024-2025) @ R.C. Technical Institute, Ahmedabad (IT Department)

Email: garv18980@gmail.com

### Vaidehi Modh

Backend, Database

2nd Year Student (2024-2025) @ R.C. Technical Institute, Ahmedabad (IT Department)

Email: vaidehimodh2007@gmail.com

### Tanvi

Helper

2nd Year Student (2024-2025) @ R.C. Technical Institute, Ahmedabad (IT Department)

# Quote
## "We are the students of change, we think of change to start bringing change. We support advice and learn from every suggestion. We are developers."

# Technologies Used
## Frontend
```
Vite + React: Fast and modern frontend development.

shadcn UI: A collection of reusable UI components.

Tailwind CSS: Utility-first CSS framework for styling.

TypeScript: Adds static typing to JavaScript for better code quality.
```
## Backend
```
Django: A high-level Python web framework.

Django REST Framework: For building RESTful APIs.
```
## Database
```
PostgreSQL: A powerful, open-source relational database.

Supabase: Hosting and managing the PostgreSQL database.
```
# Features
```
Department Management: View and manage hospital departments and doctors.

Room Information: Search and view details about hospital rooms and floors.

Report Mapping: Categorize and manage hospital tests and reports.

Admin Panel: Perform CRUD operations on database tables.

Responsive Design: Works seamlessly on both desktop and mobile devices.

Animations: Smooth animations using Framer Motion.
```
Future Enhancements
```
User Authentication: Add login and registration for different user roles (admin, doctor, patient).

Appointment Scheduling: Allow patients to book appointments with doctors.

Integration with External APIs: Integrate with payment gateways or third-party services.

Advanced Analytics: Provide insights into hospital operations and patient data.
```
# Contributing
We welcome contributions from the community! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes and push to your branch.

Submit a pull request with a detailed description of your changes.

# Contact
For any questions or suggestions, feel free to reach out:

## Pruthvish Ghedia: dimey9682@gmail.com

## Garv Bumtariya: garv18980@gmail.com

## Vaidehi Modh: vaidehimodh2007@gmail.com
