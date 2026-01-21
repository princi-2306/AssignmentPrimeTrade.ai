# 🚀 Assignment – PrimeTrade.ai

**Full-Stack Web Application (Frontend + Backend)**

This project is a **full-stack assignment solution** demonstrating frontend development with **React.js**, a **JWT-secured backend**, and a **dashboard with CRUD functionality**.
It focuses on **clean UI/UX**, **secure authentication**, and **scalable architecture**.

---

## 📌 Project Overview

The application allows users to:

* Register and log in securely
* Access a protected dashboard
* View and update their profile
* Perform **CRUD operations** on a sample entity (e.g., tasks/notes)
* Search and filter data
* Log out securely

The system uses **JWT-based authentication**, **hashed passwords**, and a modular codebase designed for scalability.

---

## 🧩 Tech Stack

### Frontend

* **React.js**
* **React Router** (protected routes)
* **Tailwind CSS** (responsive UI)
* **Axios / Fetch API**
* Client-side form validation

### Backend

* **Node.js + Express**
* **JWT Authentication**
* **bcrypt** for password hashing
* **MongoDB / SQL (configurable)**
* RESTful API design

---

## ✅ Core Features Implemented

### 🔷 Frontend

* Responsive UI using **Tailwind CSS**
* Authentication pages (Login / Signup)
* Dashboard with protected routes
* Client-side form validation
* CRUD UI for a sample entity
* Search & filter functionality
* Logout flow

---

### 🔷 Backend (Supportive)

* User authentication (Signup / Login)
* JWT token generation & verification
* Profile fetch & update APIs
* CRUD APIs for sample entity
* Database integration
* Centralized error handling

---

### 🔷 Dashboard Features

| Feature          | Description                           |
| ---------------- | ------------------------------------- |
| Profile Display  | Fetches user profile from backend     |
| CRUD Operations  | Create, read, update, delete entities |
| Search & Filter  | Filter items by keywords              |
| Protected Access | Accessible only after login           |
| Logout           | Clears auth state securely            |

---

## 🔐 Security Practices

* Password hashing using **bcrypt**
* JWT authentication with middleware
* Protected frontend routes
* Server-side validation
* Proper error handling & response codes

---

## 📁 Project Structure

```
AssignmentPrimeTrade.ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── routes/
│   │   └── services/
│   └── App.jsx
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js (v18+)
* npm or yarn
* MongoDB / SQL database

---

### 🔹 Backend Setup

```bash
cd Backend
npm install
npm run nodemon
```

Create a `.env` file:

```env
PORT=8000
MONGODB_URI="your_MONGODB_URI"
CORS_ORIGIN=*
ACCESS_TOKEN_SECRET=priyanshi@terafortessAccess
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=priyanshi@terafortessRefresh
REFRESH_TOKEN_EXPIRY=10d
CLOUDINARY_CLOUD_NAME=your_cluodinary_name
CLOUDINARY_API_KEY=522913191269979
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_ACCESS_TOKEN_SECRET=admin_access_token
ADMIN_ACCESS_TOKEN_EXPIRY=3d
ADMIN_REFRESH_TOKEN_SECRET=admin_refresh_token
ADMIN_REFRESH_TOKEN_EXPIRY=10d

```

---

### 🔹 Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

App runs at:

```
http://localhost:8000
```

---

## 🔑 Authentication Flow

1. User registers / logs in
2. Backend returns JWT token
3. Token stored securely (localStorage)
4. Token attached to protected API requests
5. Middleware validates token on each request
6. Unauthorized users are redirected to login

---

## 📮 API Documentation

> - 📄 [API Documentation (PDF)](https://docs.google.com/document/d/1-nt00jCa7ahybc6Zrqlx3Q3vFvr9rcU-JcPjXs0WzdQ/edit?usp=sharing) 

---

## 📈 Scalability Strategy (Production Ready)

To scale this application:

### Frontend

* Component-driven architecture
* Code splitting & lazy loading
* Centralized API services
* State management upgrade (Redux)

### Backend

* Modular MVC architecture
* Environment-based configs
* Database indexing
* Rate limiting & caching (Redis)
* Dockerized deployment

---
### Note on Scaling Frontend–Backend Integration for Production

For production, AssignmentPrimeTrade.ai would follow a modern, scalable system design architecture where the frontend and backend operate as loosely coupled services. The React frontend would be optimized using CDN delivery, with API interactions handled through a centralized service layer.

The backend would use a stateless, layered architecture (routes → controllers → services) with JWT-based authentication, enabling horizontal scaling behind a load balancer. Database indexing, caching, and API versioning would ensure performance and maintainability as the system grows.

This architecture supports high availability, security, and long-term scalability.

## 📬 Contact

For questions or improvements, feel free to open an issue in the repository.
