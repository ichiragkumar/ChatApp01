import {io} from "socket.io-client"
import  {useEffect, useMemo, useState} from "react"
import {Container, TextField, Typography, Button} from "@mui/material"
const App = () => {

  const socket = useMemo(()=>io("http://localhost:3000"),[])

  const [message, setMessage] = useState("")

  const handleSubmit = (e)=>{
    e.preventDefault()
    socket.emit("message",message)
    setMessage("")
  
  }



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

    socket.on("message-recieve", (ms)=>{
      console.log(`user ${socket.id} Message Receive ${ms}`);
    })

    
    return () =>{
      socket.disconnect()
    }

  },[])

  

  return <Container maxWidth="sm">

    <Typography variant="h1" component="div" gutterBottom>
          Welcome to SocketIO
    </Typography>
    <form onSubmit={handleSubmit}>
     <TextField 
        id="outlined-basic" 
        label="Outlined" 
        variant="outlined"  
        value={message} 
        onChange={(e)=>{setMessage(e.target.value)
     }}/>
     <Button type="submit" variant="outlined">Send message</Button>
    </form>
  </Container>
}

export default App

