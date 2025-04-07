import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import ConnectDB from "./config/db.js"
import userRoute from "./routes/user.js"

//env configure
dotenv.config()

//db connection
ConnectDB()
const app = express()
app.use(express.json())
app.use(morgan("dev"))
const PORT = process.env.PORT


//routing

app.use("/api/v1",userRoute)
//express routing
app.get("/",(req,res)=>{
    res.send("<h1>Server is Working</h1>")
})


//server run
app.listen(PORT,()=>{
    console.log(`Server is running at Port : http://localhost:${PORT}`)

});


