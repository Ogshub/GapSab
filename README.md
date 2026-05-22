# 💬 GapShap — Real-Time Chat Application

GapShap is a full-stack real-time chat application built with the MERN stack and Socket.IO. Users can sign up, set a profile picture, search for other users, and exchange text messages and images in real time.

---

## 🚀 Features

- 🔐 JWT-based authentication (signup / login / logout)
- 👤 Profile management with image upload (Cloudinary)
- 🔍 Search users by name or username
- 💬 Real-time messaging via Socket.IO
- 🖼️ Image sharing in chats
- 🟢 Online user indicators
- 📱 Responsive UI (mobile + desktop)

---

## 🛠️ Tech Stack

| Layer     | Technology                              |
|-----------|------------------------------------------|
| Frontend  | React (Vite), Redux Toolkit, Tailwind CSS |
| Backend   | Node.js, Express.js                     |
| Database  | MongoDB (Atlas)                         |
| Realtime  | Socket.IO                               |
| Images    | Cloudinary + Multer                     |
| Auth      | JWT + bcryptjs + cookie-parser          |

---

## 📁 Project Structure

```
GapSab/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js     # Cloudinary upload helper
│   │   ├── db.js             # MongoDB connection
│   │   └── token.js          # JWT token generator
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   ├── message.controllers.js
│   │   └── user.controllers.js
│   ├── middlewares/
│   │   ├── isAuth.js         # JWT auth middleware
│   │   └── multer.js         # File upload middleware
│   ├── models/
│   │   ├── conversation.model.js
│   │   ├── message.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── message.routes.js
│   │   └── user.routes.js
│   ├── socket/
│   │   └── socket.js
│   ├── public/               # Temporary upload folder (auto-created)
│   ├── .env                  # Environment variables (create from .env.example)
│   ├── .env.example
│   └── index.js              # Entry point
│
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   │   ├── MessageArea.jsx
    │   │   ├── ReceiverMessage.jsx
    │   │   ├── SenderMessage.jsx
    │   │   └── SideBar.jsx
    │   ├── customHooks/
    │   │   └── getMessages.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── SignUp.jsx
    │   │   └── Profile.jsx
    │   ├── redux/
    │   │   ├── store.js
    │   │   ├── userSlice.js
    │   │   └── messageSlice.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env                  # Frontend env (create from .env.example)
    ├── .env.example
    └── index.html
```

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and cluster
- A [Cloudinary](https://cloudinary.com/) account (free tier is fine)

---

## 🔧 Local Setup & How to Run

### 1. Clone the repository

```bash
git clone https://github.com/Ogshub/GapSab.git
cd GapSab
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create your `.env` file from the example:

```bash
copy .env.example .env    # Windows
# OR
cp .env.example .env      # Mac/Linux
```

Edit `.env` and fill in your values:

```env
PORT=5001
MONGODB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/miniproject
JWT_SECRET=your_super_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
```

> 💡 Get Cloudinary credentials at: https://cloudinary.com/console  
> 💡 Get MongoDB URI from your Atlas cluster → Connect → Drivers

Start the backend server:

```bash
npm run dev       # development (with auto-reload)
# OR
npm start         # production
```

Backend will run at: `http://localhost:5001`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create your `.env` file:

```bash
copy .env.example .env    # Windows
# OR
cp .env.example .env      # Mac/Linux
```

Edit `.env`:

```env
VITE_SERVER_URL=http://localhost:5001
```

Start the frontend:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

---

### 4. Open the app

Visit **http://localhost:5173** in your browser, create an account, and start chatting! 🎉

---

## 🌐 Deployment

### Backend → Render (Free)

1. Go to [https://render.com](https://render.com) and sign in
2. Click **New → Web Service**
3. Connect your GitHub repo (`Richa1016/GapSab`)
4. Set the **Root Directory** to `backend`
5. Set **Build Command**: `npm install`
6. Set **Start Command**: `npm start`
7. Add all environment variables from `.env` in the Render dashboard (including `FRONTEND_URL=https://your-vercel-app.vercel.app`)
8. Click **Deploy**

### Frontend → Vercel (Free)

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click **New Project** → Import `Richa1016/GapSab`
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `VITE_SERVER_URL` = your Render backend URL (e.g., `https://gapsab-backend.onrender.com`)
5. Click **Deploy**

> ⚠️ After deploying both, update the backend `FRONTEND_URL` env variable on Render to your Vercel URL.

---

## 🔑 Environment Variables Reference

### Backend (`backend/.env`)

| Variable       | Description                        |
|----------------|------------------------------------|
| `PORT`         | Port for the server (default 5001) |
| `MONGODB_URL`  | MongoDB connection string          |
| `JWT_SECRET`   | Secret for signing JWTs            |
| `CLOUD_NAME`   | Cloudinary cloud name              |
| `API_KEY`      | Cloudinary API key                 |
| `API_SECRET`   | Cloudinary API secret              |
| `FRONTEND_URL` | URL of the deployed frontend       |

### Frontend (`frontend/.env`)

| Variable          | Description                     |
|-------------------|---------------------------------|
| `VITE_SERVER_URL` | URL of the backend API server   |

---

## 👩‍💻 Author

**Richa Maurya**  
GitHub: [@Richa1016](https://github.com/Richa1016)

---

## 📄 License

This project is for academic purposes.
