import {io} from "socket.io-client"


const App = () => {

  const socket = io("http://localhost:3000")

  return (

    <div>
        <h1>Welcome to Real Time Chat App</h1>
    </div>
  )
}

export default App

