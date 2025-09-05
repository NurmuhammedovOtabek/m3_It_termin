const express = require("express")
const config = require("config")
const sequelize = require("./config/db")
const cookieParser = require("cookie-parser")
const mainRouter = require("./routes")

const PORT = config.get("port") ?? 5000

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api", mainRouter)

const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT,()=>{
            console.log(`server started at: http://localhost:${PORT}`);
        })
    }catch(error){
        console.log(error);
        
    }
}

start()