// Import the App.css file to apply styles to the component
import './App.css'

// Import the useState and useEffect hooks from the React library
import { useState, useEffect} from 'react'

// Import the io function from the socket.io-client library to establish a connection with the server
import io from "socket.io-client";

// Import the nanoid function from the nanoid library to generate a unique user ID
import { nanoid} from "nanoid";

// Establish a connection with the server at http://localhost:3000
const socket = io.connect("http://localhost:3000");

// Generate a unique user ID using the nanoid function
const userName = nanoid(4);

// Define the App component as a function
function App() {

  // Initialize the message state with an empty string
  const [message, setMessage] = useState("")

  // Initialize the chat state with an empty array
  const [chat, setChat] = useState([])

  // Define the sendChat function to handle sending a chat message
  const sendChat = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Emit a 'chat' event to the server with the message and user ID
    socket.emit("chat", {message, userName})

    // Reset the message state to an empty string
    setMessage("");
    
  }

  // Use the useEffect hook to collect broadcast messages from the server
  useEffect(() => {
    // Set up an event listener for the 'chat' event
    socket.on("chat", (payload) => {
      // Update the chat state with the received message
      setChat([...chat, payload])
    })
  },[message])

  // Return the JSX elements that make up the App component
  return (
    <div >
      <header>
        <h1>Chat App</h1>
        {chat.map((payload, index) => {
          // Return a JSX element for each message in the chat state
          return (
            <div key={index}>
              <p>{payload.message}: <span>id: {payload.userName}</span></p>
            </div>
          )
        })}
        <form onSubmit={sendChat}>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <button type='submit'>Send</button>
        </form>
      </header>
    </div>
  )
}

// Export the App component as the default export
export default App