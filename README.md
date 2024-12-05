# **Budget Tracking Application**

A feature-rich application designed for personal and administrative budget management. Built with simplicity and robust functionality in mind.

---

## **Table of Contents**

1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Installation](#installation)  
4. [Usage Instructions](#usage-instructions)  
5. [Folder Structure](#folder-structure)  
6. [License](#license)

---

## **Features**

### **User Authentication**
- Admin (admin@example.com) and regular user (user@example.com) roles.
- Login system with email.
- Role-based access control for managing application permissions.

### **Expense Management**
- Add expenses with the following details:
  - Amount.
  - Description.
  - Category.
  - Optional document upload as proof.
- Track entries with timestamps.
- Support for both debit and credit expenses.

### **Access Control**
- **Regular Users**:
  - Can add expenses.
  - Mark expenses for deletion.
- **Admins**:
  - Approve and delete marked expenses.
  - View summaries of total debits and credits.

### **Data Persistence**
- Data stored in **localStorage** for offline access.
- Persistent data across page refreshes with no network connection required.

### **Document Management**
- Upload documents as proof for expenses.
- View uploaded documents in a new tab.
- Documents stored as local URLs.

---

## **Technologies Used**
- HTML, CSS, JavaScript.
- LocalStorage for data persistence.
- Simple role-based logic for authentication and access control.

---

## **Installation**

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/budget-tracking-app.git
   cd budget-tracking-app
