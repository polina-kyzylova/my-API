import './App.css';
import React, { useState } from 'react';
import useWebSocket from "react-use-websocket"



function App() {
  const [notification, setNotification] = useState({});
  const WS_URL = 'ws://localhost:5050';
  
  useWebSocket(WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection established.');
    },
    onMessage: (message) => {
      console.log('New message from WebSocket');

      let dataJSON = JSON.parse(message.data);
      setNotification(dataJSON);
      console.log(dataJSON);
    }
  });


  return (
    <div>
      <h1>Hello from React</h1>
      
      <h2>Live Notifications</h2>
      <p>Пользователь: {notification.user}</p>
      <p>Машина: {notification.car}</p>
      <p>Возраст: {notification.age}</p>
  </div>
  );
}

export default App;



  /*
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    },
  )
    
  useEffect(() => {
    console.log(`Got a new message: ${lastJsonMessage}`)
  }, [lastJsonMessage])
  */