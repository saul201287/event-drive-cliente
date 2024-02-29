import axios from "axios";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";


const App = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const newSocket = io("https://api-ws-server.onrender.com/");
    newSocket.on("mensajeServidor", (message) => {
      console.log(message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);


  const alertNotification = async () => {
    const data = await axios.post("https://api-event-driven.onrender.com/products/", {
      name: "coca",
      description: "grande",
      price: 22,
    });
    console.log(data);
  };

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <div key={index}>
          <li>{message.idPay}</li>
          <li>{message.product}</li>
          <li>{message.date}</li>
          <li>{message.price}</li>
          </div>
        ))}
      </ul>
      <button
        type="text"
        placeholder="Escribe un mensaje"
        onClick={alertNotification}>
        Comprame soy barato y un vicio sano
      </button>
    </div>
  );
};

export default App;
