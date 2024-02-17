import express from 'express';
import env from "dotenv";

env.config()
const app=express();

const logMiddleware =(req, res, next)=>{  

const {method, url ,headers}=req

const time=Date.now()
const timeStamp=new Date(time).toISOString()
const accessToken=headers['access-token']

console.log(`[${timeStamp} ,${method}:${url}, accessToken:${accessToken}]`)
next()
}

app.use(logMiddleware)

app.listen(process.env.PORT,()=>{
    console.log("listen on port", process.env.PORT)
})