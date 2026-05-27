import { useEffect, useState } from "react";

function Chat() {

  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const ws = new WebSocket(
      "ws://127.0.0.1:8002/ws/chat/"
    );

    ws.onopen = () => {
      console.log("Connected 🚀");
    };

    ws.onmessage = (event) => {

      const data = JSON.parse(event.data);

      setMessages((prev) => [...prev, data.message]);
    };

    setSocket(ws);

    return () => ws.close();

  }, []);

  const sendMessage = () => {

    if (socket && message) {

      socket.send(
        JSON.stringify({
          message: message,
        })
      );

      setMessage("");
    }
  };

  return (

    <div className="bg-white text-black p-5 rounded-lg">

      <h2 className="text-2xl font-bold mb-4">
        Real-Time Chat 🚀
      </h2>

      <div className="border p-3 h-64 overflow-y-scroll mb-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className="bg-gray-200 p-2 rounded mb-2"
          >
            {msg}
          </div>

        ))}

      </div>

      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-3"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>

    </div>
  );
}

export default Chat;