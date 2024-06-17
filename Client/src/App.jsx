import {io} from "socket.io-client"
import React, {useEffect} from "react"

const App = () => {

  const socket = io("http://localhost:3000")


  useEffect(()=>{

    socket.on("connect", ()=>{
      console.log("connected from client side", socket.id);
    })

    socket.on("welcome", (s)=>{
      console.log(s);
    })

    socket.on("other", (os)=>{
      console.log(os);
    })

    return () =>{
      socket.disconnect()
    }

  },[])

  

  return (

    <div>
        <h1>Welcome to Real Time Chat App</h1>
    </div>
  )
}

export default App

