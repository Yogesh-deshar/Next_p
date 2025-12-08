import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
    if (isConnected) {
        console.log("MongoDB already connected");
        return;
    }

    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL environment variable is not defined");
    }

    try {
        await mongoose.connect(process.env.MONGO_URL);
        isConnected = true;
        console.log("Connected to MongoDB");
        
        const connection = mongoose.connection;
        connection.on("error", (error) => {
            console.log("MongoDB connection error", error);
            isConnected = false;
        });
        connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
            isConnected = false;
        });
    } catch (error) {
        console.log("MongoDB connection error:", error);
        isConnected = false;
        throw error;
    }
}