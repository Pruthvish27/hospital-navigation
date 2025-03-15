# Hospital Management System
### Brief Details
This project is a Hospital Management System designed to manage various aspects of a hospital, including departments, rooms, reports, and administrative tasks. The system is built using modern web technologies and follows a frontend-backend-database architecture. The frontend is developed using Vite + React with shadcn UI and Tailwind CSS, while the backend is powered by Django and Django REST Framework. The database is hosted on Supabase using PostgreSQL.

### Details
The Hospital Management System is divided into several modules:

Departments: Displays information about different hospital departments and their associated doctors.

Rooms Information: Provides details about hospital rooms and floors.

Report Mapping: Manages and categorizes various hospital tests and reports.

Admin Page: Allows administrators to manage tables, insert/delete rows, and perform CRUD operations on the database.

The system is designed to be user-friendly, with a clean and intuitive interface. It also includes features like pagination, animations, and responsive design.

## Installation
Prerequisites
Before you begin, ensure you have the following installed on your system:
```
Node.js (v16 or higher)

Python (v3.8 or higher)

PostgreSQL (v12 or higher)

Git (for cloning the repository)
```
### Step 1: Clone the Repository
First, clone the repository to your local machine:

```git clone https://github.com/your-username/hospital-management-system.git
cd hospital-management-system
```

### Step 2: Set Up the Frontend
`Navigate to the frontend directory:`

`cd frontend`
Install the required dependencies:

`npm install`
Start the development server:

`npm run dev`
`The frontend should now be running on http://localhost:3000.`

### Step 3: Set Up the Backend
Navigate to the backend directory:


`cd ../backend`
Create a virtual environment and activate it:


`python -m venv venv`
`venv\Scripts\activate`
Install the required Python packages:


`pip install -r requirements.txt`

Set up the database:

```
Ensure you have a PostgreSQL database running.

Update the settings.py file with your database credentials.
```

Run migrations:


`python manage.py migrate`
Start the Django development server:


`python manage.py runserver`
The backend should now be running on `http://localhost:8000`.

### Step 4: Set Up Supabase (Database)
```
Create a new project on Supabase.

Set up the required tables (departments, doctors, tables, etc.) in the Supabase dashboard.

Update the Supabase credentials in the frontend and backend configurations.
```

### Step 5: Run the Application

`Ensure both the frontend and backend servers are running.`

Open your browser and navigate to ``http://localhost:3000`` to access the application.

# Credits
## Developers
### Pruthvish Ghedia (aka Dimey)

Frontend, Backend, Database

1st Year Student (2024-2025) @ R.C. Technical Institute, Ahmedabad (ICT Department)

### Garv Bumtariya (aka Gary)

Frontend

2nd Year Student (2024-2025) @ R.C. Technical Institute, Ahmedabad (IT Department)

### Vaidehi Modh

Backend, Database

2nd Year Student (2024-2025) @ R.C. Technical Institute, Ahmedabad (IT Department)

### Tanvi

Helper

2nd Year Student (2024-2025) @ R.C. Technical Institute, Ahmedabad (IT Department)

## Quote
"We are the students of change, we think of change to start bringing change. We support advice and learn from every suggestion. We are developers."

# Technologies Used
## Frontend
### Vite + React: Fast and modern frontend development.

### shadcn UI: A collection of reusable UI components.

### Tailwind CSS: Utility-first CSS framework for styling.

### TypeScript: Adds static typing to JavaScript for better code quality.

## Backend
### Django: A high-level Python web framework.

### Django REST Framework: For building RESTful APIs.

## Database
### PostgreSQL: A powerful, open-source relational database.

### Supabase: Hosting and managing the PostgreSQL database.

## Features
Department Management: View and manage hospital departments and doctors.

Room Information: Search and view details about hospital rooms and floors.

Report Mapping: Categorize and manage hospital tests and reports.

Admin Panel: Perform CRUD operations on database tables.

Responsive Design: Works seamlessly on both desktop and mobile devices.

Animations: Smooth animations using Framer Motion.

## Future Enhancements
User Authentication: Add login and registration for different user roles (admin, doctor, patient).

Appointment Scheduling: Allow patients to book appointments with doctors.

Integration with External APIs: Integrate with payment gateways or third-party services.

Advanced Analytics: Provide insights into hospital operations and patient data.

Contributing
We welcome contributions from the community! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes and push to your branch.

Submit a pull request with a detailed description of your changes.



## Contact
For any questions or suggestions, feel free to reach out:

Pruthvish Ghedia: dimey9682@gmail.com

Garv Bumtariya: garv18980@gmail.com

Vaidehi Modh: vaidehimodh2007@gmail.com
