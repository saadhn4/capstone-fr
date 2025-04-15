# 🍽️ Restaurant Review App

A full-stack restaurant review application built using the MERN stack (MongoDB, Express.js, React, Node.js), featuring authentication, review posting, and secure API handling.

---

## 🚀 Features

- **User Authentication**:
  - Sign Up & Sign In
  - JWT-based authentication
  - Secure password storage (bcrypt)

- **Restaurant Reviews**:
  - Create, Read, and Delete reviews
  - Add images and detailed descriptions

- **Dynamic Routing**:
  - Protected routes using `react-router-dom`
  - Authenticated users redirected appropriately

- **Animated UI**:
  - Beautiful UI with Tailwind CSS
  - Smooth animations powered by Framer Motion

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt

---

## 🚦 Routes Overview

| Route                 | Description            | Access        |
|-----------------------|------------------------|---------------|
| `/`                   | Homepage               | Public        |
| `/login`              | Login Page             | Public        |
| `/register`           | Registration Page      | Public        |
| `/reviews`            | List All Reviews       | Authenticated |
| `/reviews/:id`        | Single Review Details  | Authenticated |
| `/create`             | Post New Review        | Authenticated |

---

## 💻 How to Run Locally

1. **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd <project_directory>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the app:**
    ```bash
    npm run dev
    ```

   The app will open at [http://localhost:5173](http://localhost:5173).

---

## 📡 Backend API Endpoints

- Authentication (`/api/public`):
  - `POST /register`: Sign up new users
  - `POST /login`: Authenticate users

- Reviews (`/api/posts`):
  - `GET /getall`: Retrieve all reviews
  - `GET /get/:id`: Retrieve a single review
  - `POST /create`: Add new reviews (authenticated)
  - `DELETE /delete/:id`: Delete reviews (authenticated)

---

## ⚙️ Environment Setup

Create a `.env` file in your backend root folder:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5010