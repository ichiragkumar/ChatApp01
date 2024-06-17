
## Dependices - Server

        1. express
        2. socket.io
        3. nodemon
        4. cors

## Setup socketIO

      1. import express from "express"
      2. import { Server } from "socket.io"
      3. import {createServer} from "http"  
   
        
        <!-- create the App instance from express -->

        const app = express()
        const server = new createServer(app)
        const io = new Server(server) // Add CORS here
        
        <!-- listen the server  -->

        io.on("connection", (socket)=>{
        console.log("USer connected");
        console.log(socket.id);
        })

        <!-- here server will listen , not app -->
        server.listen(PORT, ()=>{
        console.log("server is running at 3000");
        })

## Fix CORS issue

        1. import cors from "cors"


        const io = new Server(server, {
        cors:{
            origin:"http://localhost:5173",
            methods:["GET", "POST"],
            credentials:true,
            }
        })

        2. use as Middlewares
        app.use(cors())

## Dependices - Client

        1. react with Vite
        
        working with material UI
        2. npm install @mui/material @emotion/react @emotion/styled
        3. nodemon
        4. cors
