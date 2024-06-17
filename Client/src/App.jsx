import {io} from "socket.io-client"
import  {useEffect, useMemo, useState} from "react"
import {Container, TextField, Typography, Button, Box, Stack} from "@mui/material"
const App = () => {

  const socket = useMemo(()=>io("http://localhost:3000"),[])

  const [message, setMessage] = useState("")
  const [room, setRoom] = useState("")
  const [socketID, setSocketID] = useState("")
  const [allmessages, setMessagesonScreen] = useState([])

  console.log(message);


  const handleSubmit = (e)=>{
    e.preventDefault()
    socket.emit("message",message)
    setMessage("")
  }

  const roomSubmit = (e)=>{
    e.preventDefault()
    socket.emit("message",{message,room})
    setMessage("")
  }



  useEffect(()=>{

    socket.on("connect", ()=>{
      setSocketID(socket.id)
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
      setMessagesonScreen((allmessages) => [...allmessages, ms])
    })



    
    return () =>{
      socket.disconnect()
    }

  },[])

  

  return <Container maxWidth="sm">
    <Box sx={{height:50}}/>

    <Typography variant="h2" component="div" gutterBottom>REAL TIME</Typography>
    <Typography variant="h5" component="div" gutterBottom>{socketID}</Typography>
    <form onSubmit={roomSubmit}>
    <TextField 
            id="outlined-basic" 
            label="Enter Room Code" 
            variant="outlined"  
            value={room} 
            onChange={(e)=>{setRoom(e.target.value)
        }}/>
      <br/>
     <TextField 
        id="outlined-basic" 
        label="Enter Message" 
        variant="outlined"  
        value={message} 
        onChange={(e)=>{setMessage(e.target.value)
     }}/>
    <br/>
    
     <Button type="submit" variant="outlined">Send message</Button>
    </form>

     <Stack>
      {
        allmessages.map((eachMessage, index) => (
          <Typography key={index} variant="h6" component="div" gutterBottom>{eachMessage}</Typography>
      ))}
      </Stack> 
  </Container>
}

export default App

