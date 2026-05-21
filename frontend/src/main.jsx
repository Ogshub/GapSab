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

  if (imagePath.startsWith("blob:") || imagePath.startsWith("data:")) {
    return imagePath;
  }

  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  if (imagePath.includes("/public/")) {
    const parts = imagePath.split("/public/");
    return `${serverUrl}/public/${parts[1]}`;
  }

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

