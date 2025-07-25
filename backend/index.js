import dotenv from "dotenv";
import connectDB from "./src/db/index.js"
import {app} from "./app.js"
dotenv.config({
    path: './.env'
})


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`server is running  on ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log("Server failed",err);
    })