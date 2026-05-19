# 💬 Chatly — Real-Time Chat Application

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**A full-stack, real-time messaging web app built with the MERN stack and Socket.IO.**

Users can sign up, log in, chat one-on-one in real time, share images, search users, edit profiles, and see who's online — all with instant updates powered by WebSockets.

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Socket.IO Events](#-socketio-events)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Secure sign-up & login with hashed passwords (bcrypt) and JWT tokens stored in HTTP-only cookies |
| 💬 **Real-Time Messaging** | Instant one-on-one chat powered by Socket.IO — no page refresh needed |
| 🖼️ **Image Sharing** | Send images in chat — files are uploaded to Cloudinary via Multer |
| 🟢 **Online Status** | See which users are currently online in real time |
| 🔍 **User Search** | Search for other users by name or username |
| 👤 **Profile Management** | Edit your display name and profile picture |
| 🍪 **Persistent Sessions** | Stay logged in for 7 days with cookie-based authentication |
| 📱 **Responsive UI** | Modern interface built with React 19 + Tailwind CSS |
| 🗂️ **State Management** | Centralized app state using Redux Toolkit |
| 😊 **Emoji Picker** | Built-in emoji picker for expressive conversations |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI component library |
| **Vite** | Fast build tool & dev server |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Redux Toolkit** | Global state management |
| **React Router DOM v7** | Client-side routing |
| **Socket.IO Client** | Real-time WebSocket communication |
| **Axios** | HTTP requests to backend API |
| **Emoji Picker React** | Emoji selection in chat |
| **React Icons** | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework for REST APIs |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |
| **Mongoose 8** | MongoDB ODM (Object Data Modeling) |
| **Socket.IO** | Real-time bidirectional communication |
| **JWT** | Token-based authentication |
| **bcrypt.js** | Password hashing |
| **Cloudinary** | Cloud image storage & CDN |
| **Multer** | Multipart file upload handling |
| **cookie-parser** | Parse HTTP cookies |
| **dotenv** | Environment variable management |

---

## 📁 Project Structure

```
Chatly/
├── backend/
│   ├── config/
│   │   ├── db.js                  # MongoDB connection setup
│   │   ├── cloudinary.js          # Cloudinary upload helper
│   │   └── token.js               # JWT token generator
│   ├── controllers/
│   │   ├── auth.controllers.js    # Sign up, Login, Logout logic
│   │   ├── message.controllers.js # Send & get messages
│   │   └── user.controllers.js    # Current user, profile, search
│   ├── middlewares/
│   │   ├── isAuth.js              # JWT authentication guard
│   │   └── multer.js              # File upload middleware
│   ├── models/
│   │   ├── user.model.js          # User schema (name, email, image…)
│   │   ├── message.model.js       # Message schema (text + image)
│   │   └── conversation.model.js  # Conversation with participants & messages
│   ├── routes/
│   │   ├── auth.routes.js         # /api/auth/*
│   │   ├── message.routes.js      # /api/message/*
│   │   └── user.routes.js         # /api/user/*
│   ├── socket/
│   │   └── socket.js              # Socket.IO server & online tracking
│   ├── public/                    # Temporary file uploads (Multer)
│   ├── .env                       # Environment variables (DO NOT COMMIT)
│   ├── index.js                   # App entry point
│   └── package.json
│
├── frontend/
│   ├── public/                    # Static assets (logo, etc.)
│   ├── src/
│   │   ├── components/
│   │   │   ├── SideBar.jsx        # User list & search sidebar
│   │   │   ├── MessageArea.jsx    # Chat window & message input
│   │   │   ├── SenderMessage.jsx  # Outgoing message bubble
│   │   │   └── ReceiverMessage.jsx# Incoming message bubble
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Main chat page (Sidebar + Messages)
│   │   │   ├── Login.jsx          # Login form
│   │   │   ├── SignUp.jsx         # Registration form
│   │   │   └── Profile.jsx       # Profile edit page
│   │   ├── redux/
│   │   │   ├── store.js           # Redux store configuration
│   │   │   ├── userSlice.js       # User, socket & online users state
│   │   │   └── messageSlice.js    # Messages state
│   │   ├── customHooks/
│   │   │   ├── getCurrentUser.jsx # Fetch logged-in user on load
│   │   │   ├── getOtherUsers.jsx  # Fetch all other users
│   │   │   └── getMessages.jsx    # Fetch conversation messages
│   │   ├── App.jsx                # Root component with routes & socket
│   │   ├── main.jsx               # React entry point + server URL
│   │   └── index.css              # Global styles
│   ├── index.html                 # HTML entry point
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md                      # ← You are here
```

---

## 📋 Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** — v18 or higher → [Download](https://nodejs.org/)
- **npm** — comes with Node.js
- **MongoDB Atlas** account (free tier works) → [Sign up](https://www.mongodb.com/atlas)
- **Cloudinary** account (free tier works) → [Sign up](https://cloudinary.com/)
- **Git** → [Download](https://git-scm.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/gabshup.git
cd gabshup
```

### 2. Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file (see section below)
# Then start the server
npm run dev
```

The backend starts on **`http://localhost:8000`** (or your configured PORT).

### 3. Setup Frontend

```bash
# Open a new terminal and navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The frontend starts on **`http://localhost:5173`** — open this URL in your browser.

### 4. You're Ready! 🎉

1. Open `http://localhost:5173` in your browser
2. Create an account on the **Sign Up** page
3. Set up your profile (name & avatar)
4. Start chatting in real time!

---

## 🔑 Environment Variables

Create a `.env` file inside the **`backend/`** directory with the following variables:

```env
# Server
PORT=8000

# MongoDB Atlas connection string
MONGODB_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>"

# JWT secret key (any random string)
JWT_SECRET="your-secret-key-here"

# Cloudinary credentials (from your Cloudinary dashboard)
CLOUD_NAME="your-cloud-name"
API_KEY="your-api-key"
API_SECRET="your-api-secret"
```

> ⚠️ **Important:** Never commit the `.env` file to version control. It's already in `.gitignore`.

### Where to find these values?

| Variable | Where to get it |
|---|---|
| `MONGODB_URL` | MongoDB Atlas → Database → Connect → Drivers → Copy connection string |
| `JWT_SECRET` | Make up any long random string |
| `CLOUD_NAME` | Cloudinary Dashboard → top-left corner |
| `API_KEY` | Cloudinary Dashboard → API Keys |
| `API_SECRET` | Cloudinary Dashboard → API Keys |

---

## 📡 API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Log in an existing user | ❌ |
| `GET` | `/api/auth/logout` | Log out (clears cookie) | ❌ |

**Sign Up — Request Body:**
```json
{
  "userName": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Login — Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

---

### User — `/api/user`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/user/current` | Get logged-in user's profile | ✅ |
| `GET` | `/api/user/others` | Get all other registered users | ✅ |
| `PUT` | `/api/user/profile` | Update name & profile picture | ✅ |
| `GET` | `/api/user/search?query=john` | Search users by name or username | ✅ |

**Edit Profile — Form Data:**
```
name: "John Doe"
image: <file>    (optional, multipart/form-data)
```

---

### Messages — `/api/message`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/message/send/:receiverId` | Send a message (text and/or image) | ✅ |
| `GET` | `/api/message/get/:receiverId` | Get conversation messages | ✅ |

**Send Message — Form Data:**
```
message: "Hello there!"
image: <file>    (optional, multipart/form-data)
```

---

## 🔌 Socket.IO Events

| Event | Direction | Payload | Description |
|---|---|---|---|
| `connection` | Client → Server | `{ userId }` via handshake query | User connects with their ID |
| `getOnlineUsers` | Server → Client | `string[]` (array of user IDs) | Broadcasts currently online users |
| `newMessage` | Server → Client | Message object | Delivers a new message to the receiver in real time |
| `disconnect` | Client → Server | — | User disconnects, removed from online list |

---

## 🗄️ Database Schema

### User
```
┌─────────────┬──────────┬─────────────────────┐
│ Field       │ Type     │ Constraints         │
├─────────────┼──────────┼─────────────────────┤
│ name        │ String   │ Optional            │
│ userName    │ String   │ Required, Unique    │
│ email       │ String   │ Required, Unique    │
│ password    │ String   │ Required (hashed)   │
│ image       │ String   │ Default: ""         │
│ createdAt   │ Date     │ Auto-generated      │
│ updatedAt   │ Date     │ Auto-generated      │
└─────────────┴──────────┴─────────────────────┘
```

### Message
```
┌─────────────┬──────────┬─────────────────────┐
│ Field       │ Type     │ Constraints         │
├─────────────┼──────────┼─────────────────────┤
│ sender      │ ObjectId │ Ref: User, Required │
│ receiver    │ ObjectId │ Ref: User, Required │
│ message     │ String   │ Default: ""         │
│ image       │ String   │ Default: ""         │
│ createdAt   │ Date     │ Auto-generated      │
│ updatedAt   │ Date     │ Auto-generated      │
└─────────────┴──────────┴─────────────────────┘
```

### Conversation
```
┌──────────────┬────────────┬─────────────────────┐
│ Field        │ Type       │ Constraints         │
├──────────────┼────────────┼─────────────────────┤
│ participants │ ObjectId[] │ Ref: User           │
│ messages     │ ObjectId[] │ Ref: Message        │
│ createdAt    │ Date       │ Auto-generated      │
│ updatedAt    │ Date       │ Auto-generated      │
└──────────────┴────────────┴─────────────────────┘
```

---

## 🖼️ Screenshots

> Add your screenshots here after running the app:
> 
> ```
> ![Login Page](./screenshots/login.png)
> ![Chat Page](./screenshots/chat.png)
> ![Profile Page](./screenshots/profile.png)
> ```

---

## 🔧 Troubleshooting

### ❌ `EADDRINUSE: address already in use :::8000`

Port 8000 is already occupied by another process. Fix it:

**Windows (PowerShell):**
```powershell
# Find the process using port 8000
netstat -ano | findstr ":8000"

# Kill it (replace <PID> with the number from the last column)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find and kill
lsof -i :8000
kill -9 <PID>
```

Or simply change the `PORT` in your `.env` file.

---

### ❌ MongoDB connection fails

1. Check that your `MONGODB_URL` in `.env` is correct
2. Make sure your IP address is whitelisted in **MongoDB Atlas → Network Access** (use `0.0.0.0/0` to allow all)
3. Verify your database user credentials

---

### ❌ Cloudinary upload fails

1. Double-check `CLOUD_NAME`, `API_KEY`, and `API_SECRET` in `.env`
2. Ensure your Cloudinary account is active

---

### ❌ Frontend can't reach backend

- Backend must be running on `http://localhost:8000` (the port in `.env`)
- Frontend expects the backend at the URL defined in `src/main.jsx` (`serverUrl`)
- Check that CORS origin in `backend/index.js` matches your frontend URL (`http://localhost:5173`)

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m "Add my feature"`
4. **Push** to the branch: `git push origin feature/my-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [ISC License](https://opensource.org/licenses/ISC).

---

<div align="center">

**Made with ❤️ by Richa Maurya**

⭐ Star this repo if you found it helpful!

</div>
