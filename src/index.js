// for app.listen 
import { app } from "./app.js"
import { connectToDb } from "./db/db.js"
import dotenv from "dotenv";
dotenv.config({
    path: './env'
})


connectToDb().then(
    app.listen(process.env.PORT || 3000, () => {
            console.log(`app is listening on the port : ${process.env.PORT}`)
    })
).catch(error =>
    console.error(`Mongo Connection Error : ${error}`)
)

