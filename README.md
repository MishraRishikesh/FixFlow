# 🔧 FixFlow

### Simplifying Hostel Management

FixFlow is a full-stack hostel management platform designed to digitize
and streamline everyday hostel operations — from maintenance complaints
and worker assignments to student attendance and fee management.

Instead of treating hostel management as a collection of disconnected
CRUD operations, FixFlow models the actual workflow between students,
wardens, workers, and administrators.

---

## 🚀 What Makes FixFlow Different?

FixFlow is built around **role-based workflows**, not just pages and forms.

A complaint raised by a student can move through the complete lifecycle:

```text
Student
   ↓
Raise Complaint
   ↓
Warden
   ↓
Assign Worker
   ↓
Worker
   ↓
Update Status
   ↓
Completed
```

---

The same system also handles:

👨‍🎓 Student management
🛠️ Worker management
🏢 Hostel management
📋 Complaint management
📅 Attendance
💰 Fee management
📊 Dashboard analytics
🔐 Role-based access control

---

## ✨ Key Features

📋 Complaint Management

A complete complaint workflow rather than a simple complaint form.

-Students can raise complaints
-Categories and priorities
-Complaint status lifecycle
-Warden assignment of workers
-Worker-specific assigned complaints
-Worker status updates
-Search and filtering
-Pagination
-Complaint history and dashboard statistics

---

👥 Role-Based Access Control

FixFlow supports four roles:

| Role       | Responsibility                          |
| ---------- | --------------------------------------- |
| 👑 Admin   | Hostel-level administration             |
| 🛡️ Warden  | Manage hostel operations                |
| 🧑‍🔧 Worker  | Handle assigned complaints              |
| 🎓 Student | Raise complaints and view personal data |

Authorization is enforced on the backend, not only hidden in the frontend.

---

🎓 Student Management

Wardens can manage students belonging to their hostel.

Add students
Update student information
Search students
Activate/deactivate accounts
View student records

Students use the same authenticated system while only accessing
the information relevant to their role.

---

🛠️ Worker Management

Wardens can manage maintenance workers.

Create workers
Update worker information
Activate/deactivate workers
Assign workers to complaints
Track active workers

---

📅 Attendance Management

Wardens can maintain student attendance.

Supported states:

--> Present
--> Absent
--> On Leave

Includes:

-> Daily attendance
-> Attendance history
-> Student-specific attendance
-> Date-based filtering
-> Attendance percentage
-> Student self-view

On Leave records are excluded from attendance percentage calculations.

---

💰 Fee Management

FixFlow includes a complete hostel fee workflow.

Wardens can:

Set fees for all active students
Set or update individual student fees
Record payments
Track partial payments
View payment history
Filter by payment status

Students can view:

Total fee
Amount paid
Remaining amount
Due date
Payment status
Payment history

The system also prevents invalid operations such as recording a payment
greater than the remaining balance.

---

📊 Dashboard

The dashboard provides an operational overview of the hostel.

It includes:

Pending complaints
Active complaints
Resolved complaints
Worker statistics
Complaint analytics
Recent activity
Recent complaints
Role-specific quick actions

---

🔐 Security & Authorization

Security is handled at the backend level.

The application uses:-

1. JWT-based authentication
2. Password hashing with bcrypt
3. Role-based authorization
4. Protected API routes
5. Backend ownership/hostel checks
6. Input validation
7. Frontend route protection

The frontend controls what users see.

The backend controls what users are actually allowed to do.

---

🏗️ Architecture

┌─────────────────────────────┐
│ React Frontend │
│ │
│ Pages • Components • UI │
│ React Query • Axios │
└──────────────┬──────────────┘
│
│ REST API
▼
┌─────────────────────────────┐
│ Node.js + Express │
│ │
│ Routes → Controllers │
│ → Services │
│ → Models │
│ │
│ JWT Authentication │
│ Role-based Authorization │
└──────────────┬──────────────┘
│
▼
┌─────────────────────────────┐
│ MongoDB │
│ │
│ Staff │
│ Hostels │
│ Complaints │
│ Attendance │
│ Fees │
│ Payments │
└─────────────────────────────┘

---

🧩 Tech Stack

1. Frontend :-

-> React
-> Vite
-> Tailwind CSS
-> React Router
-> TanStack Query
-> Axios
-> Lucide React

2. Backend :-

-> Node.js
-> Express.js
-> MongoDB
-> Mongoose
-> JWT
-> bcrypt

3. Development :-

-> Git
-> GitHub
-> ESLint
-> VS Code

---

📁 Project Structure :-

FixFlow/
│
├── backend/
│ └── src/
│ ├── constants/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── app.js
│
├── frontend/
│ └── src/
│ ├── components/
│ ├── constants/
│ ├── context/
│ ├── hooks/
│ ├── layouts/
│ ├── pages/
│ ├── routes/
│ ├── services/
│ ├── App.jsx
│ └── main.jsx
│
├── CHANGELOG.md
├── LICENSE
├── PRODUCT_DECISIONS.md
├── README.md
└── V2_IDEAS.md

---

🔄 Example Workflow

Maintenance Complaint :-

Student raises complaint
↓
Warden reviews complaint
↓
Warden assigns worker
↓
Worker starts work
↓
Worker updates status
↓
Complaint completed

---

Hostel Fees :-

Warden sets fee
↓
Student fee record created
↓
Payment recorded
↓
Balance updated
↓
Payment history maintained

---

Attendance :-

Warden selects date
↓
Attendance marked
↓
Records stored
↓
Student views attendance
↓
Attendance percentage calculated

---

## 🎯 Design Goals

FixFlow was designed with a few principles:

Build around real workflows rather than isolated CRUD screens
Keep role permissions explicit
Keep business logic in the backend
Make the architecture modular
Keep the system extensible for future hostel operations
Maintain a clean and simple user interface

---

## 🔮 Future Scope

Possible future extensions include:-

Room allocation
Hostel notices
Notifications
Online fee payments
Maintenance inventory
Advanced analytics
Dark mode
Mobile application
Multi-hostel administration
Automated notifications

These are intentionally kept outside the current V1 scope.

---

## 📌 Project Status

V1 Complete

Core hostel management workflows have been implemented and tested locally.

Deployment is planned separately.

-------X--------X--------X---------
