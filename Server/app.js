import express from "express"
import { Server } from "socket.io"
import {createServer} from "http"


import cors from "cors"
import jwt from "jsonwebtoken"

const PORT = 3000

const app = express()
const server = new createServer(app)


const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET", "POST"],
        credentials:true,
    }
})



app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET", "POST"],
    credentials:true,
}))
io.use((socket, next)=>{
    next()
})
app.get("/", (req, res)=>{
    res.send("welcome to HTTP server")
})

const JWT_secret = "Sdfsdf"
app.get("/login", (req, res)=>{
    const token = jwt.sign({_id:"sdfawsdf"},JWT_secret)
    res.cookie("token", token, {httpOnly:true, secure:true, sameSite:"none"})
    .json({
        message:"Login succesfull"
    })

})



io.on("connection", (socket)=>{
        console.log(`User Connected ${socket.id}`);

       socket.on("message" ,({room, message})=>{
        // io.emit("message-recieve", data)
        socket.to(room).emit("message-recieve", message)

        // broadcast message
       })


       socket.on("join-room", (roomName)=>{
        socket.join(roomName)
        console.log("joined Room", roomName);
       })

    


      // Disconnect Event 
        socket.on("disconnect", ()=>{
            console.log(`User Disconnected ${socket.id}`);
        })


        /*


        // Emit Event
        socket.emit("other", `welcome ID users ${socket.id}`)

        // BroadCast Event
        socket.broadcast.emit("other", `${socket.id} Joinded The server`)

        */

  




})


server.listen(PORT, ()=>{
    console.log("server is running at 3000");
})