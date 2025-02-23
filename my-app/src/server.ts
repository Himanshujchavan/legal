import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import applicationRoutes from "./routes/applicationRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/applications", applicationRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

