# Project Title
- ecommerce-api-v2

## Description
- A RESTful API for eCommerce applications, providing endpoints for managing products, orders, customers, and payments.


## Features
- MongoDB + Mongoose
- Bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication



## Installation
- 
git clone https://yourusername/ecommerce-api-v2.git
cd project-folder
npm install

 ## Usage 
 npm start

🧪 API Endpoints
✅ POST /api/auth/signup
## Register a new user.
URL: /api/auth/signup
Method: POST
Request Body:
{
  "email": "user@example.com",
  "password": "yourPassword123",
  "phoneNumber": "1234567890"
}

✅POST /api/auth/login
Login a user and get a token.
URL: /api/auth/login
Method: POST
Request Body:
{
  "email": "user@example.com",
  "password": "yourPassword123"
}


🧰 Tech Stack
- Node.js
- Express
- MongoDB with Mongoose
- bcryptjs
- jsonwebtoken
- dotenv

🛠️ Environment Variables (.env)
## Create a .env file in your root directory:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h

## Author
Welldone Esu 

---

## Second commit and Push

git add .
git commit -m "feat(auth): implement user signup and login with JWT and bcrypt"
git push origin main

## Licence
- MIT Licence
