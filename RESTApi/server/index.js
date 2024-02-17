import env from 'dotenv'
import connection from "./config/config.js";
import app from "./app.js";
env.config()




app.listen(process.env.PORT,()=>{
    console.log(`server start on localhost:${process.env.PORT}`)
    connection()
})