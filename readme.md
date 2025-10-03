# Book Library Project

A (MERN)full-stack **Book Library** application with **Admin and User roles**.  
- **Admin** can create books with title, author, category, description, and image.  
- **User** can view all books and click on a book to see its description.  

The project uses **React + Vite + TailwindCSS** for frontend and **Node.js + Express + MongoDB** for backend.

---

## Features

### Admin
- Add new books with:
  - Title
  - Author
  - Category
  - Description
  - Image
- View all books in a list
- Edit or delete books 
- Role-based authentication and authorization

### User
- View all available books
- Click on a book to see detailed description
- Simple, clean UI for browsing books

---

## Tech Stack

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT Authentication  
**Frontend:** React.js (Vite), TailwindCSS, Axios for API calls, React Router  
**Others:** Cloudinary for book image uploads 

---

## Setup Instructions

## Backend Setup

1. **Clone the Repository**:
  

1. Clone the repository to your local machine:

```bash
git clone https://github.com/nithyasundaram31/book-Library
cd backend
```

**Install Dependencies:**

```bash
npm install
```

**Environment Variables**

To configure the application, you need to set up environment variables. Create a .env file in the root of your backend directory with the following:


```bash
MONGO_URI=your_mongo_connection_url
JWT_SECRET=<your_jwt_secret>
JWT_EXPIRE=1h
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret
```

**MONGO_URI:** 
Your MongoDB connection string.

**JWT_SECRET:** 
A secret key for JWT token generation.

**JWT_EXPIRE:** 
The duration for which the JWT is valid (e.g., 1 hour, 7d).

**Start the Backend Server**
To start the development server, run the following command:

```bash
npm run dev
``` 

## Frontend Setup

1. **Clone the Repository**:
```bash
git clone https://github.com/nithyasundaram31/book-Library
cd frontend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Variables:** Create a .env file in the root of your frontend directory and configure:
```bash
VITE_API_URL=
```

4. **Start the Application:**
``` bash
npm run dev
```


Runs at: http://localhost:5173


## Admin Credentials (for testing)

Email: admin@gmail.com  
Password: admin123

