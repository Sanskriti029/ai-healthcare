# 🏥 Smart Healthcare Web Platform

A full-stack healthcare web application that enables users to analyze symptoms, book appointments, find hospitals/pharmacies, and receive real-time updates — built using **React and  Flask, **.

---

## 🚀 Features

### 🔐 Authentication & Security

* User Registration & Login
* JWT-based Authentication
* Password Hashing (Bcrypt)
* Protected Routes (Frontend + Backend)
* Secure API Access

---

### 🧠 AI Symptom Triage

* Users input symptoms
* System analyzes severity
* Suggests:

  * Self-care
  * Doctor consultation
  * Emergency action
* suggest medicine 
* suggest doctor for appointment if needed in case of medium and high severity based on doctors availability 
* Generates downloadable **PDF reports**

---

### 📅 Appointment Booking

* Book appointments with doctors
* Authenticated booking system
* Stores appointment data in database
* Handles errors (401 Unauthorized, etc.)
* shows details of doctor 

---

### 🔄 Real-Time Notifications

* Live updates for:
  * Appointment queue
  * Turn notifications
* Enhances user experience with real-time feedback

---

### 🔍 Smart Search System

* Search for:
  * Hospitals
  * Doctors
  * Pharmacies  
* Dynamic data fetching from backend APIs

---

### 🏥 Hospital & Pharmacy Finder

* View hospital details
* Fetch pharmacies by area
* Integrated with triage & appointment flow

---

### 🧑‍⚕️ User Dashboard

* Manage users
* Monitor appointments
* Seed initial data
* Control system operations

### 🧑‍⚕️ Admin Dashboard

* Monitor appointments
* Seed initial data
* Control system operations

### Messaging & Appointment Notifications

* Displays appointment confirmation messages
* Fetches real-time data from backend (/api/appointments)
* Secure access using JWT authentication
* Clean and structured UI for better readability
---
### 🎨 Frontend UI (React + Tailwind CSS)

* Responsive design
* Clean dashboard layout
* Gradient buttons & modern styling
* Mobile-friendly navigation
* Back button navigation support

---

### ⚙️ Backend (Flask)

* REST API architecture
* Flask-JWT-Extended for auth
* Flask-SQLAlchemy for database
* Flask-CORS enabled

---

### 🗄️ Database

* SQLite database
* Models:

  * User
  * Hospital
  * Doctor
  * Appointment
  * Pharmacy
* Seed data support

---

### 📄 Report Generation

* Generate PDF reports from triage results
* Downloadable for users

---

## 🧩 Tech Stack

### Frontend:

* React.js
* React Router
* Tailwind CSS

### Backend:

* Flask
* Flask-CORS
* Flask-JWT-Extended
* Flask-SQLAlchemy
* Flask-Bcrypt

### Database:

* SQLite

---

## 🔄 Application Flow

1. User registers/logs in
2. Enters symptoms in triage
3. Receives health analysis
4. Gets hospital/doctor suggestions
5. Books appointment
6. Receives real-time queue updates
7. Finds nearby pharmacies
8. Downloads health report

---

## ⚡ Installation & Setup

### 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```

---

### 🔹 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in backend:

```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
```

---

## 📌 API Endpoints (Sample)

| Method | Endpoint              | Description            |
| ------ | --------------------- | ---------------------- |
| POST   | /api/register         | Register user          |
| POST   | /api/login            | Login user             |
| GET    | /api/hospitals        | Get hospitals          |
| GET    | /api/pharmacies?area= | Get pharmacies by area |
| POST   | /api/appointments     | Book appointment       |

---

## 💡 Future Enhancements

* 🧠 AI/ML model for accurate diagnosis
* 📍 Google Maps integration
* 🔔 Push notifications
* 💳 Payment gateway
* 📱 Mobile app version
* 📊 Analytics dashboard

---

## 🏆 Highlights

* Full-stack implementation
* Real-time features 
* Healthcare-focused problem solving
* Scalable and modular architecture
