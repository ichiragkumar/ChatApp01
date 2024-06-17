import express from "express"
import { Server } from "socket.io"
import {createServer} from "http"


import cors from "cors"
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


app.use(cors())
app.get("/", (req, res)=>{
    res.send("welcome to HTTP server")
})



io.on("connection", (socket)=>{
        console.log(`User Connected ${socket.id}`);

       socket.on("message" ,(data)=>{
        console.log(data);
        // io.emit("message-recieve", data)
        socket.broadcast.emit("message-recieve", data)

        // broadcast message
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