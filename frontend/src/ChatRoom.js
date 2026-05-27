import React, { useEffect, useState } from "react";

function ChatRoom() {

  const [socket, setSocket] = useState(null);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const ws = new WebSocket(
      "ws://127.0.0.1:8002/ws/chat/general/"
    );

    ws.onmessage = (event) => {

      const data = JSON.parse(event.data);

      setMessages((prev) => [
        ...prev,
        data.message
      ]);
    };

    setSocket(ws);

    return () => ws.close();

  }, []);

  const sendMessage = () => {

    if (socket) {

      socket.send(
        JSON.stringify({
          message: message
        })
      );

      setMessage("");
    }
  };

  return (

    <div className="min-h-screen bg-gray-900 text-white p-8">

      <h1 className="text-4xl font-bold mb-6">
        DevCollab Chat
      </h1>

      <div className="bg-gray-800 p-4 rounded-lg h-96 overflow-y-auto mb-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className="bg-blue-600 p-2 rounded mb-2"
          >
            {msg}
          </div>
        ))}

      </div>

      <div className="flex gap-2">

        <input
          type="text"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          className="flex-1 p-3 rounded text-black"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-6 py-3 rounded"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatRoom;