import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()

app.use(express.json()) //for client side json data
app.use(cors())  // for other cordinet connection,and we can add options in cors
app.use(cookieParser()) // receive cookies from client side


//import user controllers here
import { getUser, createUser, editUser, deleteUser} from "./controller/userController.js"

app.get('/users', getUser)
app.post('/users', createUser)
app.put("/users/:id", editUser)
app.delete("/users/:id", deleteUser)

export default app
