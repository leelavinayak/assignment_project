A full-stack web application with user registration, login, and authentication features using JWT tokens.

📋 Project Overview
This project implements a secure user authentication system with the following features:

User registration with email verification

Secure login with password hashing

JWT-based authentication

Email notifications for successful registration

MySQL database integration

🚀 Features
Frontend
Responsive login page with gradient background

User registration page

Form validation

Clean, modern UI design

Backend
Express.js server with RESTful API

MySQL database integration

Password encryption using bcrypt

JWT token generation and verification

Nodemailer for email notifications

CORS enabled for cross-origin requests

Security
Password hashing with bcrypt

JWT tokens for authentication

Input validation and sanitization

Secure database queries

🛠️ Tech Stack
Frontend
HTML5

CSS3 (with modern styling)

Vanilla JavaScript

Backend
Node.js

Express.js

MySQL2 (database driver)

bcrypt (password hashing)

jsonwebtoken (JWT authentication)

Nodemailer (email service)

CORS (Cross-Origin Resource Sharing)

Body-parser (request parsing)

📁 Project Structure
text
project/
│
├── index.html              # Login page
├── register.html           # Registration page
├── server.js               # Main backend server
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependencies
└── README.md               # This file
🔧 Installation & Setup
Prerequisites
Node.js (v18 or higher)

MySQL database

npm or yarn package manager

Step 1: Clone and Install Dependencies
bash
# Clone the project (if applicable)
# git clone <repository-url>

# Navigate to project directory
cd project-directory

# Install dependencies
npm install
Step 2: Database Setup
Create a MySQL database named userdetails

Create a table with the following structure:

sql
CREATE TABLE details (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    UserName VARCHAR(255) NOT NULL,
    UserEmailId VARCHAR(255) UNIQUE NOT NULL,
    Hashedpassword VARCHAR(255) NOT NULL
);
Step 3: Configuration
Update the database credentials in server.js:

javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',           // Update with your MySQL username
    password: 'your_password', // Update with your MySQL password
    database: 'userdetails'
});
Update email credentials in server.js for nodemailer:

javascript
const transporter = nodemailer.createTransport({
    // ... existing configuration
    auth: {
        user: 'your-email@gmail.com', // Your Gmail
        pass: 'your-app-password'     // Gmail App Password
    }
});
Step 4: Run the Application
bash
# Start the server
npm start

# Or with nodemon for development
nodemon server.js
The server will start on http://localhost:3000

📱 API Endpoints
Authentication Routes
POST /register - Register a new user

Request body: { username, email, password }

Response: Success message and email notification

POST /login - User login

Request body: { email, password }

Response: Success message and JWT token

Protected Routes
GET /userdetails - Get user details (requires authentication)

DELETE /delete - Delete user account

🔐 JWT Authentication
The system uses JSON Web Tokens for secure authentication:

Token Generation: Generated during successful login

Token Verification: Middleware verifies tokens for protected routes

Token Expiry: Tokens expire in 12 days

Bearer Token Format: Authorization: Bearer <token>

📧 Email Notifications
The system sends email notifications for:

Successful user registration

Login notifications (if configured)

🎨 UI Design Features
Login Page
Gradient background (#53291e to #feb47b)

Centered card layout with shadow effects

Form validation

Link to registration page

Registration Page
Similar aesthetic to login page

Additional username field

Responsive form layout

Link to login page

⚙️ Configuration Variables
Key configuration variables in server.js:

jwt_token_secret: Secret key for JWT signing

Database connection parameters

Email service credentials

Server port (3000)

🚨 Error Handling
The application includes comprehensive error handling for:

Database connection errors

Duplicate email registration

Invalid login credentials

Missing form fields

Email sending failures

🔒 Security Considerations
Password Security: Uses bcrypt with salt rounds (10)

SQL Injection Prevention: Parameterized queries

Data Validation: Server-side validation of all inputs

Token Security: JWT tokens with expiration

CORS Configuration: Configured for development (* - update for production)

🧪 Testing
Registration Test:

Navigate to http://localhost:3000/register.html

Fill in username, email, and password

Check for success message and email notification

Login Test:

Navigate to http://localhost:3000/index.html

Use registered credentials

Verify successful login and token generation

🚀 Deployment Notes
For Production:
Update CORS configuration to specific origins

Use environment variables for sensitive data

Implement HTTPS

Use a process manager like PM2

Configure proper logging

Set up database connection pooling

Use a secure JWT secret

Environment Variables:
Create a .env file with:

text
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=userdetails
JWT_SECRET=your_secure_jwt_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
📝 Troubleshooting
Common Issues:
Database Connection Error:

Verify MySQL is running

Check credentials in server.js

Ensure database and table exist

Email Not Sending:

Check Gmail app password

Verify less secure apps access (if using Gmail)

Check network connectivity

JWT Token Issues:

Verify token secret matches

Check token expiration

Ensure proper header format

Debug Logs:
Server logs connection status

Database query results

Email sending status

Authentication attempts

🤝 Contributing
Fork the repository

Create a feature branch

Commit changes

Push to the branch

Open a pull request

📄 License
This project is for educational purposes. Modify as needed for your requirements.

👥 Author
Vinayak Kleela
Email: kleelavinayak@gmail.com

🙏 Acknowledgments
Express.js team for the robust framework

MySQL for database management

All open-source contributors of the used packages
