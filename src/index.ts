import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose"
import myUserRoute from "./routes/myUserRoutes"

mongoose
.connect(process.env.MONGODB_CONNECTION_STRING as string)
.then(() => console.log("Connected to the database"))

const app = express()
app.use(express.json()) //This is the middleware that converts the body of API to JSON
app.use(cors());

app.get("/health", async(req:Request, res: Response) => {
    res.send({message:"Health Ok!"});
})
app.use("/api/my/user", myUserRoute);

app.get("/test", async (req: Request, res: Response) => {
    res.json({message: "Hello!"});
})

app.listen("7000", () => {
    console.log("server started on localhost: 7000")
})