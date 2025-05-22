// for methods of express
import express from "express"
import router from "./routes/routes.js"
import cors from "cors"
const app = express()

app.use(express.json())

app.use(express.urlencoded())

app.use(cors(
    {
        origin: "*"
    }
))

app.use("/api/auth/user", router)

export {app};