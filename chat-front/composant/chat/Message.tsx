import { OpenAI } from "openai";
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

export interface IMessage {
  username: string;
  content: string;
  timeSent: string;
}
interface Props {
  message: IMessage;
  isMe: boolean;
}
const socket = io("http://localhost:3001");

const Message = ({ message, isMe }: Props) => {
  const [messageTranslate,setMessageTranslate]=useState(null); // l'etat de la page
  useEffect(()=>{
    socket.on("translate", (data) => {
      setMessageTranslate(data); //prend les modifications
    });
  },[])

  const chatAlignment = isMe ? "chat-end" : "chat-start";
  const [translatedContent, setTranslatedContent] = useState(null);
  const bubbleAlignment = isMe
    ? "chat-bubble-primary"
    : "chat-bubble-secondary";
  const imageAlignment = isMe ? "flex-row-reverse" : "flex-row";
  return (
    <div className={`chat ${chatAlignment}`}>
      <div className={`flex ${imageAlignment}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-blue-500">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
            />
          </div>
        </div>
        <div className={`chat-bubble ${bubbleAlignment}`}>
          {message.content}
          <p>{messageTranslate}</p>
        </div>
      </div>
      <div className="chat-header">
        {message.username}
        <time className="text-xs opacity-50">{message.timeSent}</time>
      </div>
    </div>
  );
};
export default Message;
