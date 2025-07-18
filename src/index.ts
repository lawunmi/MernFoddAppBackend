import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import myUserRoute from "./routes/MyUserRoute"
import {v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute"
import restaurantRoute from "./routes/RestaurantRoute"


mongoose
.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => console.log("Connected to the database"))

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
const app = express()
app.use(express.json()) //This is the middleware that converts the body of API to JSON
app.use(cors());

app.get("/health", async(req:Request, res: Response) => {
    res.send({message:"Health Ok!"});
})
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);

app.get("/test", async (req: Request, res: Response) => {
    res.json({message: "Hello!"});
})

app.listen("7000", () => {
    console.log("server started on localhost: 7000")
})