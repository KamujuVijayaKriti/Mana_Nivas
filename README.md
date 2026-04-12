# Mana Nivas - Real Estate Platform

Mana Nivas is a full-stack real estate property management and discovery platform. It connects property owners with potential buyers and renters. It allows users to browse properties, and property owners to list their properties securely. 

Live At - https://kamujuvijayakriti.github.io/Mana_Nivas/

## 🚀 Tech Stack

### Frontend
- **React.js 18**
- **Vite** - Next Generation Frontend Tooling
- **React Router Dom** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Framer Motion** - Animations
- **Lucide React** - Beautifully simple icons

### Backend
- **Node.js & Express.js** - Fast, unopinionated, minimalist web framework
- **MongoDB & Mongoose** - NoSQL database and object modeling
- **JSON Web Token (JWT)** - Secure authentication
- **Bcryptjs** - Password hashing securely

---

## 📂 Project Structure

The project uses a monorepo-style structure, housing both the frontend and backend in their respective directories.

```text
e:\ManaNivas-main\
├── frontend/          # React + Vite Application
│   ├── src/           # Frontend source code (components, pages, contexts)
│   ├── public/        # Static assets
│   ├── package.json   # Frontend npm dependencies
│   └── vite.config.js # Vite configuration
├── backend/           # Express/Node.js Server
│   ├── models/        # Mongoose database schemas
│   ├── routes/        # Express API routes
│   ├── controllers/   # Route handlers & logic
│   ├── server.js      # Backend entry point
│   └── package.json   # Backend npm dependencies
├── package.json       # Root package.json to manage full-stack scripts
└── README.md
```

---

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URL)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KamujuVijayaKriti/Mana_Nivas.git
   cd Mana_Nivas
   ```

2. **Install all dependencies:**
   The root `package.json` contains a `postinstall` script that will automatically install both frontend and backend dependencies.
   ```bash
   npm install
   ```
   *(Alternatively, you can manually run `npm install` inside both the `frontend/` and `backend/` directories).*

3. **Configure Environment Variables:**
   - Navigate to the `backend/` directory and create a `.env` file.
   - Add your MongoDB connection string and JWT secret:
     ```env
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```
   - Navigate to the `frontend/` directory and create a `.env` file (if you have custom environment variables for Vite, they must start with `VITE_`):
     ```env
     VITE_API_URL=http://localhost:5000/api
     ```

### Running the Application

You can start the frontend and backend servers together or separately using the root scripts:

- **Start both servers concurrently** (if `concurrently` is configured, or run in separate terminals):
  ```bash
  # Terminal 1 - Starts the Node.js Express server on port 5000
  npm run start:backend 

  # Terminal 2 - Starts the Vite React development server on port 5173
  npm run start:frontend
  ```

Once running, you can view the frontend in your browser, typically at `http://localhost:5173`.

---

## ✨ Key Features
- **User Authentication:** Secure login and sign-up with JWT and password encryption.
- **Role-based Access:** Features tailored whether you are a buyer/renter or a property owner.
- **Property Listings:** Browse, search, and view detailed information regarding real estate properties.
- **Dynamic Search:** Filter properties by type (rent, sale, co-living) and location.
- **Responsive Design:** Optimized to seamlessly work on desktops, tablets, and mobile devices.

---

## 📄 License
This project is licensed under the MIT License.
