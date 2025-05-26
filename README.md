The live link is here : https://educase-assignment-rxbx.onrender.com


# 📚 School Management API

A Node.js API for managing school data, allowing users to add schools and retrieve a list of schools sorted by proximity to a specified location.

---

## 🚀 Prerequisites

- **Node.js** (v14 or higher)
- **MySQL** (v5.7 or higher)
- **npm** (v6 or higher)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Assignment-Educase
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
- Create `.env` manually.
- Add or update the following variables:
  ```env
  DB_HOST=localhost
  DB_USER=your_mysql_username
  DB_PASSWORD=your_mysql_password
  DB_NAME=school_management
  PORT=3000
  ```

### 4. Initialize the Database
```bash
npm run init-db
```
This command creates the database and required tables.

### 5. Start the Server
```bash
npm start
```
The server will run on the port specified in your `.env` file (default: **3000**).

---

## 📡 API Endpoints

### 🔹 Add School

- **Endpoint**: `/addSchool`  
- **Method**: `POST`  
- **Headers**:  
  `Content-Type: application/json`  
- **Body Example**:
  ```json
  {
    "name": "School Name",
    "address": "School Address",
    "latitude": 12.345678,
    "longitude": 98.765432
  }
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "data": {
      "id": 1,
      "name": "School Name",
      "address": "School Address",
      "latitude": 12.345678,
      "longitude": 98.765432
    }
  }
  ```

---

### 🔹 List Schools (Sorted by Proximity)

- **Endpoint**: `/listSchools`  
- **Method**: `GET`  
- **Query Parameters**:  
  `latitude` and `longitude`  
- **Example**:
  ```
  /listSchools?latitude=12.345678&longitude=98.765432
  ```
- **Success Response**:
  ```json
  {
    "success": true,
    "message": "Schools retrieved successfully",
    "data": [
      {
        "id": 1,
        "name": "School Name",
        "address": "School Address",
        "latitude": 12.345678,
        "longitude": 98.765432,
        "distance": 0
      },
      {
        "id": 2,
        "name": "Another School",
        "address": "Another Address",
        "latitude": 12.355678,
        "longitude": 98.775432,
        "distance": 1.5
      }
    ]
  }
  ```

---

## 🧪 Testing with Postman

### ➤ Add School

- **Method**: `POST`
- **URL**: `http://localhost:3000/addSchool`
- **Headers**:  
  `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "name": "Delhi Public School",
    "address": "Sector 45, Delhi",
    "latitude": 28.5730,
    "longitude": 77.1726
  }
  ```

### ➤ List Schools

- **Method**: `GET`
- **URL**: `http://localhost:3000/listSchools?latitude=28.6139&longitude=77.2090`

---

## 🛠 Development

### Run in Development Mode (with auto-restart)
```bash
npm run dev
```

### Reset the Database
```bash
npm run init-db
```

---

## 📁 Project Structure

```
Assignment-Educase/
├── app.js                 # Main application file
├── config/
│   ├── db.js              # Database connection
│   └── initDb.js          # Database initialization script
├── controllers/
│   └── schoolController.js # Request handlers for schools
├── models/
│   └── schoolModel.js      # DB model and queries
├── routes/
│   └── schoolRoutes.js     # API routes
├── .env                   # Environment variables
└── README.md              # Project documentation
```

---

## 📏 Proximity Calculation

The API uses the **Haversine formula** to calculate the great-circle distance between two geographic coordinates (latitude and longitude), ensuring accurate sorting of schools by proximity.

---
