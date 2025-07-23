# Jewelry Store

A full-stack e-commerce web application for jewelry sales, featuring user authentication, product management, shopping cart, order processing, and an admin dashboard.

---

## Screenshots

![Screenshot 1](https://github.com/user-attachments/assets/3a0bc139-72f2-4ec2-b7a1-76d391dea7cc)
![Screenshot 2](https://github.com/user-attachments/assets/47d219e6-4b78-41ce-aa40-baca66a5962e)
![Screenshot 3](https://github.com/user-attachments/assets/26376fd2-cf05-46cb-b9c9-32762a602189)
![Screenshot 4](https://github.com/user-attachments/assets/af83e1d0-ba74-4f77-8953-2e30be9a8c21)
![Screenshot 5](https://github.com/user-attachments/assets/86a45180-2a2b-4738-a585-cbfe502d4e0d)
![Screenshot 6](https://github.com/user-attachments/assets/53c17540-86e5-472a-af0f-c237fde01254)

---

## Features

- User registration & login (JWT authentication)
- Product catalog with categories
- Shopping cart & checkout
- Order history
- Favorites & feedback
- Admin dashboard for managing users, products, categories, orders, and feedback

---

## Tech Stack

- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, JWT, bcryptjs

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or cloud)

---

### Backend Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file in `backend/` with:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   The backend runs on [http://localhost:5000](http://localhost:5000).

---

### Frontend Setup

1. **Install dependencies:**
   ```bash
   cd FrontEnd
   npm install
   ```

2. **Start the frontend:**
   ```bash
   npm start
   ```
   The frontend runs on [http://localhost:3000](http://localhost:3000).

3. **Proxy setup:**
   - The frontend is configured to proxy API requests to the backend.

---

## Usage

- Visit [http://localhost:3000](http://localhost:3000) in your browser.
- Register a new user or log in.
- Browse products, add to cart, checkout, and view your orders.
- Admin users can access the dashboard for management features.

---

## Folder Structure

```
e-jewelry/
  backend/      # Express API, models, routes
  FrontEnd/     # React app, components, pages, assets
```

---

## License

This project is for educational/demo purposes.
