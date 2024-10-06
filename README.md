# Honors Degree Management Portal (MERN Stack)

This project is a web-based portal for managing honors degree students, courses, and certificates. It provides both student and admin functionalities, allowing students to register, enroll in courses, and submit completion certificates, while administrators can manage courses, accept/reject student applications, and verify certificates.

## Features

### Admin
- View, add, or delete courses.
- Accept or reject student applications.
- View students enrolled in courses.
- Verify and mark course completion upon certificate verification.

### Student
- Register and log in to the portal.
- View available courses and enroll in them.
- Submit course completion certificates for verification.
- View personal profile and enrolled courses.

## Tech Stack
- **Frontend**: React.js, Axios, Material UI
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, bcryptjs, JWT for authentication
- **Database**: MongoDB for storing users, courses, and enrollment data.
- **Tools & Libraries**:
  - **Axios**: For making HTTP requests.
  - **bcryptjs**: For hashing passwords.
  - **JWT (JSON Web Token)**: For secure authentication.
  - **dotenv**: For managing environment variables.
  - **CORS**: To handle Cross-Origin Resource Sharing.
  - **Postman**: For API testing during backend development.



### Backend Folder Structure
- **routes**: Handles API routing for users, courses, and enrollments.
- **config**: To configure the database.
- **controllers**: Manages business logic for API requests and responses.
- **middleware**: To check if the user is logged in and has the role permission to access the URL.
- **models**: Mongoose models for database collections (users, courses, and enrollments).

### Frontend Folder Structure
- **components**: Reusable components such as forms, tables, and navigation.
- **pages**: Page components like the dashboard, profile, and course list.
-  **context**: Authentication Context.
- **api.js**: Axios API service for sending requests to the backend.
- **public**: Static image files.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm (Node Package Manager)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/honors-degree-management-portal.git
   cd honors-degree-management-portal
   ```

2. **Install backend dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the backend folder and add the following:
   ```
   PORT=5002
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=<Your JWT secret key>
   ```

4. **Install frontend dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

5. **Run the project**:
   - Run the backend:
     ```bash
     cd ../backend
     npm start
     ```
   - Run the frontend:
     ```bash
     cd ../frontend
     npm start
     ```

6. **Test with Postman**
   - Open Postman and make a POST request to `/api/auth/register` to create a user.
   - Example Request:
     ```
     POST http://localhost:5002/api/register
     Body (JSON):
     {
       "usn": "1BI21CS",
       "email": "admin@example.com",
       "password": "password123"
     }
     ```
   - After registering the user, proceed to MongoDB.

7. **Make the user an Admin**
   - Open MongoDB Compass or access MongoDB through the CLI.
   - Find the user in the `users` collection and change their `role` field to `admin`.
   - Example:
     ```json
     {
       "_id": ObjectId("..."),
       "usn": "1BI21CS",
       "email": "admin@example.com",
       "password": "...",
       "role": "admin"  // Change this field
     }
     ```

8. **Access the Admin Dashboard**
   - Now, log in using the admin credentials and you should be able to access the admin functionalities.

---

### Postman API Testing
Before integrating the frontend, you can use **Postman** to test backend APIs. Import the provided Postman collection and test endpoints such as:
- **User Authentication** (`/api/auth/login`, `/api/auth/register`)
- **Course Management** (`/api/courses`)
- **Student Management** (`/api/students`)
- **Student Enrollments** (`/api/studentcourse`)

Refer the server.js and Routes folder to know about all the used APIs in the project.

## How to Fork and Run the Project Locally

1. **Fork the repository**:
   Navigate to the repository's GitHub page and click the "Fork" button in the top right.

2. **Clone your forked repository**:
   ```bash
   git clone https://github.com/your-username/honors-degree-management-portal.git
   ```

3. Follow the **Setup** instructions mentioned above.

4. Make your own custom changes, and push them to your forked repository.

5. You can also contribute back by opening a pull request to the original repository.

## Future Scope
- Implement a notification system for course updates.
- Improve performance with pagination and caching mechanisms.
- Implement email-based notifications for student application approval or rejection.
- Implement Message routes for direct communication between Student and Admin.

## Conclusion
This project is designed to streamline the management of honors degree courses and students, providing ease of use and functionality for both students and administrators. The system can be further extended for broader functionalities like detailed performance tracking and certificate generation.

---

Feel free to contribute and enhance the system as needed.
