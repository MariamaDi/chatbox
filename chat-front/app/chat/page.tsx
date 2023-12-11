"use client";
import Messages from "@/composant/chat/Messages";
import SendMessage from "@/composant/chat/SendMessage";
import Username from "@/composant/chat/UserName";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io("http://localhost:3001");
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("chat-message", (data) => {
      setMessages((msg) => [...msg, data] as any);
    });
  }, []);
  const trade = (text: string,translate:boolean) => {
    socket.emit("translate", {
      content: text,
    });
  };
  return (
    <div className="flex flex-col h-screen">
      <div>
        <h1 className="text-4xl items-center text-center font-bold mb-4">
          Chat
        </h1>
      </div>
      <div className="flex-grow flex flex-col">
        <Username socket={socket} setUsername={setUsername} />
        <SendMessage socket={socket} username={username} />
        <div className="flex-grow overflow-y-auto">
          <Messages messages={messages} username={username} onSendMessage={trade} />
        </div>
      </div>
    </div>
  );
};
export default Chat;
