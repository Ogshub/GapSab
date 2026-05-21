# GapShap (Chatly) Deployment & Git Push Guide

This guide outlines exactly how to push the updated, bug-free codebase to the GitHub repository and deploy the full MERN application (with Socket.io and Cloudinary uploads) live on the web.

---

## Part 1: How to Push the Code to GitHub (`Richa1016/GapSab`)

The automatic git push failed with a `403 Forbidden` error because your local Git system is authenticated as **Ogshub (Shubham Prajapati)**, but the repository **Richa1016/GapSab** is owned by **Richa1016**.

To resolve this and successfully push your code, use one of the two options below:

### Option A: If Shubham has been invited as a Collaborator
1. Open your web browser, log in to your GitHub account (`Ogshub`), and go to the repository page: `https://github.com/Richa1016/GapSab`.
2. Accept the collaborator invitation if you haven't already.
3. Once accepted, run this in your terminal to push:
   ```bash
   git push gapsab main
   ```

### Option B: Push using a Personal Access Token (PAT)
If you have access to Richa's account or need to push using a token:
1. Generate a **Personal Access Token (Classic)** on GitHub with `repo` scopes.
2. Run the following command in your terminal to push using the token (replace `YOUR_TOKEN_HERE` with the actual token):
   ```bash
   git remote set-url gapsab https://YOUR_TOKEN_HERE@github.com/Richa1016/GapSab.git
   git push gapsab main --force
   ```

### Option C: Push to your own repository first
If you want to push to a backup repository under your own account:
1. Create a new public repository on GitHub named `GapSab` under `Ogshub`.
2. Run:
   ```bash
   git remote add personal https://github.com/Ogshub/GapSab.git
   git push personal main --force
   ```

---

## Part 2: Deploying the Application Online

Since this is a real-time chat application using **Socket.io** (WebSockets), a standard Serverless platform (like Vercel for backend) is **not** recommended for the backend server, as serverless functions terminate and will drop WebSocket connections. 

Instead, deploy the **Backend Server** to a persistent hosting provider like **Render** or **Railway**, and the **Frontend** to **Vercel** or **Render**.

### 1. Deploy the Backend (to Render.com)
1. Go to [Render](https://render.com) and log in.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository (`GapSab`).
4. Set the following settings:
   - **Name**: `gapsab-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (Runs `node index.js`)
5. Click **Advanced** and add the following **Environment Variables**:
   - `PORT`: `10000` (or leave blank; Render sets this automatically)
   - `MONGO_URI`: `your_mongodb_atlas_connection_string`
   - `JWT_SECRET`: `your_secure_random_string`
   - `CLOUDINARY_CLOUD_NAME`: `your_cloudinary_cloud_name`
   - `CLOUDINARY_API_KEY`: `your_cloudinary_api_key`
   - `CLOUDINARY_API_SECRET`: `your_cloudinary_api_secret`
   - `FRONTEND_URL`: `https://your-frontend-domain.vercel.app` (The URL where your frontend will be deployed, e.g., on Vercel)
6. Click **Deploy Web Service**.
7. **Copy the backend URL** once deployed (e.g., `https://gapsab-backend.onrender.com`).

---

### 2. Deploy the Frontend (to Vercel.com)
1. Go to [Vercel](https://vercel.com) and log in.
2. Click **Add New** > **Project** and import your repository.
3. In the project setup page, change the **Root Directory** to `frontend`.
4. Leave the Framework Preset as **Vite** / **Other**.
5. Set the **Build Command** to:
   ```bash
   npm run build
   ```
6. Set the **Output Directory** to:
   ```bash
   dist
   ```
7. Open **Environment Variables** and add:
   - `VITE_SERVER_URL`: `https://gapsab-backend.onrender.com` (Your deployed Render backend URL from the previous step)
8. Click **Deploy**.
9. **Copy your frontend URL** (e.g., `https://gapsab.vercel.app`) and update the `FRONTEND_URL` environment variable on Render to this URL for secure, seamless CORS cookie sharing.

---

## How to Run the Project Locally

A complete instruction set has been documented in the main [README.md](./README.md) file at the root of the project, including how to configure `.env` files for both frontend and backend.
