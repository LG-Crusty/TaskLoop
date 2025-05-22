// for app.listen 
import express from "express"
import { app } from "./app.js"


app.listen(3000, () => {
    console.log("port running on: http://localhost:3000")
})

