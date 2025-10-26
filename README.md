# Online Restaurant Backend

## Project Overview

This is a **full-featured backend API** for a food ordering system, built using **Node.js, Express, and MongoDB**.  
It provides secure **user authentication**, **restaurant and food management**, **category CRUD**, and **order placement** functionality. Admins can manage restaurants, food items, and categories, while users can browse food, place orders, and manage their profiles.

---

## Features

### User

- Register, login, and logout
- Update profile and password
- Reset password using security questions
- Delete account

### Restaurant

- Create, read, update, and delete restaurants (Admin)
- Get restaurants by ID or all restaurants
- Track opening status and delivery options

### Food

- CRUD operations for food items
- Retrieve food by restaurant or ID
- Place orders with payment calculation
- Admin can update order status

### Category

- Create, read, update, and delete categories (Admin)
- Associate foods with categories

### Security

- JWT-based authentication
- Password hashing with bcrypt
- Admin-only access middleware for restricted actions

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Security:** bcryptjs for password hashing
- **Environment Management:** dotenv
- **Others:** colors, morgan

---

## Installation & Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd restaurant-backend

2. Install dependencies:
npm install

3. Create a .env file:
PORT=8080
MONGO_URL=mongodb://localhost:27017/restaurantDB
JWT_SECRET=yourSecretKey

4. Start the development server:
npm run dev

Server will run at: http://localhost:8080

API Endpoints

User

Method	                       Endpoint	                           Description
POST	                  /api/users/register	                 Register new user
POST	                  /api/users/login	                     Login user
GET	                      /api/users/profile	                 Get user profile
PUT	                      /api/users/update	                     Update user info
PUT	                      /api/users/update-password	         Update password
POST	                  /api/users/reset-password	             Reset password
DELETE	                  /api/users/:id	                     Delete user


Restaurant

Method	                      Endpoint	                            Description
POST	                  /api/restaurants	                     Create restaurant (Admin)
GET	                      /api/restaurants	                     Get all restaurants
GET	                      /api/restaurants/:id	                 Get restaurant by ID
DELETE	                  /api/restaurants/:id	                 Delete restaurant (Admin)


Food

Method	                     Endpoint	                            Description
POST	                  /api/foods	                         Create food item (Admin)
GET	                      /api/foods	                         Get all food items
GET	                      /api/foods/:id	                     Get food by ID
GET	                      /api/foods/restaurant/:id	             Get food by restaurant ID
PUT	                      /api/foods/:id	                     Update food (Admin)
DELETE	                  /api/foods/:id	                     Delete food (Admin)
POST	                  /api/orders	                         Place order
PUT	                      /api/orders/:id	                     Update order status (Admin)


Category

Method	                     Endpoint	                             Description
POST	                  /api/categories	                      Create category (Admin)
GET	                      /api/categories	                      Get all categories
PUT	                      /api/categories/:id	                  Update category (Admin)
DELETE	                  /api/categories/:id	                  Delete category (Admin)

Deployment

Can be deployed on platforms like Render, Railway, or Heroku.

Use MongoDB Atlas for cloud database hosting.

### 🚀 Live Demo
The API is live here: [https://online-restaurant-backend-api.onrender.com/](https://online-restaurant-backend-api.onrender.com/)

Author

Payal Talwekar
GitHub: Payal-Talwekar-081099
Email: payaltalwekar@gmail.com

License

This project is open-source and free to use.
```
