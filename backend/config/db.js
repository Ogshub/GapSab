import mongoose from "mongoose";
import dns from "dns";

// Set DNS servers to public ones to resolve SRV record issues in Node.js
try {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {
    console.warn("Could not set DNS servers:", e);
}

const connectDb =async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    } catch (error) {
        console.error("db error:", error)
    }
}

export default connectDb