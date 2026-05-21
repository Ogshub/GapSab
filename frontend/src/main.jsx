import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import { store } from './redux/store.js'

export const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:5001"

export const getImageUrl = (imagePath) => {
  if (!imagePath) return "";
  // If it's a local blob URL or data URI, return as-is
  if (imagePath.startsWith("blob:") || imagePath.startsWith("data:")) {
    return imagePath;
  }
  // If it's a Cloudinary URL or external secure URL, return it as-is
  if (imagePath.includes("res.cloudinary.com") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  // If it contains a localhost or any port domain pattern with /public/, extract the relative path and attach to current serverUrl
  if (imagePath.includes("/public/")) {
    const parts = imagePath.split("/public/");
    return `${serverUrl}/public/${parts[1]}`;
  }
  // Otherwise, if it's already a relative path starting with /public or public
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${serverUrl}${cleanPath}`;
}

createRoot(document.getElementById('root')).render(
<BrowserRouter>
<Provider store={store}>
    <App />
</Provider>
</BrowserRouter>
 
)

