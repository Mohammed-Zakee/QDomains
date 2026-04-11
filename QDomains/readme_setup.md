# QDomains Full-Stack Deployment Details

This document provides system configuration, deployment details, and credentials necessary for demonstrating the QDomains MERN software platform.

## 🚀 Quick Start (Demonstration Ready)

To start the completely configured application to demonstrate to management, simply run the **`start_qdomains.bat`** file from the root directory. 

This batch script will systematically:
1. Validate system prerequisites (Node.js versions).
2. Install any missing application dependencies for both frontend and backend.
3. Boot up the **Express.js API server** on port `5000`.
4. Boot up the **Vite React UI server** on port `5173`.
5. Automatically open `http://localhost:5173` in your default web browser for the demonstration.

## 🗄️ Database Integrations

The system has been unified to a central remote database architecture via MongoDB Atlas.

**MongoDB Connection Details (Atlas Database)**
- **Cluster**: `Cluster0` (`cluster0.phwozlb.mongodb.net`)
- **Database User**: `Zakee`
- **Application DB**: `qdomains`
- **URI Configuration**: The secure connection URI string has been properly URL-encoded (converting `@` to `%40` in the password) and implemented logically into the environment configurations inside the backend.

### Automatic Database Initialization
When the backend server makes a connection to MongoDB Atlas for the first time, it checks for existing users. If the user collection is empty, the server automatically **"seeds"** the database. This creates pre-configured credentials perfectly aligned with your demonstration script.

## 🔑 Administrator & Core Roles Credentials

The backend authenticating system dynamically maps interface routes according to user administrative permissions upon a successful login. Have your management panel try the below generated credentials during your showcase to witness role-based routing control flow:

**1. Administrator / Admin Dashboard**
- **Email:** `admin@qdomains.lk`
- **Password:** `demo1234`
- **Redirects to:** `/dashboard/admin`

**2. Support Agent / Service Module**
- **Email:** `service@qdomains.lk`
- **Password:** `demo1234`
- **Redirects to:** `/dashboard/service`

**3. Client Member / User Interface**
- **Email:** `user@qdomains.lk`
- **Password:** `demo1234`
- **Redirects to:** `/dashboard/user`

*(Note: Utilizing the convenient built-in "Demo Logins" fast-click action menu down the login form will seamlessly autofill these matching credentials and trigger the live API server checks!)*

## 🔗 Architecture Configuration
- **Backend API**: The custom-built backend provides secure API routes using Mongoose ORM for data tracking, JSON Web Tokens (JWT) for payload encryptions, and Express server-side routing (at `http://localhost:5000`).
- **Frontend App**: Modern Vite-React rendering the `dist` application, sending validation and login inputs asynchronously to the connected endpoints at `/api/auth/login` and `/api/auth/register`.

**Everything is prepared and heavily tested. You are cleared for the live demonstration. Best of luck!**
