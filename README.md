
# Task Manager Application

A full-stack Task Manager web application built with:
- **Frontend**: Angular 19 (Standalone APIs, Http Interceptor with JWT)
- **Backend**: Spring Boot (REST API + JWT Authentication)
- **Database**: MySQL

---

## 🔧 Project Structure

```
task-manager/
│
├── backend/          # Spring Boot REST API
│
└── frontend/         # Angular 19+ application
```

---

## ▶️ How to Run

### 🧩 Backend (Spring Boot)

#### Requirements:
- Java 17+
- Maven 3+
- MySQL

#### Steps:
1. **Configure DB**  
   Update `application.properties` in `src/main/resources/`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/task_manager
   spring.datasource.username=root
   spring.datasource.password=your_password

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
   jwt.secret=9132110ff471e7d57cb348eb534e83b109fd29a62b34677b65d8b068ff30d93d
   ```

2. **Build & Run**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

   Backend will run at: `http://localhost:8080`

---

### 🌐 Frontend (Angular 19)

#### Requirements:
- Node.js 18+
- Angular CLI

#### Steps:
1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Run Angular app**
   ```bash
   ng serve
   ```

3. **App URL**
   - Open in browser: `http://localhost:4200`

---

## 🛢️ Database Setup

1. **Create a database in MySQL**:
   ```sql
   CREATE DATABASE task_manager;
   USE task_manager;
   ```

2. **Manually create the required tables**:

```sql
-- Users table
CREATE TABLE user (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Tasks table
CREATE TABLE task (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) ,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);
```

> Ensure your entity class mappings align with these table structures.

---

## 🔐 Authentication (JWT)

- Backend uses JWT for protected API endpoints.
- Angular uses an `AuthInterceptor` to attach the JWT token to HTTP requests.

---

## 🚀 Features

- User Authentication (Login/Register with JWT)
- Create, Update, Delete, View Tasks
- Protected Routes & Interceptor Integration
- Responsive UI using Angular Standalone Components

---

## 📦 API Endpoints

| Method | Endpoint               | Description           |
|--------|------------------------|-----------------------|
| POST   | `/api/auth/login`      | User login            |
| POST   | `/api/auth/register`   | User registration     |
| GET    | `/api/tasks`           | Get all tasks         |
| GET    | `/api/tasks/{id}`      | Get task by ID        |
| POST   | `/api/tasks`           | Create a task         |
| PUT    | `/api/tasks/{id}`      | Update a task         |
| DELETE | `/api/tasks/{id}`      | Delete a task         |

> All `/api/tasks/**` routes require Authorization: `Bearer <token>`

---

## 🤝 Contributions

Feel free to fork and contribute!

---

## 📃 License

This project is licensed under the MIT License.
