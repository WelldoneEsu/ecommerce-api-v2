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

 ## Orders Module 

The Orders module handles checkout, payment simulation, and retrieving user orders.
It works closely with the Cart module and ensures that when a user checks out, their cart is processed into an order with a simulated payment result.

📌 Features
- Checkout a cart into an order with payment simulation (80% success rate).
- Clear cart after a successful checkout.
- Track order status (pending, paid, failed).
- View all orders of a logged-in user.
- View details of a single order.

## 📂 File Structure
controllers/orderController.js   # Business logic for orders
models/Order.js                  # Mongoose schema for orders
utils/simulatePayment.js         # 80% success payment simulation
routes/orderRoutes.js            # API routes for orders

## 🛠 Endpoints
1. Checkout
POST /orders/checkout
Headers: Authorization: Bearer <token>
Description: Converts the user’s cart into an order and simulates payment.
# If payment succeeds → order status = paid, cart is cleared.
# If payment fails → order status = failed.
✅ Example Response:
{
  "_id": "650ab123456789",
  "userId": "64ffb123456789",
  "products": [
    { "productId": "64abc123456789", "price": 200, "quantity": 2 }
  ],
  "total": 400,
  "status": "paid",
  "createdAt": "2025-09-17T12:00:00.000Z"
}

2. Get all user orders
GET /orders
Headers: Authorization: Bearer <token>
Description: Fetches all orders placed by the logged-in user.
✅ Example Response:
[
  { "_id": "650ab123456789", "total": 400, "status": "paid" },
  { "_id": "650cd987654321", "total": 150, "status": "failed" }
]

3. Get order by ID
GET /orders/:id
Headers: Authorization: Bearer <token>
Description: Fetch details of a specific order by its ID.
✅ Example Response:
{
  "_id": "650ab123456789",
  "userId": "64ffb123456789",
  "products": [
    { "productId": "64abc123456789", "price": 200, "quantity": 2 }
  ],
  "total": 400,
  "status": "paid"
}

## 🔐 Authentication

- All order routes are protected.
- Users must send a JWT token in the Authorization header:
Authorization: Bearer <token>

## 📘 Admin API Routes
These routes are restricted to admin users only and require valid JWT authentication with an admin role.

## 🔐 Authorization Required
All routes must include a valid JWT in the Authorization header.
# Format:
Authorization: Bearer <your_token>
## User must have role: "admin".

## 🛠 Endpoints
# 1. GET	/admin/orders	Get a list of all orders	Admin
# 2. PATCH	/admin/orders/:id/status	Update the status of an order	Admin
# 🟢 GET /admin/orders
- Description: Fetches all orders in the system.
- Access: Admin only.
Example Request:

# GET /admin/orders
- Authorization: Bearer <your_token>
- Example Response:

[
  {
    "_id": "64e51f1b",
    "user": "user123",
    "products": [
      { "productId": "abc123", "quantity": 2 }
    ],
    "total": 49.98,
    "status": "pending",
    "createdAt": "2023-09-01T10:00:00.000Z"
  },
  ...
]

# 🟡 PATCH /admin/orders/:id/status
- Description: Update the status of an order.
- Accepted Status Values: pending, shipped, delivered
- Access: Admin only.
- Example Request:

# PATCH /admin/orders/64e51f1b/status
- Authorization: Bearer <your_token>
- Content-Type: application/json
{
  "status": "shipped"
}
Example Response:
{
  "message": "Order status updated successfully.",
  "order": {
    "_id": "64e51f1b",
    "status": "shipped"
  }
}

# Validation Error Example:
{
  "error": "\"status\" must be one of [pending, shipped, delivered]"
}

## 🛡️ Middleware
# These routes use the following middlewares:
- protect – ensures the user is authenticated.
- authorizedRole('admin') – ensures the user has an admin role.

router.use('/admin', protect, roleCheck('admin'));

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

## fourth commit and Push

git add .
git commit -m "feat: add admin order management"
git push origin main

## Licence
- MIT Licence
