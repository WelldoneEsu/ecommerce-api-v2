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

📦 Product Routes

These API endpoints allow for managing products in the system. All routes are protected and require authentication via the protect middleware.

🔐 Authentication

All endpoints require a valid token. Make sure to include the token in the Authorization header as:
Authorization: Bearer <your-token-here>

📘 Endpoints
## GET /api/products/
Fetch all products.
Auth required: Yes
Query params: (optional) — e.g., pagination, filtering
Response: 200 OK with list of products

## GET /api/products/:id
Fetch a single product by ID.
Auth required: Yes
URL params: id (Product ID)
Response: 200 OK with product details

## POST /api/products/
Create a new product.
Auth required: Yes
Body params (JSON):
{
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description",
  "category": "Category Name"
}

Response: 201 Created with new product

## PATCH /api/products/:id
Update an existing product.
Auth required: Yes
URL params: id (Product ID)
Body params: Partial or full product fields
Response: 200 OK with updated product

## DELETE /api/products/:id
Delete a product by ID.
Auth required: Yes
URL params: id (Product ID)
Response: 204 No Content

## 🛒 Cart system
# This module handles adding products to a cart, viewing the cart, and removing items.

🔑 Authentication
- All cart routes are protected using JWT.
- Add your token from /auth/login in the headers:
Authorization: Bearer <your_token>

# 📌 Endpoints
1. Add Product to Cart
# POST /cart/add
📥 Request Body

{
  "productId": "64f98765def123",
  "quantity": 2
}
📤 Response

{
  "_id": "6501c3f5e7a12d",
  "userId": "64d12345aaa999",
  "products": [
    {
      "productId": "64f98765def123",
      "quantity": 2
    }
  ],
  "createdAt": "2025-09-17T10:00:00.000Z",
  "updatedAt": "2025-09-17T10:05:00.000Z"
}

# 2. Get User’s Cart
# GET /cart
📤 Response
{
  "_id": "6501c3f5e7a12d",
  "userId": "64d12345aaa999",
  "products": [
    {
      "productId": {
        "_id": "64f98765def123",
        "name": "Laptop",
        "price": 1000,
        "stock": 5
      },
      "quantity": 2
    }
  ]
}

# 3. Remove Item from Cart
# DELETE /cart/remove/:id
📤 Response

{
  "_id": "6501c3f5e7a12d",
  "userId": "64d12345aaa999",
  "products": []
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

## Third commit and Push

git add .
git commit -m "feat: implement cart add/remove"
git push origin main

## Licence
- MIT Licence
