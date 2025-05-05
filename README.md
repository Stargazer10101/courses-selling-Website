# Online Course Selling Website

This project is a full-stack web application designed for selling online courses. It features distinct roles for Administrators (who manage courses) and Users (who can browse and purchase courses). The application utilizes a React frontend with Material UI for styling and a Node.js/Express backend with JWT authentication.

## Features

**Admin Features:**

*   **Signup & Login:** Secure registration and login for administrators.
*   **Course Management:** Create new courses (including title, description, price, image URL).
*   **Admin Dashboard:** View all available courses listed in the system.
*   *(Potential Future/Implied):* Edit and Delete courses.

**User Features:**

*   **Signup & Login:** Secure registration and login for users.
*   **Browse Courses:** View all available courses offered on the platform.
*   **Purchase Courses:** Add desired courses to their account.
*   **View My Courses:** Access a dedicated page listing all courses they have purchased.

**General Features:**

*   **JWT Authentication:** Stateless authentication using JSON Web Tokens ensures secure access to protected routes.
*   **Role-Based Access:** Distinct interfaces and capabilities based on whether the logged-in user is an Admin or a regular User.
*   **Responsive UI:** Frontend built with Material UI for a consistent look and feel across different devices.
*   **State Management:** Utilizes Recoil for efficient global state management on the frontend.

## Technology Stack

**Frontend:**

*   **React:** JavaScript library for building user interfaces.
*   **Material UI (MUI):** React UI framework for faster and easier web development.
*   **Recoil:** State management library for React.
*   **React Router:** Declarative routing for React applications.
*   **Vite:** Next-generation frontend tooling for fast development builds.
*   **Fetch API:** Used for making requests to the backend API.

**Backend:**

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Web application framework for Node.js.
*   **JSON Web Tokens (JWT):** Used for implementing stateless authentication (`jsonwebtoken` library).
*   **File System (`fs`):** Node.js module used for basic data persistence via JSON files (for development/demo purposes).
*   **CORS:** Middleware to enable Cross-Origin Resource Sharing.

## Project Structure

.
├── backend/
│ ├── data/ # JSON files for storing data
│ │ ├── admins.json
│ │ ├── courses.json
│ │ └── users.json
│ ├── .gitignore
│ ├── index.js # Main backend server file
│ └── package.json
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── atoms/ # Recoil atoms
│ │ ├── components/ # React components
│ │ ├── state/ # Recoil selectors/auth state logic
│ │ ├── api.js # Helper for API calls
│ │ ├── App.jsx # Main application component with routing
│ │ └── main.jsx # Entry point for React app
│ ├── .gitignore
│ ├── index.html
│ ├── package.json
│ └── vite.config.js
└── README.md # This file

## Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm) installed on your machine.

## Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

## Running the Application

You need to run both the backend and frontend servers simultaneously.

1.  **Start the Backend Server:**
    *   Navigate to the `backend` directory: `cd backend`
    *   Run the server:
        ```bash
        node index.js
        ```
    *   The backend server will typically start on `http://localhost:3000`.

2.  **Start the Frontend Development Server:**
    *   Open a *new* terminal window/tab.
    *   Navigate to the `frontend` directory: `cd frontend`
    *   Run the development server:
        ```bash
        npm run dev
        ```
    *   The frontend development server will typically start on `http://localhost:5173` (Vite's default) or another available port. Your browser might open automatically, or you can navigate to the provided URL in the terminal output.

3.  **Access the Application:**
    Open your web browser and go to the frontend URL (e.g., `http://localhost:5173`).

## API Endpoints (Backend - localhost:3000)

*(Note: Routes marked with `[Auth Required]` need a valid JWT token in the `Authorization: Bearer <token>` header.)*

*   `POST /admin/signup`: Register a new admin.
*   `POST /admin/login`: Login as an admin, returns JWT token.
*   `GET /admin/courses`: **[Auth Required]** Get all courses (for admin dashboard).
*   `POST /admin/courses`: **[Auth Required]** Create a new course.
*   `PUT /admin/courses/:courseId`: **[Auth Required]** Update an existing course.
*   `POST /users/signup`: Register a new user.
*   `POST /users/login`: Login as a user, returns JWT token.
*   `GET /users/courses`: **[Auth Required]** Get all available courses for users to browse/purchase.
*   `POST /users/courses/:courseId`: **[Auth Required]** Purchase a course.
*   `GET /users/purchasedCourses`: **[Auth Required]** Get courses purchased by the logged-in user.

## Potential Future Improvements

*   Replace JSON file storage with a proper database (e.g., MongoDB, PostgreSQL).
*   Implement course editing and deletion functionality for admins.
*   Add more detailed course content viewing for users.
*   Integrate a payment gateway for real course purchases.
*   Enhance error handling and user feedback.
*   Add unit and integration tests.